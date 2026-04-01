import { T } from '../tokens';
import { Icon } from './Icon';
import { AidStationRow } from './AidStationRow';
import { AID_STATIONS, AMENITY_LEGEND } from '../data/aidStations';

export const AidStationsTab = ({
  plans,
  onPlanChange,
  openIdx,
  onOpenIdx,
  filter,
  onFilterChange,
  search,
  onSearchChange,
  saveStatus,
  filteredStations,
}) => {
  const filterButtons = [
    { k: 'all', l: 'All', bg: '#5a3020' },
    { k: 'crew', l: 'Crew', bg: T.skyDark },
    { k: 'pacer', l: 'Pacer', bg: T.violetDark },
    { k: 'drop', l: 'Drop Bags', bg: T.sandyDark },
    { k: 'sleep', l: 'Sleep', bg: T.greenDark },
    { k: 'medic', l: 'Medic', bg: T.redDark },
  ];

  return (
    <div>
      {/* Filter bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          marginBottom: 12,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <input
          type="text"
          placeholder="Search aid stations\u2026"
          value={search}
          onChange={(e) => {
            onSearchChange(e.target.value);
            onOpenIdx(null);
          }}
          style={{
            flex: 1,
            minWidth: 0,
            padding: '6px 10px',
            borderRadius: 8,
            fontSize: '0.875rem',
            outline: 'none',
            background: 'rgba(210,185,130,0.8)',
            border: `1px solid ${T.cardBorder}`,
            color: T.textPrimary,
            fontFamily: "'Inter', sans-serif",
            boxSizing: 'border-box',
          }}
        />
        {filterButtons.map(({ k, l }) => (
          <button
            key={k}
            onClick={() => {
              onFilterChange(k);
              onOpenIdx(null);
            }}
            style={{
              padding: '6px 10px',
              borderRadius: 8,
              fontSize: '0.75rem',
              fontWeight: 700,
              transition: 'all 0.15s',
              cursor: 'pointer',
              ...(filter === k
                ? { background: T.accent, color: '#f5efe0', border: '1px solid transparent' }
                : {
                    background: 'rgba(200,175,120,0.7)',
                    color: T.textPrimary,
                    border: `1px solid ${T.cardBorder}`,
                  }),
            }}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          columnGap: 16,
          rowGap: 4,
          marginBottom: 16,
          fontSize: '0.75rem',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {AMENITY_LEGEND.map(({ icon, color, label }) => (
          <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color }}>
              <Icon name={icon} size={11} />
            </span>
            <span style={{ color: T.textSecondary }}>{label}</span>
          </span>
        ))}
      </div>

      {/* Station list */}
      <div>
        {filteredStations.map((station) => {
          const realIdx = AID_STATIONS.indexOf(station);
          return (
            <AidStationRow
              key={`${station.name}-${station.mile}`}
              station={station}
              idx={realIdx}
              isOpen={openIdx === realIdx}
              onClick={() => onOpenIdx((prev) => (prev === realIdx ? null : realIdx))}
              plans={plans}
              onPlanChange={onPlanChange}
            />
          );
        })}
      </div>

      {/* Save status */}
      {saveStatus !== 'idle' && (
        <div
          style={{
            marginTop: 12,
            fontSize: '0.75rem',
            textAlign: 'right',
            fontFamily: "'Inter', sans-serif",
            transition: 'all 0.15s',
            color: saveStatus === 'saved' ? T.green : saveStatus === 'error' ? T.red : T.textMuted,
          }}
        >
          {saveStatus === 'saving' && '\u23F3 Saving\u2026'}
          {saveStatus === 'saved' && '\u2713 Plans saved across devices'}
          {saveStatus === 'error' && '\u26A0 Save failed \u2014 check connection'}
        </div>
      )}
    </div>
  );
};
