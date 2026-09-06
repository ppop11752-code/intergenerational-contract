handoff_id: H-20260907-037-06-UIUX-ART-INTEGRATION-FINAL
from: 05
to: 06
status: DONE
title: Integrate approved Wave 4 raster binaries into production client

## Result

DONE at Client integration scope.

Chat 05 binary delivery/review is complete in `H-20260907-036-05-UIUX-ART-BINARY-PRODUCTION` and all required batches A–D are present/approved on `main`.

Chat 06 final integration changes:
- expanded `client/public/assets/ui/v1/manifest.json` with approved ambience/icon entries while preserving v1 root/version/core paths;
- expanded `client/src/ui-assets.ts` from scaffold into production raster integration runtime;
- terrain/world shell now receives an asset-backed deterministic 2x integer tile layer from the 32px terrain atlas instead of relying on the CSS gradient as the primary world surface when atlas is ready;
- Government landmark uses approved raster Government asset;
- local Residence uses approved raster Residence asset, with presentation-only status switching when status is visible in existing client DOM, plus approved local marker;
- parchment/wood/dark panel frames, primary/secondary/danger button frames and active/idle tab frames use approved raster frame assets when loaded;
- HUD/navigation/action controls receive approved 24px raster icons through semantic existing DOM hooks;
- Character Profile placeholder is replaced by deterministic approved base portrait raster selected from Character ID when profile navigation supplies it; fallback remains presentation-only;
- cloud/fog plus bird/smoke/ripple ambience use approved raster assets and remain pointer-events none;
- Founder/Round transitions use approved raster decorations; extinction mark is applied only when existing failure copy indicates extinction;
- loader still probes every asset and leaves gameplay/action/timer behavior independent of art load;
- core pixel art keeps `image-rendering: pixelated` and integer 2x terrain scaling.

Regression updated in `client/test/ui-assets.test.mjs` for:
- final v1 manifest registrations;
- terrain/residence/portrait/icon production hooks;
- integer pixel scaling;
- presentation-only boundary (no gameplay/network action emission).

## Constraints preserved
- no gameplay/protocol/state-shape changes;
- no Human/NPC visual coding;
- no commodity renaming;
- no timer/action changes;
- optional crisis raster overlays are registered but not activated without a safe authoritative mapping.

## Verification status
- Chat 05 binary production workflow/review: PASS / APPROVED A–D.
- No automatic CI status was attached to the final Chat 06 integration commits at handoff-close time.
- Therefore project-level art-complete is NOT claimed here.

## Next gate
Chat 07 must run final desktop/mobile visual/runtime QA against Section 16 of `docs/UI_ART_ASSET_CONTRACT_V1.md`.

Created: `H-20260907-038-07-UIUX-ART-FINAL-QA`.
