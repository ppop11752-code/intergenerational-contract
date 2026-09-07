handoff_id: H-20260907-072-08-RESIDENCE-LIFECYCLE-AUDIT
from: 01
to: 08
status: OPEN
title: Independently audit Residence identity and lifecycle

## Authority
D-053 and `docs/RULE_LEDGER.md`.

## Dependency status
H069, H070 and H071 are DONE. H042/H054/H055/H056/H059 Client Residence-dependent integration is also DONE. Independent end-to-end audit is unblocked.

## Required audit
Verify engine, protocol, client and regression evidence for every locked transition, stable identity/history behavior, exact round boundaries, no-duplicate orphan adulthood, independent siblings, unbiased marriage Residence creation and presentation-only coordinates.

Confirm no Household/Residence conflation, client inference, property/house-inheritance/reuse mechanic, gameplay-distance effect or hidden Persona leak.

## Client evidence
- `client/src/residence-ui-v1.ts`
- `client/src/resolved-ui-contracts.ts`
- `client/src/approved-ui-finalize.ts`
- `client/residence-ui-v1.css`
- `client/test/residence-ui-v1.test.mjs`
- `client/test/resolved-ui-contracts.test.mjs`
- automated TypeScript build + clean Client suite 64/64 PASS;
- automated desktop/mobile E2E PASS on HEAD `ab8e7a7343c73c2f9501f18ebf33697080668629`, run `34145674583`, artifact `10027576158`.

## Completion
Issue independent PASS/FAIL evidence, update Chat 08 report and recommend whether OI-007 may close. Do not silently change rules or code.
