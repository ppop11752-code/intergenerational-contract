handoff_id: H-20260907-056-06-WAITING-QUEUE-RECONNECT-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Implement approved Waiting Queue / Reconnect UX V1

## Source

- `docs/UI_WAITING_QUEUE_RECONNECT_APPROVED_V1.md`
- `docs/UI_LANDING_APPROVED_V1.md` updated reconnect wording
- `docs/RULE_LEDGER.md`

## Required implementation

Implement exactly the user-approved Q1–Q8 Waiting Queue/Reconnect UX:

1. Landing reconnect card uses `KẾT NỐI LẠI PHÒNG ...` and explicit permanent-NPC/no-reclaim + queue-end explanation.
2. Successful reconnect: short `ĐÃ KẾT NỐI LẠI` card, old Character permanent NPC, authoritative queue position, auto-enter Queue view.
3. Queue view keeps World Map as spectator surface with compact `HÀNG CHỜ #N` panel and public Residence/Government/Niên sử navigation.
4. Show own queue position + Humans ahead; no ETA/full ordered roster by default.
5. Old Character inspectable only as `NHÂN VẬT CŨ · NPC ĐIỀU KHIỂN`; never controllable/current.
6. Human death → short result + `BẠN ĐÃ VÀO HÀNG CHỜ #N` → same spectator Queue view.
7. Late join/non-founder reuse same Queue view with reason-specific context.
8. Queue → newborn assignment: short `MỘT CUỘC ĐỜI MỚI BẮT ĐẦU`, reveal assigned Character/current Residence context, focus camera, enter normal shell.

## Hard constraints

- Disconnect permanently loses Human control of old Character.
- Reconnect inserts Human at end of Waiting Queue and never reclaims old Character.
- Queue order/newborn assignment authoritative server-only.
- No client ETA prediction.
- No current Home/current-Character marker while queued.
- Spectator navigation must not pause/reset authoritative timers.
- If required server fields for queue/newborn/current Residence context are missing, create a narrow Chat 03 handoff; do not invent state locally.

## Acceptance

- No wording anywhere implies resume/reclaim old Character.
- Queue spectator state is visually distinct from active-player state.
- Reason-specific entry states all converge on one Queue UX.
- New-life reveal is brief/non-blocking and uses authoritative assignment.
