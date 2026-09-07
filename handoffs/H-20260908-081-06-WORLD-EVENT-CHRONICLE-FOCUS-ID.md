handoff_id: H-20260908-081-06-WORLD-EVENT-CHRONICLE-FOCUS-ID
from: 07
to: 06
status: DONE
title: Fix World Event Chronicle focus when chronicleEntryId differs from event id

## Context
H080 independent production/browser QA found a real mismatch in the approved World Event → Chronicle navigation.

## Defect
`resolved-ui-contracts.ts` stored `chronicleFocus = ev.chronicleEntryId` but chronology rows were keyed only by `WorldEventOccurrence.id`, so exact focus failed whenever `chronicleEntryId !== event.id`.

## Client correction
Added `client/src/world-event-chronicle-focus.ts` and loaded it after `resolved-ui-contracts.js`.

The runtime:
- consumes authoritative `worldEventOccurrences` from `ic:snapshot`;
- maps each rendered `[data-world-event-id]` row back to its exact occurrence;
- adds `data-chronicle-entry-id` from `WorldEventOccurrence.chronicleEntryId`;
- captures the banner Chronicle action and stores the exact authoritative Chronicle id;
- focuses/selects using `data-chronicle-entry-id`, not event name and not event id;
- keeps `data-world-event-id` unchanged for event identity/filtering.

No gameplay/protocol/timer/Event mechanics changed and no name-based fallback was introduced.

## Regression
Added `client/test/world-event-chronicle-focus.test.mjs` covering:
- production runtime load order;
- event-id → authoritative `chronicleEntryId` mapping;
- focus by Chronicle id;
- no event-name inference.

This explicitly covers the H080 case where `event.id = we-h080` and `chronicleEntryId = chron-h080` are different identifiers.

## Verification
GitHub Actions `UIUX Art Final E2E` run `34153987711` on HEAD `befa279bc6fa61fe6e283e7afe14a83b23b94bc8`:
- TypeScript/clean Client suite step: PASS;
- browser stage was still running when Chat 06 closed this implementation handoff and is not used as production acceptance evidence.

## Handoff back
H080 is unblocked and should return to Chat 07 for a fresh production/browser rerun of exact Chronicle focus plus remaining timer/mobile/Marriage checks.
