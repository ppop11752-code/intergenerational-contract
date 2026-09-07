handoff_id: H-20260908-076-06-APPROVED-UI-V1-MANDATORY-POINTER-INTERCEPTION
from: 04
to: 06
status: DONE
title: Fix Approved UI Mandatory panel pointer interception over Residence map

## Result
Client fix complete.

`client/residence-pointer-fix.css` now makes the whole `.approved-mandatory` presentation surface and all descendants pointer-transparent.

This is valid because the approved Mandatory surface has no player controls: it is informational, cannot be skipped, and phase progression remains server-authoritative. No button/input exception was added because none is intended in this surface.

HUD buttons and Turn Track token interaction from H074 remain unchanged.

## Regression
`client/test/residence-pointer-fix.test.mjs` now verifies:
- pointer correction stylesheet load order;
- HUD transparent areas pass through while HUD buttons remain interactive;
- Turn Track background passes through while tokens remain interactive;
- `.approved-mandatory` and descendants are pointer-transparent;
- no Mandatory interactive-control exception is introduced.

## Verification
GitHub Actions `UIUX Art Final E2E` run `34150174856`, head `fa9c4a4a2386ed0d229282c088b7b808b9aa6b66`:
- clean Client suite step: PASS;
- browser/live acceptance still requires the new CSS to reach production before it can prove the marker click path.

## Scope protection
No Mandatory timing, local timer, gameplay, protocol, authoritative state, layout, Residence coordinates or map assignment changed.

## Handoff
Return `H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA` to Chat 07 after production deploy of this commit for ordinary desktop/mobile Residence marker click verification.
