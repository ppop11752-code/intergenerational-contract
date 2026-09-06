handoff_id: H-20260906-019-06-FULL-UIUX-IMPLEMENTATION
from: 05
to: 06
status: BLOCKED
title: Triển khai production UI/UX theo full audit

## Context

Chat 05 đã hoàn thành full UI/UX audit tại `docs/UI_UX_FULL_AUDIT_2026-09-06.md`.

Current client started as a functional/integration prototype and has been rebuilt toward the locked UI/UX baseline.

## Progress — Chat 06

### Wave 1
COMPLETE:
- Landing/Create/Join/Tutorial/Lobby;
- Host Start;
- reconnect/get-state recovery;
- Waiting Queue;
- feedback;
- authoritative Support selector;
- incoming Birth response UI;
- H-024 form-state fix.

### Wave 2
IMPLEMENTED + AUTHORITATIVE DISPLAY QA PASS:
- persistent HUD + World Event;
- Turn Track;
- Mandatory authoritative projected breakdown;
- Status authoritative fee/Noble competition/fallback/refund;
- Market six-card;
- Recovery authoritative quote;
- Support/Birth/Marriage;
- H-030 late-render display decoration fixed;
- H-029 browser-authoritative QA: 67/67 PASS; clean client suite 27/27 PASS; engine build PASS.

### Wave 3
IMPLEMENTED structurally:
- Residence/Family/Character Profile;
- Government four tabs;
- Niên sử Journey + World;
- Founder Draw + non-blocking round transition;
- End Report Ranking/Journey/World + host-only Replay.

### Lobby QR closure
IMPLEMENTED + QA PASS:
- `H-20260907-032-06-LOBBY-QR-INTEGRATION` DONE from locked `docs/UI_QR_CONTRACT_V1.md`;
- H-034 cropping defect fixed;
- H-035 renderer-unavailable fallback loop fixed;
- `H-20260907-033-07-LOBBY-QR-QA` DONE / PASS;
- final QR QA: clean client suite 33/33 PASS, browser QA 25/25 PASS;
- desktop/mobile native decode, same-origin payload, privacy boundary, deep-link prefill, no-auto-join, stale/invalid handling, copy-link, Host Start and renderer-fallback all PASS.

### Wave 4
INTEGRATION-READY but NOT ART-COMPLETE:
- responsive/mobile sheets;
- Tutorial spotlight;
- non-blocking ambient motion;
- v1 asset manifest/loader/fallback/deterministic portrait scaffolding.

Direct GitHub verification on `main` still shows `client/public/assets/ui/v1/` contains only:
- `README.md`;
- `manifest.json`.

Required raster PNG/WebP files and subfolders are absent. Current CSS/placeholders remain development fallback only and do not satisfy `UI_ART_ASSET_CONTRACT_V1.md` Section 16.

## Verification

- Display QA: PASS 67/67 browser checks; clean client suite 27/27; engine build PASS.
- Lobby QR final QA: clean client suite 33/33 PASS; browser QA 25/25 PASS.
- QR and authoritative display semantics are no longer blockers.
- Asset tree rechecked directly on GitHub `main`: no production raster binaries present.

## Current blocker

Only final art delivery/visual closure remains:
1. Chat 05 must produce/import and visually approve required raster batches A–D under the exact `client/public/assets/ui/v1/` manifest paths.
2. Chat 06 must integrate approved real binaries and remove corresponding CSS geometry/placeholders from production presentation while keeping load-failure fallback only.
3. Chat 07 must run final `UI_ART_ASSET_CONTRACT_V1.md` Section 16 visual/runtime QA.

Created:
- `H-20260907-036-05-UIUX-ART-BINARY-PRODUCTION` -> Chat 05.

## Blocked state

H-019 remains **BLOCKED**, but now only on real raster art binary delivery + Chat 06 integration + final Chat 07 visual/runtime QA.

There is no further safe independent Chat 06 work until at least Batch A is present and APPROVED. Do not fabricate binaries, atlas coordinates or production art from CSS placeholders.

Do not declare art-complete or player-facing release-ready until all required batches are integrated and final visual/runtime QA passes.
