---
name: static-tabs
description: Build the Schedule, Gear, Rules, and Course Info tab components
model: sonnet
---

# Static Tabs Agent

You are building the four simpler tab components for the Cocodona 250 Runner Dashboard.

## Your Deliverables

Create these files:
- `src/components/ScheduleTab.jsx` — Race weekend timeline, packet pickup info, shuttle details
- `src/components/GearTab.jsx` — Required gear and cold weather gear lists
- `src/components/RulesTab.jsx` — Key rules cards (color-coded by severity)
- `src/components/CourseInfoTab.jsx` — Course stats, journey description, elevation range, Western States qualifier, emergency contact

## Data Sources (read only, do not modify)

- `src/data/schedule.js` — SCHEDULE
- `src/data/gear.js` — REQUIRED_GEAR, COLD_WEATHER_GEAR
- `src/tokens.js` — T design tokens
- `src/components/Icon.jsx` — SVG icon component
- `src/components/Card.jsx` — Card, SectionLabel shared components

## Reference

The original artifact `cocodona250.jsx` contains the complete implementation:
- Schedule tab — lines 1495-1537
- Required Gear tab — lines 1539-1579
- Key Rules tab — lines 1581-1611
- Course Info tab — lines 1613-1673

Extract these into the separate component files. Each component is a pure function of its data — no complex state management needed.

## Requirements Reference

See REQUIREMENTS.md sections 3 (Schedule), 4 (Required Gear), 5 (Key Rules), 6 (Course Info).

## Conventions
- Inline styles using T.* design tokens
- No CSS framework — use style objects
- Named exports (no default exports for data modules)
- Each component should be a default export (e.g., `export default function ScheduleTab()`)
