# OPEN ISSUES — CURRENT

Updated for GitHub canonical baseline on 2026-09-08.

## OI-001 — Marriage proposal lifecycle

**Status:** CLOSED — VERIFIED.

Rule authoritative A1+B1+C1 has been independently verified by Chat 08 against artifact SHA-256:

`a896c69cd186fbe6cb6cf7db780c25e341e683fd8545175b9e1df1c43b46b11f`

Verified coverage includes lifecycle, timing, invalidation, disconnect/NPC takeover behavior, authoritative accept ordering, active-set/history behavior, test-gate integration, typecheck, 42/42 Rule Ledger regression, 6/6 OI-002 regression, 9/9 OI-001 regression, fuzz 20 games, and simulation 30 games.

Legacy Vitest expectations were subsequently updated under `H-20260908-087-02-LEGACY-VITEST-MAINTENANCE`; 10 files / 30 tests PASS and the suite is now included in `release:check`.

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

## OI-005 — Render/GitHub server tree deployment mismatch

**Status:** CLOSED — SOURCE TREE VERIFIED.

Owner: 04 — DEPLOYMENT & DEVOPS.

The original Render failure was caused by the repository lacking nested `server/src` for the Dockerfile COPY step. The current canonical backend at `server/backend/` now contains the required server source tree and deployment mapping has been verified.

Live Render settings and runtime success are tracked under OI-006.

## OI-006 — Dependency-backed live server runtime verification

**Status:** CLOSED — RELEASE QA VERIFIED.

Chat 04 verified the Render build and live dependency-backed runtime. Chat 03 obtained a successful external `/health` response and passed live WebSocket Socket.IO smoke for create/join/start/state, disconnect/reconnect, `game:replay` routing, authoritative error acks, and public/private state emissions. Chat 07 independently validated release compatibility and kept OI-006 closed.

## OI-007 — Residence identity and lifecycle implementation

**Status:** CLOSED — VERIFIED.

D-053 and the Rule Ledger define stable Residence identity, authoritative Character `currentResidenceId`, creation/marriage/child/adulthood transitions, sibling behavior, presentation-only stable coordinates, and the exact `empty → abandoned → reclaimed` lifecycle while keeping Economic Household distinct from Residence.

Implementation sequence completed:

- Chat 02 implemented canonical Residence state/lifecycle and regression coverage.
- Chat 03 exposed authoritative Residence/map/snapshot/protocol state.
- Chat 06 integrated Residence/Family/map/Chronicle UI without client inference.
- Chat 07 production QA passed backend gate, clean Client 68/68, and desktop/mobile Residence navigation.
- Chat 08 independently audited D-053 across Rule Ledger, engine, protocol, Client and regression coverage and returned PASS under H-20260907-072-08-RESIDENCE-LIFECYCLE-AUDIT.

Verified constraints include no property ownership, sale, house inheritance, Residence reuse, gameplay-distance mechanic, Household/Residence conflation or hidden Persona exposure. Reclaimed Residence IDs leave active map/navigation but remain authoritative and history-addressable.

Final closure handoff: `H-20260908-077-00-CLOSE-OI007-RESIDENCE`.

## Current blocking status

No blocking Open Issue remains in OI-001 through OI-007.

The Project has passed final release assessment and official `v1.0.0` publication.

## Maintenance status

Previously recorded maintenance debt has been cleared where it affected active tests/fixtures:

- `H-20260908-087-02-LEGACY-VITEST-MAINTENANCE`: DONE; legacy Vitest 30/30 PASS and integrated into `release:check`.
- `H-20260908-088-07-QA-FIXTURE-MAINTENANCE`: DONE; post-H079 Approved UI fixture and E2E PASS.

Older specialist-report prose may remain as historical record; canonical current docs and DONE handoffs supersede stale historical wording.
