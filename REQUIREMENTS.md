# Cocodona 250 Runner Dashboard — Requirements

## Features

### 1. Course Map
Interactive Leaflet map displaying the full 252.9-mile route with aid station markers. Route rendered from GPS coordinates (RDP-simplified from CalTopo data).

#### Elevation Profile
- Zoomable, pannable elevation chart rendered below (or toggled alongside) the map
- X-axis: distance (miles), Y-axis: elevation (feet)
- Derived from GPS route data with elevation values (GPX/KML source preferred for accuracy; fallback to DEM lookup if coords lack elevation)
- Aid station positions marked on the profile
- Hover/click syncs with the map (highlight corresponding point on route)
- Zoom: mouse scroll or pinch to zoom into a section; drag to pan along the course
- Show current segment gain/loss on zoom

### 2. Aid Stations
Detailed view of all 27 aid stations showing: mile marker, cutoff time, crew/pacer access, drop bags, sleep options, showers, medic availability, gear checks, and food offerings.

### 3. Schedule
Race weekend timeline: packet pickup (Sun May 3), race start (Mon May 4 5:00 AM), and finish celebration (Sat May 9).

### 4. Required Gear
Mandatory carry items (cell phone, GPS device, headlamp, collapsible cup, space blanket, whistle) and cold weather gear required on certain sections (4L water capacity, gloves, warm hat, long sleeve, insulating layer, waterproof jacket).

### 5. Key Rules
Race rules and policies as defined by the Cocodona 250 race organization.

### 6. Course Info
Elevation profile, terrain descriptions, and general course details.

---

## 7. Race Summary Table
A comprehensive, tabular breakdown of the entire race plan by aid station. This is the at-a-glance reference for the runner and crew.

### Columns
| Column | Description |
|---|---|
| Station Name | Aid station name |
| Mile | Cumulative mile marker |
| Leg Distance | Miles from previous station |
| Elevation Gain | Feet gained in the leg |
| Elevation Loss | Feet lost in the leg |
| Net Elevation | Net gain/loss for the leg |
| Station Elevation | Elevation at the aid station (ft) |
| Terrain | Brief description (e.g., "steep rocky descent", "flat runnable jeep road") |
| Target Pace | Pacing engine output (min/mile) for the leg |
| Leg Time | Projected time to complete the leg |
| Arrival Time | Projected arrival (day + clock time) |
| Time at Station | Planned stop duration (resupply, sleep, crew time) |
| Departure Time | Projected departure (arrival + stop time) |
| Cutoff Time | Official race cutoff |
| Buffer to Cutoff | Minutes between projected arrival and cutoff |
| Cumulative Time | Total elapsed time from race start |
| Time of Day | Day/night/dawn/dusk at arrival |
| Weather | Expected conditions for the leg |
| Crew Access | Yes/No |
| Pacer | Yes/No (with notes like "NO PACERS" where applicable) |
| Drop Bag | Yes/No |
| Sleep Plan | Planned sleep at this station (duration, or "—") |
| Notes | Runner/crew free-text notes (gear swaps, nutrition plan, etc.) |

### Behavior
- Populated automatically by the pacing engine based on runner inputs
- Editable cells: Time at Station, Sleep Plan, Notes (overrides recalculate downstream rows)
- Sortable and filterable (e.g., show only crew-accessible stations)
- Color-coded buffer column: green (>60 min), yellow (30-60 min), red (<30 min)
- Printable: clean print-friendly layout for carrying a paper copy during the race

---

## 8. Pacing Engine (drives features 1 & 7)
An adaptive pacing system that calculates target pace per section between aid stations.

### Inputs
- **Terrain difficulty**: elevation profile, trail surface, and technicality per section
- **Distance**: miles between consecutive aid stations
- **Weather conditions**: expected temperature, sun exposure, wind, and precipitation by section and time of day
- **Time of day**: whether the runner hits each section in daylight, dusk/dawn, or darkness
- **Pack/gear weight**: estimated carry weight including water, food, and required gear for the section
- **Fatigue accumulation**: progressive slowdown modeled on cumulative distance and elapsed time
- **Sleep deprivation**: hours since last sleep, planned sleep stops, and cognitive/physical degradation curve

### Typical Weather by Section (early May, central Arizona)
- **Start to Crown King (mi 0-37)**: desert canyon, hot days (85-95F), cool nights (45-55F), low humidity, full sun exposure on ridges
- **Crown King to Whiskey Row (mi 37-76)**: Bradshaw Mtns, moderate temps (60-80F day, 40-50F night), possible afternoon thunderstorms, elevation 5000-7000ft
- **Whiskey Row to Mingus Mtn (mi 76-107)**: Prescott highlands, warm days (70-85F), cool nights (35-50F), wind exposure on Mingus summit (7800ft), potential for rapid weather shifts
- **Mingus to Dead Horse (mi 107-133)**: Verde Valley descent then climb, hot valley floor (85-95F), cooler at elevation, afternoon thermal winds
- **Dead Horse to Sedona (mi 133-159)**: red rock desert, extreme heat potential (90-100F midday), radiant heat off rock, minimal shade, cool nights (45-55F)
- **Sedona to Munds Park (mi 159-190)**: climb from 4500ft to 6500ft, cooler temps (65-80F day, 35-45F night), exposed ridgeline on Schnebly Hill, possible frost at night
- **Munds Park to Flagstaff (mi 190-211)**: ponderosa pine forest, mild days (65-75F), cold nights (25-40F), elevation 6800-7200ft, possible snow/freezing rain
- **Flagstaff to Finish (mi 211-253)**: high plateau then descent, cold mornings (25-35F), warm afternoons (65-75F), exposed sections on Walnut Canyon rim, final descent into Flagstaff

### Time-of-Day Effects
- **Night (8 PM - 5 AM)**: reduced pace from limited visibility, navigation caution; benefit of cooler temps in desert sections
- **Dawn/Dusk (5-7 AM, 6-8 PM)**: transitional light; prime running windows with mild temps
- **Midday (10 AM - 4 PM)**: heat penalty in exposed/low-elevation sections; shade benefit in forested sections
- **Solar load**: direct sun on exposed ridges and desert flats adds effective temperature; tree cover in Bradshaws and Flagstaff forests mitigates

### Pacing Model
The pacing engine produces a target min/mile for each section by applying multipliers to the runner's base flat-road pace:

1. Start with runner's input base pace (e.g., 15:00/mi for a 100-hour target)
2. Apply terrain multiplier (1.0 for flat runnable trail, up to 2.0+ for steep/technical)
3. Apply heat multiplier (1.0 at 60F, scaling up ~2-5% per 10F above 70F)
4. Apply night multiplier (1.05-1.15 depending on terrain technicality)
5. Apply fatigue curve (gradual increase after mile 100, steeper after mile 180)
6. Apply sleep debt factor (degrades pace ~3-5% per 4 hours beyond 24h without sleep)
7. Apply pack weight factor (heavier carry = slower, especially on climbs)

**Output**: projected arrival time at each aid station, with buffer-to-cutoff shown.

---

## 9. Data Backup (Google Drive CSV Export)
Export all personal/runner-specific data to CSV for backup to Google Drive.

### What gets exported
- Runner profile (name, base pace, target finish time, planned sleep stops)
- Pacing plan (per-section target pace, projected arrival times, cutoff buffers)
- Custom gear/nutrition notes per aid station
- Crew/pacer assignments and notes

### Format
- Single CSV file named `cocodona250-backup-{YYYY-MM-DD}.csv`
- Sections delimited by header rows (e.g., `## Runner Profile`, `## Pacing Plan`, `## Aid Station Notes`)
- Importable back into the dashboard to restore state

### Google Drive Integration
- **Phase 1**: Export CSV via a "Download Backup" button, manual upload to Google Drive
- **Phase 2** (future): Google Drive API integration for direct save/sync

---

## 10. Data Import (Stretch Goal)
Allow loading updated race-provided documents to refresh course data and rules without code changes.

### Supported Imports
- **Runner's Manual (PDF)**: parse and update Key Rules tab and relevant course info; flag changes vs. current data
- **Course JSON/GPX/KML**: replace or update route coordinates, elevation data, and aid station positions; recalculate elevation profile and pacing engine terrain data
- **Aid Station CSV/JSON**: update aid station details (cutoffs, food, crew/pacer access, facilities) in bulk
- **Race schedule updates**: updated start times, cutoff adjustments, new aid stations

### Import Workflow
1. User clicks "Import Data" and selects file(s)
2. Dashboard parses the file and shows a diff preview (what will change)
3. User confirms or cancels
4. Data is merged into the active dashboard state
5. Pacing engine and race summary table automatically recalculate

### File Format Notes
- GPX/KML preferred for route data (includes elevation); fall back to JSON `[lon, lat, ele]` arrays
- CSV aid station imports should match the column schema used by the CSV export (feature 9) for round-trip compatibility
- PDF parsing is best-effort; flag sections that couldn't be extracted for manual review

---

## 11. Testing Strategy

### Unit Tests (Vitest)
- **Pacing engine** (`src/pacing/engine.js`): verify each multiplier in isolation, then end-to-end with known inputs producing expected arrival times and cutoff buffers
- **CSV export** (`src/export/csvExport.js`): generate CSV from known state and assert row/column content
- **Data modules**: sanity checks (aid station count, mile markers monotonically increasing, cutoff times parse correctly, route coords array length)

### Component Tests (Vitest + React Testing Library)
- Each tab component renders without crashing given valid props
- Race Summary Table: editable cells update downstream rows on change
- Aid Station accordion: expand/collapse, filter, search
- Pacing Tab: form inputs feed into engine and update summary

### End-to-End Tests (Playwright)
- Full app boot: Vite dev server starts, page loads, no console errors
- Tab navigation: click each tab, verify content renders
- Map: Leaflet canvas initializes, route polyline visible, station markers clickable
- Elevation profile: renders, zoom/pan responds to mouse events
- Pacing flow: enter base pace → race summary populates → arrival times are sane (before cutoffs with default inputs)
- CSV export: click download button, verify file downloads with expected filename pattern
- Print layout: race summary table renders in print media query without overflow

### Build Validation
- `npm run build` succeeds with zero errors after each merge
- No TypeScript/ESLint errors (zero-warning policy on CI-relevant rules)
- Bundle size check: warn if `dist/` exceeds 500KB gzipped (excluding map tiles)

### Test Execution
```
npm run test          # Vitest unit + component tests
npm run test:e2e      # Playwright end-to-end tests
npm run lint          # ESLint check
npm run format:check  # Prettier check
npm run build         # production build validation
```

---

## 12. Admin & Tooling

### Linting & Formatting
- ESLint with `eslint-plugin-react` and `eslint-plugin-react-hooks`
- Prettier for consistent formatting (2-space indent, single quotes, trailing commas)
- Config files: `.eslintrc.cjs`, `.prettierrc`
- Enforced in Phase 0 so all agents produce consistent code

### Branch Strategy
- `main` — stable, always builds
- Phase 1 agents work in isolated worktrees on branches: `phase1/map-elevation`, `phase1/aid-stations`, `phase1/static-tabs`, `phase1/pacing-summary-export`
- Merge order: static-tabs → aid-stations → map-elevation → pacing-summary-export (least to most conflict risk)
- Build validation after each merge before proceeding to the next

### Dependency Management
- All known dependencies added in Phase 0 (`react`, `react-dom`, `vite`, `leaflet`, `vitest`, `@testing-library/react`, `playwright`, `eslint`, `prettier`)
- If a Phase 1 agent needs an additional package, it adds to `package.json` in its branch; the integrator reconciles in Phase 2
