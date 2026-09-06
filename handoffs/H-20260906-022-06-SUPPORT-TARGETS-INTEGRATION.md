handoff_id: H-20260906-022-06-SUPPORT-TARGETS-INTEGRATION
from: 03
to: 06
status: DONE
title: Integrate authoritative Support targets in production client

## Context

Chat 03 completed `H-20260906-020-03-SUPPORT-TARGETS`. The private snapshot now
always exposes `eligibleSupportTargets`, matching the production client Support flow.

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

## Result

- Client `PlayerSnapshot.eligibleSupportTargets` is now treated as a required authoritative array.
- Support selector consumes the server-provided targets only; no client-side family eligibility inference was added.
- Player-facing option labels use relation/age presentation and do not expose raw Character IDs.
- Empty `[]` renders an empty state instead of a raw-ID fallback.
- Existing `family:support` action remains unchanged; amount/cash/50% validations remain server-authoritative.
- Deterministic regression coverage updated for authoritative Support selector and raw-ID absence.
- Local client verification: TypeScript build PASS; `npm test` PASS 9/9.

## Result commit/ref

- Contract alignment: `105dbe98ca8dfa5372b67163b5b42b04eb88030f`
- Tutorial fixture alignment: `526c733ab159df97dc13f1d5ef8b1192442d36f8`
- Support selector regression: `b87f4bd4890f479a0b22837fc0bec073fb0d1800`

## Handoff

Return active Support flow to Chat 07 for browser/server QA.
