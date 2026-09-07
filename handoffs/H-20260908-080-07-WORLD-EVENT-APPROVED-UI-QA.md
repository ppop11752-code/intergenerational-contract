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
- H-20260908-084-06-MARRIAGE-PROFILE-RERENDER-LOOP

## Current QA state
H079/H081/H082/H083 are now accepted for the World Event path. Fresh H080 browser evidence confirms:
- direct World Event detail inside the temporary banner;
- no legacy `CHI TIẾT` / separate detail surface;
- structured authoritative impacts and only affected systems;
- exact Chronicle row identity when `event.id != chronicleEntryId`;
- visible `.focused-event` survives Approved UI rerender after H083;
- timer continuity (`20s -> 18s`), no pause/reset;
- same event name with changed structured impacts does not cause name-based inference.

## Fresh evidence
Workflow `World Event Approved UI QA` run `34156430047`, HEAD `a3e3805ef66271a6a21bc31995896941d993ebaf`:
- clean Client regression **76/76 PASS**;
- production runtime checks PASS;
- exact Chronicle focus PASS;
- timer continuity PASS;
- no event-name inference PASS;
- browser then locks after selecting authoritative Marriage candidate and receiving a stable/repeated snapshot; the 60s guard terminates `page.evaluate`.
Artifact `10031145654`; digest `sha256:baf3bb89aac89da6746f47faaea9e7b2aa9ff8927d23c0673abb3eefc320a34a`.

The failure remains after removing the unrelated World Event rollback from the fixture. Source inspection identifies `approved-ui-finalize.ts` `marriageFromProfile()` as non-idempotent under its own global MutationObserver: repeated unconditional `btn.textContent` writes can continually produce child-list mutations and reschedule decoration once a marriage candidate profile is active.

## Required next step
Chat 06 must process `H-20260908-084-06-MARRIAGE-PROFILE-RERENDER-LOOP`.

After H084, Chat 07 must rerun only the remaining acceptance tail plus confirm no regression:
1. Marriage candidate visible-but-disabled with exact approved copy and no render loop under repeated snapshot;
2. mobile same-content World Event reflow/no horizontal overflow;
3. retain the already passing exact Chronicle/timer/no-name-inference checks in the final gate.

## Completion
BLOCKED — World Event/Chronicle requirements now pass; H080 is blocked by the integrated Marriage profile rerender loop, and mobile acceptance is not yet reached in the same final run.
