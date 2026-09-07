handoff_id: H-20260907-064-03-UI-ACTION-LIMITS-REASONS-CONTRACT
from: 06
to: 03
status: OPEN
title: Expose authoritative MAX / disabled-reason contract for approved action surfaces

## Source
- `docs/UI_VOLUNTARY_APPROVED_V1.md`
- `docs/UI_MARKET_APPROVED_V1.md`
- `docs/UI_RECOVERY_APPROVED_V1.md`
- `docs/UI_SUPPORT_APPROVED_V1.md`
- `docs/UI_BIRTH_APPROVED_V1.md`
- `docs/UI_STATUS_APPROVED_V1.md`

## Problem
Client must keep unavailable actions visible with authoritative reason and must not guess economic/action MAX. Current snapshot has quotes and some boolean eligibility but not a general authoritative MAX/reason contract.

## Required narrow contract
Provide side-effect-free UI quote fields where applicable:
- Market per resource card: authoritative purchasable max or null + unavailable reason code/copy-safe key.
- Recovery per grade: authoritative accepted max or null + unavailable reason.
- Voluntary Support per eligible target: authoritative transferable max or null; when no targets, authoritative unavailable reason.
- Birth: explicit proposal slot/cap state for #1/#2/conditional #3 and unavailable reason; proposer outgoing proposal state sufficient for card state.
- Status cards: per-card unavailable reason where `affordable=false` or other server-side restriction applies.

Action execution remains fully authoritative and must still revalidate at action time. No formulas/rules/timers are changed.

## Handoffs blocked/partial
H048, H049, H050, H051, H052, H053.
