handoff_id: H-20260908-075-04-APPROVED-UI-V1-CSS-PACKAGING
from: 07
to: 04
status: DONE
title: Package Approved UI V1 CSS files in production Docker image

## Context

Independent H067 QA rerun after H074 source fix reproduced Residence pointer interception because production did not package the Approved UI CSS stack.

## Root cause

The runtime Docker stage copied only `client/styles.css`, while `client/index.html` references five root stylesheets. Production therefore missed:
- `client/approved-ui-v1.css`
- `client/residence-pointer-fix.css`
- `client/residence-ui-v1.css`
- `client/resolved-ui-contracts.css`

## Changed

Root `Dockerfile` now packages all root client stylesheets with:

`COPY client/*.css /app/client/`

Deployment commit:
- `fcc858e4ea58002f0814df4565f487011d56e406`

No gameplay, protocol, timer, authoritative value, Residence coordinate, or Approved UI semantic decision changed.

## Verified

Render:
- service `srv-daem578u01pc73f35dbg`
- deploy `dep-daffl23bc2fs73d7kad0`
- commit `fcc858e4ea58002f0814df4565f487011d56e406`
- status `live`

Production CSS verification was added to `qa/approved-ui-v1-live-smoke.mjs` in commit `ddaa117e76725a92b22b789aad647493aac454fd`.

Workflow `Approved UI V1 E2E`, run `34149752398`, advanced past the CSS preflight, confirming all five referenced URLs returned successful non-HTML `text/css` responses:
- `styles.css`
- `approved-ui-v1.css`
- `residence-pointer-fix.css`
- `residence-ui-v1.css`
- `resolved-ui-contracts.css`

Backend release regressions PASS and clean client suite PASS 67/67.

## Live interaction result

The previous production blocker from `.approved-turn-track` / `.hud-cluster` is no longer reproduced after packaging H074 CSS.

Residence marker click still does not complete because a separate `.approved-mandatory` presentation surface now intercepts pointer events over a visible/enabled Residence marker. This is a Client/UI hit-area defect, not a remaining static-packaging defect.

Evidence:
- run `34149561408`, artifact `10028892877`, digest `sha256:91eedbe161bc90f354bf9396e9f4e1c44942fea09412dbe8bac7e5c925607d76`
- run `34149752398`, artifact `10028961500`, digest `sha256:906dbf8b00e8f84d1755163e718f1ab5d33c2f0644b3b1866fd99f8740acb310`

## Handoff

Created `H-20260908-076-06-APPROVED-UI-V1-MANDATORY-POINTER-INTERCEPTION` for Chat 06.

H067 remains Release/QA-owned but should stay blocked on H076 rather than H075. After H076 is fixed/deployed, Chat 07 should rerun final Approved UI V1 live acceptance.

## Result

H075 deployment/static packaging scope is complete. Production now serves the full Approved UI V1 CSS stack.