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

Live Render settings and runtime success are tracked under OI-006.

## OI-006 — Dependency-backed live server runtime verification

**Status:** CLOSED — RELEASE QA VERIFIED.

Chat 04 verified the Render build and live dependency-backed runtime. Chat 03 obtained a successful external `/health` response and passed live WebSocket Socket.IO smoke for create/join/start/state, disconnect/reconnect, `game:replay` routing, authoritative error acks, and public/private state emissions against runtime commit `bbd30f8c08d71903b99462c071f347eca33d042f`.

Chat 07 independently checked the current Render service and latest live deploy. The service is still live at `https://intergenerational-contract.onrender.com`; deploy `dep-daemgcp42hec73cgduag` runs commit `b33379595303f7f594184f8e1de468cdab853f7d`. Comparison from the transport-tested runtime to that live commit shows no change in canonical server runtime source, multiplayer protocol, or gameplay source; intervening changes are documentation/handoff plus smoke tooling/package script only.

Chat 07's execution sandbox could not resolve the public hostname, so it did not duplicate the external HTTP/Socket.IO call itself. This does not reopen OI-006 because the prior live transport evidence is compatible with the currently deployed server source and the current Render deploy is independently confirmed live.

## Non-blocking maintenance debt

- Legacy Vitest `.test.ts` suites include expectations from pre-OI-001 behavior (for example an obsolete `marriage` phase and immediate marriage-on-accept). They should be updated, replaced, or archived so future test readers do not mistake them for current normative behavior.
