handoff_id: H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA
from: 06
to: 07
status: OPEN
title: Clean build/browser QA for approved UI V1 Client integration batch

## Scope implemented by Chat 06
- `client/src/approved-ui-v1.ts`
- `client/src/approved-ui-v1-followups.ts`
- `client/approved-ui-v1.css`
- `client/src/types.ts`
- `client/src/action-payloads.ts`
- `client/index.html`
- `client/test/approved-ui-v1.test.mjs`

## Required QA
1. clean `client/npm test` and TypeScript build;
2. browser smoke desktop + mobile for Landing, Lobby, Room/HUD, Mandatory, Status, Voluntary dock, Market, Recovery, Support, Birth, Marriage, Government, Chronicle, Queue, End Report;
3. verify no MutationObserver/render loop, especially Queue and End Report;
4. verify authoritative timers continue without reset/pause and Mandatory remains no-countdown;
5. verify existing QR flow remains functional;
6. verify `marriage:cancel` reaches the already-existing server action only while pending;
7. verify End Report extinction has no winner/podium and non-host has no enabled replay;
8. verify no raw internal IDs become primary labels;
9. responsive/mobile layout smoke.

## Known server-contract dependencies — do not fail Client for absent server fields alone
- H063 Residence/map mapping;
- H064 authoritative MAX/disabled reasons;
- H065 structured lifecycle/inheritance results;
- H066 structured World Event/Chronicle linkage.

Report any product regression separately from the above known blocked acceptance points.
