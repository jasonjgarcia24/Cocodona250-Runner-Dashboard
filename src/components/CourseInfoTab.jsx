import { T } from '../tokens';
import { Card, SectionLabel } from './Card';

const STATS = [
  { l: 'Total Miles', v: '252.9' },
  { l: 'Total Gain', v: "40,667'" },
  { l: 'Total Loss', v: "35,674'" },
  { l: 'Cutoff Time', v: '125 hrs' },
];

const ELEVATION_RANGES = [
  {
    l: 'Low Desert Sections',
    r: "2,000'\u20134,000'",
    n: 'Extremely hot during day',
    c: T.red,
  },
  {
    l: 'Mid Elevation (Prescott area)',
    r: "5,000'\u20136,000'",
    n: 'Comfortable, variable',
    c: T.sandy,
  },
  {
    l: 'High Elevation (Mingus / Flagstaff)',
    r: "7,000'\u20139,000'",
    n: 'Can be extremely cold at night',
    c: T.sky,
  },
];

export default function CourseInfoTab() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
          marginBottom: 24,
        }}
      >
        {STATS.map(({ l, v }) => (
          <div
            key={l}
            style={{
              borderRadius: 12,
              padding: 12,
              textAlign: 'center',
              background: T.cardBg,
              border: `1px solid ${T.cardBorder}`,
            }}
          >
            <div
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: T.accentLight,
                fontFamily: 'Georgia,serif',
              }}
            >
              {v}
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginTop: 4,
                color: T.textSecondary,
              }}
            >
              {l}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 24 }}>
        <SectionLabel>The Journey</SectionLabel>
        <Card style={{ padding: 16 }}>
          <div
            style={{
              fontSize: '0.875rem',
              lineHeight: 1.7,
              color: T.textPrimary,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <p>
              Starting in the{' '}
              <strong style={{ color: T.accentLight }}>Sonoran Desert</strong> at
              Deep Canyon Ranch (Black Canyon City), the course winds through
              towering Saguaro cacti in extreme desert heat before climbing
              dramatically into the Bradshaw Mountains.
            </p>
            <p>
              Through the historic mining town of{' '}
              <strong style={{ color: T.accentLight }}>Crown King</strong>, along
              ridgelines and remote single-track, into{' '}
              <strong style={{ color: T.accentLight }}>Prescott</strong> (Whiskey
              Row), past the iconic Watson Lake formations, and up over{' '}
              <strong style={{ color: T.accentLight }}>Mingus Mountain</strong>.
            </p>
            <p>
              Into the copper mining ghost town of{' '}
              <strong style={{ color: T.accentLight }}>Jerome</strong>, down into
              the Verde Valley, through{' '}
              <strong style={{ color: T.accentLight }}>Sedona&apos;s</strong>{' '}
              famous red rock landscapes, up through Schnebly Hill, and into the
              cool Ponderosa Pine forests surrounding{' '}
              <strong style={{ color: T.accentLight }}>Flagstaff</strong>.
            </p>
            <p>
              Finishing at{' '}
              <strong style={{ color: T.accent }}>
                Heritage Square in Flagstaff
              </strong>{' '}
              &mdash; cutoff Saturday May 9, 10:00 AM.
            </p>
          </div>
        </Card>
      </div>

      <div style={{ marginBottom: 24 }}>
        <SectionLabel>Elevation Range</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ELEVATION_RANGES.map(({ l, r, n, c }) => (
            <div
              key={l}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                borderRadius: 8,
                padding: '10px 12px',
                background: T.cardBg,
                border: `1px solid ${T.cardBorder}`,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontFamily: "ui-monospace, 'Cascadia Code', monospace",
                  fontSize: '0.875rem',
                  flexShrink: 0,
                  color: c,
                }}
              >
                {r}
              </div>
              <div>
                <div
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: T.textPrimary,
                  }}
                >
                  {l}
                </div>
                <div style={{ fontSize: '0.75rem', color: T.textSecondary }}>
                  {n}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <SectionLabel>Western States Qualifier</SectionLabel>
        <div
          style={{
            borderRadius: 12,
            padding: 16,
            background: T.greenDark,
            border: `1px solid ${T.green}50`,
          }}
        >
          <p style={{ fontSize: '0.875rem', color: T.textPrimary }}>
            Completing within the 125-hour cutoff earns an automatic qualifier
            for the{' '}
            <strong style={{ color: T.green }}>
              2027 Western States Endurance Run
            </strong>
            . No submission required &mdash; it&apos;s automatic.
          </p>
          <p
            style={{
              marginTop: 8,
              fontSize: '0.75rem',
              color: T.textSecondary,
            }}
          >
            ITRA and UTMB points also awarded automatically within 60 days of
            the race.
          </p>
        </div>
      </div>

      <div>
        <SectionLabel>Emergency Contact</SectionLabel>
        <div
          style={{
            borderRadius: 12,
            padding: 16,
            textAlign: 'center',
            background: T.redDark,
            border: `1px solid ${T.red}60`,
          }}
        >
          <div
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              fontFamily: "ui-monospace, 'Cascadia Code', monospace",
              letterSpacing: '0.08em',
              color: T.red,
            }}
          >
            (602) 830-4526
          </div>
          <div style={{ fontSize: '0.875rem', marginTop: 4, color: T.textPrimary }}>
            TEXT ONLY &mdash; Race Command. Program into your phone before race
            day.
          </div>
          <div style={{ fontSize: '0.75rem', marginTop: 4, color: T.textSecondary }}>
            Provide bib number, location, and description of the issue.
          </div>
        </div>
      </div>
    </div>
  );
}
