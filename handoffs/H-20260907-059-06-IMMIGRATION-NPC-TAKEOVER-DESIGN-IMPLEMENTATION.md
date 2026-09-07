handoff_id: H-20260907-059-06-IMMIGRATION-NPC-TAKEOVER-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Implement approved Immigration / NPC Takeover V1 UI

## Source

- `docs/UI_IMMIGRATION_NPC_TAKEOVER_APPROVED_V1.md`
- `docs/UI_WAITING_QUEUE_RECONNECT_APPROVED_V1.md`
- `docs/UI_ROOM_APPROVED_V1.md`
- current authoritative server snapshot / Rule Ledger

## Required implementation

Implement exactly the approved V1 presentation:

1. Immigration uses one short, small non-blocking count notification, not a large banner/modal.
2. New immigrant Residences get a brief subtle map arrival/highlight treatment only.
3. Character detail may show compact `NGƯỜI NHẬP CƯ`; hidden Persona/internal formulas remain hidden.
4. Disconnect takeover uses small `NHÂN VẬT [TÊN] HIỆN DO NPC ĐIỀU KHIỂN` notice.
5. Preserve same Character portrait/name/Residence/history; controller marker changes to NPC.
6. Immigrant and takeover NPC use the same subtle NPC-control visual family; contextual labels may distinguish origin/control history.
7. Multiple routine immigrants aggregate into one notification; takeover notices remain individual.
8. No forced camera movement.

## Hard constraints

- Immigrants never enter Waiting Queue.
- Reconnect never reclaims old Character.
- Do not infer immigration/takeover locally if authoritative fields are missing.
- Do not expose hidden NPC Persona.
- Do not invent new gameplay classes, timers or rules.

## Verification requested

- Test single and multiple immigrant arrivals.
- Test takeover of current/non-current Character.
- Test same Character identity/history preserved after takeover.
- Test reconnect flow still shows old Character NPC-controlled and Human queued.
- Test mobile notification stacking/readability.

## Handoff back

Report implementation gaps or missing authoritative data to Chat 05/03 instead of guessing.
