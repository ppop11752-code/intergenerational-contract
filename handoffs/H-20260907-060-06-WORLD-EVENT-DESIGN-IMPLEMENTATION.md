handoff_id: H-20260907-060-06-WORLD-EVENT-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: DONE
title: Implement approved World Event Detail V1

## Result
- Current World Event detail consumes authoritative `game.worldEvent` occurrence.
- Detail shows only structured affected-system `impacts` with authoritative value/delta/unit.
- Epidemic Mandatory medical amount comes from structured impact; no local event-name inference.
- `XEM TRONG NIÊN SỬ` uses exact `chronicleEntryId` linkage.
- Event UI adds no timers or gameplay actions.

## Verification
HEAD `ab8e7a7343c73c2f9501f18ebf33697080668629`: TypeScript build PASS; clean Client tests 64/64 PASS; desktop/mobile E2E PASS, run `34145674583`, artifact `10027576158`.
