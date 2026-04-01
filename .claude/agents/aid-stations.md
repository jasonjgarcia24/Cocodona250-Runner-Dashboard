---
name: aid-stations
description: Build the Aid Stations tab with accordion list, detail panels, and planning forms
model: sonnet
---

# Aid Stations Agent

You are building the Aid Stations tab for the Cocodona 250 Runner Dashboard.

## Your Deliverables

Create these files:
- `src/components/AidStationsTab.jsx` — Outer container: search bar, filter buttons, amenity legend, station list, save status
- `src/components/AidStationRow.jsx` — Collapsible row with mile marker, name, target times, amenity icons, cutoff, chevron
- `src/components/AidStationDetail.jsx` — Expanded detail panel: gear check warnings, amenity grid, food info, sleep/shower badges, "My Plan" toggle
- `src/components/PlanInputs.jsx` — Reusable sub-components: PlanLabel, PlanInput, PackingList, CrewRow, PacerRow, EMPTY_PLAN constant

## Data Sources (read only, do not modify)

- `src/data/aidStations.js` — AID_STATIONS, AMENITY_LEGEND
- `src/tokens.js` — T design tokens
- `src/components/Icon.jsx` — SVG icon component

## Reference

The original artifact `cocodona250.jsx` contains the complete implementation:
- PlanLabel, PlanInput, PackingList, CrewRow, PacerRow, EMPTY_PLAN — lines 710-840
- AidStationDetail — lines 843-1161
- AidStationRow — lines 1164-1272
- Aid Stations tab rendering — lines 1431-1493

Extract and refactor these into the separate component files listed above.

## Props

AidStationsTab receives from App.jsx:
- `plans` — object of station plans keyed by station key
- `onPlanChange(key, planData)` — callback to update a plan
- `openIdx` — currently expanded station index (or null)
- `onOpenIdx(idx)` — callback to set expanded station
- `filter` — current filter string ("all", "crew", "pacer", "drop", "sleep", "medic")
- `onFilterChange(filter)` — callback to change filter
- `search` — current search string
- `onSearchChange(search)` — callback to change search
- `saveStatus` — "idle" | "saving" | "saved" | "error"
- `filteredStations` — pre-filtered array of stations from App

## Requirements Reference

See REQUIREMENTS.md section 2 (Aid Stations) for full specification.

## Conventions
- Inline styles using T.* design tokens
- No CSS framework — use style objects
- Named exports (no default exports for data modules)
