handoff_id: H-20260907-042-06-ROOM-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: DONE
title: Implement user-approved Room / World shell V1

## Source
- `docs/UI_ROOM_APPROVED_V1.md`
- completed H063/H070 Residence snapshot contract.

## Result
- World-first shell and floating Turn Track retained.
- Active Residence markers and minimap markers now come from authoritative `residenceDirectory` / `activeMapResidenceIds` and server coordinates.
- Turn Track Character focus resolves authoritative `currentResidenceId`.
- Queue has no local Home marker; reclaimed Residence never returns to active map.
- Minimap viewport responds to existing map zoom without adding gameplay-distance meaning.
- Old duplicate Government/Home quick navigation remains removed.
- Mobile shell remains responsive.

No gameplay/map-assignment rule or protocol was changed.

## Verification
HEAD `ab8e7a7343c73c2f9501f18ebf33697080668629`:
- TypeScript build PASS;
- clean Client tests 64/64 PASS;
- UIUX Art Final E2E desktop/mobile PASS, run `34145674583`, evidence artifact `10027576158`.
