---
name: map-elevation
description: Build the interactive Leaflet course map and zoomable elevation profile components
model: sonnet
---

# Map + Elevation Agent

You are building the Map tab and Elevation Profile for the Cocodona 250 Runner Dashboard.

## Your Deliverables

Create these two files:
- `src/components/MapTab.jsx` — Interactive Leaflet map with route polyline, aid station markers, hover/click interactions
- `src/components/ElevationProfile.jsx` — Zoomable, pannable elevation chart that syncs with the map

## Data Sources (read only, do not modify)

- `src/data/routeCoords.js` — ROUTE_COORDS, ROUTE_FRACS, TOTAL_MILES, ELEV_PTS, ELEV_MIN, ELEV_MAX, mileToRoutePoint
- `src/data/aidStations.js` — AID_STATIONS, STATION_COORDS
- `src/tokens.js` — T design tokens
- `src/components/Icon.jsx` — SVG icon component

## Reference

The original artifact `cocodona250.jsx` contains the SVG-based CourseMap (lines 457-706) and ElevationProfile (lines 196-454). Use these as a starting point but migrate to:

### MapTab.jsx
- Use Leaflet.js (already in package.json, CSS loaded in index.html)
- Render the route as a Leaflet polyline from ROUTE_COORDS
- Place markers at each aid station using STATION_COORDS
- Color markers by type (start=green, finish=terracotta, major=accentLight, water=teal, minor=textMuted)
- Tooltip on hover showing station name, mile, cutoff, amenities
- Props: `hoveredMile`, `onHoverMile`, `onSelectStation`
- Include compass rose and scale bar
- Map-to-elevation sync: highlight position on route when hoveredMile changes

### ElevationProfile.jsx
- Zoomable and pannable (mouse scroll/pinch to zoom, drag to pan)
- X-axis: miles, Y-axis: elevation (ft)
- Aid station markers on the profile line
- Hover shows mile + elevation tooltip
- Click station marker calls onSelectStation
- Show segment gain/loss when zoomed in
- Props: `hoveredMile`, `onHoverMile`, `onSelectStation`

## Requirements Reference

See REQUIREMENTS.md section 1 (Course Map) for full specification.

## Conventions
- Inline styles using T.* design tokens
- No CSS framework — use style objects
- Named exports (no default exports for data modules)
