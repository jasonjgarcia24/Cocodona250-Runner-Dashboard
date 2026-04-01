import { formatDuration, formatTime, formatPace } from '../pacing/engine';

/**
 * Escape a CSV field value. Wraps in quotes if it contains commas, quotes, or newlines.
 */
const escapeCSV = (value) => {
  if (value == null) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

/**
 * Build a CSV row from an array of values.
 */
const csvRow = (values) => values.map(escapeCSV).join(',');

/**
 * Generate the full CSV content for backup.
 *
 * @param {Object} runnerProfile - { basePace, targetFinishTime, packWeight, plannedSleepStops }
 * @param {Array} pacingResults - Output from calculatePacing()
 * @param {Object} plans - Per-station overrides { [stationMile]: { timeAtStation, sleepDuration, notes } }
 * @returns {string} CSV content as a string
 */
export const generateCSV = (runnerProfile = {}, pacingResults = [], plans = {}) => {
  const lines = [];

  // ── Runner Profile Section ──────────────────────────────────────────────
  lines.push('## Runner Profile');
  lines.push(csvRow(['Field', 'Value']));
  lines.push(csvRow(['Base Pace (min/mile)', runnerProfile.basePace || '']));
  lines.push(csvRow(['Target Finish Time (hours)', runnerProfile.targetFinishTime || '']));
  lines.push(csvRow(['Pack Weight (lbs)', runnerProfile.packWeight || '']));

  // Planned sleep stops
  const sleepStops = runnerProfile.plannedSleepStops || [];
  lines.push(
    csvRow([
      'Planned Sleep Stops',
      sleepStops.length > 0
        ? sleepStops.map((s) => `${s.stationName || 'Mi ' + s.stationMile}: ${s.duration}min`).join('; ')
        : 'None',
    ]),
  );
  lines.push('');

  // ── Pacing Plan Section ─────────────────────────────────────────────────
  lines.push('## Pacing Plan');
  lines.push(
    csvRow([
      'Station',
      'Mile',
      'Leg Distance',
      'Elevation Gain',
      'Elevation Loss',
      'Net Elevation',
      'Station Elevation',
      'Terrain',
      'Target Pace',
      'Leg Time',
      'Arrival Time',
      'Time at Station (min)',
      'Sleep (min)',
      'Departure Time',
      'Cutoff',
      'Buffer (min)',
      'Cumulative Time',
      'Time of Day',
      'Crew',
      'Pacer',
      'Drop Bag',
    ]),
  );

  for (const r of pacingResults) {
    lines.push(
      csvRow([
        r.stationName,
        r.mile,
        r.legDistance || '',
        r.elevationGain || '',
        r.elevationLoss || '',
        r.netElevation || '',
        r.stationElevation || '',
        r.terrainDescription || '',
        r.targetPace > 0 ? formatPace(r.targetPace) : '',
        r.legTimeMinutes > 0 ? formatDuration(r.legTimeMinutes) : '',
        r.arrivalTime ? formatTime(r.arrivalTime) : '',
        r.timeAtStation || 0,
        r.sleepDuration || 0,
        r.departureTime ? formatTime(r.departureTime) : '',
        r.cutoff || '',
        r.bufferMinutes != null ? r.bufferMinutes : '',
        r.cumulativeMinutes > 0 ? formatDuration(r.cumulativeMinutes) : '',
        r.timeOfDay || '',
        r.crew ? 'Yes' : 'No',
        r.pacerNote === 'NO PACERS' ? 'NO PACERS' : r.pacer ? 'Yes' : 'No',
        r.dropBag ? 'Yes' : 'No',
      ]),
    );
  }
  lines.push('');

  // ── Aid Station Notes Section ───────────────────────────────────────────
  lines.push('## Aid Station Notes');
  lines.push(csvRow(['Station', 'Mile', 'Notes']));

  for (const r of pacingResults) {
    const planData = plans[r.mile];
    const notes = r.notes || planData?.notes || '';
    if (notes) {
      lines.push(csvRow([r.stationName, r.mile, notes]));
    }
  }
  lines.push('');

  // ── Crew/Pacer Assignments Section ──────────────────────────────────────
  lines.push('## Crew/Pacer Assignments');
  lines.push(csvRow(['Station', 'Mile', 'Crew Access', 'Pacer Allowed', 'Drop Bag', 'Sleep Available']));

  for (const r of pacingResults) {
    if (r.crew || r.pacer || r.dropBag) {
      lines.push(
        csvRow([
          r.stationName,
          r.mile,
          r.crew ? 'Yes' : 'No',
          r.pacerNote === 'NO PACERS' ? 'NO PACERS' : r.pacer ? 'Yes' : 'No',
          r.dropBag ? 'Yes' : 'No',
          r.sleepPlan || '--',
        ]),
      );
    }
  }

  return lines.join('\n');
};

/**
 * Download the backup CSV file.
 * Triggers a browser download of the CSV file.
 *
 * @param {Object} runnerProfile
 * @param {Array} pacingResults
 * @param {Object} plans
 */
export const downloadBackupCSV = (runnerProfile, pacingResults, plans) => {
  const csv = generateCSV(runnerProfile, pacingResults, plans);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const now = new Date();
  const dateStr = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-');

  const filename = `cocodona250-backup-${dateStr}.csv`;

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();

  // Cleanup
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
};
