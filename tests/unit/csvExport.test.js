import { describe, it, expect } from 'vitest';
import { generateCSV } from '../../src/export/csvExport';
import { calculatePacing, DEFAULT_RUNNER_PROFILE } from '../../src/pacing/engine';

describe('generateCSV', () => {
  const pacingResults = calculatePacing();
  const csv = generateCSV(DEFAULT_RUNNER_PROFILE, pacingResults, {});

  it('produces a non-empty string', () => {
    expect(typeof csv).toBe('string');
    expect(csv.length).toBeGreaterThan(0);
  });

  it('contains the Runner Profile section header', () => {
    expect(csv).toContain('## Runner Profile');
  });

  it('contains the Pacing Plan section header', () => {
    expect(csv).toContain('## Pacing Plan');
  });

  it('contains the Aid Station Notes section header', () => {
    expect(csv).toContain('## Aid Station Notes');
  });

  it('contains the Crew/Pacer Assignments section header', () => {
    expect(csv).toContain('## Crew/Pacer Assignments');
  });

  it('contains the correct number of pacing data rows', () => {
    // The Pacing Plan section has a header row + one data row per station.
    // We count rows between "## Pacing Plan" and the next "##" section.
    const lines = csv.split('\n');
    const pacingStart = lines.findIndex((l) => l === '## Pacing Plan');
    // Next section marker after pacing (skip the pacing header itself)
    let pacingEnd = lines.findIndex(
      (l, idx) => idx > pacingStart + 1 && l.startsWith('##')
    );
    if (pacingEnd === -1) pacingEnd = lines.length;

    // Between start+1 (column header) and pacingEnd, we have data rows.
    // There's also an empty line before the next section.
    const dataRows = lines
      .slice(pacingStart + 2, pacingEnd)
      .filter((l) => l.trim().length > 0);

    // Should have one row per pacing result (= 27 aid stations)
    expect(dataRows.length).toBe(pacingResults.length);
  });

  it('contains runner profile field values', () => {
    expect(csv).toContain('Base Pace (min/mile)');
    expect(csv).toContain('Target Finish Time (hours)');
    expect(csv).toContain('Pack Weight (lbs)');
    expect(csv).toContain(String(DEFAULT_RUNNER_PROFILE.basePace));
  });

  it('contains station names in the pacing data', () => {
    expect(csv).toContain('Start Line');
    expect(csv).toContain('FINISH');
  });
});
