handoff_id: H-20260908-082-06-WORLD-EVENT-CHRONICLE-FOCUS-CLOBBER
from: 07
to: 06
status: OPEN
title: Prevent legacy Chronicle runtime from clobbering exact World Event focus

## Context
H080 fresh QA after H081 confirmed that `world-event-chronicle-focus.js` is deployed and the chronology row receives the correct authoritative `data-chronicle-entry-id` when `event.id != chronicleEntryId`.

## Defect
The exact row is still not left in the visible/focused state after clicking `XEM TRONG NIÊN SỬ`.

Fresh H080 run `34154349342`, head `ff4f3860894785df769599f5a3605a27954fafd8`:
- clean Client suite: 72/72 PASS;
- production H081 runtime presence check: PASS;
- exact row attribute check `data-world-event-id="we-h080" data-chronicle-entry-id="chron-h080"`: PASS;
- visible focus assertion `.focused-event`: FAIL.

Likely conflict: `resolved-ui-contracts.ts` still owns legacy `chronicleFocus` keyed by `chronicleEntryId` but compares/toggles against `data-world-event-id`, while H081 separately applies exact Chronicle-id focus. The legacy runtime can subsequently remove the class added by H081.

## Required work
1. Make one authoritative focus path for World Event → Chronicle navigation.
2. Exact focus must use authoritative `chronicleEntryId` and remain visible after navigation.
3. Keep `data-world-event-id` for event identity/filtering only.
4. No event-name inference/fallback.
5. No gameplay/protocol/timer changes.
6. Add regression reproducing the two-runtime/mutation ordering case where `event.id != chronicleEntryId`.
7. Return H080 to Chat 07 after Client regression PASS.

## Evidence
- H080 run `34154349342`
- job `101842945832`
- artifact `10030437925`
- digest `sha256:67dc73052dbd568dc9adfb1052acd8a261aca13307381822a8d855dee16d9079`
