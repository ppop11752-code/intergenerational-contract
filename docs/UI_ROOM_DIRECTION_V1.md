# UI ROOM / WORLD SHELL — DIRECTION V1

Status: USER-CONFIRMED DIRECTION / NOT YET FINAL SCREEN APPROVAL
Date: 2026-09-07
Owner: 05 — UI/UX & ART

## Selected direction

User selected **WSA — Thế giới là màn hình** as the base Room / World shell composition.

## Core direction

- World Map occupies almost the full viewport and remains the primary visual surface.
- HUD, Turn Track, quick navigation and minimap float lightly above the map rather than framing it into a dashboard window.
- Government is a central landmark whose prominence comes from architecture, plaza/grounds, circulation and composition rather than a fixed oversized ratio.
- Residence distribution remains natural and settlement-like.
- Drawers/sheets open above the persistent map; the map remains visible behind them.
- World presentation is bright/lively pixel art with darker fantasy UI chrome.

## Confirmed Room/map semantics

- 3/4 top-down perspective.
- No generic ambient chibi inhabitants walking/idling on the map.
- Human/NPC distinction appears primarily on focus/hover rather than as always-on map clutter.
- Local/current/focused Residence may keep a light persistent label/marker; other Residences show details on hover/focus.
- Clicking Residence opens the Residence/Family drawer directly.
- Government/Home/Zoom quick-nav lives at bottom-right, stays available and reduces opacity when idle.
- Camera may pan a short distance into outer fog and then elastic-return to the useful map region.
- Initial camera shows the whole settlement at a useful overview scale.
- Turn Track stays as a narrow desktop left rail, roughly 5–6 upcoming entries.

## Minimap — hard constraint

The minimap must **not** collapse into an ordinary button/icon in its normal state.

Default/compact state requirements:
- Always visibly renders a real simplified overview of the current settlement/world area.
- Must provide useful spatial information even before any hover/click expansion.
- Should visually indicate the current camera viewport or viewed region.
- May include essential landmark markers such as Government and local Home/Residence, subject to final detail approval.
- Remains compact enough not to compete with the main map.

Expanded state:
- Hover/click/tap may enlarge the minimap or reveal more map detail/navigation affordances.
- Expansion is enhancement only; it must not be required to make the minimap informational.

Exact interactions such as click-to-recenter, drag-on-minimap or marker set are still subject to final Room detail approval.

## Not yet final

Still requires direct user approval before Room V1 can be locked:
- exact desktop spatial proportions;
- Government plaza/world composition;
- Residence density and visual grouping;
- exact Turn Track chrome integration;
- minimap size, information density, expanded interaction and marker set;
- quick-nav icon arrangement relative to minimap;
- drawer anchoring/width and map-dimming behavior;
- mobile/compact Room shell treatment;
- final frame ornament and typography density.

No Room implementation handoff to Chat 06 may be created until these details are approved.
