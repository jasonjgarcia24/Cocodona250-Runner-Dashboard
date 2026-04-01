# Cocodona 250 Runner Dashboard

A local React dashboard for the [Cocodona 250](https://cocodona.com/) ultramarathon (252.9 miles, May 4-9, 2025). Built for runners and crew to plan, pace, and execute race day.

## Features

- **Interactive Course Map** — Leaflet map with full GPS route and clickable aid station markers
- **Zoomable Elevation Profile** — SVG chart synced with the map, showing gain/loss per segment
- **Aid Station Details** — All 27 stations with cutoffs, crew/pacer access, food, sleep, gear checks
- **Personal Race Plan** — Per-station planning: target times, drop bag contents, crew, pacers, nutrition, sleep strategy
- **Adaptive Pacing Engine** — Target pace per section factoring terrain, weather, fatigue, sleep debt, and pack weight
- **Race Summary Table** — Comprehensive at-a-glance table with arrival times, cutoff buffers, and editable fields
- **CSV Backup** — Export your race plan for Google Drive backup
- **Schedule, Gear, Rules, Course Info** — Everything from the runner's manual in one place

## Quick Start

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Tech Stack

| | |
|---|---|
| **Framework** | React 18 + Vite |
| **Map** | Leaflet.js |
| **Styling** | Inline styles with design tokens (parchment/topographic theme) |
| **Icons** | Inline SVG |
| **Testing** | Vitest + React Testing Library + Playwright |
| **Linting** | ESLint + Prettier |

## Scripts

```bash
npm run dev           # Vite dev server
npm run build         # Production build
npm run test          # Unit + component tests
npm run test:e2e      # Playwright e2e tests
npm run lint          # ESLint
npm run format:check  # Prettier check
```

## Project Structure

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Tab shell + state management
├── tokens.js             # Design tokens (T.*)
├── data/                 # Race data modules
│   ├── aidStations.js    # 27 aid stations + coordinates
│   ├── routeCoords.js    # GPS route + elevation points
│   ├── schedule.js       # Race weekend timeline
│   ├── gear.js           # Required gear lists
│   ├── weather.js        # Per-section weather data
│   └── terrain.js        # Per-section terrain metadata
├── components/           # Tab components
│   ├── MapTab.jsx        # Leaflet course map
│   ├── ElevationProfile.jsx
│   ├── AidStationsTab.jsx
│   ├── RaceSummaryTab.jsx
│   ├── PacingTab.jsx
│   ├── ScheduleTab.jsx
│   ├── GearTab.jsx
│   ├── RulesTab.jsx
│   └── CourseInfoTab.jsx
├── pacing/
│   └── engine.js         # Pacing multiplier logic
└── export/
    └── csvExport.js      # CSV generation
```

## Race Overview

**Black Canyon City → Flagstaff** | 252.9 miles | 40,667' gain | 125-hour cutoff

The course traverses the Sonoran Desert, Bradshaw Mountains, Prescott, Mingus Mountain, Jerome, Sedona red rocks, Schnebly Hill, and the Ponderosa Pine forests of Flagstaff.

## License

Personal use. Race data sourced from the [Cocodona 250 Runner's Manual](https://cocodona.com/).
