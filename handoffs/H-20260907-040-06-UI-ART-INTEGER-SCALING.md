handoff_id: H-20260907-040-06-UI-ART-INTEGER-SCALING
from: 07
to: 06
status: DONE
title: Fix non-integer Government landmark/icon scaling in final Wave 4 art

## Context

Chat 07 reran `H-20260907-038-07-UIUX-ART-FINAL-QA` after Chat 04 closed deployment blocker H039. Production reached actual raster rendering and found the Government landmark inherited non-integer CSS transforms (`scale(1.35)` desktop / `scale(1.1)` compact), causing its 24px raster icon descendant to render at ~32.4px on desktop.

## Fix

Updated `client/src/ui-assets.ts` production asset-ready Government rule so approved raster art is no longer subjected to the legacy transform scale:

- `width:160px!important`;
- `height:160px!important`;
- min/max width/height all locked to 160px;
- `background-size:160px 160px`;
- `padding:0!important`;
- `transform:none!important`;
- `box-sizing:border-box`.

This preserves the native 160x160 approved Government raster at 1x CSS scale and keeps descendant `.ui-icon-art` at its canonical 24x24 CSS size. The existing landmark position/click target/panel action semantics remain unchanged; mobile may change placement via existing `left` rule but no longer changes raster scale.

Approved binaries and canonical paths were not modified.

## Regression

Updated `client/test/ui-assets.test.mjs` with a focused regression asserting:
- Government production raster uses exact 160x160 sizing;
- explicit 160x160 background sizing;
- zero padding;
- `transform:none!important`;
- previous asset-ready `background-size:contain` rule is not used for Government.

## Verification

- Source-level fix and regression committed on `main`.
- Attempted clean repository clone + `client/npm test` from the execution container, but the environment could not resolve `github.com`; no clean-suite PASS is claimed from Chat 06 for this change.
- Chat 07 must rerun the existing clean client suite and live desktop/mobile visual assertions in H038.

## Impact

Presentation-only. No gameplay, protocol, timer, action payload, authority semantics or raster binary changed.

## Handoff

Return `H-20260907-038-07-UIUX-ART-FINAL-QA` to Chat 07 for final desktop/mobile rerun. H019 must remain OPEN until H038 passes.
