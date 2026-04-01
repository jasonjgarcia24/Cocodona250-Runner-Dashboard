---
name: pacing-summary-export
description: Build the pacing engine, race summary table, pacing input form, and CSV export
model: sonnet
---

# Pacing + Summary + Export Agent

You are building the pacing engine, race summary table, pacing input form, and CSV export for the Cocodona 250 Runner Dashboard. These features are NEW — they do not exist in the original artifact.

## Your Deliverables

Create these files:
- `src/data/weather.js` — Replace the stub with per-section weather data from REQUIREMENTS.md
- `src/data/terrain.js` — NEW: per-section terrain metadata (difficulty, surface type, technicality, elevation gain/loss)
- `src/pacing/engine.js` — The 7-step pacing multiplier system
- `src/components/RaceSummaryTab.jsx` — Comprehensive table with 22+ columns per aid station
- `src/components/PacingTab.jsx` — Runner input form (base pace, target time, sleep stops, pack weight)
- `src/export/csvExport.js` — CSV generation and download

## Data Sources (read only, do not modify)

- `src/data/aidStations.js` — AID_STATIONS
- `src/data/routeCoords.js` — ELEV_PTS, TOTAL_MILES
- `src/tokens.js` — T design tokens
- `src/components/Icon.jsx` — SVG icon component
- `src/components/Card.jsx` — Card, SectionLabel shared components

## Pacing Engine (src/pacing/engine.js)

Implement the 7-step multiplier model from REQUIREMENTS.md section 8:

1. Start with runner's input base pace (e.g., 15:00/mi)
2. Apply terrain multiplier (1.0 flat → 2.0+ steep/technical)
3. Apply heat multiplier (1.0 at 60F, +2-5% per 10F above 70F)
4. Apply night multiplier (1.05-1.15 depending on technicality)
5. Apply fatigue curve (gradual after mi 100, steeper after mi 180)
6. Apply sleep debt factor (~3-5% per 4h beyond 24h without sleep)
7. Apply pack weight factor (heavier = slower, especially on climbs)

Input: runner profile object { basePace, plannedSleepStops, packWeight, targetFinishTime }
Output: array of section results with { targetPace, legTime, arrivalTime, departureTime, bufferToCutoff, cumulativeTime }

## Race Summary Table (src/components/RaceSummaryTab.jsx)

See REQUIREMENTS.md section 7 for the full 22-column specification. Key features:
- Auto-populated by pacing engine output
- Editable cells: Time at Station, Sleep Plan, Notes (recalculate downstream)
- Color-coded buffer: green (>60min), yellow (30-60min), red (<30min)
- Sortable and filterable
- Print-friendly layout

## CSV Export (src/export/csvExport.js)

Export function that generates `cocodona250-backup-{YYYY-MM-DD}.csv` containing:
- Runner profile section
- Pacing plan per section
- Aid station notes
- Crew/pacer assignments

## Weather Data (src/data/weather.js)

Populate with the section-by-section weather data from REQUIREMENTS.md section 8 ("Typical Weather by Section"). Structure as an array of objects.

## Terrain Data (src/data/terrain.js)

Create per-section terrain metadata derived from the elevation data in routeCoords.js (ELEV_PTS). Include:
- Elevation gain/loss per section
- Difficulty rating (1-5)
- Surface description
- Technicality rating

## Requirements Reference

See REQUIREMENTS.md sections 7 (Race Summary), 8 (Pacing Engine), 9 (CSV Export).

## Conventions
- Inline styles using T.* design tokens
- No CSS framework — use style objects
- Named exports for data/utility modules
- Default exports for React components
