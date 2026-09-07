handoff_id: H-20260908-088-07-QA-FIXTURE-MAINTENANCE
from: 00
to: 07
status: OPEN
title: Update stale Approved UI V1 QA fixture after H079

## Context
Final release assessment is PASS WITH WARNINGS — RELEASE READY. `qa/approved-ui-v1-fixture.mjs` is recorded as maintenance debt because it still reflects the pre-H079 World Event `CHI TIẾT` expectation, while current approved UI requires direct impact rows in the temporary World Event banner.

## Source
- `docs/RELEASE_STATUS.md`
- `docs/UI_WORLD_EVENT_DETAIL_APPROVED_V1.md`
- H-20260908-079-06-WORLD-EVENT-APPROVED-UI-DRIFT
- H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA
- current Approved UI V1 production behavior

## Required work
- Inspect `qa/approved-ui-v1-fixture.mjs` and any directly coupled QA expectations.
- Update or archive stale pre-H079 World Event expectations.
- Ensure current expected behavior is: no separate `CHI TIẾT`/detail layer; authoritative impact rows render directly in the World Event banner; exact Chronicle linkage remains preserved.
- Run the relevant clean Client/QA checks needed to prove the fixture no longer contradicts production/current approved UI.
- Update `reports/07_CURRENT.md`.

## Constraints
- QA maintenance only; no gameplay/UI redesign/protocol changes.
- Do not weaken current H080/H085 acceptance.

## Expected output
- Exact fixture/tests changed or archived.
- Verification evidence.
- Mark this handoff DONE when the stale-fixture maintenance debt is cleared.
