handoff_id: H-20260907-071-06-RESIDENCE-CLIENT-INTEGRATION
from: 01
to: 06
status: OPEN
blocked_by: H-20260907-070-03-RESIDENCE-SNAPSHOT-MAP-CONTRACT
title: Integrate authoritative Residence lifecycle in client

## Authority

D-053, `docs/RULE_LEDGER.md`, `docs/UI_RESIDENCE_FAMILY_APPROVED_V1.md`, and completed H-070 contract.

## Required work

Bind Residence/Family/map/Chronicle UI to authoritative Residence IDs, current mappings, occupants, coordinates and lifecycle states. Implement normal versus retained Stage2→3 notices and exact abandoned/reclaimed visibility behavior.

Reconcile dependent work in H-055, H-056 and H-059 where Residence state is required.

## Constraints

No client inference, property mechanic, house inheritance, Residence reuse, gameplay-distance meaning or hidden Persona exposure.

## Completion

Record implementation and test evidence, update Chat 06 report, then unblock H-072.
