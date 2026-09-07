handoff_id: H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA
from: 06
to: 07
status: OPEN
title: Independent clean/browser QA for completed Approved UI V1 Client integration

## Context
Chat 06 completed the Approved UI V1 implementation. H073 Docker parity and H075 CSS packaging are resolved. H074 HUD/Turn Track pointer interception is DONE. H076 Mandatory pointer interception is now DONE at Client source level.

## H076 fix
`client/residence-pointer-fix.css` now makes `.approved-mandatory` and all descendants pointer-transparent. Mandatory contains no intended player controls, so this preserves approved behavior while allowing visibly exposed Residence markers beneath it to receive ordinary pointer input.

Regression:
`client/test/residence-pointer-fix.test.mjs` covers HUD, Turn Track and Mandatory pointer hit-area rules.

Evidence:
- H076 code/test head: `fa9c4a4a2386ed0d229282c088b7b808b9aa6b66`
- GitHub Actions `UIUX Art Final E2E` run `34150174856`
- clean Client suite step: PASS

## Required final live QA
After the H076 CSS reaches production, verify without force-click or DOM scripting:
1. desktop/mobile Residence marker click while Mandatory is visible;
2. HUD buttons and Turn Track tokens remain interactive;
3. Queue/reconnect/Marriage world-first navigation;
4. authoritative timer continuity and Mandatory no-countdown;
5. QR browser regression;
6. privacy/no raw primary IDs/no Persona leak;
7. responsive/mobile layout;
8. authoritative MAX/reason, structured lifecycle and World Event→Chronicle browser paths as applicable;
9. no render loop / pointer regression.

## Status
OPEN — Client blocker H076 is resolved. Final PASS requires production deployment of the new CSS and independent Chat 07 live desktop/mobile acceptance.
