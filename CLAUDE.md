# Cocodona 250 Runner Dashboard

## Overview
A React JSX single-file dashboard for the Cocodona 250-mile ultramarathon race (May 4-9, 2025). Provides runners and crew with aid station details, course map, schedule, required gear, key rules, and course info.

## Tech Stack
- React (JSX, functional components with hooks)
- Single-file app: `cocodona250.jsx`
- Inline styles using design tokens (no CSS framework)
- SVG icons (inline, no external icon library)
- Leaflet.js for map rendering (loaded via CDN)

## Architecture
- All data (aid stations, schedule, gear, route GPS coords) is defined as constants at the top of the file
- Tab-based navigation: Map, Aid Stations, Schedule, Required Gear, Key Rules, Course Info
- Design theme: aged parchment/topographic map aesthetic with terracotta accent (#b03a10)

## Conventions
- Inline styles via style objects and design token constants (`T.*`)
- SVG icons defined in an `Icon` component with a lookup map
- No external dependencies beyond React and Leaflet CDN
