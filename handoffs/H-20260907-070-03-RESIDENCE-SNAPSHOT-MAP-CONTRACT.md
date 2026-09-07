handoff_id: H-20260907-070-03-RESIDENCE-SNAPSHOT-MAP-CONTRACT
from: 01
to: 03
status: OPEN
title: Expose authoritative Residence snapshot and map contract

## Authority

D-053, `docs/RULE_LEDGER.md`, and the completed H-069 implementation.

## Dependency status

H-20260907-069-02-RESIDENCE-STATE-LIFECYCLE is DONE and merged to `main` at `c6e2415684dcab45b8d66446eaf8a24a50c2f783`. This handoff is now unblocked.

## Required work

Expose the minimum typed public/private contract needed by Residence/Family UI:

- stable Residence identity and lifecycle state;
- Character current-Residence mapping;
- current occupants and authoritative family/role references;
- stable server-authored presentation coordinates;
- active-map/current-navigation exclusion after reclaim;
- Chronicle/history linkage that can resolve reclaimed Residence IDs.

Reconcile and complete H-20260907-063.

## Constraints

Client must not infer Residence from Economic Household, parent ID, family relationship or map proximity. Do not expose hidden Persona data.

## Completion

Add contract tests, record commit/evidence, update Chat 03 report, then unblock H-071.
