# 02 — ENGINE & TESTING — CURRENT REPORT

## Status

H-20260908-087-02-LEGACY-VITEST-MAINTENANCE complete and merged to `main`.

## Changed

Maintained all legacy Vitest `.test.ts` suites against the current Rule Ledger without changing gameplay behavior.

Updated stale expectations in:

- `authoritative-room-v8.test.ts`: removed obsolete `marriage` phase and old population-field assumptions;
- `round-flow-v3.test.ts`: accepted marriage now remains pending until end-round settlement; Recovery test follows capacity/next-round timing;
- `turn-order-v4.test.ts`: current `mandatory -> status -> voluntary` flow and ResourceLot-based conversion setup;
- `engine.test.ts`: founder Stage expectation changed from fixed Stage 3 to authoritative Stage 3–5 draw;
- `v32-marriage-ai.test.ts`: removed obsolete immediate marriage/phase helper assumptions and preserved current birth eligibility coverage;
- `economy.test.ts`: current helper signatures and formula-derived expectations;
- `v7-rules.test.ts`: removed obsolete Child Allowance suspension assumption and immigration side effect from pure card-draw coverage.

Retained unchanged after inspection because already valid:

- `economic-v2.test.ts`;
- `government-v11.test.ts`;
- `unbounded-cards-v6.test.ts`.

Added `npm run test:legacy` and included it in `release:check`, preventing these Vitest suites from silently drifting again.

No engine gameplay source, gameplay constants, or Rule Ledger behavior was changed. No test needed archival after cleanup.

## Source

H-20260908-087-02-LEGACY-VITEST-MAINTENANCE, current Rule Ledger, OI-001 A1+B1+C1 lifecycle, current canonical engine/API behavior.

## Impact

Test-maintenance/release-gate only. Future backend release checks now include legacy Vitest as an explicit maintained gate.

## Verified

GitHub Actions run `34159324242` on the maintenance branch:

- Legacy Vitest: 10 files PASS, 30/30 tests PASS;
- Typecheck PASS;
- Rule Ledger regression 42/42 PASS;
- OI-002 regression 6/6 PASS;
- OI-001 regression 9/9 PASS;
- birth/support/UI/lifecycle/world-event contract regressions PASS;
- Residence D-053 regression 10/10 PASS;
- Residence snapshot/map contract PASS;
- fuzz 20 games PASS;
- final simulation 30 games completed;
- full `npm run release:check` PASS.

PR #3 merged to `main`.

Merge commit:
`43a93726f9236b6d83ffc0170db349d6c79e2429`

## Unverified

No additional gameplay or integration verification is required specifically for H087 because no runtime gameplay behavior changed. Downstream release/browser checks remain owned by their existing specialist handoffs.

## Handoff

No new specialist handoff required. Chat 00 can clear the legacy-Vitest maintenance warning from project coordination/release notes if still listed.

## Open Issues

H-20260908-087-02-LEGACY-VITEST-MAINTENANCE is DONE. No gameplay Open Issue was opened or modified by this maintenance work.
