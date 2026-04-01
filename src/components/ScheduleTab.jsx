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
    <div className="max-w-2xl font-sans">
      <div
        className="mb-4 p-3 rounded-xl text-sm"
        style={{
          background: 'rgba(176,100,30,0.15)',
          border: `1px solid ${T.accentLight}60`,
          color: T.textPrimary,
        }}
      >
        <strong style={{ color: T.accentLight }}>Note:</strong> In May, Arizona
        is on Pacific Time (same as California).
      </div>

      {SCHEDULE.map(({ day, events }) => (
        <div key={day} className="mb-6">
          <SectionLabel>{day}</SectionLabel>
          <div className="space-y-2">
            {events.map((ev, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-lg px-3 py-2.5"
                style={{
                  background: T.cardBg,
                  border: `1px solid ${T.cardBorder}`,
                }}
              >
                <span
                  style={{ color: T.accent }}
                  className="mt-0.5 shrink-0"
                >
                  &#x203A;
                </span>
                <span className="text-sm" style={{ color: T.textPrimary }}>
                  {ev}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div
        className="mt-2 pt-5"
        style={{ borderTop: `1px solid ${T.cardBorder}` }}
      >
        <div
          className="text-sm font-bold mb-3"
          style={{ color: T.textPrimary }}
        >
          Packet Pick-up
        </div>
        <Card className="p-4 mb-5 space-y-2">
          <p className="text-sm" style={{ color: T.textPrimary }}>
            <strong style={{ color: T.accentLight }}>Sunday May 3:</strong>{' '}
            1&ndash;5 PM, Deep Canyon Ranch &mdash; All distances
          </p>
          <p className="text-xs font-bold" style={{ color: T.red }}>
            &#x26A0; No race morning packet pick-up for any distance.
          </p>
        </Card>

        <div
          className="text-sm font-bold mb-3"
          style={{ color: T.textPrimary }}
        >
          Runner Shuttles
        </div>
        <div className="space-y-2">
          {SHUTTLES.map(({ l, c, d }) => (
            <Card key={l} className="px-3 py-2.5">
              <div className="flex items-center justify-between">
                <span
                  className="text-sm font-bold"
                  style={{ color: T.textPrimary }}
                >
                  {l}
                </span>
                <span
                  className="text-sm font-bold"
                  style={{ color: T.accentLight }}
                >
                  {c}
                </span>
              </div>
              <div
                className="text-xs mt-0.5"
                style={{ color: T.textSecondary }}
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
