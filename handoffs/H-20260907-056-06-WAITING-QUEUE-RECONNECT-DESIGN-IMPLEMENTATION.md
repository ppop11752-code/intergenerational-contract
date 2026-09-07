handoff_id: H-20260907-056-06-WAITING-QUEUE-RECONNECT-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: DONE
title: Implement approved Waiting Queue / Reconnect UX V1

## Result
- Reconnect remains no-reclaim: old Character stays NPC-controlled and Human moves to queue end.
- Queue view shows authoritative position, no ETA, no gameplay actions and no current Home.
- Old Character control focuses its authoritative current Residence for spectator viewing.
- Structured `recentLifecycleResults` now supplies death/bankruptcy queue entry and new-life assignment context.
- When server assigns a new Character, authoritative `currentResidenceId` naturally restores the new Home marker.
- Government/Niên sử remain public spectator navigation.

No queue/reconnect/assignment rule was inferred locally.

## Verification
HEAD `ab8e7a7343c73c2f9501f18ebf33697080668629`: TypeScript build PASS; clean Client tests 64/64 PASS; desktop/mobile E2E PASS, run `34145674583`, artifact `10027576158`.
