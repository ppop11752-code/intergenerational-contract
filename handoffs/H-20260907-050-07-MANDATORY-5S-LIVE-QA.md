handoff_id: H-20260907-050-07-MANDATORY-5S-LIVE-QA
from: 04
to: 07
status: OPEN
title: Verify live authoritative 5-second Mandatory timing

## Context

D-052 locks Mandatory presentation at 5 seconds.

Chat 03 completed authoritative source implementation under `H-20260907-048-03-MANDATORY-5S-SERVER`.
Chat 04 completed production deployment alignment under `H-20260907-049-04-MANDATORY-5S-DEPLOY`.

Live service:
`https://intergenerational-contract.onrender.com`

## Source / evidence

- `docs/RULE_LEDGER.md`
- `docs/DECISION_LOG.md` D-052
- `reports/03_CURRENT.md`
- `reports/04_CURRENT.md`
- server implementation commit `5213e871cfa8210985a7772e2e0de50f32080820`
- Docker Compose alignment commit `f6e145093e76bd6ecac228eb7e61df180b2a326f`
- Render deploy `dep-daf9m217lnhs73ffcqpg`
- Render production environment explicitly set `MANDATORY_PRESENTATION_MS=5000`

## Required work

1. Run live browser/server verification against the Render URL.
2. Measure a Mandatory phase from authoritative state transition/deadline and confirm approximately 5 seconds, allowing only normal network/measurement tolerance.
3. Confirm transition is automatic at expiry.
4. Confirm player cannot skip Mandatory early.
5. Confirm Mandatory is not presented/treated as a player decision timer.
6. Verify no regression to phase order or surrounding turn flow.
7. Update `reports/07_CURRENT.md` with exact evidence.

## Constraints

- Do not change gameplay rules in QA.
- Do not use a client-only timer as authoritative evidence.
- Server transition/deadline is authoritative.

## Expected output

- PASS/FAIL with measured live timing evidence.
- Any defect routed to owning Chat by scope.

## Result

Chưa có.
