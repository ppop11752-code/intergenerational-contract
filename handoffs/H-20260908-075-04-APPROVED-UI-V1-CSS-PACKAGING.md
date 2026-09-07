handoff_id: H-20260908-075-04-APPROVED-UI-V1-CSS-PACKAGING
from: 07
to: 04
status: OPEN
title: Package Approved UI V1 CSS files in production Docker image

## Context

Independent H067 QA rerun after H074 source fix still reproduces Residence pointer interception on production.

Fresh evidence:
- workflow `Approved UI V1 E2E`
- run `34149188131`
- head `84b5a0309bc889ce6c3520657e965f3c6ff32473`
- backend release regressions: PASS
- clean client suite: 67/67 PASS, including H074 pointer regression tests
- live browser: FAIL clicking `.residence-map-marker`; `.approved-turn-track` / `.hud-cluster` still intercept pointer events
- artifact `10028775419`, digest `sha256:8f8064804243926bb2cc6e809a32fea2dfeaa7229add3b623717574634d4fa6d`

## Root cause classification

H074 source fix exists in `client/residence-pointer-fix.css` and `client/index.html` loads it after `approved-ui-v1.css`.

However current Docker runtime stage copies only:
- `client/index.html`
- `client/styles.css`
- `client/public`
- compiled `client/dist`

It does NOT copy the additional production CSS files referenced by index.html:
- `client/approved-ui-v1.css`
- `client/residence-pointer-fix.css`
- `client/residence-ui-v1.css`
- `client/resolved-ui-contracts.css`

Thus source/clean tests see H074, while production image does not contain the stylesheet fix. This is deployment/static packaging, not a new Client logic defect.

## Required work

1. Package all CSS files referenced by `client/index.html` into `/app/client` in the production image.
2. Do not alter gameplay, protocol, timer or Approved UI semantics.
3. Build/deploy Render successfully.
4. Verify each referenced CSS URL is served as CSS (not missing/fallback HTML).
5. Smoke the live Residence marker click without forced click/DOM scripting.
6. Update `reports/04_CURRENT.md` and return H067 to Chat 07.

## Impact

H067 remains BLOCKED until production actually serves the Approved UI V1 CSS stack, including the H074 pointer correction.