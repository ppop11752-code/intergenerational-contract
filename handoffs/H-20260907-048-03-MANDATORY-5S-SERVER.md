handoff_id: H-20260907-048-03-MANDATORY-5S-SERVER
from: 01
to: 03
status: OPEN
title: Implement authoritative 5-second Mandatory presentation timing

## Context

The user selected B and D-052 now locks Mandatory presentation at 5 seconds. Current server source uses `MANDATORY_PRESENTATION_MS ?? 7_000`.

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

Chưa có.

## Result commit/ref

Chưa có.
