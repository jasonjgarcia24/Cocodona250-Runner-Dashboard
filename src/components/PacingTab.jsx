import { useState, useMemo } from 'react';
import { T } from '../tokens';
import { Card, SectionLabel } from './Card';
import { AID_STATIONS } from '../data/aidStations';
import {
  calculatePacing,
  formatDuration,
  formatTime,
  formatPace,
  getProjectedFinishHours,
  getCutoffWarnings,
  DEFAULT_RUNNER_PROFILE,
} from '../pacing/engine';

const styles = {
  form: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 16,
    marginBottom: 20,
  },
  fieldGroup: {
    padding: 16,
    borderRadius: 10,
    background: T.innerCard,
    border: `1px solid ${T.innerBorder}`,
  },
  label: {
    display: 'block',
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: T.textSecondary,
    marginBottom: 6,
    fontFamily: "'Inter', sans-serif",
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '8px 10px',
    borderRadius: 8,
    border: `1px solid ${T.cardBorder}`,
    background: 'rgba(255,255,255,0.3)',
    fontSize: 14,
    fontFamily: "'Georgia', serif",
    color: T.textPrimary,
    outline: 'none',
  },
  hint: {
    fontSize: 10,
    color: T.textMuted,
    marginTop: 4,
    fontFamily: "'Inter', sans-serif",
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: 10,
    marginBottom: 20,
  },
  summaryCard: {
    padding: '12px 16px',
    borderRadius: 10,
    background: T.cardBg,
    border: `1px solid ${T.cardBorder}`,
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: 22,
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
  sleepSection: {
    padding: 16,
    borderRadius: 10,
    background: T.innerCard,
    border: `1px solid ${T.innerBorder}`,
    marginBottom: 16,
  },
  sleepRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  select: {
    padding: '6px 8px',
    borderRadius: 6,
    border: `1px solid ${T.cardBorder}`,
    background: 'rgba(255,255,255,0.3)',
    fontSize: 12,
    fontFamily: "'Inter', sans-serif",
    color: T.textPrimary,
    outline: 'none',
  },
  addBtn: {
    padding: '6px 14px',
    borderRadius: 6,
    border: `1px solid ${T.cardBorder}`,
    background: T.greenDark,
    color: T.green,
    fontSize: 11,
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    cursor: 'pointer',
  },
  removeBtn: {
    padding: '4px 10px',
    borderRadius: 6,
    border: 'none',
    background: T.redDark,
    color: T.red,
    fontSize: 10,
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    cursor: 'pointer',
  },
  multiplierBar: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    marginTop: 16,
  },
  multiplierChip: {
    padding: '4px 10px',
    borderRadius: 6,
    fontSize: 10,
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    background: T.innerCard,
    border: `1px solid ${T.innerBorder}`,
    color: T.textSecondary,
  },
};

// Stations that have sleep facilities
const SLEEP_STATIONS = AID_STATIONS.filter((s) => s.sleep);

export default function PacingTab({ runnerProfile, onProfileChange }) {
  const profile = { ...DEFAULT_RUNNER_PROFILE, ...runnerProfile };

  // Local state for sleep stop editing
  const [newSleepStation, setNewSleepStation] = useState(
    SLEEP_STATIONS.length > 0 ? SLEEP_STATIONS[0].mile : 0,
  );
  const [newSleepDuration, setNewSleepDuration] = useState(30);

  // Calculate pacing preview
  const pacingResults = useMemo(() => calculatePacing(profile), [profile]);
  const projectedFinish = useMemo(() => getProjectedFinishHours(pacingResults), [pacingResults]);
  const cutoffWarnings = useMemo(() => getCutoffWarnings(pacingResults), [pacingResults]);

  const handleChange = (field, value) => {
    if (!onProfileChange) return;
    const numVal = parseFloat(value);
    onProfileChange({ ...profile, [field]: isNaN(numVal) ? value : numVal });
  };

  const addSleepStop = () => {
    if (!onProfileChange) return;
    const existing = profile.plannedSleepStops || [];
    // Avoid duplicates at the same station
    if (existing.some((s) => s.stationMile === newSleepStation)) return;
    const station = AID_STATIONS.find((s) => s.mile === newSleepStation);
    onProfileChange({
      ...profile,
      plannedSleepStops: [
        ...existing,
        { stationMile: newSleepStation, stationName: station?.name || '', duration: newSleepDuration },
      ].sort((a, b) => a.stationMile - b.stationMile),
    });
  };

  const removeSleepStop = (mile) => {
    if (!onProfileChange) return;
    onProfileChange({
      ...profile,
      plannedSleepStops: (profile.plannedSleepStops || []).filter((s) => s.stationMile !== mile),
    });
  };

  const updateSleepDuration = (mile, duration) => {
    if (!onProfileChange) return;
    onProfileChange({
      ...profile,
      plannedSleepStops: (profile.plannedSleepStops || []).map((s) =>
        s.stationMile === mile ? { ...s, duration: parseInt(duration, 10) || 0 } : s,
      ),
    });
  };

  const totalSleepMinutes = (profile.plannedSleepStops || []).reduce((sum, s) => sum + s.duration, 0);

  // Average multipliers from pacing results (skip start line)
  const avgMultipliers = useMemo(() => {
    const withMult = pacingResults.filter((r) => r.multipliers);
    if (withMult.length === 0) return null;
    const keys = ['terrain', 'heat', 'night', 'fatigue', 'sleepDebt', 'packWeight'];
    const avgs = {};
    for (const key of keys) {
      avgs[key] = Math.round((withMult.reduce((s, r) => s + (r.multipliers[key] || 1), 0) / withMult.length) * 1000) / 1000;
    }
    return avgs;
  }, [pacingResults]);

  return (
    <div>
      <SectionLabel>Pacing Calculator</SectionLabel>

      {/* Input form */}
      <Card>
        <div style={{ padding: 16 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: T.textPrimary,
              marginBottom: 12,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Runner Profile
          </div>

          <div style={styles.form}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Base Pace (min/mile)</label>
              <input
                type="number"
                min="10"
                max="30"
                step="0.5"
                value={profile.basePace}
                onChange={(e) => handleChange('basePace', e.target.value)}
                style={styles.input}
              />
              <div style={styles.hint}>Flat-trail pace (e.g., 15 for a 100h target)</div>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Target Finish (hours)</label>
              <input
                type="number"
                min="60"
                max="125"
                step="1"
                value={profile.targetFinishTime}
                onChange={(e) => handleChange('targetFinishTime', e.target.value)}
                style={styles.input}
              />
              <div style={styles.hint}>Race cutoff is 125 hours</div>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Pack Weight (lbs)</label>
              <input
                type="number"
                min="5"
                max="30"
                step="0.5"
                value={profile.packWeight}
                onChange={(e) => handleChange('packWeight', e.target.value)}
                style={styles.input}
              />
              <div style={styles.hint}>Average carry weight (base 10 lbs neutral)</div>
            </div>
          </div>

          {/* Sleep Stops */}
          <div style={styles.sleepSection}>
            <div style={styles.label}>Planned Sleep Stops</div>

            {(profile.plannedSleepStops || []).map((stop) => (
              <div key={stop.stationMile} style={styles.sleepRow}>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: T.textPrimary,
                    minWidth: 160,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {stop.stationName || `Mile ${stop.stationMile}`}
                  <span style={{ color: T.textMuted, fontWeight: 400, marginLeft: 4 }}>
                    (mi {stop.stationMile})
                  </span>
                </span>
                <input
                  type="number"
                  min="15"
                  max="480"
                  step="15"
                  value={stop.duration}
                  onChange={(e) => updateSleepDuration(stop.stationMile, e.target.value)}
                  style={{ ...styles.input, width: 70 }}
                />
                <span style={{ fontSize: 10, color: T.textMuted, fontFamily: "'Inter', sans-serif" }}>
                  min
                </span>
                <button onClick={() => removeSleepStop(stop.stationMile)} style={styles.removeBtn}>
                  Remove
                </button>
              </div>
            ))}

            <div style={{ ...styles.sleepRow, marginTop: 10 }}>
              <select
                value={newSleepStation}
                onChange={(e) => setNewSleepStation(parseFloat(e.target.value))}
                style={styles.select}
              >
                {SLEEP_STATIONS.map((s) => (
                  <option key={s.mile} value={s.mile}>
                    {s.name} (mi {s.mile}) - {s.sleep}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="15"
                max="480"
                step="15"
                value={newSleepDuration}
                onChange={(e) => setNewSleepDuration(parseInt(e.target.value, 10) || 30)}
                style={{ ...styles.input, width: 70 }}
              />
              <span style={{ fontSize: 10, color: T.textMuted, fontFamily: "'Inter', sans-serif" }}>
                min
              </span>
              <button onClick={addSleepStop} style={styles.addBtn}>
                + Add Stop
              </button>
            </div>

            <div style={{ ...styles.hint, marginTop: 8 }}>
              Total planned sleep: <strong>{totalSleepMinutes} min ({(totalSleepMinutes / 60).toFixed(1)}h)</strong>
            </div>
          </div>
        </div>
      </Card>

      {/* Pacing Summary */}
      <div style={{ marginTop: 20 }}>
        <SectionLabel>Pacing Summary</SectionLabel>

        <div style={styles.summaryGrid}>
          <div style={styles.summaryCard}>
            <div style={styles.summaryValue}>{projectedFinish ? `${projectedFinish}h` : '--'}</div>
            <div style={styles.summaryLabel}>Projected Finish</div>
          </div>
          <div style={styles.summaryCard}>
            <div
              style={{
                ...styles.summaryValue,
                color: projectedFinish && projectedFinish <= 125 ? T.green : T.red,
              }}
            >
              {projectedFinish
                ? projectedFinish <= 125
                  ? `${Math.round(125 - projectedFinish)}h buffer`
                  : 'OVER CUTOFF'
                : '--'}
            </div>
            <div style={styles.summaryLabel}>vs. 125h Cutoff</div>
          </div>
          <div style={styles.summaryCard}>
            <div style={{ ...styles.summaryValue, color: cutoffWarnings.length > 0 ? T.red : T.green }}>
              {cutoffWarnings.length}
            </div>
            <div style={styles.summaryLabel}>Station Cutoff Warnings</div>
          </div>
          <div style={styles.summaryCard}>
            <div style={styles.summaryValue}>{formatPace(profile.basePace)}</div>
            <div style={styles.summaryLabel}>Base Pace</div>
          </div>
          <div style={styles.summaryCard}>
            <div style={styles.summaryValue}>{totalSleepMinutes} min</div>
            <div style={styles.summaryLabel}>Planned Sleep</div>
          </div>
          <div style={styles.summaryCard}>
            <div style={styles.summaryValue}>{profile.packWeight} lbs</div>
            <div style={styles.summaryLabel}>Pack Weight</div>
          </div>
        </div>

        {/* Average multiplier breakdown */}
        {avgMultipliers && (
          <Card>
            <div style={{ padding: 12 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: T.textSecondary,
                  marginBottom: 8,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Average Multipliers
              </div>
              <div style={styles.multiplierBar}>
                {[
                  { key: 'terrain', label: 'Terrain' },
                  { key: 'heat', label: 'Heat' },
                  { key: 'night', label: 'Night' },
                  { key: 'fatigue', label: 'Fatigue' },
                  { key: 'sleepDebt', label: 'Sleep Debt' },
                  { key: 'packWeight', label: 'Pack Wt' },
                ].map(({ key, label }) => (
                  <span key={key} style={styles.multiplierChip}>
                    {label}: <strong style={{ color: avgMultipliers[key] > 1.1 ? T.orange : T.textPrimary }}>
                      {avgMultipliers[key]}x
                    </strong>
                  </span>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Cutoff warnings list */}
        {cutoffWarnings.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <Card>
              <div style={{ padding: 12 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: T.red,
                    marginBottom: 8,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Cutoff Warnings
                </div>
                {cutoffWarnings.map((w) => (
                  <div
                    key={w.stationIndex}
                    style={{
                      padding: '6px 10px',
                      marginBottom: 4,
                      borderRadius: 6,
                      background: T.redDark,
                      fontSize: 11,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <strong style={{ color: T.red }}>{w.stationName}</strong>{' '}
                    <span style={{ color: T.textSecondary }}>
                      (mi {w.mile}) — Arrival: {formatTime(w.arrivalTime)}, Cutoff: {w.cutoff},{' '}
                      <strong style={{ color: T.red }}>{w.bufferMinutes}m late</strong>
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Pacing breakdown table (condensed) */}
        <div style={{ marginTop: 16 }}>
          <Card>
            <div style={{ padding: 12, overflowX: 'auto' }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: T.textSecondary,
                  marginBottom: 8,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Section Breakdown
              </div>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                }}
              >
                <thead>
                  <tr>
                    {['Station', 'Mile', 'Pace', 'Leg', 'Arrival', 'Buffer'].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: '6px 6px',
                          textAlign: 'left',
                          fontWeight: 700,
                          fontSize: 9,
                          textTransform: 'uppercase',
                          color: T.textSecondary,
                          borderBottom: `1px solid ${T.cardBorder}`,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pacingResults
                    .filter((r) => r.stationIndex > 0)
                    .map((r) => (
                      <tr key={r.stationIndex}>
                        <td
                          style={{
                            padding: '4px 6px',
                            fontWeight: 600,
                            color: T.textPrimary,
                            borderBottom: `1px solid ${T.innerBorder}`,
                            maxWidth: 140,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {r.stationName}
                        </td>
                        <td
                          style={{
                            padding: '4px 6px',
                            color: T.accentLight,
                            fontWeight: 600,
                            borderBottom: `1px solid ${T.innerBorder}`,
                          }}
                        >
                          {r.mile}
                        </td>
                        <td
                          style={{
                            padding: '4px 6px',
                            borderBottom: `1px solid ${T.innerBorder}`,
                          }}
                        >
                          {formatPace(r.targetPace)}
                        </td>
                        <td
                          style={{
                            padding: '4px 6px',
                            borderBottom: `1px solid ${T.innerBorder}`,
                          }}
                        >
                          {formatDuration(r.legTimeMinutes)}
                        </td>
                        <td
                          style={{
                            padding: '4px 6px',
                            fontWeight: 600,
                            borderBottom: `1px solid ${T.innerBorder}`,
                          }}
                        >
                          {formatTime(r.arrivalTime)}
                        </td>
                        <td
                          style={{
                            padding: '4px 6px',
                            fontWeight: 700,
                            borderBottom: `1px solid ${T.innerBorder}`,
                            color: r.bufferMinutes != null
                              ? r.bufferMinutes < 0
                                ? '#dc2626'
                                : r.bufferMinutes < 30
                                  ? T.red
                                  : r.bufferMinutes < 60
                                    ? T.orange
                                    : T.green
                              : T.textMuted,
                          }}
                        >
                          {r.bufferMinutes != null ? `${r.bufferMinutes}m` : '--'}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
