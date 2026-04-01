import { T } from '../tokens';
import { SectionLabel } from './Card';
import { Icon } from './Icon';
import { REQUIRED_GEAR, COLD_WEATHER_GEAR } from '../data/gear';

export default function GearTab() {
  return (
    <div className="max-w-2xl space-y-6 font-sans">
      <div
        className="rounded-xl p-4"
        style={{ background: T.redDark, border: `1px solid ${T.red}60` }}
      >
        <p className="text-sm font-bold mb-1" style={{ color: T.red }}>
          Gear checks are mandatory
        </p>
        <p className="text-sm" style={{ color: T.textPrimary }}>
          Runners AND pacers must carry required gear at all times. You will be
          checked at specific aid stations and refused entry without it.
        </p>
      </div>

      <div>
        <SectionLabel>Required Gear &mdash; All Times</SectionLabel>
        <div className="space-y-2">
          {REQUIRED_GEAR.map(({ item, desc }) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-lg px-3 py-2.5"
              style={{
                background: T.cardBg,
                border: `1px solid ${T.cardBorder}`,
              }}
            >
              <span style={{ color: T.green }} className="mt-0.5 shrink-0">
                <Icon name="check" size={14} />
              </span>
              <div>
                <div
                  className="text-sm font-bold"
                  style={{ color: T.textPrimary }}
                >
                  {item}
                </div>
                <div className="text-xs" style={{ color: T.textSecondary }}>
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>
          Cold Weather Gear &mdash; Required on Some Sections
        </SectionLabel>
        <div className="space-y-2">
          {COLD_WEATHER_GEAR.map(({ item, desc }) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-lg px-3 py-2.5"
              style={{
                background: T.cardBg,
                border: `1px solid ${T.cardBorder}`,
              }}
            >
              <span style={{ color: T.sky }} className="mt-0.5 shrink-0">
                <Icon name="gear" size={14} />
              </span>
              <div>
                <div
                  className="text-sm font-bold"
                  style={{ color: T.textPrimary }}
                >
                  {item}
                </div>
                <div className="text-xs" style={{ color: T.textSecondary }}>
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="rounded-xl p-4"
        style={{
          background: 'rgba(176,100,30,0.15)',
          border: `1px solid ${T.accentLight}60`,
        }}
      >
        <p className="text-sm font-bold mb-1" style={{ color: T.accentLight }}>
          &#x26A0; Critical: The 4-Liter Water Section
        </p>
        <p className="text-sm" style={{ color: T.textPrimary }}>
          You MUST leave Cottonwood Creek (mi 7.4) with AT LEAST 4 liters. The
          next 25 miles is the hottest, hardest section &mdash; 10&ndash;13+
          hours for most runners. Two water stations exist, each providing only 1
          liter.
        </p>
      </div>
    </div>
  );
}
