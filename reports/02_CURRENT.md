# 02 — ENGINE & TESTING — CURRENT REPORT

## Status

H-20260907-069-02-RESIDENCE-STATE-LIFECYCLE complete and merged to `main`.

## Changed

Implemented authoritative D-053 Residence state/lifecycle without changing gameplay rules:

- independent Residence entity with stable identity;
- server-authoritative Character `currentResidenceId`;
- founder/immigrant/newborn initialization;
- symmetric shared Residence on marriage;
- dependent-child survivor/remarriage placement;
- both-direct-parents-dead Residence retention;
- no duplicate Residence on orphan Stage2→3;
- normal Stage2→3 independent Residence creation;
- sibling transitions remain independent;
- stable presentation-only coordinates;
- exact `empty` → next-round `abandoned` → end-of-next-round `reclaimed` lifecycle;
- reclaimed Residence IDs remain addressable for history but leave active-map selection.

No property ownership, sale, house inheritance, Residence reuse or gameplay-distance mechanic was introduced. Economic Household remains distinct from Residence.

## Source

D-053, `docs/RULE_LEDGER.md`, and H-20260907-069-02-RESIDENCE-STATE-LIFECYCLE.

## Impact

Adds canonical Residence state and lifecycle hooks to the engine. Unblocks Chat 03 handoff H-20260907-070-03-RESIDENCE-SNAPSHOT-MAP-CONTRACT.

## Verified

Implementation merged through PR #2.

Merge commit:
`c6e2415684dcab45b8d66446eaf8a24a50c2f783`

Verified on integrated branch source before merge:

- Typecheck PASS;
- Rule Ledger regression 42/42 PASS;
- OI-002 regression 6/6 PASS;
- OI-001 regression 9/9 PASS;
- configured UI/birth/support/lifecycle/world-event contract regressions PASS;
- Residence D-053 regression 10/10 PASS.

## Unverified

- Chat 03 snapshot/protocol exposure has not yet been implemented.
- Client integration and deployed/browser verification remain downstream.
- Independent Chat 08 Residence lifecycle audit remains downstream under the OI-007 chain.

## Handoff

Chat 03 — H-20260907-070-03-RESIDENCE-SNAPSHOT-MAP-CONTRACT is OPEN and unblocked. Consume canonical Residence state directly; do not infer Residence from Economic Household, parent links or map proximity.

## Open Issues

OI-007 remains open for downstream server/client integration and independent verification. H-069 itself is DONE.
