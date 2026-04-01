import { useState, useMemo, useCallback } from 'react';
import { T } from '../tokens';
import { Card, SectionLabel } from './Card';
import { Icon } from './Icon';
import { calculatePacing, formatDuration, formatTime, formatPace, getProjectedFinishHours, getCutoffWarnings } from '../pacing/engine';
import { downloadBackupCSV } from '../export/csvExport';

const styles = {
  tableWrapper: {
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: 12,
    border: `1px solid ${T.cardBorder}`,
    background: T.cardBg,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
  },
  th: {
    padding: '8px 6px',
    textAlign: 'left',
    fontWeight: 700,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: T.textSecondary,
    borderBottom: `2px solid ${T.cardBorder}`,
    position: 'sticky',
    top: 0,
    background: T.cardBgSolid,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    userSelect: 'none',
  },
  td: {
    padding: '6px 6px',
    borderBottom: `1px solid ${T.innerBorder}`,
    verticalAlign: 'top',
    whiteSpace: 'nowrap',
  },
  editableCell: {
    background: 'rgba(255,255,255,0.15)',
    borderRadius: 4,
    cursor: 'text',
    minWidth: 40,
  },
  input: {
    border: 'none',
    background: 'rgba(255,255,255,0.25)',
    borderRadius: 4,
    padding: '2px 4px',
    fontSize: 11,
    fontFamily: "'Inter', sans-serif",
    color: T.textPrimary,
    width: '100%',
    outline: 'none',
  },
  filterBar: {
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap',
    marginBottom: 12,
    alignItems: 'center',
    fontFamily: "'Inter', sans-serif",
  },
  filterBtn: {
    padding: '4px 10px',
    borderRadius: 8,
    fontSize: 11,
    fontWeight: 600,
    border: `1px solid ${T.cardBorder}`,
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  summaryCards: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  summaryCard: {
    padding: '10px 16px',
    borderRadius: 10,
    background: T.cardBg,
    border: `1px solid ${T.cardBorder}`,
    textAlign: 'center',
    minWidth: 100,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 700,
    fontFamily: "'Georgia', serif",
    color: T.accentLight,
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: T.textSecondary,
    marginTop: 2,
    fontFamily: "'Inter', sans-serif",
  },
  downloadBtn: {
    padding: '8px 16px',
    borderRadius: 8,
    background: T.accent,
    color: '#f5efe0',
    border: 'none',
    fontSize: 12,
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    cursor: 'pointer',
    letterSpacing: '0.02em',
  },
};

/**
 * Color code for cutoff buffer: green (>60min), yellow (30-60), red (<30).
 */
const bufferColor = (minutes) => {
  if (minutes == null) return T.textMuted;
  if (minutes < 0) return '#dc2626';
  if (minutes < 30) return T.red;
  if (minutes < 60) return T.orange;
  return T.green;
};

const bufferBg = (minutes) => {
  if (minutes == null) return 'transparent';
  if (minutes < 0) return 'rgba(220, 38, 38, 0.15)';
  if (minutes < 30) return T.redDark;
  if (minutes < 60) return T.orangeDark;
  return T.greenDark;
};

const FILTERS = [
  { key: 'all', label: 'All Stations' },
  { key: 'crew', label: 'Crew' },
  { key: 'pacer', label: 'Pacer' },
  { key: 'drop', label: 'Drop Bag' },
  { key: 'sleep', label: 'Sleep' },
  { key: 'warnings', label: 'Cutoff Warnings' },
];

export default function RaceSummaryTab({ plans = {}, onPlanChange, runnerProfile }) {
  const [filter, setFilter] = useState('all');
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  // Calculate pacing results
  const pacingResults = useMemo(
    () => calculatePacing(runnerProfile, plans),
    [runnerProfile, plans],
  );

  const projectedFinish = useMemo(() => getProjectedFinishHours(pacingResults), [pacingResults]);
  const cutoffWarnings = useMemo(() => getCutoffWarnings(pacingResults), [pacingResults]);

  // Filter results
  const filteredResults = useMemo(() => {
    return pacingResults.filter((r) => {
      if (filter === 'crew') return r.crew;
      if (filter === 'pacer') return r.pacer;
      if (filter === 'drop') return r.dropBag;
      if (filter === 'sleep') return r.sleepPlan || r.sleepDuration > 0;
      if (filter === 'warnings') return r.bufferMinutes !== null && r.bufferMinutes < 60;
      return true;
    });
  }, [pacingResults, filter]);

  // Sort results
  const sortedResults = useMemo(() => {
    if (!sortCol) return filteredResults;
    const sorted = [...filteredResults].sort((a, b) => {
      const va = a[sortCol];
      const vb = b[sortCol];
      if (va == null && vb == null) return 0;
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === 'number' && typeof vb === 'number') return va - vb;
      if (va instanceof Date && vb instanceof Date) return va.getTime() - vb.getTime();
      return String(va).localeCompare(String(vb));
    });
    return sortDir === 'desc' ? sorted.reverse() : sorted;
  }, [filteredResults, sortCol, sortDir]);

  const handleSort = (col) => {
    if (sortCol === col) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortCol(col);
      setSortDir('asc');
    }
  };

  const handleCellEdit = useCallback(
    (mile, field, value) => {
      if (!onPlanChange) return;
      const existing = plans[mile] || {};
      const numVal = parseFloat(value);

      if (field === 'timeAtStation' || field === 'sleepDuration') {
        onPlanChange(mile, { ...existing, [field]: isNaN(numVal) ? 0 : numVal });
      } else {
        onPlanChange(mile, { ...existing, [field]: value });
      }
    },
    [onPlanChange, plans],
  );

  const handleDownload = () => {
    downloadBackupCSV(runnerProfile, pacingResults, plans);
  };

  const sortIndicator = (col) => {
    if (sortCol !== col) return '';
    return sortDir === 'asc' ? ' \u25B2' : ' \u25BC';
  };

  return (
    <div>
      <SectionLabel>Race Summary</SectionLabel>

      {/* Summary cards */}
      <div style={styles.summaryCards}>
        <div style={styles.summaryCard}>
          <div style={styles.summaryValue}>{projectedFinish ? `${projectedFinish}h` : '--'}</div>
          <div style={styles.summaryLabel}>Projected Finish</div>
        </div>
        <div style={styles.summaryCard}>
          <div style={{ ...styles.summaryValue, color: cutoffWarnings.length > 0 ? T.red : T.green }}>
            {cutoffWarnings.length}
          </div>
          <div style={styles.summaryLabel}>Cutoff Warnings</div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryValue}>
            {pacingResults.reduce((sum, r) => sum + (r.sleepDuration || 0), 0)} min
          </div>
          <div style={styles.summaryLabel}>Total Sleep</div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryValue}>
            {pacingResults.reduce((sum, r) => sum + (r.timeAtStation || 0), 0)} min
          </div>
          <div style={styles.summaryLabel}>Total Aid Time</div>
        </div>
      </div>

      {/* Filters and export */}
      <div style={{ ...styles.filterBar, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                ...styles.filterBtn,
                background: filter === f.key ? T.accent : 'transparent',
                color: filter === f.key ? '#f5efe0' : T.textPrimary,
              }}
            >
              {f.label}
              {f.key === 'warnings' && cutoffWarnings.length > 0 && (
                <span style={{ marginLeft: 4, color: filter === f.key ? '#fca5a5' : T.red }}>
                  ({cutoffWarnings.length})
                </span>
              )}
            </button>
          ))}
        </div>
        <button onClick={handleDownload} style={styles.downloadBtn}>
          Download CSV
        </button>
      </div>

      {/* Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th} onClick={() => handleSort('stationName')}>
                Station{sortIndicator('stationName')}
              </th>
              <th style={styles.th} onClick={() => handleSort('mile')}>
                Mile{sortIndicator('mile')}
              </th>
              <th style={styles.th} onClick={() => handleSort('legDistance')}>
                Leg{sortIndicator('legDistance')}
              </th>
              <th style={styles.th} onClick={() => handleSort('elevationGain')}>
                Gain{sortIndicator('elevationGain')}
              </th>
              <th style={styles.th} onClick={() => handleSort('elevationLoss')}>
                Loss{sortIndicator('elevationLoss')}
              </th>
              <th style={styles.th}>Elev</th>
              <th style={styles.th}>Terrain</th>
              <th style={styles.th} onClick={() => handleSort('targetPace')}>
                Pace{sortIndicator('targetPace')}
              </th>
              <th style={styles.th}>Leg Time</th>
              <th style={styles.th} onClick={() => handleSort('arrivalTime')}>
                Arrival{sortIndicator('arrivalTime')}
              </th>
              <th style={styles.th}>Stop</th>
              <th style={styles.th}>Departure</th>
              <th style={styles.th}>Cutoff</th>
              <th style={styles.th} onClick={() => handleSort('bufferMinutes')}>
                Buffer{sortIndicator('bufferMinutes')}
              </th>
              <th style={styles.th}>Elapsed</th>
              <th style={styles.th}>ToD</th>
              <th style={styles.th}>Crew</th>
              <th style={styles.th}>Pacer</th>
              <th style={styles.th}>Drop</th>
              <th style={styles.th}>Sleep</th>
              <th style={styles.th}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map((r) => (
              <tr
                key={r.stationIndex}
                style={{
                  background:
                    r.bufferMinutes !== null && r.bufferMinutes < 0
                      ? 'rgba(220, 38, 38, 0.08)'
                      : 'transparent',
                }}
              >
                <td
                  style={{
                    ...styles.td,
                    fontWeight: 600,
                    color: T.textPrimary,
                    maxWidth: 140,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  title={r.stationName}
                >
                  {r.stationName}
                </td>
                <td style={{ ...styles.td, color: T.accentLight, fontWeight: 600 }}>
                  {r.mile}
                </td>
                <td style={styles.td}>{r.legDistance > 0 ? r.legDistance : '--'}</td>
                <td style={{ ...styles.td, color: T.green }}>
                  {r.elevationGain > 0 ? `+${r.elevationGain}` : '--'}
                </td>
                <td style={{ ...styles.td, color: T.red }}>
                  {r.elevationLoss > 0 ? `-${r.elevationLoss}` : '--'}
                </td>
                <td style={styles.td}>
                  {r.stationElevation > 0 ? `${r.stationElevation}'` : '--'}
                </td>
                <td
                  style={{
                    ...styles.td,
                    maxWidth: 120,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: 10,
                    color: T.textMuted,
                  }}
                  title={r.terrainDescription}
                >
                  {r.terrainDescription || '--'}
                </td>
                <td style={{ ...styles.td, fontWeight: 600 }}>
                  {r.targetPace > 0 ? formatPace(r.targetPace) : '--'}
                </td>
                <td style={styles.td}>
                  {r.legTimeMinutes > 0 ? formatDuration(r.legTimeMinutes) : '--'}
                </td>
                <td style={{ ...styles.td, fontWeight: 600 }}>{formatTime(r.arrivalTime)}</td>
                <td style={{ ...styles.td, ...styles.editableCell }}>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    value={r.timeAtStation || 0}
                    onChange={(e) => handleCellEdit(r.mile, 'timeAtStation', e.target.value)}
                    style={{ ...styles.input, width: 40 }}
                    title="Minutes at station"
                  />
                </td>
                <td style={styles.td}>{formatTime(r.departureTime)}</td>
                <td style={{ ...styles.td, fontSize: 10, color: T.textMuted }}>
                  {r.cutoff || '--'}
                </td>
                <td
                  style={{
                    ...styles.td,
                    fontWeight: 700,
                    color: bufferColor(r.bufferMinutes),
                    background: bufferBg(r.bufferMinutes),
                    borderRadius: 4,
                    textAlign: 'center',
                  }}
                >
                  {r.bufferMinutes != null ? `${r.bufferMinutes}m` : '--'}
                </td>
                <td style={styles.td}>{formatDuration(r.cumulativeMinutes)}</td>
                <td style={styles.td}>
                  <TimeOfDayBadge tod={r.timeOfDay} />
                </td>
                <td style={{ ...styles.td, textAlign: 'center' }}>
                  {r.crew ? (
                    <span style={{ color: T.sky }}>
                      <Icon name="check" size={12} />
                    </span>
                  ) : (
                    <span style={{ color: T.textMuted }}>--</span>
                  )}
                </td>
                <td style={{ ...styles.td, textAlign: 'center' }}>
                  {r.pacerNote === 'NO PACERS' ? (
                    <span style={{ color: T.red, fontSize: 9, fontWeight: 700 }}>NO</span>
                  ) : r.pacer ? (
                    <span style={{ color: T.violet }}>
                      <Icon name="check" size={12} />
                    </span>
                  ) : (
                    <span style={{ color: T.textMuted }}>--</span>
                  )}
                </td>
                <td style={{ ...styles.td, textAlign: 'center' }}>
                  {r.dropBag ? (
                    <span style={{ color: T.sandy }}>
                      <Icon name="check" size={12} />
                    </span>
                  ) : (
                    <span style={{ color: T.textMuted }}>--</span>
                  )}
                </td>
                <td style={{ ...styles.td, ...styles.editableCell }}>
                  <input
                    type="number"
                    min="0"
                    max="480"
                    value={r.sleepDuration || 0}
                    onChange={(e) => handleCellEdit(r.mile, 'sleepDuration', e.target.value)}
                    style={{ ...styles.input, width: 40 }}
                    title="Sleep minutes"
                  />
                </td>
                <td style={{ ...styles.td, ...styles.editableCell }}>
                  <input
                    type="text"
                    value={r.notes || ''}
                    onChange={(e) => handleCellEdit(r.mile, 'notes', e.target.value)}
                    style={{ ...styles.input, width: 80 }}
                    placeholder="..."
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Print-friendly note */}
      <div
        style={{
          marginTop: 12,
          fontSize: 10,
          color: T.textMuted,
          fontFamily: "'Inter', sans-serif",
          textAlign: 'center',
        }}
      >
        Tip: Use Ctrl+P / Cmd+P to print this table. The layout is optimized for landscape printing.
      </div>
    </div>
  );
}

/**
 * Small badge showing time-of-day.
 */
function TimeOfDayBadge({ tod }) {
  const config = {
    night: { bg: 'rgba(30, 40, 80, 0.3)', color: '#6b7ec7', label: 'Night' },
    dawn: { bg: 'rgba(255, 180, 60, 0.2)', color: '#b07820', label: 'Dawn' },
    dusk: { bg: 'rgba(200, 100, 40, 0.2)', color: '#a05020', label: 'Dusk' },
    day: { bg: 'rgba(255, 220, 80, 0.2)', color: '#8a6010', label: 'Day' },
  };
  const c = config[tod] || config.day;
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '1px 5px',
        borderRadius: 4,
        fontSize: 9,
        fontWeight: 700,
        background: c.bg,
        color: c.color,
        textTransform: 'uppercase',
        letterSpacing: '0.03em',
      }}
    >
      {c.label}
    </span>
  );
}
