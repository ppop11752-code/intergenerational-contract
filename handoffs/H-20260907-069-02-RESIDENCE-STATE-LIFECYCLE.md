handoff_id: H-20260907-069-02-RESIDENCE-STATE-LIFECYCLE
from: 01
to: 02
status: OPEN
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

## Completion

Record implementation commit/test evidence, update Chat 02 report, then unblock H-070.
