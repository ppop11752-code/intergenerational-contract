handoff_id: H-20260907-025-03-UIUX-DISPLAY-CONTRACT
from: 06
to: 03
status: DONE
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

## Result

Completed by Chat 03.

- Public `game.eventName` now exposes the current World Event or `null`.
- Private `mandatoryQuote` is available only to the current player during
  Mandatory and exposes the canonical charge breakdown plus projected resource
  liquidation, bankruptcy, shortfall and dominant-cost facts.
- Private `recoveryQuotes` is available only to the current player during
  Voluntary and exposes per-grade cost/unit, current pool, carrying capacity,
  pending-next-round units and remaining capacity.
- Private `statusQuote` is available only to the current Household representative
  during Status and exposes all three fees/affordability plus current Noble slot,
  priority, fallback-fee and potential-refund facts.
- Lobby and out-of-phase private snapshots return `null`/empty quote shapes.
- Engine actions reuse the same pure quote helpers for Mandatory liquidation,
  Recovery cost and Status fee; no gameplay rule or constant changed.

Verification:

- Backend `npm run release:check`: PASS.
- Rule Ledger 42/42, OI-002 6/6, OI-001 9/9: PASS.
- UI/UX display contract regression: PASS, including action parity and no side effects.
- Fuzz 20 games and final simulation 30 games: PASS.
- Nested server typecheck/build and Socket event contract 9/9: PASS.
- Current client build/tests before field integration: PASS 18/18.

Implementation commit: `9222968e2aba9970cd2f7038b9b901b304f40a89`.

Follow-up: `H-20260907-028-06-UIUX-DISPLAY-INTEGRATION`.
