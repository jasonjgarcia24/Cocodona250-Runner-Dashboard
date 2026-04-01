import { T } from '../tokens';
import { Icon } from './Icon';
import { AidStationDetail } from './AidStationDetail';
import { AID_STATIONS } from '../data/aidStations';

export const AidStationRow = ({ station, idx, isOpen, onClick, plans, onPlanChange }) => {
  const isStart = idx === 0;
  const isFinish = idx === AID_STATIONS.length - 1;
  const progress = (station.mile / 252.9) * 100;
  const stationKey = `station:${station.mile}:${station.name.replace(/\s+/g, '-')}`;
  const planForRow = plans?.[stationKey] || null;
  const hasPlan =
    plans &&
    plans[stationKey] &&
    (plans[stationKey].targetArrival ||
      plans[stationKey].targetDeparture ||
      (plans[stationKey].dropBagItems || []).length ||
      (plans[stationKey].crew || []).length ||
      (plans[stationKey].pacers || []).length ||
      plans[stationKey].sleepDuration ||
      plans[stationKey].leavingHydration ||
      plans[stationKey].leavingElectrolytes ||
      plans[stationKey].leavingCalories ||
      (plans[stationKey].leavingOther || []).length ||
      plans[stationKey].sleepNotes ||
      plans[stationKey].generalNotes);

  const monoStyle = {
    fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace",
    fontSize: '11px',
    lineHeight: '1.4',
  };

  return (
    <div style={{ marginBottom: 2 }}>
      <button
        onClick={onClick}
        style={{
          width: '100%',
          textAlign: 'left',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.15s',
          fontFamily: "'Inter', sans-serif",
          background: isOpen ? 'rgba(176,58,16,0.12)' : T.cardBg,
          border: `1px solid ${isOpen ? T.accent + '70' : T.cardBorder}`,
          borderBottomWidth: isOpen ? 0 : 1,
          borderRadius: isOpen ? '8px 8px 0 0' : 8,
          cursor: 'pointer',
          padding: 0,
        }}
      >
        {/* Progress bar at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 2,
            borderRadius: 9999,
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${T.accentMuted}, ${T.accentLight})`,
          }}
        />

        <div
          style={{
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          {/* Mile marker */}
          <div
            style={{
              fontSize: '0.75rem',
              fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace",
              fontWeight: 700,
              width: 48,
              textAlign: 'right',
              flexShrink: 0,
              color: isStart ? T.green : isFinish ? T.accentLight : T.textSecondary,
            }}
          >
            {isStart ? 'START' : isFinish ? 'FINISH' : station.mile}
          </div>

          {/* Middle: name + target times */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                color: isFinish ? T.accentLight : isStart ? T.green : T.textPrimary,
              }}
            >
              {station.name}
            </div>
            <div style={{ marginTop: 2, overflow: 'hidden', ...monoStyle }}>
              {isStart ? (
                <span style={{ color: T.green }}>5:00 AM start</span>
              ) : planForRow?.targetArrival || planForRow?.targetDeparture ? (
                <span style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  {planForRow?.targetArrival && (
                    <span style={{ color: T.sky }}>
                      <span style={{ color: T.textMuted }}>{isFinish ? 'goal ' : 'arr '}</span>
                      {planForRow.targetArrival}
                    </span>
                  )}
                  {planForRow?.targetDeparture && !isFinish && (
                    <span style={{ color: T.accentLight }}>
                      <span style={{ color: T.textMuted }}>dep </span>
                      {planForRow.targetDeparture}
                    </span>
                  )}
                </span>
              ) : (
                <span style={{ color: T.textMuted, fontStyle: 'italic' }}>no target set</span>
              )}
            </div>
          </div>

          {/* Right column: icons + cutoff */}
          <div
            style={{
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 2,
            }}
          >
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {hasPlan && (
                <span
                  style={{
                    fontSize: '0.75rem',
                    padding: '2px 4px',
                    borderRadius: 4,
                    fontWeight: 700,
                    background: T.accent + '20',
                    color: T.accent,
                    border: `1px solid ${T.accent}40`,
                  }}
                >
                  &#9998;
                </span>
              )}
              {station.crew && (
                <span style={{ color: T.sky }}>
                  <Icon name="crew" size={12} />
                </span>
              )}
              {station.pacer && (
                <span style={{ color: T.violet }}>
                  <Icon name="pacer" size={12} />
                </span>
              )}
              {station.dropBag && (
                <span style={{ color: T.sandy }}>
                  <Icon name="bag" size={12} />
                </span>
              )}
              {station.sleep && (
                <span style={{ color: station.sleep === 'Indoor' ? T.green : T.orange }}>
                  <Icon name="sleep" size={12} />
                </span>
              )}
              {station.shower && (
                <span style={{ color: T.teal }}>
                  <Icon name="shower" size={12} />
                </span>
              )}
              {station.medic && (
                <span style={{ color: T.red }}>
                  <Icon name="medic" size={12} />
                </span>
              )}
            </div>
            <div style={monoStyle}>
              {station.cutoff ? (
                <span style={{ color: T.textSecondary }}>
                  <span style={{ color: T.textMuted }}>cutoff </span>
                  {station.cutoff}
                </span>
              ) : (
                <span style={{ color: T.textMuted, fontStyle: 'italic' }}>no cutoff</span>
              )}
            </div>
          </div>

          {/* Chevron */}
          <span
            style={{
              flexShrink: 0,
              transition: 'transform 0.2s',
              color: isOpen ? T.accentLight : T.textMuted,
              transform: isOpen ? 'rotate(90deg)' : 'none',
              display: 'inline-flex',
            }}
          >
            <Icon name="chevron" size={14} />
          </span>
        </div>
      </button>
      {isOpen && (
        <AidStationDetail
          station={station}
          stationKey={stationKey}
          plans={plans}
          onPlanChange={onPlanChange}
          isStart={isStart}
          isFinish={isFinish}
        />
      )}
    </div>
  );
};
