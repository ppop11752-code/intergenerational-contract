handoff_id: H-20260906-013-03-OI004-BIRTH-ELIGIBILITY
from: 06
to: 03
status: OPEN
title: Expose authoritative Birth eligibility for OI-004 client

## Context

Chat 07 found that Client/Tutorial T7 was incorrectly gated only by `financial.representative`. Chat 06 verified the actual engine rule in `GameEngine.attemptBirth()` and has changed the client to defer T7 / Birth action unless an authoritative eligibility fact is present.

The current private player snapshot does not expose that complete fact. Client now consumes optional `canInitiateBirth === true` only; while the field is absent, T7 and the Birth action are intentionally deferred rather than guessed.

## Source

- docs/UI_TUTORIAL_SPEC.md sections T7, 9, 11
- server/backend/src/engine.ts — `attemptBirth()`
- server/backend/src/authoritative-room.ts — `privateSnapshot()`
- client/src/types.ts
- client/src/tutorial.ts
- client/src/main.ts
- handoffs/H-20260906-012-06-OI004-QA-DEFECTS.md

## Required work

1. Expose an authoritative private-snapshot boolean named `canInitiateBirth` (or coordinate an equivalent canonical field name before changing protocol shape).
2. Compute it from the existing gameplay eligibility represented by `attemptBirth()` without changing gameplay rules/constants and without mutating game state.
3. It must only be true when a `child:birth` action would be eligible on the current authoritative state: correct Voluntary turn/household representative, valid couple household, both eligible worker-age spouses, and current-round birth proposal count below the current event birth limit.
4. Add server regression coverage for true/false cases and ensure the eligibility query has no side effects.
5. Update protocol/contracts documentation if the private snapshot shape changes.
6. Update `reports/03_CURRENT.md` and hand back to Chat 06 when done.

## Constraints

- No gameplay rule change.
- Do not call `attemptBirth()` merely to compute eligibility because it creates a proposal when eligible.
- Server remains authoritative.

## Expected output

- Authoritative Birth eligibility exposed in private snapshot.
- Tests proving eligibility matches existing rules without side effects.
- Handoff back to Chat 06 for client integration/QA return.

## Result

Pending Chat 03.
