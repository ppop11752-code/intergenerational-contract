handoff_id: H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA
from: 06
to: 07
status: DONE
title: Independent clean/browser QA for completed Approved UI V1 Client integration

## Context
Chat 06 completed the Approved UI V1 implementation. H073 Docker parity, H075 CSS packaging, H074 HUD/Turn Track pointer correction and H076 Mandatory pointer correction are resolved and deployed.

## Final QA verdict
**PASS WITH WARNINGS** — no blocking product defect remains in the H067 scope.

## Final evidence
Workflow `Approved UI V1 E2E`, run `34151689731`, head `1bb6b443868abefee06e4242b9ef377129460341`:
- backend `release:check`: PASS;
- clean Client suite: **68/68 PASS**;
- live Approved UI V1 smoke: PASS;
- authoritative-state fixture: PASS;
- deployed Lobby/QR smoke: PASS.

Artifact:
- ID `10029604545`
- digest `sha256:1db5dee80dc4120205b927d237e4eb80209dff3ef765b54a757da622ae794e70`

Supporting authoritative fixture evidence:
- fixture run `34151580895`: PASS;
- artifact `10029539264`;
- digest `sha256:9c0984481d1462301a2a0b62e57007c62f7dfd57da3d6f6b9be76f118bc1c4b8`.

## Verified
- production serves all Approved UI V1 stylesheets as real CSS;
- desktop/mobile Approved landing and responsive layout;
- Tutorial coach lifecycle is acknowledged before ordinary world interaction checks;
- desktop/mobile Residence marker has an actually exposed ordinary pointer target and opens the authoritative Residence panel without force-click/DOM scripting;
- Residence panel close works;
- HUD buttons remain interactive;
- Turn Track token remains interactive;
- authoritative timer continues; Mandatory has no visible local countdown;
- no raw primary IDs / Persona leak observed in live world smoke;
- authoritative Status fee, Market MAX/unavailable reason, Recovery MAX, Support MAX and Birth unavailable reason;
- structured lifecycle rendering;
- Residence authoritative contract;
- World Event detail and exact Chronicle linkage;
- repeated authoritative snapshots do not create a render loop;
- deployed Lobby exposes room PIN plus usable QR/deep-link contract; same-origin payload contains the current room code and no private reconnect/player/token state;
- QR renderer fallback remains covered by the dedicated Lobby QR regression suite and clean Client tests.

## QA harness corrections made during H067
- Tutorial coach overlays were initially mistaken for pointer defects; gate now acknowledges intentionally blocking guidance before testing ordinary controls.
- DOM-first Residence marker could be geometrically underneath another legitimate interactive item; gate now selects a marker whose center is actually exposed by browser hit-testing.
- Authoritative fixture local server lacked UTF-8 charset, corrupting `KHÔNG TÁI TẠO` and misclassifying the Market quote; fixture now serves UTF-8. This was a QA harness defect, not a Client defect.

## Warning / remaining verification depth
Queue/reconnect/Marriage world-first behavior is covered by the clean Client contract/regression suite (`Residence world-first marriage`, `Queue and takeover focus authoritative Residence`, transport reconnect/get-state) but this H067 closure did not create a dedicated multi-client live production scenario for every rare Queue/reconnect/Marriage state. No blocker was observed, but this is not equivalent to exhaustive multiplayer E2E coverage.

## Impact
Approved UI V1 Client integration is accepted at the H067 release/QA gate. No gameplay, server protocol, timer rule or authoritative calculation was changed by Chat 07.

## Status
DONE — PASS WITH WARNINGS.
