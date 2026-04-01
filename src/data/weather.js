// Per-section weather data for the pacing engine.
// Derived from REQUIREMENTS.md section 8 "Typical Weather by Section".

export const SECTION_WEATHER = [
  {
    label: 'Start to Crown King',
    startMile: 0,
    endMile: 36.6,
    tempDayHigh: 95,
    tempDayLow: 85,
    tempNightHigh: 55,
    tempNightLow: 45,
    sunExposure: 'high',
    wind: 'low',
    terrain: 'Desert canyon, full sun exposure on ridges, low humidity',
  },
  {
    label: 'Crown King to Whiskey Row',
    startMile: 36.6,
    endMile: 75.7,
    tempDayHigh: 80,
    tempDayLow: 60,
    tempNightHigh: 50,
    tempNightLow: 40,
    sunExposure: 'moderate',
    wind: 'low',
    terrain: 'Bradshaw Mountains, elevation 5000-7000ft, possible afternoon thunderstorms',
  },
  {
    label: 'Whiskey Row to Mingus Mtn',
    startMile: 75.7,
    endMile: 106.8,
    tempDayHigh: 85,
    tempDayLow: 70,
    tempNightHigh: 50,
    tempNightLow: 35,
    sunExposure: 'moderate',
    wind: 'high',
    terrain: 'Prescott highlands, wind exposure on Mingus summit (7800ft), rapid weather shifts',
  },
  {
    label: 'Mingus to Dead Horse',
    startMile: 106.8,
    endMile: 132.5,
    tempDayHigh: 95,
    tempDayLow: 85,
    tempNightHigh: 55,
    tempNightLow: 45,
    sunExposure: 'high',
    wind: 'moderate',
    terrain: 'Verde Valley descent then climb, hot valley floor, afternoon thermal winds',
  },
  {
    label: 'Dead Horse to Sedona',
    startMile: 132.5,
    endMile: 158.8,
    tempDayHigh: 100,
    tempDayLow: 90,
    tempNightHigh: 55,
    tempNightLow: 45,
    sunExposure: 'high',
    wind: 'low',
    terrain: 'Red rock desert, extreme heat potential, radiant heat off rock, minimal shade',
  },
  {
    label: 'Sedona to Munds Park',
    startMile: 158.8,
    endMile: 189.6,
    tempDayHigh: 80,
    tempDayLow: 65,
    tempNightHigh: 45,
    tempNightLow: 35,
    sunExposure: 'moderate',
    wind: 'moderate',
    terrain: 'Climb from 4500ft to 6500ft, exposed ridgeline on Schnebly Hill, possible frost at night',
  },
  {
    label: 'Munds Park to Flagstaff',
    startMile: 189.6,
    endMile: 210.6,
    tempDayHigh: 75,
    tempDayLow: 65,
    tempNightHigh: 40,
    tempNightLow: 25,
    sunExposure: 'low',
    wind: 'low',
    terrain: 'Ponderosa pine forest, elevation 6800-7200ft, possible snow/freezing rain',
  },
  {
    label: 'Flagstaff to Finish',
    startMile: 210.6,
    endMile: 252.9,
    tempDayHigh: 75,
    tempDayLow: 65,
    tempNightHigh: 35,
    tempNightLow: 25,
    sunExposure: 'moderate',
    wind: 'moderate',
    terrain: 'High plateau then descent, exposed sections on Walnut Canyon rim, final descent into Flagstaff',
  },
];

/**
 * Get the weather data for a given mile marker.
 * Returns the section whose range contains the mile.
 */
export const getWeatherForMile = (mile) => {
  for (const section of SECTION_WEATHER) {
    if (mile >= section.startMile && mile <= section.endMile) {
      return section;
    }
  }
  // Default to last section if beyond range
  return SECTION_WEATHER[SECTION_WEATHER.length - 1];
};

/**
 * Estimate the temperature at a given mile and hour of day.
 * hour: 0-23 (0 = midnight, 12 = noon)
 * Returns estimated temperature in Fahrenheit.
 */
export const estimateTemp = (mile, hour) => {
  const weather = getWeatherForMile(mile);
  const isNight = hour < 5 || hour >= 20;
  const isDawnDusk = (hour >= 5 && hour < 7) || (hour >= 18 && hour < 20);

  if (isNight) {
    return (weather.tempNightHigh + weather.tempNightLow) / 2;
  }
  if (isDawnDusk) {
    // Transitional — average of night highs and day lows
    return (weather.tempNightHigh + weather.tempDayLow) / 2;
  }
  // Daytime — peak near 2 PM (hour 14)
  const dayMid = (weather.tempDayHigh + weather.tempDayLow) / 2;
  const amplitude = (weather.tempDayHigh - weather.tempDayLow) / 2;
  // Sinusoidal approximation peaking at hour 14
  const phase = ((hour - 14) / 12) * Math.PI;
  return dayMid + amplitude * Math.cos(phase);
};
