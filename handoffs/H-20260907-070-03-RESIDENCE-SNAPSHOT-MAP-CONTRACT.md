handoff_id: H-20260907-070-03-RESIDENCE-SNAPSHOT-MAP-CONTRACT
from: 01
to: 03
status: DONE
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

## Result

Completed by Chat 03.

- `game.residenceDirectory` provides a stable-ID lookup for active and reclaimed
  Residence records, including lifecycle rounds, origin, coordinates, parent
  Residence references, occupants, family references and Residence role keys.
- `game.activeMapResidenceIds`, `activeOnMap` and
  `currentNavigationAllowed` define the authoritative active map/navigation set.
- Public Characters/active room players and private player state expose
  `currentResidenceId`; lobby, death queue and reconnect queue return null Home.
- Bounded `game.residenceTransitions` explicitly distinguishes `adult_move`
  from `adult_retained`, with exact source/destination Residence IDs.
- Reclaimed records remain resolvable but cannot return to active navigation.
- Hidden NPC Persona is excluded, and snapshot generation is side-effect-free.

Regression `residence-snapshot-map-contract.mjs`: PASS for co-resident separate
Households, family/role references, authoritative coordinate parity, both
Stage2→3 notice variants, queue, reconnect NPC takeover, reclamation/history
resolution and no Persona leak.

## Result commit/ref

`db271a1e86fd979cb8a085bb032a9833204e8965` and
`07659f60713f84f0f22a6255901d2c0561424f8c`
