# OPEN ISSUES — CURRENT

Updated for GitHub canonical baseline on 2026-09-07.

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

`SOCKET_EVENTS` now exposes `replayGame: "game:replay"` and a contract regression test locks the complete authoritative set of 9 transport events. Server typecheck, contract test, and build passed on 2026-09-06.

Implementation commit: `e0e000ad9ec920ade3a73a4cf204b5e1954cd0b4`.

## OI-004 — Dedicated Tutorial guidance

**Status:** CLOSED — RELEASE QA VERIFIED.

Implementation and deployment fixes from Chat 03/04/06 were followed by final browser/server E2E evidence using a GitHub-hosted Playwright runner against the live Render service.

Final live evidence:

- URL: `https://intergenerational-contract.onrender.com`
- workflow: `Live Client E2E`
- run ID: `34039901844`
- head SHA: `8facc98a38b654a30cad24aaf13667c78a529705`
- artifact ID: `9991351341`
- artifact digest: `sha256:172d1160e32cf08e99109343c0eea66764a2d41e1e44c030b01243420e01cbf2`

Release-QA evidence verified by Chat 07:

- live page load PASS;
- same-origin Socket.IO connection PASS;
- Tutorial entry with T0 visible PASS;
- help recap non-blocking while authoritative countdown continued `7s -> 6s` PASS;
- authoritative Birth gating observed live with `canInitiateBirth=false`, no `child:birth` button PASS;
- normal multiplayer has no Tutorial overlay PASS;
- client deterministic regression covers `canInitiateBirth=false/true` T7 behavior and non-modal help;
- server deterministic regression covers Birth eligibility true/false and no-side-effect query/snapshot behavior;
- T0–T11 trigger logic is covered deterministically; a single forced live 32-round playthrough is not required by current release policy.

Compare from runner head `8facc98a38b654a30cad24aaf13667c78a529705` to current `main` showed only report/handoff changes, so browser evidence remains compatible with current runtime client/server source.

## OI-005 — Render/GitHub server tree deployment mismatch

**Status:** CLOSED — SOURCE TREE VERIFIED.

Owner: 04 — DEPLOYMENT & DEVOPS.

The original Render failure was caused by the repository lacking nested `server/src` for the Dockerfile COPY step. The current canonical backend at `server/backend/` now contains the required server source tree and deployment mapping has been verified.

Live Render settings and runtime success are tracked under OI-006.

## OI-006 — Dependency-backed live server runtime verification

**Status:** CLOSED — RELEASE QA VERIFIED.

Chat 04 verified the Render build and live dependency-backed runtime. Chat 03 obtained a successful external `/health` response and passed live WebSocket Socket.IO smoke for create/join/start/state, disconnect/reconnect, `game:replay` routing, authoritative error acks, and public/private state emissions. Chat 07 independently validated release compatibility and kept OI-006 closed.

## OI-007 — Residence identity and lifecycle implementation

**Status:** OPEN — SOURCE LOCKED / IMPLEMENTATION PENDING.

D-053 and the Rule Ledger now define stable Residence identity, Character current-Residence mapping, creation/marriage/child/adulthood transitions, sibling behavior, and the exact empty → abandoned → reclaimed timeline.

Owner sequence: Chat 02 engine state/lifecycle → Chat 03 snapshot/map contract → Chat 06 client integration → Chat 08 independent audit.

This issue is an implementation/verification gate only. It does not reopen OI-001–OI-006 and does not authorize property, inheritance-of-house, real-estate, or gameplay-distance mechanics.

## Current blocking status

OI-007 is OPEN and blocks authoritative Residence/Family runtime completion. OI-001–OI-006 remain CLOSED.

## Non-blocking maintenance debt

- Legacy Vitest `.test.ts` suites include expectations from pre-OI-001 behavior (for example an obsolete `marriage` phase and immediate marriage-on-accept). They should be updated, replaced, or archived so future test readers do not mistake them for current normative behavior.
