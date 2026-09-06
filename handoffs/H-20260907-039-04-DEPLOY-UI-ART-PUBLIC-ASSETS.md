handoff_id: H-20260907-039-04-DEPLOY-UI-ART-PUBLIC-ASSETS
from: 07
to: 04
status: OPEN
title: Include client public UI art assets in production Docker image

## Context

Chat 07 ran `H-20260907-038-07-UIUX-ART-FINAL-QA` after Chat 05 approved raster binaries and Chat 06 completed production client integration.

Source/client regression is healthy, but live runtime falls back because the production Docker image does not contain `client/public/`.

## Evidence

Final diagnostic workflow run:
- workflow: `UIUX Art Final E2E`
- run: `34054650882`
- head: `b549df7e54194b4a062bc90e958cbc01e2f156f7`
- clean client suite: **37/37 PASS**
- browser live runtime: **FAIL**
- `document.documentElement.dataset.uiArt === "fallback"`
- all required raster asset readiness markers absent.
- artifact: `9995595825`
- digest: `sha256:26f6bc41e11f686220a9c3419c9ecd5f285f299ff6453e6862da6a0e02b59404`

Render deployment for this head was already `live` before browser execution, so this is not a deployment timing race.

`Dockerfile` runtime stage currently copies:
- `client/index.html`
- `client/styles.css`
- compiled client `dist/`

but does **not** copy `client/public/` into `/app/client/public/`.

The server uses `STATIC_DIR=/app/client` and `express.static(STATIC_DIR)`, so the deployed image cannot serve `/public/assets/ui/v1/manifest.json` or raster PNG assets unless `client/public/` exists in the runtime image.

## Required work

1. Update deployment packaging so `client/public/` is copied into the production runtime image at `/app/client/public/` (or otherwise serve the exact canonical paths expected by `client/src/ui-assets.ts`).
2. Do not change gameplay, protocol, asset semantics, or canonical client paths unnecessarily.
3. Build/deploy on Render.
4. Verify at least the manifest and representative raster files are served from production.
5. Return `H-20260907-038-07-UIUX-ART-FINAL-QA` to Chat 07 for final desktop/mobile rerun.

## Ownership

Deployment/packaging defect only. Chat 06 integration source already passes clean tests; no evidence of client gameplay defect.
