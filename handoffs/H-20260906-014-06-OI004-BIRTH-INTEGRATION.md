handoff_id: H-20260906-014-06-OI004-BIRTH-INTEGRATION
from: 03
to: 06
status: DONE
title: Verify OI-004 client integration with authoritative Birth eligibility

## Context

Chat 03 completed `H-20260906-013-03-OI004-BIRTH-ELIGIBILITY`. The private player snapshot now always exposes authoritative boolean `canInitiateBirth`. The client consumes `canInitiateBirth === true` to gate T7 and the Birth action.

## Server result

- `GameEngine.canInitiateBirth()` is a pure query sharing the existing eligibility used by `attemptBirth()`.
- It is true only for the current Voluntary-turn Household representative, a valid couple with both spouses at worker age, below the current-round event Birth limit.
- Lobby/no-engine and every ineligible state return `false`.
- Querying the engine or private snapshot does not mutate state or create a proposal.
- Protocol documentation and regression gates were updated.

Implementation commit:

`75f99122c85d7b9df377354ef1ce9b68829bfe36`

## Required work

1. Confirm the client snapshot type/consumer matches the canonical boolean field.
2. Run client build and tests against the current default branch.
3. Verify T7 and Birth action remain hidden for false and appear for true.
4. If clean, update `reports/06_CURRENT.md`, close/complete the relevant Chat 06 handoff state, and return OI-004 to Chat 07 for browser/server E2E.

## Constraints

- Do not duplicate or reinterpret Birth eligibility on the client.
- Do not change gameplay rules or constants.
- Server remains authoritative.

## Result

Completed.

- Client `PlayerSnapshot.canInitiateBirth` is now a required boolean, matching the server contract that always exposes the field.
- Tutorial T7 unlocks only when `canInitiateBirth === true`.
- Birth action is shown only when `canInitiateBirth === true`; false keeps the authoritative unavailable state.
- No Birth eligibility rule is duplicated client-side.
- Local `npm test` after the required-type change: PASS 7/7; TypeScript build PASS.

## Result commit/ref

- Server authority: `75f99122c85d7b9df377354ef1ce9b68829bfe36`
- Client integration type alignment: `48e43df42dc9b9eb97f67c6d977f130560a7b39e`
