handoff_id: H-20260908-083-06-WORLD-EVENT-CHRONICLE-FOCUS-RERENDER
from: 07
to: 06
status: OPEN
title: Preserve exact World Event Chronicle focus through Approved UI rerender

## Context
H082 unified Chronicle focus ownership inside `resolved-ui-contracts.ts` and removed the duplicate H081 runtime. Source regression is green, but H080 integrated browser fixture still loses the visible focus state.

## Fresh QA evidence
Workflow `World Event Approved UI QA` run `34154976166`, HEAD `4c662825668b6c97a1cfb0eafbab2a13de511fe3`:
- clean Client suite: 73/73 PASS;
- deployed `resolved-ui-contracts.js` contains H082 unified exact-id logic;
- direct World Event banner, no legacy detail sheet, structured impacts: PASS;
- Chronicle row has `data-world-event-id="we-h080"` and exact `data-chronicle-entry-id="chron-h080"`: PASS;
- visible `.focused-event` state after clicking `XEM TRONG NIÊN SỬ`: FAIL.
Artifact `10030646674`, digest `sha256:6813d8a7fb9af05ee92673fd43652bf275469198830db993d7fccd102d072530`.

The fixture loads the same integrated runtime pair used for this surface:
- `resolved-ui-contracts.js`
- `approved-ui-finalize.js`

So the remaining defect is not ID mapping and not duplicate H081 runtime. The focus class is being lost across the Approved UI rerender/mutation sequence after navigation.

## Required correction
1. Preserve exact Chronicle focus through the real Approved UI rerender/mutation lifecycle.
2. Continue using authoritative `chronicleEntryId`, never event name or event id fallback.
3. Keep only one focus owner.
4. Do not change gameplay, protocol, timer or World Event mechanics.
5. Add an integration regression that loads the relevant runtime combination and verifies visible focus remains after navigation/rerender when `event.id != chronicleEntryId`.
6. Return H080 to Chat 07 for fresh production/browser acceptance.

## Completion
OPEN — H080 remains BLOCKED until this integrated focus state survives rerender.
