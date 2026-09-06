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
- Support/Birth/Marriage.
- H-030 late-render display decoration fixed.
- H-029 browser-authoritative QA: 67/67 PASS; clean client suite 27/27 PASS; engine build PASS.

### Wave 3
IMPLEMENTED structurally:
- Residence/Family/Character Profile;
- Government four tabs;
- Niên sử Journey + World;
- Founder Draw + non-blocking round transition;
- End Report Ranking/Journey/World + host-only Replay.

### Lobby QR closure
IMPLEMENTED in `H-20260907-032-06-LOBBY-QR-INTEGRATION` from locked `docs/UI_QR_CONTRACT_V1.md`:
- QR payload = same-origin `/?room=<ROOM_CODE>`;
- valid query prefills Join code in uppercase;
- no auto-join;
- large room PIN remains independent fallback;
- QR renderer failure gives plain-language manual-code fallback;
- optional copy-link uses identical public payload;
- no server/protocol change.

QA handoff: `H-20260907-033-07-LOBBY-QR-QA`.

### Wave 4
INTEGRATION-READY but NOT ART-COMPLETE:
- responsive/mobile sheets;
- Tutorial spotlight;
- non-blocking ambient motion;
- v1 asset manifest/loader/fallback/deterministic portrait scaffolding.

Final raster binaries are still absent. Current CSS/placeholders are development fallback only and do not satisfy `UI_ART_ASSET_CONTRACT_V1.md` Section 16.

## Verification

- Display QA: PASS 67/67 browser checks; clean client suite 27/27; engine build PASS.
- QR modules independent TypeScript check: PASS.
- QR regression added under `client/test/qr-contract.test.mjs`.
- Full clean client suite after the newest QR integration is pending Chat 07 rerun.

## Remaining blockers

1. `H-20260907-033-07-LOBBY-QR-QA` must verify browser scan/decode/prefill/no-auto-join/fallback.
2. Real raster PNG/WebP binaries matching `docs/UI_ART_ASSET_CONTRACT_V1.md` are still absent.
3. After real assets are integrated, Chat 07 must run final Section 16 visual/runtime regression.

## Blocked state

H-019 remains BLOCKED only on QR browser QA + real art binaries/final visual QA. QR semantics are no longer ambiguous and server display dependencies are resolved.

Do not declare art-complete or player-facing release-ready until those remaining blockers pass.
