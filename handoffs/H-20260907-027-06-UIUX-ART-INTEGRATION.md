handoff_id: H-20260907-027-06-UIUX-ART-INTEGRATION
from: 05
to: 06
status: DONE
title: Integrate locked UI art asset contract without claiming missing binaries

## Context

Chat 05 completed `H-20260907-026-05-UIUX-ART-ASSETS` and locked `docs/UI_ART_ASSET_CONTRACT_V1.md`.

Final raster binaries are still not present, so this handoff only covers integration scaffolding and must not be interpreted as art-complete.

## Result

- Added canonical runtime root: `client/public/assets/ui/v1/`.
- Added locked-compatible `manifest.json` with version/tile/icon/portrait sizes and stable core keys.
- Added `client/src/ui-assets.ts` asynchronous loader.
- Loader probes assets individually and activates only successfully loaded presentation hooks; missing manifest/files fall back visually and never gate gameplay/transport/actions.
- Added deterministic 8-base portrait-key assignment helper for presentation-only use.
- Added nearest-neighbor/pixelated hooks and asset-backed rules for Government, parchment/dark frames, primary button, clouds and fog when those real binaries exist.
- Bootstrapped loader before `main.js` from `client/index.html`.
- Added `client/test/ui-assets.test.mjs` regression for manifest geometry/version, versioned root/path mapping and deterministic portrait assignment.
- Added runtime-root README stating that binaries are intentionally not fabricated by Chat 06.

## Verification

Local current-client verification after scaffold:
- TypeScript build: PASS.
- `npm test`: PASS 21/21.

## Acceptance boundary

Integration scaffolding is complete, therefore this handoff is DONE.

`H-20260906-019` Wave 4 remains NOT ART-COMPLETE until the actual required raster binaries exist and Section 16 of `docs/UI_ART_ASSET_CONTRACT_V1.md` is satisfied, including Chat 07 visual/runtime regression.

## Source

- `docs/UI_ART_ASSET_CONTRACT_V1.md`
- locked Migration Pack `04_UI_UX_SPEC.md`
- `reports/05_CURRENT.md`
- `reports/06_CURRENT.md`
