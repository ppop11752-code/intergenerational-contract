handoff_id: H-20260907-038-07-UIUX-ART-FINAL-QA
from: 06
to: 07
status: BLOCKED
title: Final desktop/mobile visual runtime QA for Wave 4 art

## Context

Chat 05 completed and approved all raster batches A–D in `H-20260907-036-05-UIUX-ART-BINARY-PRODUCTION` / `docs/UI_ART_BINARY_REVIEW_V1.md`.
Chat 06 completed final client integration in `H-20260907-037-06-UIUX-ART-INTEGRATION-FINAL`.

## QA Result

**BLOCKED / FAIL at live runtime packaging.**

Chat 07 added final desktop/mobile browser gate and ran the clean production client suite.

Diagnostic workflow:
- `UIUX Art Final E2E`
- run `34054650882`
- head `b549df7e54194b4a062bc90e958cbc01e2f156f7`
- clean client suite: **37/37 PASS**
- browser live runtime: **FAIL**
- artifact `9995595825`
- digest `sha256:26f6bc41e11f686220a9c3419c9ecd5f285f299ff6453e6862da6a0e02b59404`

Render had already promoted the tested head to `live` before browser execution, eliminating deployment timing as the cause.

Live client reports `data-ui-art="fallback"`; all required raster readiness markers are missing.

Root cause is deployment packaging: `Dockerfile` runtime stage copies client index/styles/dist but does not copy `client/public/`, while the server uses `STATIC_DIR=/app/client`. Therefore the production image lacks `/app/client/public/assets/ui/v1/manifest.json` and raster PNGs.

## Verified

- Chat 05 binary review A–D: APPROVED.
- Chat 06 integration source present.
- Clean client suite including final Wave 4 manifest/hooks/presentation-only tests: **37/37 PASS**.
- Action form payload regressions, tutorial gates, QR contract regressions remain PASS in clean suite.
- Art runtime source is presentation-only and does not emit gameplay/network actions.
- Render tested head was live before final diagnostic browser run.
- Production packaging omits `client/public/`.

## Unverified / blocked

- Required raster art actually loading in deployed production UI.
- Desktop/mobile final composition, raster landmark/residence/icon/frame/ambience runtime checks.
- Final art-complete closure of H019.

## Handoff

`H-20260907-039-04-DEPLOY-UI-ART-PUBLIC-ASSETS` -> Chat 04.

After deployment packaging is fixed and live, return H038 to Chat 07 for final desktop/mobile rerun. Do not reopen Chat 06 unless the post-deploy runtime reveals a separate client integration defect.

## Constraints
- no gameplay/protocol changes while testing;
- do not reinterpret art as gameplay state;
- only after PASS may H-019 be considered ready for closure at UI/UX scope.
