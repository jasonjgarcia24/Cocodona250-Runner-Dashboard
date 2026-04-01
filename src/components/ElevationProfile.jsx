import { useState, useRef, useCallback, useMemo } from 'react';
import { T } from '../tokens';
import {
  TOTAL_MILES,
  ELEV_PTS,
  ELEV_MIN,
  ELEV_MAX,
} from '../data/routeCoords';
import { AID_STATIONS } from '../data/aidStations';

/**
 * Interpolate elevation at a given mile marker from ELEV_PTS.
 */
const interpElev = (mile) => {
  for (let i = 1; i < ELEV_PTS.length; i++) {
    if (ELEV_PTS[i][0] >= mile) {
      const [m0, e0] = ELEV_PTS[i - 1];
      const [m1, e1] = ELEV_PTS[i];
      const t = (mile - m0) / (m1 - m0);
      return e0 + t * (e1 - e0);
    }
  }
  return ELEV_PTS[ELEV_PTS.length - 1][1];
};

/**
 * Calculate gain and loss between two mile markers.
 */
const calcGainLoss = (mileStart, mileEnd) => {
  let gain = 0;
  let loss = 0;
  const pts = ELEV_PTS.filter(([m]) => m >= mileStart && m <= mileEnd);

  // Include interpolated start/end points
  const startElev = interpElev(mileStart);
  const endElev = interpElev(mileEnd);
  const allPts = [
    [mileStart, startElev],
    ...pts,
    [mileEnd, endElev],
  ];

  // Deduplicate by mile
  const unique = [];
  for (const pt of allPts) {
    if (unique.length === 0 || pt[0] > unique[unique.length - 1][0]) {
      unique.push(pt);
    }
  }

  for (let i = 1; i < unique.length; i++) {
    const diff = unique[i][1] - unique[i - 1][1];
    if (diff > 0) gain += diff;
    else loss += Math.abs(diff);
  }

  return { gain: Math.round(gain), loss: Math.round(loss) };
};

const W = 800;
const H = 220;
const PAD_L = 48;
const PAD_R = 16;
const PAD_T = 18;
const PAD_B = 40;

/**
 * ElevationProfile — Zoomable, pannable SVG elevation chart for the Cocodona 250.
 *
 * Props:
 *   hoveredMile    — mile marker currently hovered (from map or self)
 *   onHoverMile    — callback(mile | null) when hover changes
 *   onSelectStation — callback(index) when user clicks an aid station marker
 */
export const ElevationProfile = ({ hoveredMile, onHoverMile, onSelectStation }) => {
  const [hoveredStation, setHoveredStation] = useState(null);
  const svgRef = useRef(null);
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, viewStart: 0 });

  // Zoom/pan state: viewStart and viewEnd represent the visible mile range
  const [viewRange, setViewRange] = useState({ start: 0, end: TOTAL_MILES });

  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_T - PAD_B;

  const viewStart = viewRange.start;
  const viewEnd = viewRange.end;
  const viewSpan = viewEnd - viewStart;

  // Coordinate transforms for the current view
  const mileToX = useCallback(
    (m) => PAD_L + ((m - viewStart) / viewSpan) * chartW,
    [viewStart, viewSpan, chartW],
  );

  const elevToY = useCallback(
    (el) => PAD_T + (1 - (el - ELEV_MIN) / (ELEV_MAX - ELEV_MIN)) * chartH,
    [chartH],
  );

  const xToMile = useCallback(
    (x) => viewStart + ((x - PAD_L) / chartW) * viewSpan,
    [viewStart, viewSpan, chartW],
  );

  // Build smooth SVG path using cubic bezier
  const { pathD, fillD } = useMemo(() => {
    const visiblePts = ELEV_PTS.filter(([m]) => m >= viewStart - 5 && m <= viewEnd + 5);
    const pts = visiblePts.map(([m, e]) => ({ x: mileToX(m), y: elevToY(e) }));
    if (pts.length < 2) return { pathD: '', fillD: '' };

    let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cp1x = prev.x + (curr.x - prev.x) * 0.4;
      const cp2x = curr.x - (curr.x - prev.x) * 0.4;
      d += ` C ${cp1x.toFixed(1)},${prev.y.toFixed(1)} ${cp2x.toFixed(1)},${curr.y.toFixed(1)} ${curr.x.toFixed(1)},${curr.y.toFixed(1)}`;
    }

    const lastPt = pts[pts.length - 1];
    const firstPt = pts[0];
    const fill =
      d +
      ` L ${lastPt.x.toFixed(1)},${(PAD_T + chartH).toFixed(1)} L ${firstPt.x.toFixed(1)},${(PAD_T + chartH).toFixed(1)} Z`;

    return { pathD: d, fillD: fill };
  }, [viewStart, viewEnd, mileToX, elevToY, chartH]);

  // Dynamic Y-axis ticks
  const yTicks = useMemo(() => {
    const ticks = [];
    for (let el = 2000; el <= 8000; el += 1000) {
      if (el >= ELEV_MIN && el <= ELEV_MAX) ticks.push(el);
    }
    return ticks;
  }, []);

  // Dynamic X-axis mile ticks based on zoom
  const xTicks = useMemo(() => {
    const span = viewEnd - viewStart;
    let step;
    if (span > 200) step = 50;
    else if (span > 100) step = 25;
    else if (span > 50) step = 10;
    else if (span > 20) step = 5;
    else if (span > 10) step = 2;
    else step = 1;

    const ticks = [];
    const first = Math.ceil(viewStart / step) * step;
    for (let m = first; m <= viewEnd; m += step) {
      ticks.push(Math.round(m * 10) / 10);
    }
    // Always include the endpoints if visible
    if (viewStart <= 0 && !ticks.includes(0)) ticks.unshift(0);
    if (viewEnd >= TOTAL_MILES && !ticks.includes(TOTAL_MILES))
      ticks.push(TOTAL_MILES);
    return ticks;
  }, [viewStart, viewEnd]);

  // Landmark labels
  const landmarks = useMemo(
    () =>
      [
        { mile: 36.6, label: 'Crown King', dy: -8 },
        { mile: 110, label: 'Mingus Mtn', dy: -8 },
        { mile: 132.5, label: 'Verde Valley', dy: 14 },
        { mile: 175.7, label: 'Schnebly Hill', dy: -8 },
        { mile: 252.9, label: 'Flagstaff', dy: -8 },
      ].filter((lm) => lm.mile >= viewStart && lm.mile <= viewEnd),
    [viewStart, viewEnd],
  );

  // Segment gain/loss for the visible range (shown when zoomed in)
  const segmentStats = useMemo(() => {
    if (viewSpan >= TOTAL_MILES * 0.9) return null;
    return calcGainLoss(viewStart, viewEnd);
  }, [viewStart, viewEnd, viewSpan]);

  // Zoom level indicator
  const zoomLevel = useMemo(() => {
    const ratio = TOTAL_MILES / viewSpan;
    if (ratio <= 1.1) return null;
    return `${ratio.toFixed(1)}x`;
  }, [viewSpan]);

  // Mouse event handlers
  const getSvgX = useCallback(
    (e) => {
      const svgEl = svgRef.current;
      if (!svgEl) return PAD_L;
      const rect = svgEl.getBoundingClientRect();
      return (e.clientX - rect.left) * (W / rect.width);
    },
    [],
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (isPanning.current) {
        const svgEl = svgRef.current;
        if (!svgEl) return;
        const rect = svgEl.getBoundingClientRect();
        const currentX = (e.clientX - rect.left) * (W / rect.width);
        const deltaMile =
          ((panStart.current.x - currentX) / chartW) * viewSpan;
        const newStart = Math.max(
          0,
          Math.min(TOTAL_MILES - viewSpan, panStart.current.viewStart + deltaMile),
        );
        setViewRange({ start: newStart, end: newStart + viewSpan });
        return;
      }

      const rawX = getSvgX(e);
      const clampX = Math.max(PAD_L, Math.min(W - PAD_R, rawX));
      const mile = xToMile(clampX);
      if (mile >= viewStart && mile <= viewEnd && onHoverMile) {
        onHoverMile(Math.max(0, Math.min(TOTAL_MILES, mile)));
      }
    },
    [viewSpan, viewStart, viewEnd, chartW, getSvgX, xToMile, onHoverMile],
  );

  const handleMouseDown = useCallback(
    (e) => {
      if (e.button !== 0) return;
      isPanning.current = true;
      panStart.current = {
        x: getSvgX(e),
        viewStart: viewRange.start,
      };
      e.preventDefault();
    },
    [getSvgX, viewRange.start],
  );

  const handleMouseUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isPanning.current = false;
    if (onHoverMile) onHoverMile(null);
  }, [onHoverMile]);

  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      const svgEl = svgRef.current;
      if (!svgEl) return;

      const rawX = getSvgX(e);
      const clampX = Math.max(PAD_L, Math.min(W - PAD_R, rawX));
      const pivotMile = xToMile(clampX);

      const zoomFactor = e.deltaY > 0 ? 1.15 : 0.87;
      const newSpan = Math.max(10, Math.min(TOTAL_MILES, viewSpan * zoomFactor));

      // Keep pivot mile at same screen position
      const pivotFrac = (clampX - PAD_L) / chartW;
      let newStart = pivotMile - pivotFrac * newSpan;
      let newEnd = newStart + newSpan;

      // Clamp to valid range
      if (newStart < 0) {
        newStart = 0;
        newEnd = newSpan;
      }
      if (newEnd > TOTAL_MILES) {
        newEnd = TOTAL_MILES;
        newStart = Math.max(0, TOTAL_MILES - newSpan);
      }

      setViewRange({ start: newStart, end: newEnd });
    },
    [getSvgX, xToMile, viewSpan, chartW],
  );

  // Reset zoom
  const handleResetZoom = useCallback(() => {
    setViewRange({ start: 0, end: TOTAL_MILES });
  }, []);

  // Cursor from hoveredMile
  const cursor = useMemo(() => {
    if (hoveredMile == null) return null;
    if (hoveredMile < viewStart || hoveredMile > viewEnd) return null;
    return {
      x: mileToX(hoveredMile),
      mile: hoveredMile,
      elev: interpElev(hoveredMile),
    };
  }, [hoveredMile, viewStart, viewEnd, mileToX]);

  // Visible aid stations
  const visibleStations = useMemo(
    () =>
      AID_STATIONS.map((s, i) => ({ ...s, idx: i })).filter(
        (s) => s.mile >= viewStart && s.mile <= viewEnd,
      ),
    [viewStart, viewEnd],
  );

  return (
    <div style={{ marginTop: '16px' }}>
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: T.accentLight,
          }}
        >
          Elevation Profile
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {segmentStats && (
            <span
              style={{
                fontSize: '11px',
                color: T.textSecondary,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Visible: +{segmentStats.gain.toLocaleString()}&apos; / -{segmentStats.loss.toLocaleString()}&apos;
            </span>
          )}
          {zoomLevel && (
            <span
              style={{
                fontSize: '10px',
                fontWeight: 600,
                color: T.accent,
                background: 'rgba(176,58,16,0.1)',
                borderRadius: '4px',
                padding: '1px 6px',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {zoomLevel}
            </span>
          )}
          {zoomLevel && (
            <button
              onClick={handleResetZoom}
              style={{
                fontSize: '10px',
                color: T.textMuted,
                background: 'rgba(140,95,45,0.15)',
                border: `1px solid ${T.cardBorder}`,
                borderRadius: '4px',
                padding: '1px 8px',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Reset
            </button>
          )}
          <span
            style={{
              fontSize: '11px',
              fontStyle: 'italic',
              color: T.textMuted,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            40,667&apos; gain &middot; 35,674&apos; loss
          </span>
        </div>
      </div>

      {/* Chart container */}
      <div
        style={{
          borderRadius: '12px',
          overflow: 'hidden',
          border: `1.5px solid ${T.cardBorder}`,
          background: 'rgba(215,195,155,0.5)',
          position: 'relative',
        }}
      >
        <svg
          ref={svgRef}
          width="100%"
          viewBox={`0 0 ${W} ${H}`}
          style={{ display: 'block', cursor: isPanning.current ? 'grabbing' : 'crosshair' }}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onWheel={handleWheel}
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={T.accent} stopOpacity="0.45" />
              <stop offset="100%" stopColor={T.accentMuted} stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="elevLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={T.green} />
              <stop offset="40%" stopColor={T.accent} />
              <stop offset="100%" stopColor={T.accentLight} />
            </linearGradient>
            <clipPath id="chartClip">
              <rect x={PAD_L} y={PAD_T} width={chartW} height={chartH} />
            </clipPath>
          </defs>

          {/* Y-axis gridlines + labels */}
          {yTicks.map((el) => {
            const y = elevToY(el);
            return (
              <g key={el}>
                <line
                  x1={PAD_L}
                  y1={y}
                  x2={W - PAD_R}
                  y2={y}
                  stroke="rgba(140,95,45,0.18)"
                  strokeWidth={0.5}
                  strokeDasharray="3,3"
                />
                <text
                  x={PAD_L - 4}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize={7.5}
                  fill={T.textMuted}
                  style={{ fontFamily: 'sans-serif' }}
                >
                  {(el / 1000).toFixed(0)}k
                </text>
              </g>
            );
          })}

          {/* Axes */}
          <line
            x1={PAD_L}
            y1={PAD_T}
            x2={PAD_L}
            y2={PAD_T + chartH}
            stroke={T.cardBorder}
            strokeWidth={1}
          />
          <line
            x1={PAD_L}
            y1={PAD_T + chartH}
            x2={W - PAD_R}
            y2={PAD_T + chartH}
            stroke={T.cardBorder}
            strokeWidth={1}
          />

          {/* X-axis mile ticks */}
          {xTicks.map((m) => {
            const x = mileToX(m);
            if (x < PAD_L - 5 || x > W - PAD_R + 5) return null;
            return (
              <g key={m}>
                <line
                  x1={x}
                  y1={PAD_T + chartH}
                  x2={x}
                  y2={PAD_T + chartH + 4}
                  stroke={T.cardBorder}
                  strokeWidth={1}
                />
                <text
                  x={x}
                  y={PAD_T + chartH + 14}
                  textAnchor="middle"
                  fontSize={7.5}
                  fill={T.textMuted}
                  style={{ fontFamily: 'sans-serif' }}
                >
                  {m === TOTAL_MILES ? Math.round(m) : m}
                </text>
              </g>
            );
          })}

          {/* X-axis label */}
          <text
            x={PAD_L + chartW / 2}
            y={H - 2}
            textAnchor="middle"
            fontSize={7}
            fill={T.textMuted}
            style={{ fontFamily: 'sans-serif' }}
          >
            miles
          </text>

          {/* Y-axis label */}
          <text
            x={10}
            y={PAD_T + chartH / 2}
            textAnchor="middle"
            fontSize={7}
            fill={T.textMuted}
            transform={`rotate(-90, 10, ${PAD_T + chartH / 2})`}
            style={{ fontFamily: 'sans-serif' }}
          >
            elevation (ft)
          </text>

          {/* Clipped chart area for the elevation profile */}
          <g clipPath="url(#chartClip)">
            {/* Area fill */}
            {fillD && <path d={fillD} fill="url(#elevGrad)" />}

            {/* Profile line */}
            {pathD && (
              <path
                d={pathD}
                fill="none"
                stroke="url(#elevLine)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Landmark labels */}
            {landmarks.map(({ mile, label, dy }) => {
              const x = mileToX(mile);
              const el = interpElev(mile);
              const y = elevToY(el);
              return (
                <g key={label}>
                  <line
                    x1={x}
                    y1={y + (dy > 0 ? 3 : -3)}
                    x2={x}
                    y2={y + dy * 0.7}
                    stroke={T.textMuted}
                    strokeWidth={0.5}
                    strokeDasharray="2,2"
                  />
                  <text
                    x={x}
                    y={y + dy + (dy > 0 ? 8 : 0)}
                    textAnchor="middle"
                    fontSize={7}
                    fill={T.textSecondary}
                    fontStyle="italic"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {label}
                  </text>
                </g>
              );
            })}

            {/* Aid station markers on profile */}
            {visibleStations.map((s) => {
              const x = mileToX(s.mile);
              const isStart = s.idx === 0;
              const isFinish = s.idx === AID_STATIONS.length - 1;
              const isMajor = s.crew || s.sleep || s.medic;
              const color = isStart
                ? T.green
                : isFinish
                  ? T.accent
                  : isMajor
                    ? T.accentLight
                    : 'rgba(140,95,45,0.4)';
              const tickH = isStart || isFinish ? 8 : isMajor ? 5 : 3;
              const el = interpElev(s.mile);
              const y = elevToY(el);

              return (
                <g
                  key={`${s.name}-${s.mile}`}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredStation(s.idx)}
                  onMouseLeave={() => setHoveredStation(null)}
                  onClick={() => onSelectStation && onSelectStation(s.idx)}
                >
                  {/* Hit area */}
                  <circle cx={x} cy={y} r={10} fill="transparent" />
                  {/* Dot on profile line */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isStart || isFinish ? 4 : isMajor ? 2.5 : 1.5}
                    fill={color}
                    stroke={isStart || isFinish ? 'rgba(30,16,10,0.5)' : 'none'}
                    strokeWidth={1}
                  />
                  {/* Bottom tick */}
                  <line
                    x1={x}
                    y1={PAD_T + chartH}
                    x2={x}
                    y2={PAD_T + chartH + tickH}
                    stroke={color}
                    strokeWidth={isStart || isFinish ? 1.5 : 1}
                  />
                </g>
              );
            })}
          </g>

          {/* Cursor scrubber */}
          {cursor && (
            <g pointerEvents="none">
              <line
                x1={cursor.x}
                y1={PAD_T}
                x2={cursor.x}
                y2={PAD_T + chartH}
                stroke={T.accent}
                strokeWidth={1}
                strokeDasharray="3,2"
                opacity={0.7}
              />
              <circle
                cx={cursor.x}
                cy={elevToY(cursor.elev)}
                r={4}
                fill={T.accent}
                stroke="white"
                strokeWidth={1.5}
              />
              {/* Cursor tooltip */}
              {(() => {
                const bw = 90;
                const bh = 30;
                const bx = Math.min(
                  cursor.x + 8,
                  W - PAD_R - bw - 4,
                );
                const by = PAD_T + 6;
                return (
                  <g>
                    <rect
                      x={bx}
                      y={by}
                      width={bw}
                      height={bh}
                      rx={4}
                      fill="rgba(228,210,170,0.95)"
                      stroke={T.accent}
                      strokeWidth={0.8}
                      opacity={0.95}
                    />
                    <text
                      x={bx + bw / 2}
                      y={by + 11}
                      textAnchor="middle"
                      fontSize={8.5}
                      fontWeight="bold"
                      fill={T.textPrimary}
                      style={{ fontFamily: 'sans-serif' }}
                    >
                      Mi {cursor.mile.toFixed(1)}
                    </text>
                    <text
                      x={bx + bw / 2}
                      y={by + 23}
                      textAnchor="middle"
                      fontSize={8}
                      fill={T.textSecondary}
                      style={{ fontFamily: 'sans-serif' }}
                    >
                      {Math.round(cursor.elev).toLocaleString()}&apos; elev
                    </text>
                  </g>
                );
              })()}
            </g>
          )}

          {/* Hovered station tooltip */}
          {hoveredStation !== null &&
            (() => {
              const s = AID_STATIONS[hoveredStation];
              if (!s || s.mile < viewStart || s.mile > viewEnd) return null;
              const x = mileToX(s.mile);
              const el = interpElev(s.mile);
              const y = elevToY(el);
              const isStart = hoveredStation === 0;
              const isFinish = hoveredStation === AID_STATIONS.length - 1;
              const bw = 130;
              const bh = 36;
              const bx = Math.min(Math.max(PAD_L, x - bw / 2), W - PAD_R - bw - 4);
              const by = Math.max(PAD_T + 4, y - bh - 10);
              return (
                <g pointerEvents="none">
                  <rect
                    x={bx}
                    y={by}
                    width={bw}
                    height={bh}
                    rx={4}
                    fill="rgba(228,210,170,0.97)"
                    stroke={T.accent}
                    strokeWidth={0.8}
                  />
                  <text
                    x={bx + bw / 2}
                    y={by + 12}
                    textAnchor="middle"
                    fontSize={8}
                    fontWeight="bold"
                    fill={isStart ? T.green : isFinish ? T.accent : T.textPrimary}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {s.name.length > 22 ? s.name.slice(0, 22) + '\u2026' : s.name}
                  </text>
                  <text
                    x={bx + bw / 2}
                    y={by + 24}
                    textAnchor="middle"
                    fontSize={7.5}
                    fill={T.textSecondary}
                    style={{ fontFamily: 'sans-serif' }}
                  >
                    Mi {s.mile} &middot; {Math.round(el).toLocaleString()}&apos; &middot;{' '}
                    {s.cutoff || 'no cutoff'}
                  </text>
                </g>
              );
            })()}
        </svg>
      </div>

      {/* Footer hints */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginTop: '8px',
          fontSize: '12px',
          fontFamily: "'Inter', sans-serif",
          color: T.textMuted,
          fontStyle: 'italic',
          padding: '0 4px',
        }}
      >
        <span>Hover for elevation</span>
        <span>Scroll to zoom</span>
        <span>Drag to pan</span>
        <span>Click station markers for details</span>
      </div>
    </div>
  );
};

export default ElevationProfile;
