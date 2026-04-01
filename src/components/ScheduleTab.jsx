import { T } from '../tokens';
import { Card, SectionLabel } from './Card';
import { SCHEDULE } from '../data/schedule';

const SHUTTLES = [
  {
    l: 'Phoenix \u2192 Start Line',
    c: '$50',
    d: 'Sun May 3 \u00b7 Departs Phoenix Airport 11:00 AM',
  },
  {
    l: 'Flagstaff \u2192 Start Line',
    c: '$50',
    d: 'Sun May 3 \u00b7 Departs Flagstaff 2:30 PM \u00b7 Leave car near finish',
  },
];

export default function ScheduleTab() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <div
        style={{
          marginBottom: 16,
          padding: 12,
          borderRadius: 12,
          fontSize: '0.875rem',
          background: 'rgba(176,100,30,0.15)',
          border: `1px solid ${T.accentLight}60`,
          color: T.textPrimary,
        }}
      >
        <strong style={{ color: T.accentLight }}>Note:</strong> In May, Arizona
        is on Pacific Time (same as California).
      </div>

      {SCHEDULE.map(({ day, events }) => (
        <div key={day} style={{ marginBottom: 24 }}>
          <SectionLabel>{day}</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {events.map((ev, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 12,
                  borderRadius: 8,
                  padding: '10px 12px',
                  background: T.cardBg,
                  border: `1px solid ${T.cardBorder}`,
                }}
              >
                <span
                  style={{ color: T.accent, flexShrink: 0, marginTop: 2 }}
                >
                  &#x203A;
                </span>
                <span style={{ fontSize: '0.875rem', color: T.textPrimary }}>
                  {ev}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div
        style={{
          marginTop: 8,
          paddingTop: 20,
          borderTop: `1px solid ${T.cardBorder}`,
        }}
      >
        <div
          style={{
            fontSize: '0.875rem',
            fontWeight: 700,
            marginBottom: 12,
            color: T.textPrimary,
          }}
        >
          Packet Pick-up
        </div>
        <Card style={{ padding: 16, marginBottom: 20 }}>
          <p style={{ fontSize: '0.875rem', color: T.textPrimary, marginBottom: 8 }}>
            <strong style={{ color: T.accentLight }}>Sunday May 3:</strong>{' '}
            1&ndash;5 PM, Deep Canyon Ranch &mdash; All distances
          </p>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: T.red }}>
            &#x26A0; No race morning packet pick-up for any distance.
          </p>
        </Card>

        <div
          style={{
            fontSize: '0.875rem',
            fontWeight: 700,
            marginBottom: 12,
            color: T.textPrimary,
          }}
        >
          Runner Shuttles
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {SHUTTLES.map(({ l, c, d }) => (
            <Card key={l} style={{ padding: '10px 12px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: T.textPrimary,
                  }}
                >
                  {l}
                </span>
                <span
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: T.accentLight,
                  }}
                >
                  {c}
                </span>
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  marginTop: 2,
                  color: T.textSecondary,
                }}
              >
                {d}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
