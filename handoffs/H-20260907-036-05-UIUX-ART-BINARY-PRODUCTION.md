handoff_id: H-20260907-036-05-UIUX-ART-BINARY-PRODUCTION
from: 06
to: 05
status: OPEN
title: Produce and import final UI art raster binaries

## Context

Chat 06 resumed `H-20260906-019-06-FULL-UIUX-IMPLEMENTATION` after QR closure.

Functional UI blockers are resolved:
- authoritative display QA `H-20260907-029-07-UIUX-DISPLAY-QA`: DONE / PASS;
- Lobby QR QA `H-20260907-033-07-LOBBY-QR-QA`: DONE / PASS with clean client suite 33/33 and browser QA 25/25.

Direct GitHub verification on `main` shows `client/public/assets/ui/v1/` still contains only:
- `README.md`;
- `manifest.json`.

No production PNG/WebP raster subfolders/files are present, so Wave 4 remains NOT ART-COMPLETE.

## Required work

Follow the already locked:
- `docs/UI_ART_ASSET_CONTRACT_V1.md`;
- `docs/UI_ART_BINARY_DELIVERY_PIPELINE_V1.md`.

Produce/import and visually review the required raster batches at the exact manifest paths.

### Batch A — critical world shell
- `terrain/terrain_atlas.png`
- `landmarks/government.png`
- `landmarks/government_turn_glow.png`
- `residences/poor.png`
- `residences/middle.png`
- `residences/noble.png`
- `residences/local_marker.png`
- `ambience/fog_edge.png`

### Batch B — UI chrome and icons
- all required `frames/` files from the art contract;
- all required `icons/` files from the art contract.

### Batch C — portraits
- `portraits/base_01.png` through `portraits/base_08.png`.

### Batch D — ambience and transitions
- required cloud/bird/smoke/ripple assets;
- founder/round/extinction transition assets;
- optional crisis overlays only where authoritative state already exposes that crisis.

## Acceptance before return to Chat 06

1. Binaries exist in GitHub `main` at the exact locked paths.
2. Chat 05 has performed per-batch visual review from Section 6 of `UI_ART_BINARY_DELIVERY_PIPELINE_V1.md`.
3. No file changes gameplay meaning, resource identity, protocol, timers or action semantics.
4. No base64/data-URI substitute is used for raster delivery.
5. Report which batches are APPROVED and any files still rejected/missing.
6. Update `reports/05_CURRENT.md`.
7. Return an integration handoff to Chat 06 only after at least Batch A is present and approved; final closure requires all required batches.

## Constraints

- Do not change gameplay rules/constants.
- Do not encode Human/NPC distinction in portraits/residences.
- Do not rename abstract resources to commodities through art.
- Preserve locked pixel dimensions, integer scaling, palette and transparent padding rules.
- CSS fallback/placeholders remain development-only and cannot be used to claim production art completion.

## Parent

`H-20260906-019-06-FULL-UIUX-IMPLEMENTATION` remains BLOCKED pending this binary delivery, Chat 06 integration, then Chat 07 final Section 16 visual/runtime QA.
