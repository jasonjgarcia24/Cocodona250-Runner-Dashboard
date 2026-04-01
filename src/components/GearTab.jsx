import { T } from '../tokens';
import { SectionLabel } from './Card';
import { Icon } from './Icon';
import { REQUIRED_GEAR, COLD_WEATHER_GEAR } from '../data/gear';

export default function GearTab() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <div
        style={{
          borderRadius: 12,
          padding: 16,
          marginBottom: 24,
          background: T.redDark,
          border: `1px solid ${T.red}60`,
        }}
      >
        <p style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: 4, color: T.red }}>
          Gear checks are mandatory
        </p>
        <p style={{ fontSize: '0.875rem', color: T.textPrimary }}>
          Runners AND pacers must carry required gear at all times. You will be
          checked at specific aid stations and refused entry without it.
        </p>
      </div>

      <div style={{ marginBottom: 24 }}>
        <SectionLabel>Required Gear &mdash; All Times</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {REQUIRED_GEAR.map(({ item, desc }) => (
            <div
              key={item}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                borderRadius: 8,
                padding: '10px 12px',
                background: T.cardBg,
                border: `1px solid ${T.cardBorder}`,
              }}
            >
              <span style={{ color: T.green, flexShrink: 0, marginTop: 2 }}>
                <Icon name="check" size={14} />
              </span>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: T.textPrimary }}>
                  {item}
                </div>
                <div style={{ fontSize: '0.75rem', color: T.textSecondary }}>
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <SectionLabel>
          Cold Weather Gear &mdash; Required on Some Sections
        </SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {COLD_WEATHER_GEAR.map(({ item, desc }) => (
            <div
              key={item}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                borderRadius: 8,
                padding: '10px 12px',
                background: T.cardBg,
                border: `1px solid ${T.cardBorder}`,
              }}
            >
              <span style={{ color: T.sky, flexShrink: 0, marginTop: 2 }}>
                <Icon name="gear" size={14} />
              </span>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: T.textPrimary }}>
                  {item}
                </div>
                <div style={{ fontSize: '0.75rem', color: T.textSecondary }}>
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          borderRadius: 12,
          padding: 16,
          background: 'rgba(176,100,30,0.15)',
          border: `1px solid ${T.accentLight}60`,
        }}
      >
        <p style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: 4, color: T.accentLight }}>
          &#x26A0; Critical: The 4-Liter Water Section
        </p>
        <p style={{ fontSize: '0.875rem', color: T.textPrimary }}>
          You MUST leave Cottonwood Creek (mi 7.4) with AT LEAST 4 liters. The
          next 25 miles is the hottest, hardest section &mdash; 10&ndash;13+
          hours for most runners. Two water stations exist, each providing only 1
          liter.
        </p>
      </div>
    </div>
  );
}
