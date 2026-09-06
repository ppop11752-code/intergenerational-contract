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

**Status:** OPEN — IMPLEMENTATION/DEPLOYMENT FIXES VERIFIED; FINAL LIVE BROWSER E2E BLOCKED BY QA ENVIRONMENT.

Owners: 07 — RELEASE & QA for final browser/server verification. Chat 03/04/06 implementation work is complete for the currently known defects.

Resolved implementation/deployment items:

- canonical client and authoritative backend are deployed same-origin on Render;
- Tutorial help recap is non-modal/non-blocking and no longer uses `<dialog>`/`showModal()`;
- server private snapshot exposes authoritative `canInitiateBirth` from engine eligibility;
- Tutorial T7 and Birth action require `canInitiateBirth === true` and do not infer eligibility client-side;
- client build/tests PASS 7/7 per Chat 06.

Current live Render deploy checked by Chat 07:

- URL: `https://intergenerational-contract.onrender.com`
- deploy: `dep-daengk8ou94c739la8ag`
- commit: `e36239684a94887555ef40d7ffadc58085aae415`

Comparison from client alignment commit `48e43df42dc9b9eb97f67c6d977f130560a7b39e` to the current live deploy commit shows only report/handoff changes, not runtime client/server changes.

Remaining verification gap:

Chat 07 attempted to run final live browser/server E2E, but the execution sandbox cannot DNS-resolve `intergenerational-contract.onrender.com`; direct `/` and `/health` attempts fail before HTTP connection. Therefore no new product defect is identified, but final browser page-load, same-origin Socket.IO handshake, Tutorial room entry, live Birth false→true transition, help recap non-blocking behavior under countdown, and full T0–T11 browser progression remain unverified.

Handoff `H-20260906-015-07-OI004-FINAL-E2E` is BLOCKED by QA execution environment, not by a known implementation defect.

## OI-005 — Render/GitHub server tree deployment mismatch

**Status:** CLOSED — SOURCE TREE VERIFIED.

Owner: 04 — DEPLOYMENT & DEVOPS.

The original Render failure was caused by the repository lacking nested `server/src` for the Dockerfile COPY step. The current canonical backend at `server/backend/` now contains `server/src/index.ts`, `server/src/game-room.ts`, and `server/src/contracts.ts`. The current Dockerfile is internally consistent when Render/Docker uses `server/backend/` as its root/build context.

Live Render settings and runtime success are tracked under OI-006.

## OI-006 — Dependency-backed live server runtime verification

**Status:** CLOSED — RELEASE QA VERIFIED.

Chat 04 verified the Render build and live dependency-backed runtime. Chat 03 obtained a successful external `/health` response and passed live WebSocket Socket.IO smoke for create/join/start/state, disconnect/reconnect, `game:replay` routing, authoritative error acks, and public/private state emissions against runtime commit `bbd30f8c08d71903b99462c071f347eca33d042f`.

Chat 07 independently checked the current Render service and latest live deploy. The service is live at `https://intergenerational-contract.onrender.com`; OI-006 remains closed because backend runtime/transport evidence is already compatible with the deployed server source.

## Non-blocking maintenance debt

- Legacy Vitest `.test.ts` suites include expectations from pre-OI-001 behavior (for example an obsolete `marriage` phase and immediate marriage-on-accept). They should be updated, replaced, or archived so future test readers do not mistake them for current normative behavior.
