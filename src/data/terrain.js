import { ELEV_PTS } from './routeCoords';
import { AID_STATIONS } from './aidStations';

/**
 * Interpolate elevation at a given mile from ELEV_PTS.
 */
const elevationAtMile = (mile) => {
  if (mile <= ELEV_PTS[0][0]) return ELEV_PTS[0][1];
  if (mile >= ELEV_PTS[ELEV_PTS.length - 1][0]) return ELEV_PTS[ELEV_PTS.length - 1][1];

  for (let i = 0; i < ELEV_PTS.length - 1; i++) {
    const [m0, e0] = ELEV_PTS[i];
    const [m1, e1] = ELEV_PTS[i + 1];
    if (mile >= m0 && mile <= m1) {
      const t = (mile - m0) / (m1 - m0);
      return e0 + t * (e1 - e0);
    }
  }
  return ELEV_PTS[ELEV_PTS.length - 1][1];
};

/**
 * Compute elevation gain and loss between two mile markers
 * by summing the gain/loss across each ELEV_PTS sub-segment.
 */
const computeGainLoss = (startMile, endMile) => {
  let gain = 0;
  let loss = 0;

  // Collect all relevant elevation points in this range
  const points = [];

  // Add the interpolated start
  points.push([startMile, elevationAtMile(startMile)]);

  // Add all ELEV_PTS that fall strictly between start and end
  for (const [m, e] of ELEV_PTS) {
    if (m > startMile && m < endMile) {
      points.push([m, e]);
    }
  }

  // Add the interpolated end
  points.push([endMile, elevationAtMile(endMile)]);

  // Sum gain and loss across consecutive points
  for (let i = 1; i < points.length; i++) {
    const diff = points[i][1] - points[i - 1][1];
    if (diff > 0) gain += diff;
    else loss += Math.abs(diff);
  }

  return { gain: Math.round(gain), loss: Math.round(loss) };
};

/**
 * Surface type descriptions per section, keyed by approximate mile range.
 * Derived from course knowledge and terrain descriptions.
 */
const SURFACE_DESCRIPTIONS = [
  { startMile: 0, endMile: 10.4, surface: 'Rocky desert trail', description: 'Desert canyon, rocky singletrack with some scrambling' },
  { startMile: 10.4, endMile: 32.5, surface: 'Mixed trail and jeep road', description: 'Rugged canyon trails, dry creek crossings, exposed ridges' },
  { startMile: 32.5, endMile: 36.6, surface: 'Steep mountain trail', description: 'Steep climb to Crown King, rocky switchbacks' },
  { startMile: 36.6, endMile: 51, surface: 'Mountain singletrack', description: 'Bradshaw Mtn trails, technical descent with rocky sections' },
  { startMile: 51, endMile: 67.4, surface: 'Forest trail', description: 'Moderate mountain trails through pine forest' },
  { startMile: 67.4, endMile: 75.7, surface: 'Mixed trail and road', description: 'Rolling terrain approaching Prescott' },
  { startMile: 75.7, endMile: 82.8, surface: 'Lake trail and jeep road', description: 'Granite Dells area, rolling trail around Watson Lake' },
  { startMile: 82.8, endMile: 94.5, surface: 'Grassland and ranch road', description: 'Open grasslands, gentle rolling terrain' },
  { startMile: 94.5, endMile: 106.8, surface: 'Steep mountain climb', description: 'Long sustained climb to Mingus Mountain summit, technical sections' },
  { startMile: 106.8, endMile: 123.8, surface: 'Steep rocky descent', description: 'Long descent from Mingus through Jerome, steep switchbacks' },
  { startMile: 123.8, endMile: 132.5, surface: 'Desert trail and road', description: 'Verde Valley floor, some road sections' },
  { startMile: 132.5, endMile: 146.5, surface: 'Red rock trail', description: 'Desert trails with rocky terrain, exposed red rock' },
  { startMile: 146.5, endMile: 158.8, surface: 'Red rock singletrack', description: 'Sedona red rock trails, technical rocky sections, minimal shade' },
  { startMile: 158.8, endMile: 175.7, surface: 'Steep mountain trail', description: 'Climb out of Sedona via Schnebly Hill, exposed ridgeline' },
  { startMile: 175.7, endMile: 189.6, surface: 'Forest singletrack', description: 'High mountain trail through ponderosa pine, some technical sections' },
  { startMile: 189.6, endMile: 202.3, surface: 'Pine forest trail', description: 'Ponderosa pine forest, runnable sections, moderate terrain' },
  { startMile: 202.3, endMile: 210.6, surface: 'Forest path and road', description: 'Approaching Flagstaff, mixed trail and road, gentle grades' },
  { startMile: 210.6, endMile: 226.8, surface: 'Rim trail and forest', description: 'Walnut Canyon rim, exposed sections, some rocky trail' },
  { startMile: 226.8, endMile: 233.7, surface: 'Forest singletrack', description: 'Rolling terrain through pine forest' },
  { startMile: 233.7, endMile: 249.0, surface: 'Mixed trail', description: 'High plateau trail with gentle grades, approaching finish' },
  { startMile: 249.0, endMile: 252.9, surface: 'Road and paved path', description: 'Final descent into Flagstaff, mostly runnable' },
];

/**
 * Get surface info for a mile range.
 */
const getSurfaceInfo = (startMile, endMile) => {
  const midMile = (startMile + endMile) / 2;
  for (const s of SURFACE_DESCRIPTIONS) {
    if (midMile >= s.startMile && midMile < s.endMile) {
      return { surface: s.surface, description: s.description };
    }
  }
  return { surface: 'Trail', description: 'Mixed terrain' };
};

/**
 * Rate difficulty 1-5 based on elevation gain/loss per mile and surface type.
 */
const rateDifficulty = (gainPerMile, lossPerMile, surface) => {
  const totalVerticalPerMile = gainPerMile + lossPerMile;
  let rating = 1;

  if (totalVerticalPerMile > 600) rating = 5;
  else if (totalVerticalPerMile > 450) rating = 4;
  else if (totalVerticalPerMile > 300) rating = 3;
  else if (totalVerticalPerMile > 150) rating = 2;
  else rating = 1;

  // Bump difficulty for rocky/technical surfaces
  if (surface.toLowerCase().includes('steep') || surface.toLowerCase().includes('rocky')) {
    rating = Math.min(5, rating + 1);
  }

  return rating;
};

/**
 * Rate technicality 1-5 based on surface type and terrain description.
 */
const rateTechnicality = (surface, description) => {
  const text = `${surface} ${description}`.toLowerCase();
  if (text.includes('scrambling') || text.includes('steep rocky')) return 5;
  if (text.includes('technical') || text.includes('steep switchback')) return 4;
  if (text.includes('rocky') || text.includes('singletrack')) return 3;
  if (text.includes('jeep road') || text.includes('rolling')) return 2;
  if (text.includes('road') || text.includes('paved') || text.includes('runnable')) return 1;
  return 2;
};

/**
 * Build per-section terrain data between consecutive aid stations.
 * Each section spans from one aid station to the next.
 */
const buildSectionTerrain = () => {
  const sections = [];

  for (let i = 1; i < AID_STATIONS.length; i++) {
    const prev = AID_STATIONS[i - 1];
    const curr = AID_STATIONS[i];
    const startMile = prev.mile;
    const endMile = curr.mile;
    const distance = endMile - startMile;

    const { gain, loss } = computeGainLoss(startMile, endMile);
    const surfaceInfo = getSurfaceInfo(startMile, endMile);
    const gainPerMile = distance > 0 ? gain / distance : 0;
    const lossPerMile = distance > 0 ? loss / distance : 0;

    const difficulty = rateDifficulty(gainPerMile, lossPerMile, surfaceInfo.surface);
    const technicality = rateTechnicality(surfaceInfo.surface, surfaceInfo.description);

    sections.push({
      fromStation: prev.name,
      toStation: curr.name,
      startMile,
      endMile,
      distance: Math.round(distance * 10) / 10,
      elevationGain: gain,
      elevationLoss: loss,
      netElevation: gain - loss,
      startElevation: Math.round(elevationAtMile(startMile)),
      endElevation: Math.round(elevationAtMile(endMile)),
      difficulty,
      surfaceType: surfaceInfo.surface,
      description: surfaceInfo.description,
      technicality,
    });
  }

  return sections;
};

export const SECTION_TERRAIN = buildSectionTerrain();

export { elevationAtMile, computeGainLoss };
