handoff_id: H-20260907-049-04-MANDATORY-5S-DEPLOY
from: 01
to: 04
status: OPEN
title: Apply authoritative 5-second Mandatory timing to deployment

## Context

D-052 locks Mandatory presentation at 5 seconds. Production may override the server default through `MANDATORY_PRESENTATION_MS`.

## Source

- `docs/RULE_LEDGER.md`
- `docs/DECISION_LOG.md` D-052
- H-20260907-048-03-MANDATORY-5S-SERVER

## Required work

- Inspect the deployed environment for `MANDATORY_PRESENTATION_MS`.
- Ensure production resolves to 5,000 ms after Chat 03 implementation.
- Redeploy safely and verify service health.
- Update `reports/04_CURRENT.md`.

## Constraints

- Do not change gameplay semantics or use a client-side workaround.

## Expected output

- Deployment evidence and effective timing configuration.
- Handoff to Chat 07 for live verification.

## Result

Chưa có.

## Result commit/ref

Chưa có.
