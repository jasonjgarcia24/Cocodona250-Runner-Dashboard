import { AID_STATIONS } from '../data/aidStations';
import { SECTION_TERRAIN } from '../data/terrain';
import { estimateTemp, getWeatherForMile } from '../data/weather';

/**
 * Race start time: Monday May 4, 2026 at 5:00 AM MST.
 * All arrival/departure times are Date objects relative to this start.
 */
const RACE_START = new Date(2026, 4, 4, 5, 0, 0); // Month is 0-indexed

/**
 * Parse a cutoff string like "Mon 5:00 AM" into a Date object.
 * Day abbreviations map to race days:
 *   Mon = May 4, Tue = May 5, Wed = May 6, Thu = May 7, Fri = May 8, Sat = May 9
 */
const DAY_MAP = { Mon: 4, Tue: 5, Wed: 6, Thu: 7, Fri: 8, Sat: 9 };

export const parseCutoff = (cutoffStr) => {
  if (!cutoffStr) return null;
  const match = cutoffStr.match(/^(Mon|Tue|Wed|Thu|Fri|Sat)\s+(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;

  const [, day, hourStr, minStr, ampm] = match;
  let hour = parseInt(hourStr, 10);
  const min = parseInt(minStr, 10);

  if (ampm.toUpperCase() === 'PM' && hour !== 12) hour += 12;
  if (ampm.toUpperCase() === 'AM' && hour === 12) hour = 0;

  return new Date(2026, 4, DAY_MAP[day], hour, min, 0);
};

/**
 * Format minutes as HH:MM string (e.g., 90 -> "1:30").
 */
export const formatDuration = (totalMinutes) => {
  if (totalMinutes == null || isNaN(totalMinutes)) return '--:--';
  const h = Math.floor(totalMinutes / 60);
  const m = Math.round(totalMinutes % 60);
  return `${h}:${m.toString().padStart(2, '0')}`;
};

/**
 * Format a Date as "Day HH:MM AM/PM" (e.g., "Tue 3:15 PM").
 */
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const formatTime = (date) => {
  if (!date || !(date instanceof Date)) return '--';
  const dayName = DAY_NAMES[date.getDay()];
  let h = date.getHours();
  const m = date.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  return `${dayName} ${h}:${m.toString().padStart(2, '0')} ${ampm}`;
};

/**
 * Format pace as MM:SS per mile (e.g., 23.5 -> "23:30").
 */
export const formatPace = (minPerMile) => {
  if (minPerMile == null || isNaN(minPerMile)) return '--:--';
  const mins = Math.floor(minPerMile);
  const secs = Math.round((minPerMile - mins) * 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Get time-of-day category for a Date.
 */
export const getTimeOfDay = (date) => {
  if (!date) return 'day';
  const h = date.getHours();
  if (h >= 20 || h < 5) return 'night';
  if (h >= 5 && h < 7) return 'dawn';
  if (h >= 18 && h < 20) return 'dusk';
  return 'day';
};

// ─── MULTIPLIER FUNCTIONS ───────────────────────────────────────────────────

/**
 * Step 2: Terrain multiplier (1.0 flat → 2.0+ steep/technical).
 * Based on elevation gain per mile, loss per mile, and technicality.
 */
export const terrainMultiplier = (section) => {
  if (!section) return 1.0;
  const { distance, elevationGain, elevationLoss, technicality } = section;
  if (!distance || distance === 0) return 1.0;

  const gainPerMile = elevationGain / distance;
  const lossPerMile = elevationLoss / distance;

  // Climbing penalty: ~1% per 10ft/mi of gain
  let climbFactor = 1.0 + gainPerMile / 1000;

  // Steep descent penalty (hard on quads): ~0.5% per 10ft/mi of loss
  let descentFactor = 1.0 + (lossPerMile / 2000);

  // Use the worse of climb vs descent
  let base = Math.max(climbFactor, descentFactor);

  // Technicality adjustment: +5-15% for technical terrain
  const techAdj = 1.0 + (technicality - 1) * 0.04;
  base *= techAdj;

  return Math.max(1.0, Math.min(2.5, base));
};

/**
 * Step 3: Heat multiplier.
 * 1.0 at 60F, +2-5% per 10F above 70F.
 */
export const heatMultiplier = (tempF) => {
  if (tempF == null || tempF <= 70) return 1.0;
  // Scale: +3.5% per 10F above 70F (midpoint of 2-5%)
  const degreesAbove70 = tempF - 70;
  return 1.0 + (degreesAbove70 / 10) * 0.035;
};

/**
 * Step 4: Night multiplier (1.05-1.15 depending on technicality).
 */
export const nightMultiplier = (timeOfDay, technicality) => {
  if (timeOfDay === 'night') {
    // 1.05 for easy terrain, up to 1.15 for very technical
    return 1.05 + (Math.min(technicality, 5) - 1) * 0.025;
  }
  if (timeOfDay === 'dawn' || timeOfDay === 'dusk') {
    // Half the night penalty
    return 1.025 + (Math.min(technicality, 5) - 1) * 0.0125;
  }
  return 1.0;
};

/**
 * Step 5: Fatigue curve.
 * Gradual after mile 100, steeper after mile 180.
 */
export const fatigueMultiplier = (mile) => {
  if (mile <= 50) return 1.0;
  if (mile <= 100) {
    // Gentle ramp: 0-5% over miles 50-100
    return 1.0 + ((mile - 50) / 50) * 0.05;
  }
  if (mile <= 180) {
    // Moderate ramp: 5-20% over miles 100-180
    return 1.05 + ((mile - 100) / 80) * 0.15;
  }
  // Steep ramp: 20-40% over miles 180-253
  return 1.20 + ((mile - 180) / 73) * 0.20;
};

/**
 * Step 6: Sleep debt factor.
 * Degrades pace ~3-5% per 4 hours beyond 24h without sleep.
 * elapsedHours: total elapsed time from race start.
 * sleepHours: total sleep taken so far.
 */
export const sleepDebtMultiplier = (elapsedHours, sleepHours) => {
  const awakeHours = elapsedHours - sleepHours;
  if (awakeHours <= 24) return 1.0;

  // ~4% per 4 hours beyond 24h (midpoint of 3-5%)
  const hoursOfDebt = awakeHours - 24;
  const penaltyPer4h = 0.04;
  return 1.0 + (hoursOfDebt / 4) * penaltyPer4h;
};

/**
 * Step 7: Pack weight factor.
 * Heavier carry = slower, especially on climbs.
 * Baseline: 10 lbs is neutral. Each additional lb adds ~0.5% on flat, ~1% on climbs.
 */
export const packWeightMultiplier = (weightLbs, isClimbing) => {
  const baseWeight = 10;
  if (weightLbs <= baseWeight) return 1.0;
  const extraLbs = weightLbs - baseWeight;
  const penaltyPerLb = isClimbing ? 0.01 : 0.005;
  return 1.0 + extraLbs * penaltyPerLb;
};

// ─── MAIN PACING CALCULATOR ────────────────────────────────────────────────

/**
 * Default runner profile with sensible defaults for a 100-hour finish.
 */
export const DEFAULT_RUNNER_PROFILE = {
  basePace: 15, // min/mile on flat trail
  targetFinishTime: 100, // hours
  packWeight: 12, // lbs
  plannedSleepStops: [], // array of { stationMile, duration (minutes) }
};

/**
 * Calculate full race pacing plan.
 *
 * @param {Object} runnerProfile - { basePace, targetFinishTime, packWeight, plannedSleepStops }
 * @param {Object} plans - per-station overrides { [stationMile]: { timeAtStation, sleepDuration, notes } }
 * @returns {Array} Array of section results, one per aid station (starting from station index 1)
 */
export const calculatePacing = (runnerProfile = DEFAULT_RUNNER_PROFILE, plans = {}) => {
  const profile = { ...DEFAULT_RUNNER_PROFILE, ...runnerProfile };
  const stations = AID_STATIONS;
  const terrain = SECTION_TERRAIN;

  const results = [];
  let cumulativeMinutes = 0;
  let totalSleepMinutes = 0;

  // Build a lookup for planned sleep stops by station mile
  const sleepByMile = {};
  if (profile.plannedSleepStops) {
    for (const stop of profile.plannedSleepStops) {
      sleepByMile[stop.stationMile] = stop.duration; // minutes
    }
  }

  for (let i = 0; i < stations.length; i++) {
    const station = stations[i];

    if (i === 0) {
      // Start line — no leg to compute
      const cutoffDate = parseCutoff(station.cutoff);
      const arrivalDate = new Date(RACE_START);

      results.push({
        stationIndex: 0,
        stationName: station.name,
        mile: station.mile,
        legDistance: 0,
        elevationGain: 0,
        elevationLoss: 0,
        netElevation: 0,
        stationElevation: 2230,
        terrainDescription: 'Start line',
        targetPace: 0,
        legTimeMinutes: 0,
        arrivalTime: arrivalDate,
        timeAtStation: 0,
        departureTime: arrivalDate,
        cutoff: station.cutoff,
        cutoffDate,
        bufferMinutes: cutoffDate ? 0 : null,
        cumulativeMinutes: 0,
        timeOfDay: getTimeOfDay(arrivalDate),
        weather: 'Desert canyon, pre-dawn start',
        crew: station.crew,
        pacer: station.pacer,
        pacerNote: station.pacerNote || null,
        dropBag: station.dropBag,
        sleepPlan: null,
        notes: plans[station.mile]?.notes || '',
      });
      continue;
    }

    // Get terrain data for this section (terrain array is indexed i-1)
    const section = terrain[i - 1] || {};
    const legDistance = section.distance || (station.mile - stations[i - 1].mile);

    // Current arrival estimate (for time-of-day calculation)
    const prevDeparture = results[i - 1].departureTime;
    const elapsedHours = cumulativeMinutes / 60;

    // Estimate midpoint time to determine time-of-day and temperature
    const estLegMinutes = legDistance * profile.basePace;
    const midpointMinutes = cumulativeMinutes + estLegMinutes / 2;
    const midpointDate = new Date(RACE_START.getTime() + midpointMinutes * 60000);
    const midpointHour = midpointDate.getHours();
    const midpointMile = (stations[i - 1].mile + station.mile) / 2;

    // Time of day at the midpoint of the leg
    const tod = getTimeOfDay(midpointDate);

    // Step 1: Base pace
    let pace = profile.basePace;

    // Step 2: Terrain multiplier
    const tMult = terrainMultiplier(section);
    pace *= tMult;

    // Step 3: Heat multiplier
    const temp = estimateTemp(midpointMile, midpointHour);
    const hMult = heatMultiplier(temp);
    pace *= hMult;

    // Step 4: Night multiplier
    const nMult = nightMultiplier(tod, section.technicality || 2);
    pace *= nMult;

    // Step 5: Fatigue multiplier
    const fMult = fatigueMultiplier(station.mile);
    pace *= fMult;

    // Step 6: Sleep debt multiplier
    const sdMult = sleepDebtMultiplier(elapsedHours, totalSleepMinutes / 60);
    pace *= sdMult;

    // Step 7: Pack weight multiplier
    const isClimbing = (section.elevationGain || 0) > (section.elevationLoss || 0);
    const pwMult = packWeightMultiplier(profile.packWeight, isClimbing);
    pace *= pwMult;

    // Calculate leg time
    const legTimeMinutes = legDistance * pace;
    cumulativeMinutes += legTimeMinutes;

    // Arrival time
    const arrivalTime = new Date(RACE_START.getTime() + cumulativeMinutes * 60000);

    // Time at station (from plans or default)
    const planOverride = plans[station.mile];
    let timeAtStation = planOverride?.timeAtStation ?? getDefaultStopTime(station);

    // Sleep at this station
    let sleepDuration = planOverride?.sleepDuration ?? (sleepByMile[station.mile] || 0);

    // Total stop time = time at station + sleep
    const totalStopMinutes = timeAtStation + sleepDuration;
    cumulativeMinutes += totalStopMinutes;
    totalSleepMinutes += sleepDuration;

    // Departure time
    const departureTime = new Date(RACE_START.getTime() + cumulativeMinutes * 60000);

    // Cutoff buffer
    const cutoffDate = parseCutoff(station.cutoff);
    let bufferMinutes = null;
    if (cutoffDate) {
      bufferMinutes = Math.round((cutoffDate.getTime() - arrivalTime.getTime()) / 60000);
    }

    // Weather description
    const weatherSection = getWeatherForMile(midpointMile);
    const weatherDesc = weatherSection ? weatherSection.terrain : '';

    results.push({
      stationIndex: i,
      stationName: station.name,
      mile: station.mile,
      legDistance: Math.round(legDistance * 10) / 10,
      elevationGain: section.elevationGain || 0,
      elevationLoss: section.elevationLoss || 0,
      netElevation: (section.elevationGain || 0) - (section.elevationLoss || 0),
      stationElevation: section.endElevation || 0,
      terrainDescription: section.description || '',
      targetPace: Math.round(pace * 10) / 10,
      legTimeMinutes: Math.round(legTimeMinutes),
      arrivalTime,
      timeAtStation,
      sleepDuration,
      departureTime,
      cutoff: station.cutoff,
      cutoffDate,
      bufferMinutes,
      cumulativeMinutes: Math.round(cumulativeMinutes),
      timeOfDay: getTimeOfDay(arrivalTime),
      weather: weatherDesc,
      crew: station.crew,
      pacer: station.pacer,
      pacerNote: station.pacerNote || null,
      dropBag: station.dropBag,
      sleepPlan: sleepDuration > 0 ? `${sleepDuration} min` : null,
      notes: planOverride?.notes || '',
      // Multiplier breakdown for debugging/display
      multipliers: {
        terrain: Math.round(tMult * 1000) / 1000,
        heat: Math.round(hMult * 1000) / 1000,
        night: Math.round(nMult * 1000) / 1000,
        fatigue: Math.round(fMult * 1000) / 1000,
        sleepDebt: Math.round(sdMult * 1000) / 1000,
        packWeight: Math.round(pwMult * 1000) / 1000,
      },
    });
  }

  return results;
};

/**
 * Default stop time at an aid station (in minutes).
 * Bigger stations with more amenities get longer default stops.
 */
const getDefaultStopTime = (station) => {
  let time = 5; // Minimum stop
  if (station.crew) time += 5;
  if (station.shower) time += 5;
  if (station.medic) time += 2;
  if (station.name === 'Water Station') time = 2; // Quick water stop
  return time;
};

/**
 * Calculate total projected finish time in hours.
 */
export const getProjectedFinishHours = (pacingResults) => {
  if (!pacingResults || pacingResults.length === 0) return null;
  const last = pacingResults[pacingResults.length - 1];
  return Math.round((last.cumulativeMinutes / 60) * 10) / 10;
};

/**
 * Check if any cutoff is missed (buffer < 0).
 */
export const getCutoffWarnings = (pacingResults) => {
  return pacingResults.filter((r) => r.bufferMinutes !== null && r.bufferMinutes < 0);
};
