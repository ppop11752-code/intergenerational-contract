handoff_id: H-20260907-069-02-RESIDENCE-STATE-LIFECYCLE
from: 01
to: 02
status: DONE
title: Implement authoritative Residence state and lifecycle

## Authority

D-053 and `docs/RULE_LEDGER.md`.

## Required work

Implement the locked package without adding gameplay:

- independent Residence entity with stable `residenceId`;
- server-authoritative Character `currentResidenceId`;
- founder/immigrant/newborn initialization;
- marriage shared-Residence creation without proposer/target/order bias;
- direct-parent survivor/remarriage child placement;
- both-direct-parents-dead retention and no-duplicate Stage2→3;
- independent sibling transitions;
- normal Stage2→3 new Residence and stable presentation-only coordinates near parents' current Residence;
- exact `empty` → next-round `abandoned` → end-of-next-round `reclaimed` lifecycle;
- permanent Chronicle/history addressability for reclaimed Residence IDs.

## Constraints

- No property ownership, sale, house inheritance, Residence reuse or gameplay-distance mechanic.
- Preserve Economic Household separation.
- Add deterministic regression tests for every transition and round boundary.

## Result

Implemented and merged to `main` through PR #2.

Merge commit: `c6e2415684dcab45b8d66446eaf8a24a50c2f783`.

Implementation includes canonical Residence state/lifecycle hooks and `server/backend/src/residence.ts`, plus deterministic regression coverage in `server/backend/test/residence-lifecycle-d053.mjs`.

## Verified

Branch CI on the integrated source completed successfully before merge:

- Typecheck PASS;
- Rule Ledger regression 42/42 PASS;
- OI-002 regression 6/6 PASS;
- OI-001 regression 9/9 PASS;
- UI/birth/support/lifecycle/world-event configured contract regressions PASS;
- Residence D-053 regression 10/10 PASS.

## Completion

H-069 complete. H-070 is unblocked for Chat 03 to expose the authoritative Residence snapshot/map contract.
