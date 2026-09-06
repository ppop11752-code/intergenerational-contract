# UI ART BINARY DELIVERY PIPELINE V1

**Owner:** 05 — UI/UX & ART  
**Status:** LOCKED PIPELINE — BINARIES STILL REQUIRED  
**Scope:** Production/import pipeline for the raster package defined by `docs/UI_ART_ASSET_CONTRACT_V1.md`.

## 1. Purpose

The visual contract is already locked, but Wave 4 cannot be called art-complete until real PNG/WebP files exist under:

`client/public/assets/ui/v1/`

This pipeline defines how those binaries are to be produced, reviewed, imported and verified without changing gameplay or client semantics.

## 2. Source-of-truth contract

Every raster binary must conform to:

`docs/UI_ART_ASSET_CONTRACT_V1.md`

`client/public/assets/ui/v1/manifest.json` is the runtime path contract. Asset production must target those paths exactly rather than requiring Chat 06 to rename/reinterpret files after delivery.

## 3. Production batches

Produce/import in this order so integration and QA can proceed incrementally.

### Batch A — critical world shell

Required first:
- `terrain/terrain_atlas.png`
- `landmarks/government.png`
- `landmarks/government_turn_glow.png`
- `residences/poor.png`
- `residences/middle.png`
- `residences/noble.png`
- `residences/local_marker.png`
- `ambience/fog_edge.png`

This batch removes the CSS-placeholder blocker for the persistent world map.

### Batch B — UI chrome and icons

Required:
- all files under `frames/` listed in the art contract;
- all required `icons/` listed in the art contract.

This batch removes emoji/flat-CSS-primary presentation from production controls.

### Batch C — portraits

Required:
- `portraits/base_01.png` through `base_08.png`.

Portraits must preserve anime/chibi pixel readability at 96×96 logical px and must not encode Human/NPC identity.

### Batch D — ambience and transitions

Required:
- cloud/bird/smoke/ripple ambience assets;
- founder/round/extinction transition assets;
- optional crisis overlays only where the authoritative state already exposes the corresponding crisis.

## 4. Authoring requirements

- Author at integer pixel scale using the locked 32 px world grid.
- Transparent deliverables use PNG with alpha.
- Large fog/backdrop texture may use lossless WebP only when visually identical at native scale.
- Preserve hard pixel edges; no anti-aliased vector-style resampling on final exports.
- Keep the palette and visual hierarchy from `UI_ART_ASSET_CONTRACT_V1.md`.
- Do not add text into reusable frames/icons unless explicitly required; Vietnamese copy stays in DOM so it remains accessible and adaptable.
- Do not invent commodity imagery for abstract resources.

## 5. Binary import method

Raster files must be committed through a binary-capable path, for example:
- local Git clone + normal `git add/commit/push`;
- GitHub web file upload to the exact asset folders;
- another repository workflow that preserves the original binary bytes.

Do **not** store raster binaries as base64 text files or data URIs in source documents.

After import, confirm the files are visible in the GitHub tree at the exact manifest paths.

## 6. Per-batch visual review by Chat 05

Before Chat 06 treats a batch as production-ready, Chat 05 checks:
- dimensions / transparent padding;
- pixel-edge integrity and integer scaling;
- terrain seams / tile continuity where applicable;
- Government/Residence hierarchy;
- icon silhouette clarity at 24 px;
- portrait readability at 96 px;
- frame corner integrity for 9-slice use;
- contrast/readability on desktop and mobile target sizes;
- consistency with parchment/wood/dark-fantasy visual language;
- absence of new gameplay meaning encoded only by art.

Any rejected file remains development-only and must not be used to claim art completion.

## 7. Chat 06 integration gate

Once a batch is present and approved, Chat 06 may:
- enable the existing loader/manifest hook for that batch;
- remove the corresponding CSS geometry/placeholder from production presentation;
- keep graceful fallback only for load failure;
- preserve semantic DOM, actions, timers and server authority unchanged.

No gameplay waits on asset loading.

## 8. Chat 07 final visual/runtime QA

After all required batches are integrated, Chat 07 verifies at minimum:
- no missing required asset requests in browser runtime;
- no blurry/smoothed core pixel art at supported desktop/mobile layouts;
- map/landmark/residence/frame/portrait/icon requirements are asset-backed;
- tutorial spotlight and transitions remain non-blocking;
- QR remains scannable and independent of art load;
- no client/server regression from presentation integration.

Only after this QA may Project Control consider Wave 4 art-complete.

## 9. Current blocker state

At the time this pipeline is locked, `client/public/assets/ui/v1/` contains the integration README and manifest but not the required raster subfolders/files.

Therefore:

**ART BINARY STATUS: BLOCKED / NOT ART-COMPLETE.**

The blocker is concrete binary production/import, not missing visual specification.
