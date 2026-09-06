handoff_id: H-20260906-019-06-FULL-UIUX-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Triển khai production UI/UX theo full audit

## Context

Chat 05 đã hoàn thành full UI/UX audit tại `docs/UI_UX_FULL_AUDIT_2026-09-06.md`.

Current client là functional/integration prototype, chưa khớp locked UI/UX baseline và chưa player-facing release-ready.

## Required work

Triển khai theo thứ tự ưu tiên trong audit, không thay gameplay/protocol:

### Wave 1 — P0 shell and survivability

1. Tách Landing / Create Room / Join Room / Lobby theo baseline.
2. Thêm normal Create Room flow + Host Start.
3. Thêm reconnect/startup recovery dùng protocol hiện có `room:reconnect` và `room:get-state`.
4. Thêm dedicated Waiting Queue state.
5. Chuẩn hóa loading/error/connection/success feedback.
6. Bỏ nhập raw Character ID ở Support; dùng authoritative eligible-family selector nếu snapshot hiện có đủ dữ liệu. Nếu thiếu dữ liệu, tạo handoff hẹp sang Chat 03/00, không tự tính eligibility.
7. Thêm incoming Birth proposal response UI từ authoritative `incomingBirthProposals`.

### Wave 2 — production gameplay surfaces

- Persistent World HUD + Turn Track + map shell.
- Mandatory breakdown presentation.
- Status cards/details.
- Voluntary right-edge controls.
- Market six-card UI.
- Recovery details.
- Support family UI.
- Birth proposal/response presentation.
- Marriage production notices/presentation.

### Wave 3 — world/result surfaces

- Residence/Family/Character Profile.
- Government drawer.
- Niên sử analysis view.
- Founder Draw + round transition.
- Full End Report; Replay presentation host-only.

### Wave 4 — visual completion

- Final pixel-fantasy art/frame system.
- Responsive/mobile sheets/HUD/Turn Track.
- Tutorial coach spotlight integration.
- Non-blocking animation/ambient layer.

## Source

- `docs/UI_UX_FULL_AUDIT_2026-09-06.md`
- `docs/UI_TUTORIAL_SPEC.md`
- locked UI baseline in Migration Pack `04_UI_UX_SPEC.md`
- current `client/`
- authoritative server snapshots/protocol

## Constraints

- Không đổi gameplay constants/rules.
- Không tự mở rộng protocol nếu chưa xác minh server snapshot thiếu dữ liệu.
- Timers luôn dùng authoritative `phaseDeadlineAt`; panels/help/Niên sử không pause/reset timer.
- Không để player nhập internal IDs khi có thể trình bày selector từ authoritative state.
- Không sửa `docs/RELEASE_STATUS.md` từ handoff này.

## Expected output

- Ít nhất hoàn thành Wave 1 trước khi chuyển sang polishing.
- Cập nhật `reports/06_CURRENT.md`.
- Nếu cần server contract bổ sung, tạo handoff cụ thể sang Chat 03.
- Sau các P0/P1 chính, handoff Chat 07 để QA player-facing flow.

## Progress — Chat 06

Wave 1/P0 đã triển khai trên `main`:
- separate Landing/Create/Join/Tutorial/Lobby;
- normal room creation + Host Start;
- reconnect/startup recovery via `room:reconnect` + `room:get-state`;
- dedicated Waiting Queue;
- standard connection/pending/success/error feedback;
- raw Support Character ID input removed;
- incoming Birth proposal response UI added.

Wave 2–3 partial implementation đã có:
- World HUD + Turn Track + map shell;
- Mandatory/Status/Voluntary production-oriented surfaces;
- six-card Market, Recovery, Birth/Marriage panels;
- Government/Residence entry, Niên sử split view;
- host-only Replay presentation;
- responsive sheet layout basics.

Support selector is safely unavailable until authoritative targets are exposed. Created `H-20260906-020-03-SUPPORT-TARGETS` for Chat 03.

Local verification: `npm test` PASS 8/8 including TypeScript build.

Handoff remains OPEN because Wave 4 art/motion and several Wave 2–3 detail/polish items are not yet complete; no release-ready claim is made.
