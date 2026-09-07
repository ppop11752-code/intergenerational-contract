handoff_id: H-20260907-072-08-RESIDENCE-LIFECYCLE-AUDIT
from: 01
to: 08
status: OPEN
title: Independently audit Residence identity and lifecycle

## Authority
D-053 and `docs/RULE_LEDGER.md`.

## Dependency status
H069, H070 and H071 are DONE. Independent end-to-end audit is now unblocked.

## Required audit
Verify engine, protocol, client and regression evidence for every locked transition, stable identity/history behavior, exact round boundaries, no-duplicate orphan adulthood, independent siblings, unbiased marriage Residence creation and presentation-only coordinates.

Confirm no Household/Residence conflation, client inference, property/house-inheritance/reuse mechanic, gameplay-distance effect or hidden Persona leak.

Client evidence now includes:
- `client/src/residence-ui-v1.ts`
- `client/residence-ui-v1.css`
- `client/test/residence-ui-v1.test.mjs`
- H071 completion record.

## Completion
Issue PASS/FAIL evidence, update Chat 08 report and recommend whether OI-007 may close. Do not silently change rules or code.
