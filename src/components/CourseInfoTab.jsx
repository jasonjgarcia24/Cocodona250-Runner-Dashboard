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
    <div className="max-w-2xl space-y-6 font-sans">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {STATS.map(({ l, v }) => (
          <div
            key={l}
            className="rounded-xl p-3 text-center"
            style={{
              background: T.cardBg,
              border: `1px solid ${T.cardBorder}`,
            }}
          >
            <div
              className="text-xl font-bold"
              style={{ color: T.accentLight, fontFamily: 'Georgia,serif' }}
            >
              {v}
            </div>
            <div
              className="text-xs uppercase tracking-wider mt-1"
              style={{ color: T.textSecondary }}
            >
              {l}
            </div>
          </div>
        ))}
      </div>

      <div>
        <SectionLabel>The Journey</SectionLabel>
        <Card className="p-4">
          <div
            className="text-sm space-y-3 leading-relaxed"
            style={{ color: T.textPrimary }}
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

      <div>
        <SectionLabel>Elevation Range</SectionLabel>
        <div className="space-y-2">
          {ELEVATION_RANGES.map(({ l, r, n, c }) => (
            <div
              key={l}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5"
              style={{
                background: T.cardBg,
                border: `1px solid ${T.cardBorder}`,
              }}
            >
              <div
                className="font-bold font-mono text-sm shrink-0"
                style={{ color: c }}
              >
                {r}
              </div>
              <div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: T.textPrimary }}
                >
                  {l}
                </div>
                <div className="text-xs" style={{ color: T.textSecondary }}>
                  {n}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Western States Qualifier</SectionLabel>
        <div
          className="rounded-xl p-4"
          style={{ background: T.greenDark, border: `1px solid ${T.green}50` }}
        >
          <p className="text-sm" style={{ color: T.textPrimary }}>
            Completing within the 125-hour cutoff earns an automatic qualifier
            for the{' '}
            <strong style={{ color: T.green }}>
              2027 Western States Endurance Run
            </strong>
            . No submission required &mdash; it&apos;s automatic.
          </p>
          <p
            className="mt-2 text-xs"
            style={{ color: T.textSecondary }}
          >
            ITRA and UTMB points also awarded automatically within 60 days of
            the race.
          </p>
        </div>
      </div>

      <div>
        <SectionLabel>Emergency Contact</SectionLabel>
        <div
          className="rounded-xl p-4 text-center"
          style={{ background: T.redDark, border: `1px solid ${T.red}60` }}
        >
          <div
            className="text-xl font-bold font-mono tracking-wide"
            style={{ color: T.red }}
          >
            (602) 830-4526
          </div>
          <div className="text-sm mt-1" style={{ color: T.textPrimary }}>
            TEXT ONLY &mdash; Race Command. Program into your phone before race
            day.
          </div>
          <div className="text-xs mt-1" style={{ color: T.textSecondary }}>
            Provide bib number, location, and description of the issue.
          </div>
        </div>
      </div>
    </div>
  );
}
