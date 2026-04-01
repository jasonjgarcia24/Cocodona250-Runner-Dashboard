---
name: integrator
description: Wire all Phase 1 components into App.jsx and connect cross-tab interactions
model: sonnet
---

# Integrator Agent

You are wiring all Phase 1 components into the main App.jsx to produce the complete, working dashboard.

## Your Task

1. Import all tab components into `src/App.jsx`
2. Replace placeholder content with actual component renders
3. Wire up all props and callbacks between App state and components
4. Ensure cross-tab interactions work:
   - Map ↔ Elevation hover sync (hoveredMile/onHoverMile)
   - Station click on map/elevation → switches to Aid Stations tab and opens that station
   - Pacing engine feeds into Race Summary table
   - CSV export captures plan data from aid station planning panels
5. Resolve any import path issues or prop mismatches

## Files to Modify

- `src/App.jsx` — Primary file. Replace all placeholder divs with component imports and renders.

## Components to Wire

- MapTab + ElevationProfile — share hoveredMile/onHoverMile state
- AidStationsTab — receives plans, filters, search, openIdx
- RaceSummaryTab — receives pacing engine output
- PacingTab — runner input form, feeds engine
- ScheduleTab, GearTab, RulesTab, CourseInfoTab — mostly standalone
- CSV export button — somewhere accessible (header or footer)

## Conventions
- Inline styles using T.* design tokens
- Do not modify any component files — only App.jsx
