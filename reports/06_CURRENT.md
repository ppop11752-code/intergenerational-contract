# 06 — CLIENT IMPLEMENTATION — CURRENT REPORT

### Status
Đang làm — H-20260906-019 Wave 1/P0 hoàn thành; Wave 2–3 đã triển khai một phần; Wave 4 chưa art-complete. Support selector đã tích hợp authoritative targets. Form-state loss defect đã sửa; chờ Chat 07 rerun E2E.

### Changed
- Tách Landing / Create Room / Join Room / Tutorial / Lobby thành các flow riêng.
- Thêm normal Create Room, roster Lobby, Host Start và NPC/founder-draw note.
- Thêm startup recovery bằng `room:reconnect` + `room:get-state`, dùng reconnect token local hiện có.
- Thêm connection/pending/success/error feedback.
- Thêm dedicated Waiting Queue state, không có action controls.
- Loại bỏ raw Character ID input ở Support.
- Đã tích hợp `eligibleSupportTargets` authoritative từ server; Client không tự suy diễn quan hệ gia đình.
- Support selector dùng danh sách server trả về; empty `[]` hiển thị trạng thái không có mục tiêu hợp lệ.
- Thêm incoming Birth proposal accept/reject UI và giữ `canInitiateBirth` authoritative cho initiate action/T7.
- Thêm production shell: persistent World HUD, Turn Track, map shell, Government/Residence entry, Voluntary dock, Market 6-card layout, Recovery panel, Niên sử split view, host-only Replay result presentation và responsive bottom-sheet behavior cơ bản.
- Tutorial behavior/local progress/non-blocking help được giữ lại trong shell mới.
- Đã sửa H-20260906-024: Market/Recovery/Support/Marriage giờ capture payload hoàn chỉnh trước busy-state render, không còn mất giá trị form về default trước `game:action`.
- Thêm `client/src/action-payloads.ts` và regression cho non-default action values.

### Source
- handoffs/H-20260906-019-06-FULL-UIUX-IMPLEMENTATION.md
- handoffs/H-20260906-022-06-SUPPORT-TARGETS-INTEGRATION.md
- handoffs/H-20260906-024-06-CLIENT-FORM-STATE-LOSS.md
- docs/UI_UX_FULL_AUDIT_2026-09-06.md
- docs/UI_TUTORIAL_SPEC.md
- server/backend/MULTIPLAYER_PROTOCOL_V50.md
- server commit `271da7b2a11b921c13bb454b8982b1a90975ec57`

### Impact
- Client không còn là forms-only integration prototype; P0 shell/survivability đã có implementation production-oriented.
- Support voluntary flow không còn blocker contract phía client/server.
- Form values for Market/Recovery/Support/Marriage no longer reset before action payload construction.
- Browser/server QA cần rerun Support flow và smoke các non-default action inputs.
- Final pixel-art assets, rich animation, QR lobby, detailed Mandatory liquidation/bankruptcy, full Founder transition và complete world-profile polish vẫn còn việc Wave 2–4.

### Verified
- Local `npm test`: PASS 13/13.
- `npm test` bao gồm TypeScript build: PASS.
- Regression xác nhận `room:reconnect` + `room:get-state` helpers tồn tại.
- Regression xác nhận Landing/Create/Join/Lobby + Host Start surface.
- Regression xác nhận không còn raw Character ID input cho Support và selector đọc authoritative target list.
- Regression xác nhận incoming Birth response UI.
- Regression xác nhận dedicated Waiting Queue và host-only Replay presentation.
- Server regression cho `eligibleSupportTargets` đã được đối chiếu: direct living parent/child only, no side effects, action parity.
- Regression form-state xác nhận Market units `7`, Recovery units `9`, Support selected target + amount `5`, Marriage candidate `candidate-42` được giữ đúng trong action payload.
- Tutorial T7 vẫn bám `canInitiateBirth` authoritative.

### Unverified
- Chưa rerun browser/server E2E sau form-state fix.
- Chưa xác minh authoritative Support mutation amount `5` qua production UI sau fix.
- Chưa xác minh QR lobby/final art assets/animation vì chưa triển khai đầy đủ Wave 4.
- Chưa tuyên bố UI player-facing release-ready.

### Handoff
- Chat 07: `H-20260906-023-07-SUPPORT-FLOW-QA` đã reopen để rerun E2E sau form-state fix.

### Open Issues
- H-20260906-019 vẫn OPEN: Wave 1 complete, Wave 2–3 partial, Wave 4 pending.
- H-20260906-024 DONE; không còn blocker form-state phía Chat 06.
