handoff_id: H-20260907-071-06-RESIDENCE-CLIENT-INTEGRATION
from: 01
to: 06
status: OPEN
title: Integrate authoritative Residence lifecycle in client

## Authority

D-053, `docs/RULE_LEDGER.md`, `docs/UI_RESIDENCE_FAMILY_APPROVED_V1.md`, and completed H-070 contract.

## Dependency status

H070 is DONE at `db271a1e86fd979cb8a085bb032a9833204e8965` plus
`07659f60713f84f0f22a6255901d2c0561424f8c`.
This handoff is unblocked for Chat 06.

## Required work

Bind Residence/Family/map/Chronicle UI to authoritative Residence IDs, current mappings, occupants, coordinates and lifecycle states. Implement normal versus retained Stage2→3 notices and exact abandoned/reclaimed visibility behavior.

Use `game.residenceTransitions[].kind` (`adult_move` / `adult_retained`) for the
two approved Stage2→3 notices; do not derive the variant from local history.

Reconcile dependent work in H-055, H-056 and H-059 where Residence state is required.

## Constraints

No client inference, property mechanic, house inheritance, Residence reuse, gameplay-distance meaning or hidden Persona exposure.

## Completion

Record implementation and test evidence, update Chat 06 report, then unblock H-072.
