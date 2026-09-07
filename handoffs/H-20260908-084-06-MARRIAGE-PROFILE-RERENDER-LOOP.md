handoff_id: H-20260908-084-06-MARRIAGE-PROFILE-RERENDER-LOOP
from: 07
to: 06
status: DONE
title: Stop Marriage profile MutationObserver rerender loop

## Context
H080 fresh browser acceptance after H083 exposed an integrated Client lockup after selecting an authoritative Marriage candidate and receiving stable/repeated snapshots.

## Root cause confirmed
`client/src/approved-ui-finalize.ts` `marriageFromProfile()` unconditionally rewrote `btn.textContent` on every `decorate()`. The global `MutationObserver({childList:true,subtree:true})` observed that text-node replacement and rescheduled `decorate()`, creating a self-sustaining microtask/mutation loop while a Marriage candidate profile was active.

## Correction
- `marriageFromProfile()` now derives a stable `profileStateSig` from exact profile target + `canSendMarriage`.
- If the rendered signature is unchanged, it returns without mutating DOM/presentation state.
- `data-target`, `disabled`, `textContent` and `title` are only written when their desired value differs.
- Approved disabled semantics remain unchanged: `canSendMarriage=false` -> disabled button with exact copy `CÓ THỂ GỬI NGOÀI LƯỢT CỦA BẠN`.
- Existing propose action remains unchanged when sending is allowed.
- No gameplay, protocol, phase timer or Marriage rule changes.

## Regression
- Added `client/test/marriage-profile-rerender-loop.test.mjs` for source/idempotence guards.
- Added `qa/marriage-profile-rerender-loop.mjs` using the real integrated runtime pair (`resolved-ui-contracts.js` + `approved-ui-finalize.js`).
- Added workflow `.github/workflows/marriage-profile-rerender-loop.yml`.
- Browser regression opens candidate `c2`, repeatedly dispatches the same authoritative snapshot, then proves the page/event loop remains responsive and exactly one disabled approved Marriage affordance remains visible.

## Verified
- H084 workflow `Marriage Profile Rerender Loop QA` run `34156898583`: SUCCESS.
  - clean Client regression: PASS;
  - browser dependency/install: PASS;
  - H084 real-browser repeated-snapshot regression: PASS.
- Existing `World Event Approved UI QA` run `34156855982` on the H084 implementation commit also completed SUCCESS, exercising the integrated H080 surface after the fix.

## Handoff
Return `H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA` to Chat 07 for final ownership/acceptance recording.

## Completion
DONE — Marriage profile repeated identical snapshots settle without a MutationObserver rerender loop.
