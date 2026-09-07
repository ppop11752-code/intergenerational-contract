handoff_id: H-20260907-064-03-UI-ACTION-LIMITS-REASONS-CONTRACT
from: 06
to: 03
status: DONE
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

## Result

Completed by Chat 03.

- Private `marketQuotes` exposes six server-calculated `purchasableMax` values or
  null plus stable reasons for Status lock, supply, Cash and spending cap.
- `recoveryQuotes` now includes `acceptedMax` and authoritative capacity/Cash/
  spending-cap reason.
- Eligible Support targets include `transferableMax`; an empty eligible list has
  `supportUnavailableReason=SUPPORT_NO_ELIGIBLE_TARGETS`.
- `birthQuote` exposes proposal cap, conditional third slot, per-slot state,
  proposer outgoing proposals and phase/turn/representative/couple/age/cap reason.
- Status cards now include `unavailableReason` when unaffordable.
- Values are side-effect-free snapshot quotes; actions still revalidate current
  state and concurrent supply at submission.

Regression `ui-action-limits-contract.mjs`: PASS for Market MAX/action parity,
Recovery capacity, Support transfer, Birth 2/3-slot state and Status reasons.

## Result commit/ref

`0d43bd8f73db9fce53617d36bb793a05aed2fcf7`
