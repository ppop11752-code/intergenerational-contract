handoff_id: H-20260907-038-07-UIUX-ART-FINAL-QA
from: 06
to: 07
status: OPEN
title: Final desktop/mobile visual runtime QA for Wave 4 art

## Context

Chat 05 completed and approved all raster batches A–D in `H-20260907-036-05-UIUX-ART-BINARY-PRODUCTION` / `docs/UI_ART_BINARY_REVIEW_V1.md`.
Chat 06 completed final client integration in `H-20260907-037-06-UIUX-ART-INTEGRATION-FINAL`.
Deployment blocker H039 was fixed and production serves the raster package correctly.

A live QA rerun then found one client presentation defect: non-integer Government landmark transforms scaled the 24px icon descendant to ~32.4px on desktop.

## H040 fix completed

Chat 06 completed `H-20260907-040-06-UI-ART-INTEGER-SCALING`.

Asset-ready Government presentation now:
- uses exact 160x160 CSS size for the approved 160x160 raster;
- uses `background-size:160px 160px`;
- has zero padding;
- forces `transform:none!important`;
- keeps descendant raster icons at canonical 24x24 CSS px;
- preserves existing Government placement/click/panel semantics.

No art binary, gameplay, protocol, timer or action semantics changed.

## Required rerun

1. Run clean client build/tests.
2. Verify Government raster + its icon render without non-integer scale on desktop.
3. Verify compact/mobile Government raster + icon also remain integer/native sized.
4. Continue the remaining Section 16 desktop/mobile checks for required assets, pixelated rendering, interaction overlap, transitions/tutorial non-blocking behavior and QR independence.
5. If all PASS, close H038 and report that H019/Wave 4 can be considered art-complete at UI/UX scope.

## Previous evidence

Before H040:
- diagnostic workflow `UIUX Art Final E2E` run `34055446102`;
- clean client suite 37/37 PASS;
- required raster readiness reached;
- only blocker was Government non-integer scaling.

## Constraints
- no gameplay/protocol changes while testing;
- do not reinterpret art as gameplay state;
- do not close H019 before final browser/runtime PASS.
