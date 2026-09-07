handoff_id: H-20260908-087-02-LEGACY-VITEST-MAINTENANCE
from: 00
to: 02
status: DONE
title: Clean legacy Vitest expectations against current Rule Ledger

## Context
Final release assessment was PASS WITH WARNINGS — RELEASE READY. The non-blocking maintenance debt in legacy `server/backend/test/*.test.ts` has now been cleared.

## Source
- `docs/OPEN_ISSUES.md`
- `docs/RELEASE_STATUS.md`
- OI-001 authoritative A1+B1+C1 lifecycle
- current Rule Ledger and canonical engine tests
- current engine/API behavior on `main`

## Result
All 10 legacy Vitest files were inspected. Useful suites were retained; stale expectations were updated rather than changing authoritative runtime behavior.

Changed:
- `server/backend/test/authoritative-room-v8.test.ts` — removed obsolete marriage-phase/population-field expectations.
- `server/backend/test/round-flow-v3.test.ts` — accepted marriage remains pending until settlement; recovery test respects capacity and next-round timing.
- `server/backend/test/turn-order-v4.test.ts` — current `mandatory -> status -> voluntary` sequence and ResourceLot-based conversion setup.
- `server/backend/test/engine.test.ts` — founder expectation updated from fixed Stage 3 to authoritative Stage 3–5 draw.
- `server/backend/test/v32-marriage-ai.test.ts` — removed obsolete marriage phase/immediate marriage and isolated birth eligibility from old phase helper.
- `server/backend/test/economy.test.ts` — current helper signatures and formula-derived expectations.
- `server/backend/test/v7-rules.test.ts` — removed obsolete assumption that Child Allowance suspends mandatory support and isolated card draw from immigration side effects.
- `server/backend/package.json` — added `test:legacy` and included it in `release:check` so legacy Vitest remains maintained.

Retained unchanged after inspection because they already matched current behavior:
- `economic-v2.test.ts`
- `government-v11.test.ts`
- `unbounded-cards-v6.test.ts`

No gameplay source or constants were changed. No tests were archived because all retained useful coverage after maintenance.

## Verification
GitHub Actions verification run: `34159324242`.

- Legacy Vitest: 10 files PASS, 30/30 tests PASS.
- Typecheck: PASS.
- Rule Ledger regression: 42/42 PASS.
- OI-002 regression: 6/6 PASS.
- OI-001 regression: 9/9 PASS.
- Birth/support/UI/lifecycle/world-event contract suites: PASS.
- Residence D-053: 10/10 PASS.
- Residence snapshot/map contract: PASS.
- Fuzz: 20 games PASS.
- Final simulation: 30 games completed.
- Full `npm run release:check`: PASS.

PR #3 merged to `main`.
Merge commit: `43a93726f9236b6d83ffc0170db349d6c79e2429`.

## Constraints verified
- No gameplay-rule changes.
- Authoritative behavior was not rewritten to satisfy legacy tests.
- Current authoritative regression coverage was not weakened.

## Completion
Maintenance debt cleared. H-20260908-087-02-LEGACY-VITEST-MAINTENANCE is DONE.
