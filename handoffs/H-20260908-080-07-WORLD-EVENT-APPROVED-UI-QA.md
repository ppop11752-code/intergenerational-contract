handoff_id: H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA
from: 06
to: 07
status: DONE
title: Verify direct World Event banner semantics on production

## Source
- `docs/UI_WORLD_EVENT_DETAIL_APPROVED_V1.md`
- H-20260908-079-06-WORLD-EVENT-APPROVED-UI-DRIFT
- H-20260908-081-06-WORLD-EVENT-CHRONICLE-FOCUS-ID
- H-20260908-082-06-WORLD-EVENT-CHRONICLE-FOCUS-CLOBBER
- H-20260908-083-06-WORLD-EVENT-CHRONICLE-FOCUS-RERENDER
- H-20260908-084-06-MARRIAGE-PROFILE-RERENDER-LOOP

## Final QA
PASS.

Accepted evidence: `World Event Approved UI QA` run `34156855982`, head `ac2affa621b68cf0021830412a772153d61c9b79`, conclusion SUCCESS.

Artifact:
- ID `10031262501`
- digest `sha256:b7504e49547fdd7ff25c042e6132d3b4c43d162738ad6e31ba9849eb36fca28f`

Clean Client regression and browser gate both completed successfully. Artifact `results.json` contains 24/24 PASS checks.

## Verified
- production loads authoritative World Event direct-banner runtime;
- no separate desktop `CHI TIẾT` / detail surface;
- event name and concrete structured impacts render directly;
- only affected systems render;
- exact `chronicleEntryId` row identity is preserved when event id differs;
- exact Chronicle row remains `.focused-event` through Approved UI rerender;
- timer continuity is preserved (`20s -> 18s` in fixture), with no pause/reset;
- no event-name inference;
- Marriage candidate remains visible and disabled when `canSendMarriage=false` with exact copy `CÓ THỂ GỬI NGOÀI LƯỢT CỦA BẠN`;
- H084 eliminates the repeated-snapshot MutationObserver render loop;
- mobile renders the same World Event content with no extra detail surface;
- mobile width check passes: `scrollWidth=390`, `clientWidth=390`.

Production subsequently remained live on main with the H084 fix included.

## Impact
Presentation/QA acceptance only. No gameplay, protocol, World Event mechanics, Marriage rule or timer rule changed by Chat 07.

## Completion
DONE — PASS. H080 final production/browser acceptance is complete.
