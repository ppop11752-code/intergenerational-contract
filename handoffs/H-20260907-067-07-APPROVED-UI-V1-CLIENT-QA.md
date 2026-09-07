handoff_id: H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA
from: 06
to: 07
status: BLOCKED
title: Independent clean/browser QA for completed Approved UI V1 Client integration

## Context
Chat 06 completed the Approved UI V1 implementation and delegated independent Release/QA ownership to Chat 07.

H073 Docker TypeScript parity is resolved. H074 pointer correction is DONE at Client source level. H075 production CSS packaging is also DONE.

## H075 deployment result

Chat 04 changed production Docker packaging to include all root client stylesheets with `COPY client/*.css /app/client/`.

Evidence:
- Docker packaging commit `fcc858e4ea58002f0814df4565f487011d56e406`
- Render deploy `dep-daffl23bc2fs73d7kad0` → `live`
- production CSS verification commit `ddaa117e76725a92b22b789aad647493aac454fd`
- workflow `Approved UI V1 E2E` run `34149752398`
- backend release regressions: PASS
- clean Client suite: **67/67 PASS**
- explicit production preflight confirmed all five index-referenced stylesheets return successful non-HTML `text/css` responses.

The previous `.approved-turn-track` / `.hud-cluster` pointer interception is no longer reproduced after H074 CSS is actually packaged.

## Current live blocker

Fresh browser runs now fail at a different hit-area:
- visible/enabled `.residence-map-marker` exists;
- ordinary Playwright click, without force/DOM scripting, is intercepted by `.approved-mandatory` and its descendants (`p`, `dt`, `dl`, section);
- this is separate from H075 static packaging and separate from the H074 HUD/Turn Track correction.

Evidence:
- run `34149561408`, artifact `10028892877`, digest `sha256:91eedbe161bc90f354bf9396e9f4e1c44942fea09412dbe8bac7e5c925607d76`
- run `34149752398`, artifact `10028961500`, digest `sha256:906dbf8b00e8f84d1755163e718f1ab5d33c2f0644b3b1866fd99f8740acb310`

Chat 04 created `H-20260908-076-06-APPROVED-UI-V1-MANDATORY-POINTER-INTERCEPTION` for Chat 06.

## Remaining required QA after H076
1. desktop/mobile Residence marker click without force/DOM scripting;
2. HUD buttons and Turn Track token remain interactive;
3. Queue/reconnect/Marriage world-first navigation;
4. authoritative timer continuity and Mandatory no-countdown;
5. QR regression;
6. privacy/no raw primary IDs/no Persona leak;
7. responsive/mobile layout;
8. authoritative MAX/reason, structured lifecycle and World Event→Chronicle browser coverage as applicable;
9. no render loop / interaction regression.

## Current status
BLOCKED — H075 is resolved. Waiting for Chat 06 to complete H076, deploy the Client hit-area correction, then Chat 07 should rerun final live Approved UI V1 acceptance.
