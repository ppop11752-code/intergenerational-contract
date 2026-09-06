handoff_id: H-20260907-038-07-UIUX-ART-FINAL-QA
from: 06
to: 07
status: OPEN
title: Final desktop/mobile visual runtime QA for Wave 4 art

## Context

Chat 05 completed and approved all raster batches A–D in `H-20260907-036-05-UIUX-ART-BINARY-PRODUCTION` / `docs/UI_ART_BINARY_REVIEW_V1.md`.
Chat 06 completed final client integration in `H-20260907-037-06-UIUX-ART-INTEGRATION-FINAL`.

## Required QA

Run final Section 16 checks from `docs/UI_ART_ASSET_CONTRACT_V1.md` on production client, desktop and compact/mobile.

Verify at minimum:
1. required raster assets load successfully from `client/public/assets/ui/v1/`; no missing required asset requests;
2. world terrain is raster/atlas-backed when assets load and CSS gradient is only fallback;
3. Government and Residence production landmarks are raster-backed; Residence visual does not encode Human/NPC distinction and status presentation is consistent with existing state;
4. required primary HUD/navigation/action controls use 24px raster icons rather than emoji/flat placeholder iconography;
5. primary panels/buttons/tabs are raster-frame-backed;
6. Character/Profile surface shows deterministic approved 96px portrait raster and does not expose raw IDs;
7. cloud/fog/bird/smoke/ripple ambience is non-blocking and does not cover interaction targets;
8. Founder/Round/Extinction decorations do not alter authoritative timing or action semantics;
9. nearest-neighbor/integer scaling is preserved for core pixel art on desktop/mobile;
10. QR remains scannable and unchanged by art integration;
11. tutorial spotlight and gameplay timers remain non-blocking/authoritative;
12. Market/Recovery/Support/Birth/Marriage actions still send unchanged payloads;
13. clean client build/tests pass including updated `ui-assets.test.mjs`;
14. classify any fallback-only presentation that still violates Section 16.

## Constraints
- no gameplay/protocol changes while testing;
- do not reinterpret art as gameplay state;
- only after PASS may H-019 be considered ready for closure at UI/UX scope.
