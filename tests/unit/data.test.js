import { describe, it, expect } from 'vitest';
import { AID_STATIONS } from '../../src/data/aidStations';
import { ELEV_PTS, ELEV_MIN, ELEV_MAX } from '../../src/data/routeCoords';

describe('AID_STATIONS', () => {
  it('has 27 aid stations', () => {
    expect(AID_STATIONS.length).toBe(27);
  });

  it('mile markers are monotonically increasing', () => {
    for (let i = 1; i < AID_STATIONS.length; i++) {
      expect(AID_STATIONS[i].mile).toBeGreaterThan(AID_STATIONS[i - 1].mile);
    }
  });

  it('first station is at mile 0', () => {
    expect(AID_STATIONS[0].mile).toBe(0);
  });

  it('last station is at mile 252.9', () => {
    expect(AID_STATIONS[AID_STATIONS.length - 1].mile).toBe(252.9);
  });

  it('all stations have required properties', () => {
    for (const station of AID_STATIONS) {
      expect(station).toHaveProperty('name');
      expect(station).toHaveProperty('mile');
      expect(typeof station.name).toBe('string');
      expect(typeof station.mile).toBe('number');
    }
  });

  it('first station name includes Start', () => {
    expect(AID_STATIONS[0].name).toContain('Start');
  });

  it('last station name includes FINISH', () => {
    expect(AID_STATIONS[AID_STATIONS.length - 1].name).toContain('FINISH');
  });
});

describe('ELEV_PTS', () => {
  it('has entries', () => {
    expect(ELEV_PTS.length).toBeGreaterThan(0);
  });

  it('each entry is a [mile, elevation] pair', () => {
    for (const pt of ELEV_PTS) {
      expect(Array.isArray(pt)).toBe(true);
      expect(pt.length).toBe(2);
      expect(typeof pt[0]).toBe('number');
      expect(typeof pt[1]).toBe('number');
    }
  });

  it('mile markers are monotonically increasing', () => {
    for (let i = 1; i < ELEV_PTS.length; i++) {
      expect(ELEV_PTS[i][0]).toBeGreaterThan(ELEV_PTS[i - 1][0]);
    }
  });

  it('starts at mile 0', () => {
    expect(ELEV_PTS[0][0]).toBe(0);
  });

  it('ends near mile 252.9', () => {
    const lastMile = ELEV_PTS[ELEV_PTS.length - 1][0];
    expect(lastMile).toBeGreaterThanOrEqual(252);
    expect(lastMile).toBeLessThanOrEqual(253);
  });

  it('ELEV_MIN and ELEV_MAX are reasonable', () => {
    expect(ELEV_MIN).toBeGreaterThan(0);
    expect(ELEV_MAX).toBeGreaterThan(ELEV_MIN);
    // Elevations in Arizona course: roughly 1600ft to 7800ft
    expect(ELEV_MIN).toBeGreaterThanOrEqual(1000);
    expect(ELEV_MAX).toBeLessThanOrEqual(10000);
  });

  it('all elevation values fall within ELEV_MIN and ELEV_MAX', () => {
    for (const [, elev] of ELEV_PTS) {
      expect(elev).toBeGreaterThanOrEqual(ELEV_MIN);
      expect(elev).toBeLessThanOrEqual(ELEV_MAX);
    }
  });
});
