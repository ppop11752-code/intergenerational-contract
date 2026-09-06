# INTERGENERATIONAL CONTRACT — PROJECT BASELINE

**Baseline ID:** PB-2026-09-06-v4  
**Owner:** 00 — PROJECT CONTROL  
**Status:** CANONICAL WORKING BASELINE  
**Repository:** `ppop11752-code/intergenerational-contract`  
**Branch:** `main`

## Source authority

When sources conflict:

1. Latest explicit user decision.
2. Current authoritative Rule Ledger.
3. Other current canonical specs / Decision Log.
4. Current verified source code.
5. Tests.
6. AI Specialist Reports.
7. Historical migration summaries / superseded artifacts.

## Explicitly resolved interpretations

- Winner uses `AverageLifeAssetScore` based on HHA, not cash-only scoring.
- No private debt exists; only Government public debt exists.
- Married household pays from shared finances; Tax and ASXH remain calculated per Character and are paid from shared household cash.
- Child may buy/hold Resources before Stage3, but can only produce/convert them into money from Stage3.

## OI-002 — inflation scarcity

**Status: CLOSED — VERIFIED.**

Authoritative formula:

`r_g = clamp(1 - RPool_g / RCapacity_g, 0, 1)`

`n_g = clamp(1 - NPool_g / NInitialPool_g, 0, 1)`

`R = (1680r_L + 2520r_M + 2520r_H) / 6720`

`N = (4900n_L + 7920n_M + 7700n_H) / 20520`

`Scarcity = 0.5R + 0.5N`

Additional rules:

- Pool `0` => tier scarcity `1`.
- Capacity/initial-pool denominators are fixed and must be `>0`.
- Measure at end of round after natural Renewable regeneration.
- Pending Recovery only affects the pool when applied at the start of the next round.

Independent Chat 08 re-audit: PASS. Verified formula, clamp, denominators, engine integration, timing, test integration, typecheck, 42/42 Rule Ledger regression, 6/6 OI-002 regression, fuzz 20 games, simulation 30 games.

## OI-001 — marriage proposal lifecycle

**Status: CLOSED — VERIFIED.**

Rule authoritative A1+B1+C1:

- Each Character may have at most one outgoing `pending` proposal.
- Multiple incoming `pending` proposals are allowed.
- `pending` does not timeout and may persist across rounds.
- `accepted` is binding; Reject/Cancel after accept is not allowed.
- Settlement occurs at end of `acceptedRound`; `createdRound` is history only.
- Loss of eligibility invalidates an active proposal immediately.
- Disconnect / NPC takeover does not invalidate.
- Successful settlement => `executed`; leaves active set but remains in history/state.
- First valid accept in authoritative server processing order wins.

Independent Chat 08 re-audit verified the actual artifact and matched SHA-256:

`a896c69cd186fbe6cb6cf7db780c25e341e683fd8545175b9e1df1c43b46b11f`

Verified directly: `model.ts`, `engine.ts`, `authoritative-room.ts`, OI-001 regression, `package.json`, test-gate integration, settlement timing, invalidation, disconnect/NPC takeover behavior, competing accepts, active set/history, typecheck, 42/42 Rule Ledger regression, 6/6 OI-002 regression, 9/9 OI-001 regression, fuzz 20 games, and simulation 30 games.

Legacy Vitest `.test.ts` suites contain outdated expectations and are non-blocking maintenance debt, not normative OI-001 coverage.

## Canonical backend baseline

**Status: MIGRATED / VERIFIED AGAINST AUDITED ARTIFACT.**

Path:

`server/backend/`

Import commit:

`d5142e6a58b3179517440cc5af3c8c706bcbc9b7`

Source artifact SHA-256:

`a896c69cd186fbe6cb6cf7db780c25e341e683fd8545175b9e1df1c43b46b11f`

Chat 00 checked the GitHub tree after manual bulk upload and matched critical Git blob hashes exactly against the audited artifact, including engine/model/authoritative-room/economy, nested server adapter files, package test gate, OI-001 regression, OI-002 regression and Rule Ledger regression.

This is now the canonical verified backend baseline for subsequent specialist changes.

## Remaining Open Issues

- OI-003 — `SOCKET_EVENTS` helper missing `game:replay`.
- OI-004 — dedicated Tutorial guidance not final.
- OI-005 — Render/GitHub `server/src` deployment mismatch needs re-verification.
- OI-006 — dependency-backed live server runtime verification is a release gate.

## Repository migration state

GitHub is now the long-term shared repository. ChatGPT Project Sources should remain lightweight and point to this repository/version.

Canonical project docs and the independently verified backend source are now in GitHub. Complete verified client source migration/integration is still unfinished, so the repository is not yet the complete release-ready game.
