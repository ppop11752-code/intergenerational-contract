# RELEASE STATUS — CURRENT

## Overall

**Not release-ready yet.** Core gameplay consistency issues OI-001 and OI-002 are now independently verified and closed, but the complete canonical source tree has not yet been migrated into GitHub and several release/integration issues remain open.

## Closed / verified

- OI-001 marriage proposal lifecycle: CLOSED / independently verified.
- OI-002 inflation scarcity combined formula: CLOSED / independently verified.

## Remaining blockers / gaps

- OI-003 protocol helper drift (`game:replay`).
- OI-004 dedicated Tutorial guidance.
- OI-005 deployment tree mismatch / Render re-verification.
- OI-006 dependency-backed live server runtime verification.
- Complete canonical server/client source migration into this GitHub repository is not finished.

## Non-blocking maintenance debt

Legacy Vitest `.test.ts` suites contain expectations from pre-OI-001 behavior. They should be updated/replaced/archived, but they do not reopen OI-001 and are not the current normative regression gate.

## Rule for release claims

Do not call the repository/game release-ready until current canonical source, tests, deployment and integration evidence refer to the same verified commit/tag.
