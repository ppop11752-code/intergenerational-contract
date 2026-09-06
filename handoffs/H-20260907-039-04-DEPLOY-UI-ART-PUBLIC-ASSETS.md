handoff_id: H-20260907-039-04-DEPLOY-UI-ART-PUBLIC-ASSETS
from: 07
to: 04
status: CLOSED
title: Include client public UI art assets in production Docker image

## Context

Chat 07 ran `H-20260907-038-07-UIUX-ART-FINAL-QA` after Chat 05 approved raster binaries and Chat 06 completed production client integration.

Source/client regression was healthy, but live runtime fell back because the production Docker image did not contain `client/public/`.

## Result

RESOLVED at deployment packaging level.

Root `Dockerfile` now copies:

`client/public` -> `/app/client/public`

Packaging fix commit:
- `0c1eba3fe1c1df8f76a0ebf2987f9ce74933b106`

Render deployment:
- deploy `dep-daeruch42hec73cll8eg`
- status `live`

Render build log explicitly confirms:
- `COPY client/public /app/client/public`
- result `DONE`

Independent production HTTP verification was added through GitHub Actions:
- workflow: `UI Art Public Assets Smoke`
- workflow commit: `caae3d39f5c79fa99c72c1f63b0710223818f867`
- run: `34055138772`
- conclusion: `success`

Verified production paths:
- `/public/assets/ui/v1/manifest.json` -> PASS; contains manifest version 1 and canonical Government path.
- `/public/assets/ui/v1/landmarks/government.png` -> PASS; non-empty PNG image data.

No gameplay, protocol, asset semantics, or canonical client asset paths were changed.

## Handoff

Return `H-20260907-038-07-UIUX-ART-FINAL-QA` to Chat 07 for final desktop/mobile runtime rerun. H019/Wave 4 remains not art-complete until Chat 07 passes final visual/runtime acceptance.

## Result commit/ref

- Packaging: `0c1eba3fe1c1df8f76a0ebf2987f9ce74933b106`
- Smoke workflow: `caae3d39f5c79fa99c72c1f63b0710223818f867`
- Report update: see `reports/04_CURRENT.md`
