import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { T } from '../tokens';
import {
  ROUTE_COORDS,
  ROUTE_FRACS,
  TOTAL_MILES,
  ELEV_PTS,
  mileToRoutePoint,
} from '../data/routeCoords';
import { AID_STATIONS, STATION_COORDS } from '../data/aidStations';

/**
 * Interpolate elevation at a given mile marker from ELEV_PTS.
 */
const interpElev = (mile) => {
  for (let i = 1; i < ELEV_PTS.length; i++) {
    if (ELEV_PTS[i][0] >= mile) {
      const [m0, e0] = ELEV_PTS[i - 1];
      const [m1, e1] = ELEV_PTS[i];
      const t = (mile - m0) / (m1 - m0);
      return Math.round(e0 + t * (e1 - e0));
    }
  }
  return ELEV_PTS[ELEV_PTS.length - 1][1];
};

/**
 * Create a Leaflet circle marker icon with the given color and radius.
 */
const createStationIcon = (color, radius, isEndpoint = false) => {
  const size = radius * 2 + 4;
  const svgStr = isEndpoint
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
         <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="${color}" stroke="#fff" stroke-width="2"/>
       </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
         <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="${color}" stroke="rgba(30,16,10,0.4)" stroke-width="1"/>
       </svg>`;
  return L.divIcon({
    html: svgStr,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

/**
 * MapTab — Interactive Leaflet map showing the Cocodona 250 course route,
 * aid station markers, and synced hover position from the elevation profile.
 *
 * Props:
 *   hoveredMile   — mile marker currently hovered on elevation profile (or null)
 *   onHoverMile   — callback(mile) when user hovers over the map route
 *   onSelectStation — callback(index) when user clicks an aid station marker
 */
export const MapTab = ({ hoveredMile, onHoverMile, onSelectStation }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const hoverMarkerRef = useRef(null);
  const hoverTooltipRef = useRef(null);
  const stationMarkersRef = useRef([]);
  const [_tooltip, setTooltip] = useState(null);

  // Initialize Leaflet map
  useEffect(() => {
    if (mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true,
    });

    // Tile layer — OpenTopoMap for terrain context
    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      attribution:
        'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="https://opentopomap.org">OpenTopoMap</a>',
    }).addTo(map);

    // Convert route coords to Leaflet [lat, lng] format
    const routeLatLngs = ROUTE_COORDS.map(([lon, lat]) => [lat, lon]);

    // Route glow (shadow polyline)
    L.polyline(routeLatLngs, {
      color: 'rgba(176,58,16,0.25)',
      weight: 8,
      lineCap: 'round',
      lineJoin: 'round',
      interactive: false,
    }).addTo(map);

    // Main route polyline
    const routeLine = L.polyline(routeLatLngs, {
      color: T.accent,
      weight: 3.5,
      lineCap: 'round',
      lineJoin: 'round',
      interactive: true,
    }).addTo(map);

    // Fit bounds to route
    map.fitBounds(routeLine.getBounds(), { padding: [30, 30] });

    // Route hover — find nearest mile on mousemove
    routeLine.on('mousemove', (e) => {
      const latlng = e.latlng;
      let bestIdx = 0;
      let bestDist = Infinity;
      for (let i = 0; i < ROUTE_COORDS.length; i++) {
        const dlat = ROUTE_COORDS[i][1] - latlng.lat;
        const dlng = ROUTE_COORDS[i][0] - latlng.lng;
        const d = dlat * dlat + dlng * dlng;
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      }
      const mile = ROUTE_FRACS[bestIdx] * TOTAL_MILES;
      if (onHoverMile) onHoverMile(mile);
    });

    routeLine.on('mouseout', () => {
      if (onHoverMile) onHoverMile(null);
    });

    // Aid station markers
    const markers = [];
    AID_STATIONS.forEach((station, i) => {
      const coords = STATION_COORDS[station.mile];
      if (!coords) return;

      const isStart = i === 0;
      const isFinish = i === AID_STATIONS.length - 1;
      const isMajor = station.crew || station.sleep || station.medic;
      const isWater = station.name === 'Water Station';

      const color = isStart
        ? T.green
        : isFinish
          ? T.accent
          : isWater
            ? T.teal
            : isMajor
              ? T.accentLight
              : T.textMuted;

      const radius = isStart || isFinish ? 8 : isMajor ? 6 : isWater ? 4 : 5;
      const isEndpoint = isStart || isFinish;

      const icon = createStationIcon(color, radius, isEndpoint);

      const marker = L.marker([coords[1], coords[0]], {
        icon,
        zIndexOffset: isStart || isFinish ? 1000 : isMajor ? 500 : 0,
      }).addTo(map);

      // Build tooltip content
      const amenities = [];
      if (station.crew) amenities.push('Crew');
      if (station.pacer) amenities.push('Pacer');
      if (station.dropBag) amenities.push('Drop Bag');
      if (station.sleep) amenities.push(`Sleep (${station.sleep})`);
      if (station.shower) amenities.push('Shower');
      if (station.medic) amenities.push('Medic');

      const labelPrefix = isStart ? 'START' : isFinish ? 'FINISH' : `Mi ${station.mile}`;
      const tooltipContent = `
        <div style="font-family: 'Inter', sans-serif; font-size: 12px; line-height: 1.4;">
          <div style="font-weight: 700; color: ${isStart ? T.green : isFinish ? T.accent : T.textPrimary}; margin-bottom: 2px;">
            ${labelPrefix} &middot; ${station.name}
          </div>
          ${station.cutoff ? `<div style="color: ${T.textSecondary}; font-size: 11px;">Cutoff: ${station.cutoff}</div>` : ''}
          ${amenities.length > 0 ? `<div style="color: ${T.textMuted}; font-size: 11px; margin-top: 2px;">${amenities.join(' &middot; ')}</div>` : ''}
          ${station.food ? `<div style="color: ${T.textMuted}; font-size: 10px; margin-top: 2px; font-style: italic;">${station.food.length > 50 ? station.food.slice(0, 50) + '...' : station.food}</div>` : ''}
        </div>
      `;

      marker.bindTooltip(tooltipContent, {
        direction: 'top',
        offset: [0, -radius - 4],
        className: 'station-tooltip',
        opacity: 0.97,
      });

      marker.on('click', () => {
        if (onSelectStation) onSelectStation(i);
      });

      marker.on('mouseover', () => {
        setTooltip({ stationIdx: i });
      });

      marker.on('mouseout', () => {
        setTooltip(null);
      });

      markers.push(marker);
    });

    stationMarkersRef.current = markers;

    // Hover position marker (invisible until hoveredMile is set)
    const hoverMarker = L.circleMarker([0, 0], {
      radius: 6,
      fillColor: T.accent,
      fillOpacity: 0.9,
      color: '#fff',
      weight: 2,
      interactive: false,
    });
    hoverMarkerRef.current = hoverMarker;

    // Hover tooltip
    hoverTooltipRef.current = L.tooltip({
      permanent: true,
      direction: 'right',
      offset: [10, 0],
      className: 'hover-tooltip',
      opacity: 0.95,
    });

    // Scale bar
    L.control.scale({ imperial: true, metric: true, position: 'bottomleft' }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync hover marker position when hoveredMile changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const hoverMarker = hoverMarkerRef.current;
    const hoverTooltip = hoverTooltipRef.current;
    if (!map || !hoverMarker) return;

    if (hoveredMile != null) {
      const [lon, lat] = mileToRoutePoint(hoveredMile);
      const latlng = L.latLng(lat, lon);
      const elev = interpElev(hoveredMile);

      hoverMarker.setLatLng(latlng);
      if (!map.hasLayer(hoverMarker)) {
        hoverMarker.addTo(map);
      }

      // Update tooltip
      const tooltipContent = `<div style="font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600;">Mi ${hoveredMile.toFixed(1)}</div><div style="font-family: 'Inter', sans-serif; font-size: 10px; color: ${T.textSecondary};">${elev.toLocaleString()}' elev</div>`;
      hoverMarker.unbindTooltip();
      hoverMarker.bindTooltip(tooltipContent, {
        permanent: true,
        direction: 'right',
        offset: [10, 0],
        className: 'hover-tooltip',
        opacity: 0.95,
      });
    } else {
      if (map.hasLayer(hoverMarker)) {
        map.removeLayer(hoverMarker);
      }
    }
  }, [hoveredMile]);

  const legendItems = [
    { color: T.accent, label: 'Course route', type: 'line' },
    { color: T.green, label: 'Start', type: 'dot', size: 10 },
    { color: T.accent, label: 'Finish', type: 'dot', size: 10 },
    { color: T.accentLight, label: 'Major aid station', type: 'dot', size: 8 },
    { color: T.teal, label: 'Water station', type: 'dot', size: 6 },
    { color: T.textMuted, label: 'Minor station', type: 'dot', size: 6 },
  ];

  return (
    <div>
      {/* Section header */}
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
          Course Map
        </div>
        <div style={{ fontSize: '11px', fontStyle: 'italic', color: T.textMuted }}>
          252.9 miles &middot; Black Canyon City to Flagstaff
        </div>
      </div>

      {/* Map container */}
      <div
        style={{
          borderRadius: '12px',
          overflow: 'hidden',
          border: `1.5px solid ${T.cardBorder}`,
        }}
      >
        <div
          ref={mapRef}
          style={{
            width: '100%',
            height: '500px',
          }}
        />
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginTop: '10px',
          fontSize: '12px',
          fontFamily: "'Inter', sans-serif",
          color: T.textSecondary,
          padding: '0 4px',
        }}
      >
        {legendItems.map(({ color, label, type, size }) => (
          <span
            key={label}
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            {type === 'line' ? (
              <span
                style={{
                  display: 'inline-block',
                  width: '14px',
                  height: '3px',
                  borderRadius: '2px',
                  background: color,
                }}
              />
            ) : (
              <span
                style={{
                  display: 'inline-block',
                  width: `${size}px`,
                  height: `${size}px`,
                  borderRadius: '50%',
                  background: color,
                  border:
                    label === 'Start' || label === 'Finish'
                      ? '2px solid white'
                      : 'none',
                  boxShadow:
                    label === 'Start' || label === 'Finish'
                      ? '0 0 0 1px rgba(30,16,10,0.3)'
                      : 'none',
                }}
              />
            )}
            {label}
          </span>
        ))}
        <span style={{ color: T.textMuted, fontStyle: 'italic' }}>
          Hover route for mile marker &middot; Click station for details
        </span>
      </div>

      {/* Tooltip styles injected via a style element */}
      <style>{`
        .station-tooltip {
          background: rgba(228,210,170,0.97) !important;
          border: 1px solid ${T.accent}80 !important;
          border-radius: 8px !important;
          padding: 6px 10px !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;
        }
        .station-tooltip::before {
          border-top-color: rgba(228,210,170,0.97) !important;
        }
        .hover-tooltip {
          background: rgba(228,210,170,0.95) !important;
          border: 1px solid ${T.accent}80 !important;
          border-radius: 6px !important;
          padding: 4px 8px !important;
          box-shadow: 0 2px 6px rgba(0,0,0,0.12) !important;
        }
        .hover-tooltip::before {
          border-right-color: rgba(228,210,170,0.95) !important;
        }
      `}</style>
    </div>
  );
};

export default MapTab;
