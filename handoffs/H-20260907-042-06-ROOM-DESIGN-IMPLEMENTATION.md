handoff_id: H-20260907-042-06-ROOM-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Implement user-approved Room / World shell V1

## Source

Canonical approved design spec:
- `docs/UI_ROOM_APPROVED_V1.md`

Supporting source validation/direction:
- `docs/UI_ROOM_SOURCE_VALIDATION_V1.md`
- `docs/UI_ROOM_DIRECTION_V1.md`

Historical V5–V10.1 prototypes and current client baseline are reference only where they do not conflict with the approved V1 spec.

## Required work

Implement the approved Room / World shell only.

Key requirements:
- almost-full-viewport 3/4 top-down world map;
- Government central via radial plaza/architecture/grounds, not fixed overscale;
- balanced natural Residence density and approved settlement/world evolution rules;
- no generic ambient chibi inhabitants;
- selective Residence labels/identity treatment;
- Residence click opens Residence/Family; Government click opens Government;
- desktop Turn Track = individual avatar tokens on left connected by one vertical line through token centers, no large panel background;
- upper-right always-informational minimap, compact ~200×140 target desktop;
- minimap shows useful settlement overview, current camera viewport, Government marker and local Home marker;
- click minimap location to pan/recenter camera;
- click Government/Home markers on minimap for quick camera focus;
- REMOVE standalone Government/Home quick-nav buttons from the World Map;
- keep only compact Zoom In/Zoom Out controls bottom-right, reduced opacity while idle;
- opened world-shell information surfaces float middle-right on desktop and lightly dim but retain the persistent map;
- mobile uses smaller always-informational minimap, horizontal Turn Track and sheet-based surfaces;
- preserve crisp nearest-neighbor/integer-friendly pixel rendering.

## Constraints

- Do not change gameplay rules, room lifecycle, authoritative map/game state, multiplayer protocol, action semantics or timers.
- Do not invent Character world positions from ambient art.
- Do not add duplicate Government/Home quick-nav after minimap integration.
- Do not infer or finalize detailed HUD redesign from this handoff. HUD remains under separate user design approval; only respect its reserved top-space relationship described by the Room spec.
- Existing QA/baseline does not override `docs/UI_ROOM_APPROVED_V1.md`.

## Acceptance

1. Room shell matches `docs/UI_ROOM_APPROVED_V1.md` desktop/mobile structure.
2. Minimap is a real map in default state and never an ordinary collapsed icon/button.
3. Minimap Government/Home markers correctly invoke camera focus with existing navigation semantics.
4. Old standalone Government/Home navigation buttons are absent.
5. Turn Track visual structure matches approved token + center-line treatment and preserves existing focus behavior.
6. Floating panels/map dimming do not alter timers or authoritative interactions.
7. Build/tests for affected client surfaces pass.
8. Update `reports/06_CURRENT.md` and hand back for visual/integration verification as appropriate.
