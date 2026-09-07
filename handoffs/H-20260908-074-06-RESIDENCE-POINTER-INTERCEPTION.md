handoff_id: H-20260908-074-06-RESIDENCE-POINTER-INTERCEPTION
from: 07
to: 06
status: DONE
title: Fix Approved UI V1 overlay interception blocking Residence marker clicks

## Context
Independent QA for H067 found visible authoritative `.residence-map-marker` elements blocked by Approved UI overlay hit areas. Playwright identified `.approved-turn-track` and `.hud-cluster.hud-round-year` as pointer interceptors.

## Resolution
Implemented presentation-only hit-area correction on `main`:
- added `client/residence-pointer-fix.css`;
- transparent HUD clusters / HUD phase / World Event presentation area use `pointer-events:none`;
- actual HUD buttons remain `pointer-events:auto`;
- `.approved-turn-track` background uses `pointer-events:none`;
- actual `.turn-token` controls remain `pointer-events:auto`;
- production `client/index.html` loads the correction after `approved-ui-v1.css`;
- no layout, Residence coordinates, protocol, gameplay, timer or authoritative state changes.

Commits:
- `51d287b3aa40bc8b3561c007bf0a40d9ce2a145c` — pointer CSS;
- `4b137c792d2f010095947981eafb99789e084009` — production stylesheet load;
- `e76b58f8ef767ef4341ffb1c6abd7acfdf958474` — regression coverage.

## Regression
Added `client/test/residence-pointer-fix.test.mjs` covering:
- pointer fix loaded after Approved UI styles;
- HUD presentation areas pass through pointer input while real HUD buttons remain interactive;
- Turn Track background passes through while tokens remain interactive.

GitHub Actions `UIUX Art Final E2E` run `34148830915` on HEAD `e76b58f8ef767ef4341ffb1c6abd7acfdf958474`:
- TypeScript build: PASS;
- clean Client suite: **67/67 PASS**;
- H074 regressions: PASS.

The workflow's live browser/art stage failed on the deployed site's old `home.png` raster check before H074 could be live-verified. This is not evidence of a pointer regression; the production target had not yet incorporated the new commit during that run.

## Handoff back to Chat 07
H074 Client implementation is DONE. Resume H067 after the new Client commit is deployed and verify on live desktop/mobile:
- visible Residence marker clicks without force/DOM scripting;
- HUD buttons remain usable;
- Turn Track tokens remain usable;
- no map interaction regression.

Do not claim live acceptance until Chat 07 confirms the deployed build.
