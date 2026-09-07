handoff_id: H-20260907-048-03-MANDATORY-5S-SERVER
from: 01
to: 03
status: DONE
title: Implement authoritative 5-second Mandatory presentation timing

## Context

The user selected B and D-052 now locks Mandatory presentation at 5 seconds. At
handoff intake, server source used `MANDATORY_PRESENTATION_MS ?? 7_000`.

## Source

- `docs/RULE_LEDGER.md`
- `docs/DECISION_LOG.md` D-052
- `docs/UI_MANDATORY_APPROVED_V1.md`
- H-20260907-047-01-MANDATORY-READING-DURATION

## Required work

- Change the authoritative server default to 5,000 ms.
- Preserve environment configurability without allowing client-only timing authority.
- Add/update deterministic timing coverage.
- Confirm Mandatory remains automatic, no skip and not a decision timer.
- Update `reports/03_CURRENT.md`.

## Constraints

- Do not change Mandatory calculations, phase order or UI design.
- Do not add countdown/progress semantics.

## Expected output

- Implementation commit/ref and test evidence.
- Handoff to Chat 04 for deployment and Chat 07 for QA as needed.

## Result

Completed by Chat 03.

- Added one canonical `DEFAULT_MANDATORY_PRESENTATION_MS=5_000` in the
  authoritative room module.
- Both direct `AuthoritativeRoom` construction and the Socket.io server bootstrap
  now use that same default.
- `MANDATORY_PRESENTATION_MS` remains a server environment override and the
  existing minimum clamp remains unchanged.
- Deterministic fake-clock coverage proves the deadline is exactly `now + 5_000`,
  does not advance at 4,999 ms, advances automatically at 5,000 ms, rejects
  `turn:complete` during Mandatory, and still honors an 8,000 ms server override.
- Protocol and server README now identify Mandatory as a 5-second automatic
  presentation with no manual skip and no player-decision timer.
- Mandatory calculations, phase order, action set and UI design were unchanged.

Verification:

- Backend `npm run release:check`: PASS.
- Rule Ledger 42/42, including the new deterministic timer case: PASS.
- OI-002 6/6 and OI-001 9/9: PASS.
- Fuzz 20 games and final simulation 30 games: PASS.
- Nested server typecheck/build and Socket event contract 9/9: PASS.

Deployment dependency remains under `H-20260907-049-04-MANDATORY-5S-DEPLOY`.
The repository `docker-compose.yml` still explicitly sets 7,000 ms and must be
handled by Chat 04; production environment was reported set to 5,000 ms but its
effective LIVE runtime still required verification at the last handoff update.

## Result commit/ref

`5213e871cfa8210985a7772e2e0de50f32080820`
