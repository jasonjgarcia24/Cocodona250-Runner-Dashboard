import { useState, useEffect } from 'react';
import { T, TOPO_PATTERN, GRAIN } from './tokens';
import { AID_STATIONS } from './data/aidStations';
import RaceSummaryTab from './components/RaceSummaryTab';
import PacingTab from './components/PacingTab';
import { DEFAULT_RUNNER_PROFILE } from './pacing/engine';

const TABS = ['Map', 'Aid Stations', 'Race Summary', 'Schedule', 'Required Gear', 'Key Rules', 'Course Info', 'Pacing'];

export default function App() {
  const [activeTab, setActiveTab] = useState('Aid Stations');
  const [openIdx, setOpenIdx] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [mounted, setMounted] = useState(false);
  const [hoveredMile, setHoveredMile] = useState(null);
  const [plans, setPlans] = useState({});
  const [runnerProfile, setRunnerProfile] = useState(DEFAULT_RUNNER_PROFILE);
  const [saveStatus, setSaveStatus] = useState('idle');

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('cocodona250:plans');
      if (saved) setPlans(JSON.parse(saved));
    } catch (_) {
      // No saved plans — start fresh
    }
    try {
      const savedProfile = localStorage.getItem('cocodona250:runnerProfile');
      if (savedProfile) setRunnerProfile(JSON.parse(savedProfile));
    } catch (_) {
      // No saved profile — start fresh
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (Object.keys(plans).length === 0) return;
    setSaveStatus('saving');
    const t = setTimeout(() => {
      try {
        localStorage.setItem('cocodona250:plans', JSON.stringify(plans));
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } catch (_) {
        setSaveStatus('error');
      }
    }, 800);
    return () => clearTimeout(t);
  }, [plans, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('cocodona250:runnerProfile', JSON.stringify(runnerProfile));
    } catch (_) {
      // Silently fail
    }
  }, [runnerProfile, mounted]);

  const handlePlanChange = (key, planData) => {
    setPlans((prev) => ({ ...prev, [key]: planData }));
  };

  const filteredStations = AID_STATIONS.filter((s) => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === 'crew') return s.crew;
    if (filter === 'pacer') return s.pacer;
    if (filter === 'drop') return s.dropBag;
    if (filter === 'sleep') return s.sleep;
    if (filter === 'medic') return s.medic;
    return true;
  });

  return (
    <div
      className="min-h-screen"
      style={{
        background: T.bgPage,
        fontFamily: "'Georgia','Times New Roman',serif",
        color: T.textPrimary,
      }}
    >
      {/* Topo pattern layer */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundImage: TOPO_PATTERN, backgroundSize: '400px', opacity: 1 }}
      />
      {/* Grain layer */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundImage: GRAIN, backgroundSize: '200px', opacity: 0.04 }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-6">
        {/* Header */}
        <div className={`mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div
                className="text-xs font-bold tracking-[0.3em] uppercase mb-1 font-sans"
                style={{ color: T.accentLight }}
              >
                Aravaipa Running &middot; Arizona &middot; May 2026
              </div>
              <h1
                className="text-5xl font-bold"
                style={{ fontFamily: "'Georgia',serif", letterSpacing: '-0.02em', lineHeight: 1 }}
              >
                <span style={{ color: T.accentLight }}>Cocodona</span>{' '}
                <span style={{ color: T.textPrimary }}>250</span>
              </h1>
              <p className="text-sm mt-2 font-sans" style={{ color: T.textSecondary }}>
                Black Canyon City &rarr; Flagstaff &middot;{' '}
                <span style={{ color: T.textPrimary }} className="font-semibold">
                  252.9 miles
                </span>{' '}
                &middot;{' '}
                <span style={{ color: T.textPrimary }} className="font-semibold">
                  40,667&apos; gain
                </span>
              </p>
            </div>
            <div className="flex gap-3">
              {[
                { v: '125h', l: 'Cutoff' },
                { v: '27', l: 'Aid Stations' },
              ].map(({ v, l }) => (
                <div
                  key={l}
                  className="text-center rounded-xl px-4 py-3"
                  style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}
                >
                  <div className="text-2xl font-bold" style={{ color: T.accentLight, fontFamily: 'Georgia,serif' }}>
                    {v}
                  </div>
                  <div className="text-xs uppercase tracking-wider mt-0.5 font-sans" style={{ color: T.textSecondary }}>
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-5 flex items-center gap-3 font-sans">
            <span className="text-xs font-bold" style={{ color: T.green }}>
              START
            </span>
            <div
              className="flex-1 h-2 rounded-full overflow-hidden"
              style={{ background: 'rgba(160,120,60,0.35)', border: `1px solid ${T.cardBorder}` }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${T.green}, ${T.accentLight}, ${T.accent})`,
                  width: '100%',
                }}
              />
            </div>
            <span className="text-xs font-bold" style={{ color: T.accentLight }}>
              FINISH
            </span>
          </div>
          <div className="flex justify-between text-xs font-sans mt-1 px-8" style={{ color: T.textSecondary }}>
            <span>Mi 0 &middot; Deep Canyon Ranch</span>
            <span>Mi 252.9 &middot; Heritage Square</span>
          </div>
        </div>

        {/* Tabs */}
        <div
          className={`flex gap-1 mb-6 p-1 rounded-xl overflow-x-auto font-sans transition-all duration-700 delay-100 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'rgba(180, 150, 90, 0.5)', border: `1px solid ${T.cardBorder}` }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-150"
              style={
                activeTab === tab
                  ? { background: T.accent, color: '#f5efe0' }
                  : { color: T.textPrimary, background: 'transparent' }
              }
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content — placeholder panels until Phase 1 agents provide components */}
        <div className="min-h-[300px]">
          {activeTab === 'Map' && (
            <div className="text-center py-20 font-sans" style={{ color: T.textMuted }}>
              Map + Elevation Profile — coming in Phase 1
            </div>
          )}

          {activeTab === 'Aid Stations' && (
            <div className="text-center py-20 font-sans" style={{ color: T.textMuted }}>
              Aid Stations — coming in Phase 1
            </div>
          )}

          {activeTab === 'Race Summary' && (
            <RaceSummaryTab
              plans={plans}
              onPlanChange={handlePlanChange}
              runnerProfile={runnerProfile}
            />
          )}

          {activeTab === 'Schedule' && (
            <div className="text-center py-20 font-sans" style={{ color: T.textMuted }}>
              Schedule — coming in Phase 1
            </div>
          )}

          {activeTab === 'Required Gear' && (
            <div className="text-center py-20 font-sans" style={{ color: T.textMuted }}>
              Required Gear — coming in Phase 1
            </div>
          )}

          {activeTab === 'Key Rules' && (
            <div className="text-center py-20 font-sans" style={{ color: T.textMuted }}>
              Key Rules — coming in Phase 1
            </div>
          )}

          {activeTab === 'Course Info' && (
            <div className="text-center py-20 font-sans" style={{ color: T.textMuted }}>
              Course Info — coming in Phase 1
            </div>
          )}

          {activeTab === 'Pacing' && (
            <PacingTab
              runnerProfile={runnerProfile}
              onProfileChange={setRunnerProfile}
            />
          )}
        </div>

        {/* Footer */}
        <div className="mt-10 pt-4 text-center font-sans" style={{ borderTop: `1px solid ${T.cardBorder}` }}>
          <p className="text-sm" style={{ color: T.textSecondary }}>
            Cocodona 250 &middot; May 4&ndash;9, 2026 &middot; Organized by{' '}
            <span style={{ color: T.textPrimary, fontWeight: 600 }}>Aravaipa Running</span>
          </p>
        </div>
      </div>
    </div>
  );
}
