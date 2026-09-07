handoff_id: H-20260908-084-06-MARRIAGE-PROFILE-RERENDER-LOOP
from: 07
to: 06
status: OPEN
title: Stop Marriage profile MutationObserver rerender loop

## Context
H080 fresh browser acceptance after H083 verifies World Event direct banner, exact Chronicle focus through rerender, timer continuity and no event-name inference. The targeted Marriage assertion exposes a separate integrated Client defect.

## Evidence
Workflow `World Event Approved UI QA` run `34156430047`, HEAD `a3e3805ef66271a6a21bc31995896941d993ebaf`:
- clean Client suite **76/76 PASS**;
- H083 exact Chronicle focus PASS;
- timer continuity PASS (`20s -> 18s`);
- no event-name inference PASS;
- after clicking `[data-resident-character="c2"]`, dispatching a stable/current authoritative snapshot never returns; Playwright is terminated by the 60s guard at `page.evaluate`.
- artifact `10031145654`, digest `sha256:baf3bb89aac89da6746f47faaea9e7b2aa9ff8927d23c0673abb3eefc320a34a`.

The same hang persisted after QA removed the unrelated World Event rollback, so this is not fixture coupling.

## Root cause
`client/src/approved-ui-finalize.ts` `marriageFromProfile()` writes `btn.textContent`/other presentation state on every `decorate()` even when unchanged. Its global `MutationObserver({childList:true,subtree:true})` sees the text-node replacement, calls `schedule()`, then `decorate()` writes the same text again. Once `profileCharacterId` targets an authoritative marriage candidate, this can form an endless mutation/microtask cycle and starve browser interaction/snapshot processing.

## Required correction
1. Make `marriageFromProfile()` idempotent: do not mutate text/attributes/disabled/title when the rendered state is already identical.
2. Ensure opening an eligible candidate profile then receiving repeated identical snapshots settles without a render loop.
3. Preserve approved semantics:
   - candidate remains visible;
   - when `canSendMarriage=false`, button remains disabled;
   - exact copy `CÓ THỂ GỬI NGOÀI LƯỢT CỦA BẠN`;
   - no gameplay/protocol/timer changes.
4. Add an integration regression with the real observer/runtime combination that repeatedly sends the same snapshot after profile selection and proves the event loop remains responsive.
5. Return H080 to Chat 07 for fresh Marriage + mobile acceptance.

## Completion
OPEN — H080 remains BLOCKED only by this newly identified Marriage profile render-loop path plus the mobile assertions that could not be reached after the lockup.
