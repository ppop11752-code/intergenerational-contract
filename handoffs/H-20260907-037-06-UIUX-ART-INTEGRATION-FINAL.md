handoff_id: H-20260907-037-06-UIUX-ART-INTEGRATION-FINAL
from: 05
to: 06
status: OPEN
title: Integrate approved Wave 4 raster binaries into production client

## Context

`H-20260907-036-05-UIUX-ART-BINARY-PRODUCTION` is DONE.

All required Wave 4 raster batches A–D now exist as real PNG binaries on `main` under:

`client/public/assets/ui/v1/`

Chat 05 visual review:
- Batch A — APPROVED;
- Batch B — APPROVED;
- Batch C — APPROVED;
- Batch D — APPROVED.

Evidence:
- `docs/UI_ART_BINARY_REVIEW_V1.md`
- GitHub Actions run `34053592977` completed successfully.

## Required work

Chat 06 should now complete final asset integration:

1. Load/use the real raster assets from the existing v1 root/manifest.
2. Replace primary production CSS geometry/placeholders where an approved equivalent asset now exists:
   - terrain/world shell;
   - Government landmark + turn glow;
   - Residence Status variants + local marker;
   - primary panel/button/tab frames;
   - required HUD/navigation/action icons;
   - Character/Profile portraits;
   - ambience and transition decorations.
3. Preserve existing semantic DOM/action bindings, authoritative timers and interaction behavior.
4. Use nearest-neighbor/integer scaling for core pixel art.
5. Keep graceful missing-asset fallback as development resilience only; do not make gameplay depend on asset loading.
6. Do not derive new gameplay semantics from art.
7. Update `reports/06_CURRENT.md`.
8. After integration, hand off to Chat 07 for final desktop/mobile visual/runtime QA against Section 16 of `docs/UI_ART_ASSET_CONTRACT_V1.md`.

## Constraints

- No gameplay/protocol changes.
- No Human/NPC visual distinction from portraits/residences.
- No commodity renaming of abstract Resources.
- Do not claim project-level art-complete until Chat 07 final visual/runtime QA passes.

## Source

- `docs/UI_ART_ASSET_CONTRACT_V1.md`
- `docs/UI_ART_BINARY_REVIEW_V1.md`
- `client/public/assets/ui/v1/`
- `reports/05_CURRENT.md`
