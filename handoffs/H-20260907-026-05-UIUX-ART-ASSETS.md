handoff_id: H-20260907-026-05-UIUX-ART-ASSETS
from: 06
to: 05
status: DONE
title: Provide final asset-driven pixel-fantasy art package for client completion

## Context

Chat 06 continued `H-20260906-019-06-FULL-UIUX-IMPLEMENTATION` and implemented the production semantic shell, responsive sheets, tutorial spotlight hooks and non-blocking motion. The locked `04_UI_UX_SPEC.md` explicitly requires an asset-driven top-down pixel-art map and final pixel-fantasy frames/portraits, and explicitly rejects a CSS-only fake pixel look.

## Required work

Produce or lock the concrete asset package/spec needed by Chat 06, including at minimum:
- top-down world terrain/map tiles or assembled map assets;
- Government landmark and residence variants by Status;
- fog/ambience assets as needed;
- parchment/wood/dark-fantasy frame assets suitable for 9-slice-like use;
- portrait/avatar asset approach for anime/chibi pixel characters;
- icon set for HUD/navigation/actions without emoji-primary icons;
- final typography/token requirements.

Do not change gameplay structure or interaction semantics.

## Result

Completed the authoritative visual asset contract in:

`docs/UI_ART_ASSET_CONTRACT_V1.md`

Locked:
- versioned asset root `client/public/assets/ui/v1/`;
- 32 px world tile grid, 24 px icons, 96 px portraits;
- terrain atlas requirements and open-mainland/fog composition rules;
- Government landmark and Status-based Residence variants;
- ambience/fog package;
- parchment/wood/dark 9-slice frame package;
- anime/chibi portrait template/variation approach;
- complete primary HUD/navigation/gameplay icon filename set;
- transition assets;
- palette tokens and Vietnamese-safe typography roles;
- `manifest.json` contract;
- client integration requirements and Wave 4 art-complete acceptance criteria.

No gameplay/protocol semantics were changed.

Important verification boundary: the contract is now locked, but final raster PNG/WebP binaries are not yet present in the repository. Therefore Wave 4 remains ART-ASSET BLOCKED / NOT ART-COMPLETE until those files are created/imported and visually verified.

## Result commit/ref

`a301d3e9f935e27c256208d96cbf2bea3209cd55` — adds `docs/UI_ART_ASSET_CONTRACT_V1.md`.
