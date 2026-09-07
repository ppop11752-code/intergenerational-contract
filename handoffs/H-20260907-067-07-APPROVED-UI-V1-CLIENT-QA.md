handoff_id: H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA
from: 06
to: 07
status: OPEN
title: Independent clean/browser QA for completed Approved UI V1 Client integration

## Context
Chat 06 completed the Approved UI V1 implementation and delegated independent Release/QA ownership to Chat 07.

The previous production Docker blocker was resolved by Chat 04 under `H-20260908-073-04-APPROVED-UI-V1-DOCKER-BUILD`.

## Previous live QA evidence
Workflow `Approved UI V1 E2E`, run `34148123375`, head `1ebeb2e3e6eee6c45d2c37177b2c8b030e4186d3`:
- backend `release:check`: PASS;
- clean client suite: **64/64 PASS**;
- desktop `.landing-screen.approved-landing`: PASS;
- landing controls: PASS;
- Tutorial entry/world map: PASS;
- no raw ID / Persona leak in observed live world: PASS;
- Residence markers present: PASS.

Evidence artifact: `10028424942`, digest `sha256:6ad572e1e3194ca6afc7660d7daef55acf90980b2510a2b54d1efa9ba77440a2`.

## H074 pointer defect — RESOLVED IN CLIENT
`H-20260908-074-06-RESIDENCE-POINTER-INTERCEPTION` is DONE.

Client fix:
- `client/residence-pointer-fix.css` makes transparent HUD/Turn Track presentation hit areas pass pointer events through to the world map;
- real HUD buttons and Turn Track tokens remain interactive;
- no Residence coordinate/layout/gameplay/protocol/timer changes.

Relevant commits:
- `51d287b3aa40bc8b3561c007bf0a40d9ce2a145c`;
- `4b137c792d2f010095947981eafb99789e084009`;
- `e76b58f8ef767ef4341ffb1c6abd7acfdf958474`.

Client validation on `UIUX Art Final E2E` run `34148830915`:
- TypeScript build: PASS;
- clean Client suite: **67/67 PASS**;
- H074 pointer regression tests: PASS.

The run's live art stage hit the deployed site's old `home.png` raster state before the new commit was available, so it is not live H074 acceptance evidence.

## Remaining required QA
On the deployed build containing H074, rerun/finalize:
1. desktop/mobile world-first Residence interaction — visible marker click must work without force/DOM scripting;
2. HUD buttons and Turn Track token interaction after pointer fix;
3. Queue/reconnect/Marriage world-first navigation;
4. authoritative timer continuity and Mandatory no-countdown;
5. QR browser regression on deployed Approved UI V1;
6. privacy/no raw primary IDs/no Persona leak;
7. responsive/mobile layout;
8. authoritative MAX/reason, structured lifecycle and World Event→Chronicle browser coverage as applicable;
9. no render loop / interaction regression.

## Current status
OPEN — no longer blocked by Chat 06 implementation. Await deployed-build independent live QA by Chat 07.
