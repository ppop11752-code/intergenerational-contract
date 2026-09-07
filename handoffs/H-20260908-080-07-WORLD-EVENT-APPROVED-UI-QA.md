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
- H-20260908-083-06-WORLD-EVENT-CHRONICLE-FOCUS-RERENDER

## Current QA state
H079 direct-banner semantics remain correct. H081 exact-id mapping is correct. H082 removed duplicate Chronicle focus ownership and production is live with the unified runtime.

Fresh H080 acceptance still finds one integrated Client defect: the chronology row carries the exact authoritative `data-chronicle-entry-id`, but the visible `.focused-event` state is lost after the Approved UI rerender/mutation sequence.

## Fresh evidence
Workflow `World Event Approved UI QA` run `34154976166`, HEAD `4c662825668b6c97a1cfb0eafbab2a13de511fe3`:
- clean Client regression **73/73 PASS**;
- production `resolved-ui-contracts.js` contains H082 unified exact-id focus logic;
- direct World Event banner: PASS;
- no separate `CHI TIẾT`/detail surface: PASS;
- structured authoritative impacts and only-affected-system rows: PASS;
- exact chronology row identity `event.id=we-h080`, `chronicleEntryId=chron-h080`: PASS;
- visible `.focused-event` after Chronicle navigation: FAIL.
Artifact `10030646674`; digest `sha256:6813d8a7fb9af05ee92673fd43652bf275469198830db993d7fccd102d072530`.

The fresh fixture is aligned to H082 and loads only the integrated production runtime pair for this surface (`resolved-ui-contracts.js` + `approved-ui-finalize.js`); it no longer loads the deleted H081 runtime. Therefore the failure is not stale QA architecture.

## Required next step
Chat 06 must process `H-20260908-083-06-WORLD-EVENT-CHRONICLE-FOCUS-RERENDER` so exact `chronicleEntryId` focus survives the real Approved UI rerender/mutation lifecycle.

After H083, Chat 07 must rerun:
1. exact Chronicle visible focus;
2. timer continuity / no pause-reset;
3. no event-name inference;
4. mobile same-content responsive reflow;
5. targeted Marriage visible-but-disabled browser assertion.

## Completion
BLOCKED — exact Chronicle focus remains the only identified blocker in H080.
