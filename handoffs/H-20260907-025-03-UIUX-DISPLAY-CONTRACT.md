handoff_id: H-20260907-025-03-UIUX-DISPLAY-CONTRACT
from: 06
to: 03
status: OPEN
title: Expose narrow authoritative display fields for remaining UI/UX surfaces

## Context

Chat 06 continued `H-20260906-019-06-FULL-UIUX-IMPLEMENTATION` against the locked UI baseline. Most structural Wave 2–4 surfaces can now render from existing snapshots, but a few required player-facing details cannot be completed safely because the current snapshot does not expose them directly.

## Verified missing display facts

1. World HUD: current World Event name/state is not exposed in `publicSnapshot()`.
2. Mandatory presentation: no authoritative per-turn breakdown for mandatory charges/liquidation/bankruptcy presentation is exposed to the player snapshot; only aggregate current financial fields are available.
3. Recovery presentation: current snapshot exposes renewable pool but not the authoritative quote needed to show cost/unit and pending-next-round detail before submission.
4. Status presentation: current snapshot does not expose a full authoritative fee/competition/refund quote for the three cards.

## Required work

Determine whether these facts already exist as side-effect-free engine queries/state and, where appropriate, expose the minimum read-only snapshot fields needed for UI presentation.

Do NOT:
- change gameplay rules/constants;
- duplicate calculations only for UI if a canonical engine query already exists;
- add client-derived eligibility or economic calculations.

If one of these fields cannot be exposed without a gameplay decision, report it back rather than inventing semantics.

## Impact

These are display-completion dependencies only. Existing actions/timers/protocol semantics should remain unchanged.
