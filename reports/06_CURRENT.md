# 06 — CLIENT IMPLEMENTATION — CURRENT REPORT

### Status
Đang làm — H-20260906-019 Wave 1/P0 hoàn thành; Wave 2–3 đã triển khai một phần; Wave 4 chưa art-complete. Support selector chờ contract server hẹp.

### Changed
- Tách Landing / Create Room / Join Room / Tutorial / Lobby thành các flow riêng.
- Thêm normal Create Room, roster Lobby, Host Start và NPC/founder-draw note.
- Thêm startup recovery bằng `room:reconnect` + `room:get-state`, dùng reconnect token local hiện có.
- Thêm connection/pending/success/error feedback.
- Thêm dedicated Waiting Queue state, không có action controls.
- Loại bỏ raw Character ID input ở Support. Client chỉ dùng `eligibleSupportTargets` authoritative; nếu field chưa có thì hiển thị unavailable state và không suy diễn.
- Thêm incoming Birth proposal accept/reject UI và giữ `canInitiateBirth` authoritative cho initiate action/T7.
- Thêm production shell: persistent World HUD, Turn Track, map shell, Government/Residence entry, Voluntary dock, Market 6-card layout, Recovery panel, Niên sử split view, host-only Replay result presentation và responsive bottom-sheet behavior cơ bản.
- Tutorial behavior/local progress/non-blocking help được giữ lại trong shell mới.
- Thêm regression suite cho room flows, reconnect/get-state, Support raw-ID removal, Birth response, Waiting Queue và host-only Replay.

### Source
- handoffs/H-20260906-019-06-FULL-UIUX-IMPLEMENTATION.md
- docs/UI_UX_FULL_AUDIT_2026-09-06.md
- docs/UI_TUTORIAL_SPEC.md
- server/backend/MULTIPLAYER_PROTOCOL_V50.md
- current authoritative room/player snapshots

### Impact
- Client không còn là forms-only integration prototype; P0 shell/survivability đã có implementation production-oriented.
- Browser/server QA cần chạy lại toàn player-facing flow vì entry/lobby/game shell đã thay đổi đáng kể.
- Support voluntary selector chưa active cho tới khi server expose authoritative target list.
- Final pixel-art assets, rich animation, QR lobby, detailed Mandatory liquidation/bankruptcy, full Founder transition và complete world-profile polish vẫn còn việc Wave 2–4.

### Verified
- Local `npm test`: PASS 8/8.
- `npm test` bao gồm TypeScript build: PASS.
- Regression xác nhận `room:reconnect` + `room:get-state` helpers tồn tại.
- Regression xác nhận Landing/Create/Join/Lobby + Host Start surface.
- Regression xác nhận không còn raw Character ID input cho Support.
- Regression xác nhận incoming Birth response UI.
- Regression xác nhận dedicated Waiting Queue và host-only Replay presentation.
- Tutorial T7 vẫn bám `canInitiateBirth` authoritative.

### Unverified
- Chưa chạy browser/server E2E sau full shell rewrite.
- Chưa xác minh Support selector với server vì `eligibleSupportTargets` chưa được expose.
- Chưa xác minh QR lobby/final art assets/animation vì chưa triển khai đầy đủ Wave 4.
- Chưa tuyên bố UI player-facing release-ready.

### Handoff
- Chat 03: `H-20260906-020-03-SUPPORT-TARGETS` — expose authoritative voluntary support target list, không đổi gameplay.
- Chat 07 cần QA lại Wave 1/P0 player-facing flow sau shell rewrite.

### Open Issues
- H-20260906-019 vẫn OPEN: Wave 1 complete, Wave 2–3 partial, Wave 4 pending.
- Support selector blocked only on narrow server snapshot dependency.
