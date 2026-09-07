handoff_id: H-20260908-083-06-WORLD-EVENT-CHRONICLE-FOCUS-RERENDER
from: 07
to: 06
status: DONE
title: Preserve exact World Event Chronicle focus through Approved UI rerender

## Context
H082 unified Chronicle focus ownership inside `resolved-ui-contracts.ts`, but H080 integrated browser QA showed the visible focus was still lost after Approved UI rerender even though exact `data-chronicle-entry-id` mapping was correct.

## Root cause
`chronicle()` treated `chronicleFocus` as both persistent selection state and one-shot scroll state. After the first successful render it executed `chronicleFocus=null`. Approved UI then rerendered/recreated the chronology surface, so the next mutation pass had no focus state to reapply to the new row.

## Fix
`client/src/resolved-ui-contracts.ts` now separates:
- `chronicleFocus`: persistent exact selected Chronicle entry;
- `chronicleScrollPending`: one-shot scroll request.

On `XEM TRONG NIÊN SỬ`:
- both are set from authoritative `ev.chronicleEntryId`;
- Chronicle navigation opens as before.

On Chronicle render/rerender:
- `.focused-event` is always derived from persistent `chronicleFocus` against `row.dataset.chronicleEntryId`;
- scrolling uses `chronicleScrollPending` and clears only that field after the exact target exists;
- render no longer clears `chronicleFocus`.

`data-world-event-id` remains event identity/filtering only. No event-name/event-id fallback was added.

## Regression
Added `client/test/world-event-chronicle-rerender.test.mjs` and aligned prior H082 regression.
Coverage locks:
- one focus owner (`resolved-ui-contracts.ts`);
- integrated runtime order with `approved-ui-finalize.ts`;
- exact `chronicleEntryId` focus;
- persistent focus + one-shot scroll separation;
- no `chronicleFocus=null` inside Chronicle render;
- no event-name/event-id fallback.

Initial run exposed two stale regex assertions in tests, not product code; both were corrected.

## Verification
GitHub Actions `UIUX Art Final E2E` run `34155621103`, HEAD `7d42c5d00c618a9f87a226230fa5c017815e9355`:
- TypeScript build / clean Client suite: PASS.
- browser/art stage is separate from the targeted H080 production acceptance and is not used to claim H080 completion.

Implementation commits include:
- `44a776eaff695976a0aca7d18d4ce130ef747150` — persistent focus + one-shot scroll;
- `0eca406d8937891d5b515dddc83bdb0b50a6f9e9` — H083 regression;
- `75bd69b7962545ab9205463854dfa2985088188d` / `7d42c5d00c618a9f87a226230fa5c017815e9355` — align stale regression assertions.

## Constraints preserved
- no gameplay change;
- no protocol change;
- no phase/timer change;
- no World Event mechanics change;
- authoritative `chronicleEntryId` remains the only navigation truth.

## Handoff back
H080 should return to Chat 07 for a fresh production/browser rerun proving the focus remains visibly selected through the real Approved UI rerender sequence.

## Completion
DONE — Client implementation + clean regression PASS; live targeted acceptance remains Chat 07/H080 responsibility.
