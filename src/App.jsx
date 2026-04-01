import { useState, useEffect, useCallback } from 'react';
import { T, TOPO_PATTERN, GRAIN } from './tokens';
import { AID_STATIONS } from './data/aidStations';
import MapTab from './components/MapTab';
import ElevationProfile from './components/ElevationProfile';
import { AidStationsTab } from './components/AidStationsTab';
import RaceSummaryTab from './components/RaceSummaryTab';
import ScheduleTab from './components/ScheduleTab';
import GearTab from './components/GearTab';
import RulesTab from './components/RulesTab';
import CourseInfoTab from './components/CourseInfoTab';
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

  const handleSelectStation = useCallback((idx) => {
    setActiveTab('Aid Stations');
    setOpenIdx(idx);
  }, []);

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
      style={{
        minHeight: '100vh',
        background: T.bgPage,
        fontFamily: "'Georgia','Times New Roman',serif",
        color: T.textPrimary,
      }}
    >
      {/* Topo pattern layer */}
      <div
        style={{
          position: 'fixed',
          top: 0, right: 0, bottom: 0, left: 0,
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage: TOPO_PATTERN,
          backgroundSize: '400px',
          opacity: 1,
        }}
      />
      {/* Grain layer */}
      <div
        style={{
          position: 'fixed',
          top: 0, right: 0, bottom: 0, left: 0,
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage: GRAIN,
          backgroundSize: '200px',
          opacity: 0.04,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 960,
          margin: '0 auto',
          padding: '24px 16px',
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: 32,
            transition: 'all 0.7s',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  marginBottom: 4,
                  fontFamily: "'Inter', sans-serif",
                  color: T.accentLight,
                }}
              >
                Aravaipa Running &middot; Arizona &middot; May 2026
              </div>
              <h1
                style={{
                  fontSize: '3rem',
                  fontWeight: 700,
                  fontFamily: "'Georgia',serif",
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                <span style={{ color: T.accentLight }}>Cocodona</span>{' '}
                <span style={{ color: T.textPrimary }}>250</span>
              </h1>
              <p
                style={{
                  fontSize: '0.875rem',
                  marginTop: 8,
                  fontFamily: "'Inter', sans-serif",
                  color: T.textSecondary,
                }}
              >
                Black Canyon City &rarr; Flagstaff &middot;{' '}
                <span style={{ color: T.textPrimary, fontWeight: 600 }}>
                  252.9 miles
                </span>{' '}
                &middot;{' '}
                <span style={{ color: T.textPrimary, fontWeight: 600 }}>
                  40,667&apos; gain
                </span>
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { v: '125h', l: 'Cutoff' },
                { v: '27', l: 'Aid Stations' },
              ].map(({ v, l }) => (
                <div
                  key={l}
                  style={{
                    textAlign: 'center',
                    borderRadius: 12,
                    padding: '12px 16px',
                    background: T.cardBg,
                    border: `1px solid ${T.cardBorder}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: '1.5rem',
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
                      marginTop: 2,
                      fontFamily: "'Inter', sans-serif",
                      color: T.textSecondary,
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div
            style={{
              marginTop: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: T.green }}>
              START
            </span>
            <div
              style={{
                flex: 1,
                height: 8,
                borderRadius: 9999,
                overflow: 'hidden',
                background: 'rgba(160,120,60,0.35)',
                border: `1px solid ${T.cardBorder}`,
              }}
            >
              <div
                style={{
                  height: '100%',
                  borderRadius: 9999,
                  background: `linear-gradient(90deg, ${T.green}, ${T.accentLight}, ${T.accent})`,
                  width: '100%',
                }}
              />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: T.accentLight }}>
              FINISH
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              fontFamily: "'Inter', sans-serif",
              marginTop: 4,
              padding: '0 32px',
              color: T.textSecondary,
            }}
          >
            <span>Mi 0 &middot; Deep Canyon Ranch</span>
            <span>Mi 252.9 &middot; Heritage Square</span>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            marginBottom: 24,
            padding: 4,
            borderRadius: 12,
            overflowX: 'auto',
            fontFamily: "'Inter', sans-serif",
            transition: 'opacity 0.7s 0.1s',
            opacity: mounted ? 1 : 0,
            background: 'rgba(180, 150, 90, 0.5)',
            border: `1px solid ${T.cardBorder}`,
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 12px',
                borderRadius: 8,
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.03em',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s',
                border: 'none',
                cursor: 'pointer',
                ...(activeTab === tab
                  ? { background: T.accent, color: '#f5efe0' }
                  : { color: T.textPrimary, background: 'transparent' }),
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ minHeight: 300 }}>
          {activeTab === 'Map' && (
            <div>
              <MapTab
                hoveredMile={hoveredMile}
                onHoverMile={setHoveredMile}
                onSelectStation={handleSelectStation}
              />
              <ElevationProfile
                hoveredMile={hoveredMile}
                onHoverMile={setHoveredMile}
                onSelectStation={handleSelectStation}
              />
            </div>
          )}

          {activeTab === 'Aid Stations' && (
            <AidStationsTab
              plans={plans}
              onPlanChange={handlePlanChange}
              openIdx={openIdx}
              onOpenIdx={setOpenIdx}
              filter={filter}
              onFilterChange={setFilter}
              search={search}
              onSearchChange={setSearch}
              saveStatus={saveStatus}
              filteredStations={filteredStations}
            />
          )}

          {activeTab === 'Race Summary' && (
            <RaceSummaryTab
              plans={plans}
              onPlanChange={handlePlanChange}
              runnerProfile={runnerProfile}
            />
          )}

          {activeTab === 'Schedule' && <ScheduleTab />}

          {activeTab === 'Required Gear' && <GearTab />}

          {activeTab === 'Key Rules' && <RulesTab />}

          {activeTab === 'Course Info' && <CourseInfoTab />}

          {activeTab === 'Pacing' && (
            <PacingTab
              runnerProfile={runnerProfile}
              onProfileChange={setRunnerProfile}
            />
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 40,
            paddingTop: 16,
            textAlign: 'center',
            fontFamily: "'Inter', sans-serif",
            borderTop: `1px solid ${T.cardBorder}`,
          }}
        >
          <p style={{ fontSize: '0.875rem', color: T.textSecondary }}>
            Cocodona 250 &middot; May 4&ndash;9, 2026 &middot; Organized by{' '}
            <span style={{ color: T.textPrimary, fontWeight: 600 }}>Aravaipa Running</span>
          </p>
        </div>
      </div>
    </div>
  );
}
