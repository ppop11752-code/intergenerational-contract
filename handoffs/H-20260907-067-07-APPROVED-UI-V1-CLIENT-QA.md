handoff_id: H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA
from: 06
to: 07
status: OPEN
title: Independent clean/browser QA for completed approved UI V1 Client integration

## Scope implemented by Chat 06
- `client/src/approved-ui-v1.ts`
- `client/src/approved-ui-v1-followups.ts`
- `client/src/residence-ui-v1.ts`
- `client/src/resolved-ui-contracts.ts`
- `client/src/approved-ui-finalize.ts`
- `client/approved-ui-v1.css`
- `client/residence-ui-v1.css`
- `client/resolved-ui-contracts.css`
- `client/src/types.ts`
- `client/index.html`
- associated Client regression tests.

## Dependency status
H063, H064, H065 and H066 are all DONE and integrated. H042/H048–H061 dependent Client handoffs are now DONE at implementation level.

## Existing automated evidence
On HEAD `ab8e7a7343c73c2f9501f18ebf33697080668629`:
- TypeScript build PASS;
- clean Client suite 64/64 PASS;
- automated desktop/mobile `UIUX Art Final E2E` PASS;
- workflow run `34145674583`;
- evidence artifact `10027576158`, SHA-256 `3700645a6cfe693de5f724308e4296d77c05ccd21d5dca548362b36451b3e72b`.

## Required independent QA
1. independently rerun/inspect clean build and browser smoke across Landing→End Report;
2. exercise authoritative MAX/reason behavior for Status/Market/Recovery/Support/Birth;
3. exercise Residence/map/Queue/reconnect/Marriage world-first navigation;
4. exercise structured mortality/inheritance and World Event→Chronicle deep link;
5. verify no MutationObserver/render loop;
6. verify authoritative timers continue without reset/pause and Mandatory remains no-countdown;
7. verify QR flow remains functional;
8. verify no raw internal IDs become primary labels and no hidden NPC Persona leaks;
9. verify responsive/mobile layout.

Report any product regression with a narrow handoff back to Chat 06. Do not treat the existing automated pass as a substitute for this independent QA ownership.
