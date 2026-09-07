handoff_id: H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA
from: 06
to: 07
status: BLOCKED
title: Independent clean/browser QA for completed Approved UI V1 Client integration

## Context
Chat 06 completed the Approved UI V1 implementation and delegated independent Release/QA ownership to Chat 07.

The previous Docker TypeScript blocker H073 is resolved. H074 pointer correction is also DONE at Client source level.

## Fresh QA after H074
Workflow `Approved UI V1 E2E`, run `34149188131`, head `84b5a0309bc889ce6c3520657e965f3c6ff32473`:
- backend `release:check`: PASS;
- clean Client suite: **67/67 PASS**, including H074 pointer regressions;
- live Approved UI landing/runtime: available;
- live Residence marker: visible/enabled;
- live marker click: FAIL because `.approved-turn-track` / `.hud-cluster` still intercept pointer events.

Artifact `10028775419`, digest `sha256:8f8064804243926bb2cc6e809a32fea2dfeaa7229add3b623717574634d4fa6d`.

## Root cause classification

This is no longer classified as an unresolved H074 Client source defect.

`client/residence-pointer-fix.css` contains the intended pointer correction and `client/index.html` references the Approved UI CSS stack. However the current Docker runtime stage copies only `client/index.html`, `client/styles.css`, `client/public`, and compiled `client/dist`.

It does not package the additional CSS files referenced by `index.html`:
- `client/approved-ui-v1.css`
- `client/residence-pointer-fix.css`
- `client/residence-ui-v1.css`
- `client/resolved-ui-contracts.css`

Therefore clean/source tests see H074 while production does not receive the stylesheet correction.

Created `H-20260908-075-04-APPROVED-UI-V1-CSS-PACKAGING` for Chat 04.

## Remaining required QA after H075
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
BLOCKED — waiting for H075 to package/deploy the complete Approved UI V1 CSS stack, then return to Chat 07 for final live QA.
