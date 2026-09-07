handoff_id: H-20260907-053-06-BIRTH-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Implement user-approved Birth UX V1

## Source

- `docs/UI_BIRTH_APPROVED_V1.md`
- `docs/UI_VOLUNTARY_APPROVED_V1.md`
- `docs/UI_HUD_APPROVED_V1.md`
- `docs/RULE_LEDGER.md`

## Required implementation

Implement the approved `SINH CON` surface exactly from Birth V1:
- centered proposal-card panel;
- separate `CON #1/#2`, conditional `#3` under authoritative Khuyến sinh max=3;
- proposer per-card `ĐỀ XUẤT SINH CON` → waiting state;
- responder per-card `ĐỒNG Ý / TỪ CHỐI`;
- default-Accept warning appears only when authoritative Voluntary timer <10s;
- locked/unavailable Birth remains discoverable with authoritative reason;
- accepted/rejected/invalidated states must preserve end-round execution semantics;
- no newborn preview before authoritative execution.

## Constraints

- One shared Voluntary 60s timer from HUD; do not create/reset a Birth timer.
- Do not infer eligibility, proposal cap, default Accept, or proposal truth client-side.
- If outgoing proposer proposal state is not exposed sufficiently, create a narrow handoff to Chat 03 rather than maintain client-local proposal truth.
- No gameplay/protocol changes unless separately authorized.

## Verification requested

- Desktop + mobile layout against approved Voluntary shell.
- Proposal #1/#2 and Khuyến sinh #3 paths.
- Responder Accept/Reject and <10s default-Accept warning.
- Invalidated/non-execution state.
- Shared timer does not pause/reset when entering/leaving Birth.
