handoff_id: H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA
from: 06
to: 07
status: BLOCKED
title: Independent clean/browser QA for completed Approved UI V1 Client integration

## Context

Chat 06 completed the Approved UI V1 implementation and delegated independent Release/QA ownership to Chat 07.

The previous production Docker blocker was resolved by Chat 04 under `H-20260908-073-04-APPROVED-UI-V1-DOCKER-BUILD`. Approved UI V1 is now live on production.

## Verified after H073

Workflow `Approved UI V1 E2E`, run `34148123375`, head `1ebeb2e3e6eee6c45d2c37177b2c8b030e4186d3`:
- backend `release:check`: PASS;
- clean client suite: **64/64 PASS**;
- desktop `.landing-screen.approved-landing`: PASS;
- landing controls: PASS;
- Tutorial entry/world map: PASS;
- no raw ID / Persona leak in observed live world: PASS;
- Residence markers present: PASS.

Evidence artifact: `10028424942`, digest `sha256:6ad572e1e3194ca6afc7660d7daef55acf90980b2510a2b54d1efa9ba77440a2`.

## Blocking product defect

Live Residence world-first navigation cannot pass because a visible `.residence-map-marker` is not reliably clickable. Playwright repeatedly reports pointer interception from:
- `.approved-turn-track`;
- `.hud-cluster.hud-round-year` inside `.approved-hud`.

The Residence target itself is visible/enabled and authoritative data is present, so this is classified as a Client interaction/layering defect, not a deployment defect and not missing Residence data.

Routed to Chat 06 as:
`H-20260908-074-06-RESIDENCE-POINTER-INTERCEPTION`.

## Remaining required QA after H074

Rerun/finalize:
1. desktop/mobile world-first Residence interaction;
2. Queue/reconnect/Marriage world-first navigation;
3. authoritative timer continuity and Mandatory no-countdown;
4. QR browser regression on deployed Approved UI V1;
5. privacy/no raw primary IDs/no Persona leak;
6. responsive/mobile layout;
7. authoritative MAX/reason, structured lifecycle and World Event→Chronicle browser coverage as applicable;
8. no render loop / interaction regression.

Close PASS only when the full acceptance set passes.

## Current status

BLOCKED by `H-20260908-074-06-RESIDENCE-POINTER-INTERCEPTION`.
