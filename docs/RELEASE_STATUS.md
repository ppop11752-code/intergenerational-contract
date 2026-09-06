# RELEASE STATUS — CURRENT

## Overall

**Not release-ready yet.** Backend gameplay/protocol/deployment blockers OI-001, OI-002, OI-003, OI-005 and OI-006 are now closed/verified. The remaining release blocker tracked in Open Issues is OI-004, together with completion and verification of the client side and full integration/E2E release gate.

## Closed / verified

- OI-001 marriage proposal lifecycle: CLOSED / independently verified.
- OI-002 inflation scarcity combined formula: CLOSED / independently verified.
- OI-003 protocol helper drift (`game:replay`): CLOSED / verified.
- OI-005 deployment source-tree mismatch: CLOSED / source-tree verified.
- OI-006 dependency-backed live server runtime: CLOSED / release QA verified.
- Canonical backend source migration into GitHub: COMPLETE / verified against audited artifact.

Canonical backend import commit:

`d5142e6a58b3179517440cc5af3c8c706bcbc9b7`

Canonical backend path:

`server/backend/`

Live backend service:

`https://intergenerational-contract.onrender.com`

Latest live deploy independently checked by Chat 07 during OI-006 validation:

`b33379595303f7f594184f8e1de468cdab853f7d`

Transport-tested compatible runtime:

`bbd30f8c08d71903b99462c071f347eca33d042f`

## Remaining blockers / gaps

- OI-004 dedicated Tutorial guidance.
- Complete verified client source migration / implementation / integration is not finished.
- Client↔server end-to-end and full-system regression/release gate have not yet passed.

## Non-blocking maintenance debt

Legacy Vitest `.test.ts` suites contain expectations from pre-OI-001 behavior. They should be updated/replaced/archived, but they do not reopen OI-001 and are not the current normative regression gate.

## Rule for release claims

Do not call the repository/game release-ready until current canonical backend, client, tests, deployment and integration evidence refer to the same verified commit/tag or explicitly compatible verified commits, and Chat 07 has completed the final integration/E2E release gate.
