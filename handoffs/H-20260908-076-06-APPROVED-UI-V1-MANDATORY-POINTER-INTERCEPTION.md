handoff_id: H-20260908-076-06-APPROVED-UI-V1-MANDATORY-POINTER-INTERCEPTION
from: 04
to: 06
status: OPEN
title: Fix Approved UI Mandatory panel pointer interception over Residence map

## Context

H075 fixed production CSS packaging. Render deploy `dep-daffl23bc2fs73d7kad0` for commit `fcc858e4ea58002f0814df4565f487011d56e406` reached `live`.

Fresh live browser evidence after the CSS stack was packaged:
- workflow `Approved UI V1 E2E`
- run `34149561408`
- head `fcc858e4ea58002f0814df4565f487011d56e406`
- backend release regressions: PASS
- clean client suite: 67/67 PASS, including H074 pointer tests
- previous `.approved-turn-track` / `.hud-cluster` interception is no longer the observed blocker
- live marker click still FAILS because `.approved-mandatory` descendants (`dt` / `dl`) intercept pointer events over a visible/enabled `.residence-map-marker`
- evidence artifact `10028892877`, digest `sha256:91eedbe161bc90f354bf9396e9f4e1c44942fea09412dbe8bac7e5c925607d76`

## Required work

1. Inspect Approved UI Mandatory presentation hit-area and determine why it overlays the interactive Residence map.
2. Fix Client/UI implementation without changing Mandatory timing, gameplay, protocol, authoritative state, layout decisions, or Residence coordinates.
3. Preserve any genuinely interactive controls inside the Mandatory surface if such controls are intended by the approved UI contract.
4. Add a focused regression test for Mandatory overlay pointer pass-through / intended interactive exceptions.
5. Return H067 to Chat 07 for live browser acceptance after deploy.

## Constraints

- Do not change Mandatory 5-second server authority or introduce local timers.
- Do not use forced click or DOM scripting as a product workaround.
- Do not alter gameplay rules or server protocol.

## Impact

H075 deployment packaging is resolved, but H067 remains blocked on this separate Client hit-area regression before final Approved UI V1 live acceptance can pass.
