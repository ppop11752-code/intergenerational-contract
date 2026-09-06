handoff_id: H-20260906-019-06-FULL-UIUX-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Triển khai production UI/UX theo full audit

## Context

Chat 05 đã hoàn thành full UI/UX audit tại `docs/UI_UX_FULL_AUDIT_2026-09-06.md`.

Current client started as a functional/integration prototype and is being rebuilt toward the locked UI/UX baseline.

## Required work

### Wave 1 — P0 shell and survivability
- Landing / Create / Join / Lobby separation.
- normal Create Room + Host Start.
- reconnect/get-state recovery.
- Waiting Queue.
- loading/error/connection/success feedback.
- authoritative Support selector.
- incoming Birth response UI.

### Wave 2 — production gameplay surfaces
- World HUD + Turn Track + map shell.
- Mandatory / Status / Voluntary production presentation.
- Market six-card UI.
- Recovery / Support / Birth / Marriage production surfaces.

### Wave 3 — world/result surfaces
- Residence/Family/Character Profile.
- Government drawer.
- Niên sử analysis view.
- Founder Draw + round transition.
- Full End Report; Replay host-only.

### Wave 4 — visual completion
- final pixel-fantasy art/frame system.
- responsive/mobile sheets/HUD/Turn Track.
- Tutorial spotlight integration.
- non-blocking animation/ambient layer.

## Source

- `docs/UI_UX_FULL_AUDIT_2026-09-06.md`
- `docs/UI_TUTORIAL_SPEC.md`
- locked Migration Pack `04_UI_UX_SPEC.md`
- current `client/`
- authoritative server snapshots/protocol

## Constraints

- Không đổi gameplay constants/rules.
- Không tự mở rộng protocol khi chưa xác minh missing data.
- Timers luôn dùng authoritative `phaseDeadlineAt`; panels/help/Niên sử/transitions không pause/reset timer.
- Không để player nhập internal IDs khi có authoritative selector.
- Không sửa `docs/RELEASE_STATUS.md` từ handoff này.

## Progress — Chat 06

### Wave 1
COMPLETE in client implementation:
- separate Landing/Create/Join/Tutorial/Lobby;
- normal room creation + Host Start;
- reconnect/startup recovery via `room:reconnect` + `room:get-state`;
- dedicated Waiting Queue;
- standard connection/pending/success/error feedback;
- authoritative Support selector from `eligibleSupportTargets`;
- incoming Birth proposal response UI;
- form-state loss defect H-20260906-024 fixed with immutable action payloads before busy render.

### Wave 2
Substantially implemented:
- persistent HUD with Round/Year/Population/Inflation/Public debt + ceiling/phase timer/Niên sử;
- Turn Track capped to 6 upcoming entries with current/local states;
- map semantic controls Government/Home/zoom;
- Mandatory/Status/Voluntary production-oriented panels using available authoritative fields only;
- Market six cards with price/pool/return/failure/subsidy/out-of-supply context;
- Recovery three-grade UI with pool/cash/quota context;
- Support authoritative family selector;
- Birth proposals/responses;
- Marriage incoming/accepted presentation and player-facing labels.

### Wave 3
Implemented structurally:
- Residence/Family drawer;
- Character Profile + `← GIA ĐÌNH`;
- Government four tabs: Overview/Budget/Debt/Social Security;
- Niên sử Journey + World views;
- non-blocking Founder Draw banner;
- 2.5s non-blocking Round Transition;
- End Report Ranking/Journey/World + host-only Replay + extinction-safe failure presentation.

### Wave 4
Partially implemented:
- responsive/mobile bottom/full-height sheets;
- Tutorial spotlight hooks/zones;
- non-blocking ambient cloud/fog/motion layer;
- improved fantasy frame/theme styling.

NOT art-complete: locked spec requires real asset-driven top-down pixel-art map, landmarks, portraits and frame assets; current client still uses CSS/placeholders for these pieces.

## Verification

Local reconstructed current client suite after latest expansion:
- TypeScript build PASS.
- `npm test` PASS 18/18.

## Remaining dependencies

- `H-20260907-025-03-UIUX-DISPLAY-CONTRACT` -> Chat 03 for narrow authoritative read-only display fields: World Event, detailed Mandatory presentation, Recovery quote/pending detail and Status fee/competition/refund quote where safe.
- `H-20260907-026-05-UIUX-ART-ASSETS` -> Chat 05 for final asset-driven pixel-fantasy package/spec.
- Browser/server QA must rerun expanded surfaces.
- Lobby QR is still a placeholder; no renderer has been added.

Handoff remains OPEN. Do not declare player-facing release-ready until remaining dependencies and QA are complete.
