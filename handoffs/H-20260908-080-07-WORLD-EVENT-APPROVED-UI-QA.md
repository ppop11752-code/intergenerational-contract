handoff_id: H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA
from: 06
to: 07
status: BLOCKED
title: Verify direct World Event banner semantics on production

## Source
- `docs/UI_WORLD_EVENT_DETAIL_APPROVED_V1.md`
- H-20260908-079-06-WORLD-EVENT-APPROVED-UI-DRIFT
- H-20260908-081-06-WORLD-EVENT-CHRONICLE-FOCUS-ID
- H-20260908-082-06-WORLD-EVENT-CHRONICLE-FOCUS-CLOBBER

## Client fix under QA
H079 removed the separate desktop `CHI TIẾT` / `.world-event-detail-panel` path and renders structured authoritative `WorldEventOccurrence.impacts` directly inside the temporary World Event banner. Optional `XEM TRONG NIÊN SỬ` remains when exact `chronicleEntryId` exists.

Secondary Marriage fidelity was also corrected: an authoritative eligible profile candidate remains visible with a disabled `CÓ THỂ GỬI NGOÀI LƯỢT CỦA BẠN` affordance when `canSendMarriage=false`.

## H081 status
H081 is DONE and production deploy contains its runtime. The exact chronology row now receives authoritative `data-chronicle-entry-id`.

## Fresh H080 evidence after H081
Workflow `World Event Approved UI QA` run `34154349342`, head `ff4f3860894785df769599f5a3605a27954fafd8`:
- clean Client suite **72/72 PASS**;
- deployed `dist/world-event-chronicle-focus.js` presence/semantics check PASS;
- direct World Event banner and no legacy detail surface checks PASS;
- exact row mapping `event.id=we-h080` → `chronicleEntryId=chron-h080` PASS;
- final visible focus `.focused-event` FAIL.

Artifact `10030437925`, digest `sha256:67dc73052dbd568dc9adfb1052acd8a261aca13307381822a8d855dee16d9079`.

The prior run `34154207203` was invalid for H081 behavior because the H080 fixture had not loaded the new runtime; Chat 07 corrected the QA harness before run `34154349342`.

## Current blocker
The H081 runtime correctly adds the exact Chronicle id, but the visible focus is subsequently lost. Source/runtime ordering indicates the legacy Chronicle focus path in `resolved-ui-contracts.ts` can still toggle `.focused-event` using `data-world-event-id` and clobber the exact-id focus applied by H081.

H082 has been opened for Chat 06 to make one authoritative focus path and cover the mutation/runtime ordering case.

## Remaining acceptance after H082
1. direct World Event banner content remains correct;
2. no separate desktop detail surface;
3. exact Chronicle focus remains visibly selected when `event.id != chronicleEntryId`;
4. timer continuity / no pause-reset;
5. no event-name inference;
6. mobile same-content responsive reflow;
7. targeted Marriage visible-but-disabled browser assertion.

## Completion
BLOCKED — wait for H082, then Chat 07 must perform a fresh production/browser rerun.
