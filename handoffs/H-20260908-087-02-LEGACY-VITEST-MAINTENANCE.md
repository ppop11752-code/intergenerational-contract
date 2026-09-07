handoff_id: H-20260908-087-02-LEGACY-VITEST-MAINTENANCE
from: 00
to: 02
status: OPEN
title: Clean legacy Vitest expectations against current Rule Ledger

## Context
Final release assessment is PASS WITH WARNINGS — RELEASE READY. One non-blocking maintenance debt remains in legacy `server/backend/test/*.test.ts` suites that may contain expectations from pre-OI-001 behavior (for example an obsolete `marriage` phase or immediate marriage-on-accept semantics).

## Source
- `docs/OPEN_ISSUES.md`
- `docs/RELEASE_STATUS.md`
- OI-001 authoritative A1+B1+C1 lifecycle
- current Rule Ledger and current canonical engine tests

## Required work
- Inspect all legacy Vitest `.test.ts` suites under `server/backend/test/`.
- Identify expectations that contradict current Rule Ledger / OI-001–OI-007 behavior.
- Update, replace, or archive stale tests so future readers cannot mistake obsolete behavior for normative behavior.
- Do not weaken current authoritative regression coverage.
- Run the relevant current backend test/release gates after cleanup.
- Update `reports/02_CURRENT.md`.

## Constraints
- No gameplay-rule changes.
- Do not rewrite authoritative behavior to satisfy legacy tests.
- Prefer preserving useful still-valid tests and clearly archiving tests whose historical purpose is no longer normative.

## Expected output
- Exact files changed/archived and rationale.
- Test/release-check evidence.
- Mark this handoff DONE when maintenance debt is cleared.
