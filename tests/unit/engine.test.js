import { describe, it, expect } from 'vitest';
import {
  calculatePacing,
  DEFAULT_RUNNER_PROFILE,
  terrainMultiplier,
  heatMultiplier,
  nightMultiplier,
  fatigueMultiplier,
  sleepDebtMultiplier,
  packWeightMultiplier,
  getProjectedFinishHours,
  parseCutoff,
  formatDuration,
  formatTime,
  formatPace,
  getTimeOfDay,
} from '../../src/pacing/engine';
import { AID_STATIONS } from '../../src/data/aidStations';

describe('calculatePacing', () => {
  const results = calculatePacing();

  it('returns an array with one entry per aid station', () => {
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(AID_STATIONS.length);
  });

  it('arrival times are chronologically increasing', () => {
    for (let i = 1; i < results.length; i++) {
      expect(results[i].arrivalTime.getTime()).toBeGreaterThan(
        results[i - 1].arrivalTime.getTime()
      );
    }
  });

  it('all buffer-to-cutoff values are positive with default inputs', () => {
    const stationsWithCutoffs = results.filter((r) => r.bufferMinutes !== null);
    expect(stationsWithCutoffs.length).toBeGreaterThan(0);
    for (const r of stationsWithCutoffs) {
      expect(r.bufferMinutes).toBeGreaterThanOrEqual(0);
    }
  });

  it('projected finish is under 125 hours with default profile', () => {
    const finishHours = getProjectedFinishHours(results);
    expect(finishHours).not.toBeNull();
    expect(finishHours).toBeLessThan(125);
    expect(finishHours).toBeGreaterThan(0);
  });

  it('cumulative minutes are monotonically increasing', () => {
    for (let i = 1; i < results.length; i++) {
      expect(results[i].cumulativeMinutes).toBeGreaterThan(
        results[i - 1].cumulativeMinutes
      );
    }
  });

  it('first result is the start line at mile 0', () => {
    expect(results[0].mile).toBe(0);
    expect(results[0].stationName).toContain('Start');
  });

  it('last result is the finish at mile 252.9', () => {
    const last = results[results.length - 1];
    expect(last.mile).toBe(252.9);
    expect(last.stationName).toContain('FINISH');
  });
});

describe('terrainMultiplier', () => {
  it('returns 1.0 for null/undefined section', () => {
    expect(terrainMultiplier(null)).toBe(1.0);
    expect(terrainMultiplier(undefined)).toBe(1.0);
  });

  it('returns 1.0 for flat terrain with no elevation', () => {
    expect(
      terrainMultiplier({
        distance: 10,
        elevationGain: 0,
        elevationLoss: 0,
        technicality: 1,
      })
    ).toBe(1.0);
  });

  it('returns > 1 for steep sections with high elevation gain', () => {
    const mult = terrainMultiplier({
      distance: 5,
      elevationGain: 3000,
      elevationLoss: 500,
      technicality: 3,
    });
    expect(mult).toBeGreaterThan(1.0);
  });

  it('is capped at 2.5', () => {
    const mult = terrainMultiplier({
      distance: 1,
      elevationGain: 10000,
      elevationLoss: 0,
      technicality: 5,
    });
    expect(mult).toBeLessThanOrEqual(2.5);
  });
});

describe('heatMultiplier', () => {
  it('returns 1.0 for temps at or below 70F', () => {
    expect(heatMultiplier(70)).toBe(1.0);
    expect(heatMultiplier(60)).toBe(1.0);
    expect(heatMultiplier(50)).toBe(1.0);
  });

  it('returns > 1 for hot temps above 70F', () => {
    expect(heatMultiplier(90)).toBeGreaterThan(1.0);
    expect(heatMultiplier(100)).toBeGreaterThan(1.0);
  });

  it('increases with higher temperatures', () => {
    expect(heatMultiplier(100)).toBeGreaterThan(heatMultiplier(80));
  });

  it('returns 1.0 for null/undefined temp', () => {
    expect(heatMultiplier(null)).toBe(1.0);
    expect(heatMultiplier(undefined)).toBe(1.0);
  });
});

describe('nightMultiplier', () => {
  it('returns 1.0 for daytime', () => {
    expect(nightMultiplier('day', 2)).toBe(1.0);
  });

  it('returns > 1 for nighttime', () => {
    expect(nightMultiplier('night', 2)).toBeGreaterThan(1.0);
  });

  it('returns > 1 for dawn/dusk', () => {
    expect(nightMultiplier('dawn', 2)).toBeGreaterThan(1.0);
    expect(nightMultiplier('dusk', 2)).toBeGreaterThan(1.0);
  });

  it('night penalty increases with technicality', () => {
    expect(nightMultiplier('night', 5)).toBeGreaterThan(
      nightMultiplier('night', 1)
    );
  });
});

describe('fatigueMultiplier', () => {
  it('returns 1.0 for miles <= 50', () => {
    expect(fatigueMultiplier(0)).toBe(1.0);
    expect(fatigueMultiplier(25)).toBe(1.0);
    expect(fatigueMultiplier(50)).toBe(1.0);
  });

  it('increases with distance beyond mile 50', () => {
    expect(fatigueMultiplier(75)).toBeGreaterThan(fatigueMultiplier(50));
    expect(fatigueMultiplier(150)).toBeGreaterThan(fatigueMultiplier(75));
    expect(fatigueMultiplier(200)).toBeGreaterThan(fatigueMultiplier(150));
    expect(fatigueMultiplier(250)).toBeGreaterThan(fatigueMultiplier(200));
  });

  it('fatigue at mile 250 is significantly higher than at mile 100', () => {
    expect(fatigueMultiplier(250)).toBeGreaterThan(1.2);
    expect(fatigueMultiplier(100)).toBeLessThanOrEqual(1.05);
  });
});

describe('sleepDebtMultiplier', () => {
  it('returns 1.0 when awake <= 24 hours', () => {
    expect(sleepDebtMultiplier(24, 0)).toBe(1.0);
    expect(sleepDebtMultiplier(20, 0)).toBe(1.0);
  });

  it('returns > 1 when awake > 24 hours', () => {
    expect(sleepDebtMultiplier(30, 0)).toBeGreaterThan(1.0);
  });

  it('sleep reduces the penalty', () => {
    // 40 hours elapsed, 0 sleep vs 10 hours sleep
    expect(sleepDebtMultiplier(40, 0)).toBeGreaterThan(
      sleepDebtMultiplier(40, 10)
    );
  });
});

describe('packWeightMultiplier', () => {
  it('returns 1.0 for weight <= 10 lbs', () => {
    expect(packWeightMultiplier(10, false)).toBe(1.0);
    expect(packWeightMultiplier(8, true)).toBe(1.0);
  });

  it('returns > 1 for weight > 10 lbs', () => {
    expect(packWeightMultiplier(15, false)).toBeGreaterThan(1.0);
  });

  it('climbing penalty is higher than flat penalty', () => {
    expect(packWeightMultiplier(20, true)).toBeGreaterThan(
      packWeightMultiplier(20, false)
    );
  });
});

describe('parseCutoff', () => {
  it('parses a valid cutoff string', () => {
    const date = parseCutoff('Mon 5:00 AM');
    expect(date).toBeInstanceOf(Date);
    expect(date.getHours()).toBe(5);
    expect(date.getMinutes()).toBe(0);
  });

  it('returns null for null/empty input', () => {
    expect(parseCutoff(null)).toBeNull();
    expect(parseCutoff('')).toBeNull();
  });

  it('handles PM times correctly', () => {
    const date = parseCutoff('Tue 3:15 PM');
    expect(date.getHours()).toBe(15);
    expect(date.getMinutes()).toBe(15);
  });
});

describe('formatDuration', () => {
  it('formats minutes as H:MM', () => {
    expect(formatDuration(90)).toBe('1:30');
    expect(formatDuration(0)).toBe('0:00');
    expect(formatDuration(125)).toBe('2:05');
  });

  it('returns --:-- for null/NaN', () => {
    expect(formatDuration(null)).toBe('--:--');
    expect(formatDuration(NaN)).toBe('--:--');
  });
});

describe('formatPace', () => {
  it('formats pace as MM:SS per mile', () => {
    expect(formatPace(23.5)).toBe('23:30');
  });

  it('returns --:-- for null/NaN', () => {
    expect(formatPace(null)).toBe('--:--');
  });
});

describe('getTimeOfDay', () => {
  it('returns night for late hours', () => {
    const d = new Date(2026, 4, 4, 22, 0);
    expect(getTimeOfDay(d)).toBe('night');
  });

  it('returns day for midday', () => {
    const d = new Date(2026, 4, 4, 12, 0);
    expect(getTimeOfDay(d)).toBe('day');
  });

  it('returns dawn for early morning', () => {
    const d = new Date(2026, 4, 4, 6, 0);
    expect(getTimeOfDay(d)).toBe('dawn');
  });

  it('returns dusk for evening', () => {
    const d = new Date(2026, 4, 4, 19, 0);
    expect(getTimeOfDay(d)).toBe('dusk');
  });
});

describe('DEFAULT_RUNNER_PROFILE', () => {
  it('has expected properties', () => {
    expect(DEFAULT_RUNNER_PROFILE).toHaveProperty('basePace');
    expect(DEFAULT_RUNNER_PROFILE).toHaveProperty('targetFinishTime');
    expect(DEFAULT_RUNNER_PROFILE).toHaveProperty('packWeight');
    expect(DEFAULT_RUNNER_PROFILE).toHaveProperty('plannedSleepStops');
    expect(DEFAULT_RUNNER_PROFILE.basePace).toBe(15);
    expect(DEFAULT_RUNNER_PROFILE.targetFinishTime).toBe(100);
  });
});
