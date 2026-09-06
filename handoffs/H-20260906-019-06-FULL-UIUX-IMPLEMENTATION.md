handoff_id: H-20260906-019-06-FULL-UIUX-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Triển khai production UI/UX theo full audit

## Context

Chat 05 đã hoàn thành full UI/UX audit tại `docs/UI_UX_FULL_AUDIT_2026-09-06.md`.

## Progress

### Wave 1 — COMPLETE
- Landing/Create/Join/Tutorial/Lobby;
- Host Start;
- reconnect/get-state;
- Waiting Queue;
- feedback;
- authoritative Support selector;
- Birth response;
- form-state regression fixed.

### Wave 2 — IMPLEMENTED + QA PASS
- HUD/World Event/Turn Track;
- Mandatory/Status authoritative display;
- Market/Recovery/Support/Birth/Marriage;
- display lifecycle fix;
- `H-20260907-029-07-UIUX-DISPLAY-QA`: browser 67/67 PASS, clean client 27/27 PASS, engine PASS.

### Wave 3 — IMPLEMENTED
- Residence/Family/Character Profile;
- Government drawer;
- Niên sử;
- Founder Draw/Round transition;
- End Report + host-only Replay.

### Lobby QR — IMPLEMENTED + QA PASS
- canonical same-origin deep-link/no-auto-join/fallback/copy-link;
- H034 cropping fixed;
- H035 fallback loop fixed;
- `H-20260907-033-07-LOBBY-QR-QA`: clean client 33/33 PASS, browser 25/25 PASS.

### Wave 4 — FINAL RASTER INTEGRATION COMPLETE, FINAL QA PENDING

`H-20260907-036-05-UIUX-ART-BINARY-PRODUCTION` is DONE:
- required PNG batches A–D exist on `main`;
- Chat 05 review APPROVED all batches;
- source: `docs/UI_ART_BINARY_REVIEW_V1.md`.

`H-20260907-037-06-UIUX-ART-INTEGRATION-FINAL` is DONE at Client integration scope:
- v1 manifest expanded with approved icon/ambience entries;
- terrain/world shell uses approved atlas-backed integer-scaled raster layer when ready;
- Government/Residence/local marker use approved rasters;
- primary panel/button/tab frames use approved rasters;
- HUD/navigation/action controls receive approved 24px icons;
- Character Profile uses deterministic approved 96px portrait raster;
- cloud/fog/bird/smoke/ripple ambience and founder/round/extinction decorations are wired;
- optional crisis overlays remain disabled without safe authoritative mapping;
- graceful asset fallback remains presentation resilience only;
- gameplay/action/timer/protocol semantics unchanged.

## Current verification

Already PASS:
- authoritative display QA;
- Lobby QR final QA;
- Chat 05 raster production/review.

Pending:
- final integrated clean client build/tests;
- desktop/mobile visual/runtime QA against Section 16 of `docs/UI_ART_ASSET_CONTRACT_V1.md`;
- missing asset request check;
- exact raster/frame/icon/portrait rendering and interaction-overlap verification.

## Final gate

Created:
- `H-20260907-038-07-UIUX-ART-FINAL-QA` -> Chat 07.

H-019 remains OPEN only for independent final visual/runtime QA. Do not declare project-level art-complete or player-facing release-ready until H-038 PASS.
