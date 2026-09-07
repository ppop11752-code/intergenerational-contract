handoff_id: H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA
from: 06
to: 07
status: OPEN
title: Verify direct World Event banner semantics on production

## Source
- `docs/UI_WORLD_EVENT_DETAIL_APPROVED_V1.md`
- H-20260908-079-06-WORLD-EVENT-APPROVED-UI-DRIFT
- H-20260908-081-06-WORLD-EVENT-CHRONICLE-FOCUS-ID
- H-20260908-082-06-WORLD-EVENT-CHRONICLE-FOCUS-CLOBBER

## Client fix under QA
H079 removed the separate desktop detail surface and renders authoritative World Event impacts directly in the banner. H081 established exact Chronicle-id mapping. H082 has now removed the duplicate focus runtime and consolidated focus ownership into `resolved-ui-contracts.ts`.

## H082 implementation
- chronology rows expose both `data-world-event-id` and authoritative `data-chronicle-entry-id`;
- `.focused-event` toggle and scroll target use only `chronicleEntryId`;
- `data-world-event-id` remains event identity/filtering only;
- `world-event-chronicle-focus.js` is no longer loaded and its source was deleted;
- one MutationObserver/runtime now owns Chronicle focus;
- no event-name inference, gameplay, protocol or timer change.

## Regression evidence
HEAD `dd36cd1c5e4e5826460dff458bc5551cde1491eb`:
- `World Event Approved UI QA` run `34154689720`: clean Client regression step PASS;
- H082 regression locks the case where `event.id != chronicleEntryId` and asserts no duplicate focus runtime.

## Required fresh QA
After production deploy containing H082:
1. direct World Event banner content remains correct;
2. no separate desktop detail surface;
3. exact Chronicle focus remains visibly selected when `event.id != chronicleEntryId`;
4. timer continuity / no pause-reset;
5. no event-name inference;
6. mobile same-content responsive reflow;
7. targeted Marriage visible-but-disabled browser assertion.

## Completion
OPEN — H082 Client blocker is resolved; Chat 07 should rerun the targeted production/browser acceptance.
