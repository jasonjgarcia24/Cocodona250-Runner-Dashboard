import { T } from '../tokens';

const RULES = [
  {
    t: 'No Outside Aid',
    c: 'red',
    b: 'Runners may only receive aid within \u00BC-mile of aid stations. Pacers may NOT carry items for their runner. No parking along the course to support runners.',
  },
  {
    t: 'One Crew Vehicle',
    c: 'sandy',
    b: "ONE crew vehicle per runner at aid stations. No vehicles over 25' and NO vehicles towing trailers.",
  },
  {
    t: 'Pacing Rules',
    c: 'violet',
    b: 'Pacers must be 18+, human, on foot. Must sign waiver and get a pacer bib at the starting aid station. No pacers at Schnebly Hill or Wildcat Hill.',
  },
  {
    t: 'SPOT Trackers',
    c: 'sky',
    b: 'Do not alter, adjust, or turn off your SPOT Tracker. It must stay on your person for the entire race.',
  },
  {
    t: 'Dropping from the Race',
    c: 'base',
    b: 'You may only drop at an aid station. Fill out a drop form and turn in your SPOT tracker. You can re-enter if you return before the cutoff or sweepers pass.',
  },
  {
    t: 'IVs = Automatic DQ',
    c: 'red',
    b: 'Any runner who receives an IV at any time during the race will be automatically disqualified, no exceptions.',
  },
  {
    t: 'Cutting the Course',
    c: 'red',
    b: 'Cutting or deviating from the course = disqualification. If you go off course, retrace to the last known marker.',
  },
  {
    t: 'GPS Device Required',
    c: 'green',
    b: 'All runners AND pacers must carry a GPS device with the course file loaded at all times. Smartphone in airplane mode is recommended as backup.',
  },
  {
    t: 'Leave No Trace',
    c: 'green',
    b: 'Littering on course will not be tolerated. Step 30\' off trail for bathroom use, dig a 6" hole, and pack out all TP in a ziplock.',
  },
];

const COLOR_CONFIG = {
  red: { bg: T.redDark, border: T.red + '60', title: T.red },
  sandy: { bg: T.sandyDark, border: T.sandy + '60', title: T.sandy },
  violet: { bg: T.violetDark, border: T.violet + '60', title: T.violet },
  sky: { bg: T.skyDark, border: T.sky + '60', title: T.sky },
  base: { bg: T.cardBgSolid, border: T.cardBorder, title: T.accentLight },
  green: { bg: T.greenDark, border: T.green + '60', title: T.green },
};

export default function RulesTab() {
  return (
    <div className="max-w-2xl space-y-3 font-sans">
      {RULES.map(({ t, c, b }) => {
        const cfg = COLOR_CONFIG[c];
        return (
          <div
            key={t}
            className="rounded-xl px-4 py-3"
            style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
          >
            <div
              className="text-sm font-bold mb-1"
              style={{ color: cfg.title }}
            >
              {t}
            </div>
            <p className="text-sm" style={{ color: T.textPrimary }}>
              {b}
            </p>
          </div>
        );
      })}
    </div>
  );
}
