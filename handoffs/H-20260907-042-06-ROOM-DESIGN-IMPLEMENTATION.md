handoff_id: H-20260907-042-06-ROOM-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: BLOCKED
title: Implement user-approved Room / World shell V1

## Source
- `docs/UI_ROOM_APPROVED_V1.md`

## Implemented
- world-first shell styling;
- floating Turn Track token treatment + connecting line;
- separate informational minimap surface;
- old Government/Home quick-nav buttons removed;
- zoom controls retained;
- mobile horizontal Turn Track and sheet-ready layout.

## Blocker
`H-20260907-063-03-UI-RESIDENCE-MAP-CONTRACT`.
Current snapshot does not expose authoritative current Residence/location mapping or stable map placement. Client cannot truthfully implement Residence focus, child→parent Residence focus, real minimap markers/viewport, or population-driven settlement placement by inferring from Household/proximity.

No gameplay/map-assignment rule is changed.
