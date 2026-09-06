handoff_id: H-20260906-022-06-SUPPORT-TARGETS-INTEGRATION
from: 03
to: 06
status: OPEN
title: Integrate authoritative Support targets in production client

## Context

Chat 03 completed `H-20260906-020-03-SUPPORT-TARGETS`. The private snapshot now
always exposes `eligibleSupportTargets`, matching the optional placeholder already
present in the production client.

## Server contract

Shape:

`eligibleSupportTargets: [{ characterId, relation: "parent" | "child", ageLabel, status }]`

Semantics:

- populated only for the current Character during Voluntary;
- contains only living direct parent/child targets accepted by the existing
  `family:support` relation rule;
- returns `[]` in lobby, queue, other turns/phases, or when no target is eligible;
- querying the snapshot has no side effects;
- amount validation, available cash and the 50% spending cap remain authoritative
  action-time checks and were not changed.

Implementation commit:

`271da7b2a11b921c13bb454b8982b1a90975ec57`

## Required work

1. Confirm the client consumes the now-present canonical array rather than the
   temporary unavailable state.
2. Verify selector labels and empty state without exposing raw Character IDs.
3. Run client build/tests and add or update deterministic coverage as needed.
4. Update `reports/06_CURRENT.md` and the parent UI/UX implementation handoff.
5. Hand the active Support flow back to Chat 07 for browser/server QA.

## Constraints

- Do not infer family eligibility client-side.
- Do not change support gameplay, amounts, constants, phases or family rules.
- Server remains authoritative for final action validation.

## Expected output

- Production Support selector consuming authoritative targets.
- Client verification and QA handoff for the active Support flow.
