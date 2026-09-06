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

**Status:** OPEN — SERVER DEPENDENCY RESOLVED; CLIENT/E2E PENDING.

Owners: 06 — CLIENT IMPLEMENTATION; 07 — QA & RELEASE. Chat 03 server work is complete.

Chat 07 integration QA found:

- current client transport uses same-origin Socket.IO, while the canonical Docker deployment builds only the backend and does not include/serve `client/`; no deployed canonical browser client exists yet for E2E;
- Tutorial help recap uses modal behavior (`showModal()`) although the spec requires non-modal/non-blocking recap;
- Birth/T7 is gated only by household representative state rather than authoritative Birth eligibility, so guidance/action may appear before the feature is actually available.

Chat 06 fixed the non-modal recap and changed the client to require authoritative
`canInitiateBirth === true`. Chat 03 has now exposed that boolean in the private
snapshot from the existing `attemptBirth()` eligibility as a pure, side-effect-free
query. Server implementation commit: `75f99122c85d7b9df377354ef1ce9b68829bfe36`.

Handoffs:

- `H-20260906-011-04-CLIENT-STATIC-DEPLOY` → Chat 04.
- `H-20260906-012-06-OI004-QA-DEFECTS` → Chat 06.
- `H-20260906-013-03-OI004-BIRTH-ELIGIBILITY` → completed by Chat 03.
- `H-20260906-014-06-OI004-BIRTH-INTEGRATION` → Chat 06 integration verification.

After Chat 06 verifies the now-present field against client build/tests, return to
Chat 07 for browser/server integration and E2E release QA. OI-004 remains open.

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
