handoff_id: H-20260907-056-06-WAITING-QUEUE-RECONNECT-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Implement approved Waiting Queue / Reconnect UX V1

## Source
- `docs/UI_WAITING_QUEUE_RECONNECT_APPROVED_V1.md`
- `docs/UI_LANDING_APPROVED_V1.md`
- H070 Residence contract
- H065 structured lifecycle result contract

## Implemented
- Landing reconnect wording explicitly permanent-NPC/no-reclaim + queue-end;
- Queue spectator view shows authoritative queue position and Humans-ahead count, no ETA/gameplay actions;
- no current Home marker while queued because private `currentResidenceId` is null and Residence UI checks queue state;
- public Residence/Government/Niên sử navigation remains available;
- authoritative active Residence map is now integrated through H071.

## Remaining work
H063/H070 Residence dependency is resolved. H065 server contract is also DONE, but the Client still needs to bind `recentLifecycleResults` for reason-specific death/reconnect/new-life transition cards and authoritative newborn/current-Residence reveal.

No queue order/assignment logic is inferred locally.
