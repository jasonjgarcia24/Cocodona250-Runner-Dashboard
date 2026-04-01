import { T } from '../tokens';

export const EMPTY_PLAN = {
  targetArrival: '',
  targetDeparture: '',
  timeNotes: '',
  dropBagItems: [],
  crew: [],
  pacers: [],
  sleepDuration: '',
  sleepNotes: '',
  leavingHydration: '',
  leavingElectrolytes: '',
  leavingCalories: '',
  leavingOther: [],
  generalNotes: '',
};

export const PlanLabel = ({ children, color }) => (
  <div
    style={{
      color: color || T.accentLight,
      fontSize: '0.75rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: 6,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: "'Inter', sans-serif",
    }}
  >
    {children}
  </div>
);

export const PlanInput = ({ value, onChange, placeholder, multiline, rows = 3 }) => {
  const shared = {
    value,
    onChange: (e) => onChange(e.target.value),
    placeholder,
    style: {
      background: 'rgba(235,215,170,0.9)',
      border: `1px solid ${T.cardBorder}`,
      color: T.textPrimary,
      width: '100%',
      borderRadius: 8,
      padding: '8px 10px',
      fontSize: '0.875rem',
      outline: 'none',
      resize: 'none',
      fontFamily: "'Inter', sans-serif",
      boxSizing: 'border-box',
    },
  };
  return multiline ? (
    <textarea {...shared} rows={rows} />
  ) : (
    <input {...shared} type="text" />
  );
};

export const PackingList = ({ items, onChange }) => {
  const add = () => onChange([...items, '']);
  const update = (i, val) => {
    const n = [...items];
    n[i] = val;
    onChange(n);
  };
  const remove = (i) => onChange(items.filter((_, j) => j !== i));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span
            style={{
              color: T.accentLight,
              flexShrink: 0,
              fontSize: '0.875rem',
            }}
          >
            &bull;
          </span>
          <input
            type="text"
            value={item}
            onChange={(e) => update(i, e.target.value)}
            placeholder={`Item ${i + 1}`}
            style={{
              flex: 1,
              borderRadius: 6,
              padding: '4px 8px',
              fontSize: '0.875rem',
              outline: 'none',
              fontFamily: "'Inter', sans-serif",
              background: 'rgba(235,215,170,0.9)',
              border: `1px solid ${T.cardBorder}`,
              color: T.textPrimary,
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={() => remove(i)}
            style={{
              flexShrink: 0,
              borderRadius: 4,
              padding: '2px 6px',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: T.red,
              background: T.redDark,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={add}
        style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          padding: '4px 10px',
          borderRadius: 8,
          marginTop: 4,
          background: T.accentLight + '25',
          border: `1px dashed ${T.accentLight}60`,
          color: T.accentLight,
          cursor: 'pointer',
          alignSelf: 'flex-start',
        }}
      >
        + Add item
      </button>
    </div>
  );
};

export const CrewRow = ({ person, onChange, onRemove }) => (
  <div
    style={{
      borderRadius: 8,
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      background: 'rgba(235,215,170,0.6)',
      border: `1px solid ${T.cardBorder}`,
    }}
  >
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <input
        type="text"
        value={person.name}
        onChange={(e) => onChange({ ...person, name: e.target.value })}
        placeholder="Name"
        style={{
          flex: 1,
          borderRadius: 6,
          padding: '4px 8px',
          fontSize: '0.875rem',
          outline: 'none',
          fontFamily: "'Inter', sans-serif",
          background: 'rgba(235,215,170,0.9)',
          border: `1px solid ${T.cardBorder}`,
          color: T.textPrimary,
          boxSizing: 'border-box',
        }}
      />
      <button
        onClick={onRemove}
        style={{
          flexShrink: 0,
          borderRadius: 4,
          padding: '2px 6px',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: T.red,
          background: T.redDark,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        ✕
      </button>
    </div>
    <div style={{ display: 'flex', gap: 8 }}>
      {['Drop off', 'Pick up', 'Both'].map((role) => (
        <button
          key={role}
          onClick={() => onChange({ ...person, role })}
          style={{
            fontSize: '0.75rem',
            padding: '2px 8px',
            borderRadius: 9999,
            fontWeight: 600,
            transition: 'all 0.15s',
            cursor: 'pointer',
            ...(person.role === role
              ? { background: T.sky, color: '#fff', border: '1px solid transparent' }
              : {
                  background: 'rgba(26,74,112,0.12)',
                  color: T.sky,
                  border: `1px solid ${T.sky}50`,
                }),
          }}
        >
          {role}
        </button>
      ))}
    </div>
    <input
      type="text"
      value={person.vehicle || ''}
      onChange={(e) => onChange({ ...person, vehicle: e.target.value })}
      placeholder="Vehicle description (optional)"
      style={{
        width: '100%',
        borderRadius: 6,
        padding: '4px 8px',
        fontSize: '0.75rem',
        outline: 'none',
        fontFamily: "'Inter', sans-serif",
        background: 'rgba(235,215,170,0.9)',
        border: `1px solid ${T.cardBorder}`,
        color: T.textSecondary,
        boxSizing: 'border-box',
      }}
    />
  </div>
);

export const PacerRow = ({ pacer, onChange, onRemove }) => (
  <div
    style={{
      borderRadius: 8,
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      background: 'rgba(235,215,170,0.6)',
      border: `1px solid ${T.cardBorder}`,
    }}
  >
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <input
        type="text"
        value={pacer.name}
        onChange={(e) => onChange({ ...pacer, name: e.target.value })}
        placeholder="Pacer name"
        style={{
          flex: 1,
          borderRadius: 6,
          padding: '4px 8px',
          fontSize: '0.875rem',
          outline: 'none',
          fontFamily: "'Inter', sans-serif",
          background: 'rgba(235,215,170,0.9)',
          border: `1px solid ${T.cardBorder}`,
          color: T.textPrimary,
          boxSizing: 'border-box',
        }}
      />
      <button
        onClick={onRemove}
        style={{
          flexShrink: 0,
          borderRadius: 4,
          padding: '2px 6px',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: T.red,
          background: T.redDark,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        ✕
      </button>
    </div>
    <div style={{ display: 'flex', gap: 8 }}>
      {['Joining here', 'Leaving here', 'Both'].map((action) => (
        <button
          key={action}
          onClick={() => onChange({ ...pacer, action })}
          style={{
            fontSize: '0.75rem',
            padding: '2px 8px',
            borderRadius: 9999,
            fontWeight: 600,
            transition: 'all 0.15s',
            cursor: 'pointer',
            ...(pacer.action === action
              ? { background: T.violet, color: '#fff', border: '1px solid transparent' }
              : {
                  background: 'rgba(74,40,120,0.12)',
                  color: T.violet,
                  border: `1px solid ${T.violet}50`,
                }),
          }}
        >
          {action}
        </button>
      ))}
    </div>
    <input
      type="text"
      value={pacer.runningTo || ''}
      onChange={(e) => onChange({ ...pacer, runningTo: e.target.value })}
      placeholder="Running to / from station (e.g. Mingus Mountain)"
      style={{
        width: '100%',
        borderRadius: 6,
        padding: '4px 8px',
        fontSize: '0.75rem',
        outline: 'none',
        fontFamily: "'Inter', sans-serif",
        background: 'rgba(235,215,170,0.9)',
        border: `1px solid ${T.cardBorder}`,
        color: T.textSecondary,
        boxSizing: 'border-box',
      }}
    />
  </div>
);
