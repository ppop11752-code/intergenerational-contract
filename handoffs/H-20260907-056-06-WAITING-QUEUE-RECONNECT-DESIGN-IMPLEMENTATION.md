handoff_id: H-20260907-056-06-WAITING-QUEUE-RECONNECT-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: BLOCKED
title: Implement approved Waiting Queue / Reconnect UX V1

## Source
- `docs/UI_WAITING_QUEUE_RECONNECT_APPROVED_V1.md`
- `docs/UI_LANDING_APPROVED_V1.md`

## Implemented
- Landing reconnect wording now explicitly permanent-NPC/no-reclaim + queue-end;
- Queue view is spectator-oriented with authoritative queue position and Humans-ahead count;
- no ETA and no current Home marker while queued;
- old Character is labeled NPC-controlled and non-reclaimable;
- public Government/Niên sử navigation remains available;
- gameplay actions remain absent in Queue.

## Blockers
- `H-20260907-063-03-UI-RESIDENCE-MAP-CONTRACT` for authoritative old/new Character Residence focus and spectator map navigation.
- `H-20260907-065-03-UI-LIFECYCLE-RESULT-CONTRACT` for reason-specific death/reconnect/new-life transition cards and authoritative newborn/current-Residence reveal.

No queue order/assignment logic is inferred locally.
