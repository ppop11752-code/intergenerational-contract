# OPEN ISSUES — CURRENT

Updated for GitHub canonical baseline on 2026-09-06.

## OI-001 — Marriage proposal lifecycle

**Status:** CLOSED — VERIFIED.

Rule authoritative A1+B1+C1 has been independently verified by Chat 08 against artifact SHA-256:

`a896c69cd186fbe6cb6cf7db780c25e341e683fd8545175b9e1df1c43b46b11f`

Verified coverage includes lifecycle, timing, invalidation, disconnect/NPC takeover behavior, authoritative accept ordering, active-set/history behavior, test-gate integration, typecheck, 42/42 Rule Ledger regression, 6/6 OI-002 regression, 9/9 OI-001 regression, fuzz 20 games, and simulation 30 games.

Legacy Vitest `.test.ts` files contain outdated expectations and are not normative for OI-001. Cleaning/archiving those tests is tracked as non-blocking maintenance debt, not as an OI-001 blocker.

## OI-002 — Inflation scarcity combined formula

**Status:** CLOSED — VERIFIED.

Independent Chat 08 re-audit passed after direct inspection of the implementation artifact. Formula, timing, clamps, denominators, regression integration, typecheck, legacy regression, fuzz and simulation were verified.

Long-term balance/playtest remains separate from OI-002 consistency closure.

## OI-003 — `SOCKET_EVENTS` helper missing `game:replay`

**Status:** CLOSED — VERIFIED.

`SOCKET_EVENTS` now exposes `replayGame: "game:replay"` and a contract regression
test locks the complete authoritative set of 9 transport events. Server
typecheck, contract test, and build passed on 2026-09-06.

Implementation commit: `e0e000ad9ec920ade3a73a4cf204b5e1954cd0b4`.

## OI-004 — Dedicated Tutorial guidance

**Status:** OPEN — SCOPE GAP.

Owners: 05 — UI/UX & ART; 06 — CLIENT IMPLEMENTATION; 03 if a server tutorial flag is needed.

## OI-005 — Render/GitHub server tree deployment mismatch

**Status:** CLOSED — SOURCE TREE VERIFIED.

Owner: 04 — DEPLOYMENT & DEVOPS.

The original Render failure was caused by the repository lacking nested `server/src` for the Dockerfile COPY step. The current canonical backend at `server/backend/` now contains `server/src/index.ts`, `server/src/game-room.ts`, and `server/src/contracts.ts`. The current Dockerfile is internally consistent when Render/Docker uses `server/backend/` as its root/build context.

Live Render settings and runtime success are intentionally tracked separately under OI-006.

## OI-006 — Dependency-backed live server runtime verification

**Status:** OPEN — RELEASE GATE.

Owners: 04 — DEPLOYMENT & DEVOPS, then 03/07 for integration/release validation.

## Non-blocking maintenance debt

- Legacy Vitest `.test.ts` suites include expectations from pre-OI-001 behavior (for example an obsolete `marriage` phase and immediate marriage-on-accept). They should be updated, replaced, or archived so future test readers do not mistake them for current normative behavior.
