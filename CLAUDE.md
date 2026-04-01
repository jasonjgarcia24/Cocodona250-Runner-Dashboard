# Cocodona 250 Runner Dashboard

## Overview
A local React dashboard for the Cocodona 250-mile ultramarathon (May 4-9, 2025). Provides runners and crew with aid station details, course map, schedule, required gear, rules, adaptive pacing, and CSV data backup.

See [REQUIREMENTS.md](REQUIREMENTS.md) for feature specifications.

## Tech Stack
- React 18 with Vite dev server
- Inline styles using design tokens (no CSS framework)
- SVG icons (inline, no external icon library)
- Leaflet.js for map rendering
- Vitest + React Testing Library for unit/component tests
- Playwright for end-to-end tests
- ESLint + Prettier for code quality

## Local Development

### Setup
```
npm install
npm run dev           # starts Vite dev server, opens in browser
npm run build         # production build to dist/
npm run test          # Vitest unit + component tests
npm run test:e2e      # Playwright end-to-end tests
npm run lint          # ESLint
npm run format:check  # Prettier check
```

### Migration from Artifact
- Original single-file artifact preserved as `cocodona250.jsx` for reference
- Entry point: `src/main.jsx` rendering `<App />`
- Data constants moved to `src/data/`
- Components split by tab/feature into `src/components/`

## Project Structure
```
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── data/
│   │   ├── aidStations.js
│   │   ├── routeCoords.js
│   │   ├── schedule.js
│   │   ├── gear.js
│   │   └── weather.js
│   ├── components/
│   │   ├── MapTab.jsx           # route map + elevation profile
│   │   ├── ElevationProfile.jsx # zoomable elevation chart
│   │   ├── RaceSummaryTab.jsx   # comprehensive aid station table
│   │   ├── AidStationsTab.jsx
│   │   ├── ScheduleTab.jsx
│   │   ├── GearTab.jsx
│   │   ├── RulesTab.jsx
│   │   ├── CourseInfoTab.jsx
│   │   ├── PacingTab.jsx
│   │   ├── ImportData.jsx       # data import modal (stretch)
│   │   └── Icon.jsx
│   ├── pacing/
│   │   └── engine.js           # pacing multiplier logic
│   ├── export/
│   │   └── csvExport.js        # CSV generation and download
│   ├── import/
│   │   └── fileParser.js       # GPX/KML/CSV/JSON/PDF parsing
│   └── tokens.js               # design tokens (T.*)
├── tests/
│   ├── unit/                   # Vitest unit tests
│   ├── components/             # React Testing Library tests
│   └── e2e/                    # Playwright end-to-end tests
├── .eslintrc.cjs
├── .prettierrc
├── playwright.config.js
├── cocodona250.jsx            # original artifact (reference)
├── CLAUDE.md
└── REQUIREMENTS.md
```

## Conventions
- Inline styles via style objects and design token constants (`T.*`)
- SVG icons defined in an `Icon` component with a lookup map
- Data modules export plain JS arrays/objects (no default exports)
