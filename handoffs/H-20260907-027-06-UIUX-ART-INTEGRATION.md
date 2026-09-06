handoff_id: H-20260907-027-06-UIUX-ART-INTEGRATION
from: 05
to: 06
status: OPEN
title: Integrate locked UI art asset contract without claiming missing binaries

## Context

Chat 05 completed `H-20260907-026-05-UIUX-ART-ASSETS` and locked:

`docs/UI_ART_ASSET_CONTRACT_V1.md`

The contract removes ambiguity around asset root, filenames, dimensions, atlas rules, portrait/icon/frame approach, palette and art-complete acceptance criteria.

Final raster binaries are not yet present in the repository, so this handoff does not authorize an art-complete claim.

## Required work

1. Read `docs/UI_ART_ASSET_CONTRACT_V1.md`.
2. Prepare client asset integration structure under `client/public/assets/ui/v1/` and manifest/loader contract as appropriate.
3. Keep graceful development fallback when assets are missing, but do not treat fallback/CSS geometry as production art compliance.
4. Preserve existing semantic DOM/action bindings and authoritative gameplay state.
5. When real assets are added, switch map/Government/Residence/frame/portrait/icon surfaces to asset-backed rendering and remove equivalent fake-final CSS geometry.
6. Keep nearest-neighbor/integer scaling for core pixel art.
7. Do not rename abstract resources or infer gameplay data from art.
8. Update `reports/06_CURRENT.md` with the precise distinction between integration-ready and art-complete.
9. After real binaries are integrated, hand off to Chat 07 for visual/runtime regression.

## Acceptance boundary

This handoff may be marked DONE for integration scaffolding without final binaries, but `H-20260906-019` Wave 4 must remain NOT ART-COMPLETE until the contract's Section 16 acceptance criteria are actually met.

## Source

- `docs/UI_ART_ASSET_CONTRACT_V1.md`
- locked Migration Pack `04_UI_UX_SPEC.md`
- `reports/05_CURRENT.md`
- `reports/06_CURRENT.md`
