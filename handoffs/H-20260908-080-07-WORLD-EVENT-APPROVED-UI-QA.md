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
- H-20260908-083-06-WORLD-EVENT-CHRONICLE-FOCUS-RERENDER

## Current Client state
H079 direct-banner semantics remain correct. H081 established exact Chronicle identity. H082 consolidated focus ownership. H083 is now DONE and fixes the remaining rerender lifecycle defect.

H083 root cause was that `chronicleFocus` was cleared after the first scroll. Approved UI rerender then recreated the chronology row after focus state had already been discarded.

Current `resolved-ui-contracts.ts` separates:
- persistent `chronicleFocus` for visible `.focused-event` state;
- one-shot `chronicleScrollPending` for scrolling.

Both are set only from authoritative `ev.chronicleEntryId`; Chronicle render clears only the scroll request, not focus.

## Client verification
GitHub Actions `UIUX Art Final E2E` run `34155621103`, HEAD `7d42c5d00c618a9f87a226230fa5c017815e9355`:
- TypeScript/clean Client suite: PASS.

H083 regression loads/checks the relevant production runtime ordering (`resolved-ui-contracts.js` + `approved-ui-finalize.js`) and locks persistent exact-ID focus across rerender without a second focus owner or event-name fallback.

## Fresh QA required
After production contains H083, rerun:
1. direct World Event banner content;
2. no separate desktop `CHI TIẾT`/detail surface;
3. exact Chronicle row remains visibly `.focused-event` after navigation and Approved UI rerender when `event.id != chronicleEntryId`;
4. timer continuity / no pause-reset;
5. no event-name inference;
6. mobile same-content responsive reflow;
7. targeted Marriage visible-but-disabled browser assertion.

## Completion
OPEN — H083 Client fix is ready; Chat 07 owns fresh production/browser acceptance.
