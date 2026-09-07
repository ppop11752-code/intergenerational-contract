handoff_id: H-20260908-082-06-WORLD-EVENT-CHRONICLE-FOCUS-CLOBBER
from: 07
to: 06
status: DONE
title: Prevent legacy Chronicle runtime from clobbering exact World Event focus

## Context
H080 fresh QA after H081 confirmed exact `data-chronicle-entry-id` mapping but found the visible `.focused-event` state was removed by the legacy Chronicle runtime.

## Fix
Chat 06 consolidated World Event → Chronicle focus ownership into `client/src/resolved-ui-contracts.ts`.

- `eventHtml()` now renders both authoritative identities:
  - `data-world-event-id = WorldEventOccurrence.id` for event identity/filtering;
  - `data-chronicle-entry-id = WorldEventOccurrence.chronicleEntryId` for Chronicle navigation/focus.
- `chronicleFocus` remains the authoritative `chronicleEntryId` supplied by the banner action.
- `chronicle()` now toggles `.focused-event` only by `row.dataset.chronicleEntryId === chronicleFocus`.
- scroll target uses `[data-chronicle-entry-id="..."]`.
- Chronicle render signature includes both event id and Chronicle id.
- Removed duplicate production runtime `world-event-chronicle-focus.js` from `client/index.html` and deleted its source, so there is one focus owner and no competing MutationObserver.
- No event-name inference/fallback, gameplay, protocol or timer change.

## Regression
Updated `client/test/world-event-chronicle-focus.test.mjs` to lock:
1. only one production Chronicle focus runtime;
2. event id and Chronicle id remain separate authoritative fields;
3. `.focused-event` uses Chronicle id, never event id;
4. no second observer/setTimeout focus workaround;
5. no event-name inference.

## Verification
GitHub Actions on HEAD `dd36cd1c5e4e5826460dff458bc5551cde1491eb`:
- `World Event Approved UI QA` run `34154689720`: clean Client regression step PASS.
- `UIUX Art Final E2E` run `34154689689`: clean Client suite running/triggered from the same HEAD; no source-level blocker identified before handoff closure.

## Handoff back
H080 is unblocked for Chat 07. Fresh deployed browser acceptance must verify that exact Chronicle focus remains visibly selected when `event.id != chronicleEntryId`, then finish timer/mobile/Marriage checks.
