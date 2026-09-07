handoff_id: H-20260907-060-06-WORLD-EVENT-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Implement user-approved World Event presentation V1

## Source

- `docs/UI_WORLD_EVENT_DETAIL_APPROVED_V1.md`
- `docs/UI_HUD_APPROVED_V1.md`
- `docs/RULE_LEDGER.md`

## Required implementation

Implement World Event UI exactly as approved:

- temporary compact upper-center banner, separate from phase/timer;
- no separate desktop detail-opening surface;
- banner itself contains Event name + concise but specific authoritative impact rows;
- show only affected systems;
- use authoritative numeric values where exposed, including epidemic Mandatory medical fee where available;
- optional `XEM TRONG NIÊN SỬ` navigation to corresponding chronology entry;
- subtle authoritative event ambience only;
- mobile bottom sheet/card is permitted only as responsive reflow of the same banner content, not additional detail.

## Guardrails

- Do not infer effects/numbers/duration from Event name.
- Do not create extra gameplay controls or timers.
- Do not pause/reset/extend authoritative timers.
- If required authoritative event-effect values are missing from the client contract, create a narrow handoff to Chat 03 instead of calculating locally.

## Verification

After implementation, verify desktop/mobile fidelity and interaction with HUD/Voluntary timing; update `reports/06_CURRENT.md`.