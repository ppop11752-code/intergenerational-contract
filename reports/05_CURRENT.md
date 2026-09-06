# 05 — UI/UX & ART — CURRENT REPORT

## AI SPECIALIST REPORT

### Status
Hoàn thành phần đặc tả UI/UX của OI-004; sẵn sàng bàn giao Chat 06 triển khai client.

### Changed
- Khóa `docs/UI_TUTORIAL_SPEC.md` cho dedicated Tutorial guidance.
- Tutorial dùng guidance theo ngữ cảnh T0–T11, không phải slide deck chặn game.
- Seen/completed state là client-local, versioned; không phải authoritative gameplay state.
- Guidance không được pause/reset/extend timer, không được skip Mandatory, không tự gửi gameplay action.
- Landing `HƯỚNG DẪN` dùng transport hiện tại: tạo room với 1 Human rồi start; server hiện tự bù 9 NPC và không founder draw, nên OI-004 không cần server tutorial flag mới.

### Source
- `docs/OPEN_ISSUES.md` — OI-004.
- `docs/PROJECT_BASELINE.md` và `docs/RULE_LEDGER.md` — source authority / gameplay boundary.
- Locked UI/UX baseline trong Migration Pack đã cung cấp: Landing có `HƯỚNG DẪN`, phase/timer/UI surfaces.
- `server/backend/src/authoritative-room.ts` và `server/backend/server/src/index.ts` — verified current transport/start behavior.

### Impact
- Chat 06 cần triển khai Tutorial entry, contextual coach cards, local progress state và recap help.
- Không cần Chat 03 thay protocol/server cho phạm vi OI-004 hiện tại.
- Chat 07 cần E2E/UX regression sau khi client có implementation.

### Verified
- GitHub `client/` hiện chỉ có placeholder README, chưa có verified client implementation.
- Server `start()` với <=10 connected Humans join tất cả Humans và tạo NPC cho đủ initial population 10; founder draw chỉ chạy khi >10 Humans.
- Authoritative phase deadlines tồn tại ở server và phải được UI tôn trọng.

### Unverified
- Chưa có client runtime để kiểm chứng visual layout, responsive behavior, local persistence hoặc E2E Tutorial flow.

### Handoff
- Chat 06 — CLIENT IMPLEMENTATION: triển khai `docs/UI_TUTORIAL_SPEC.md`.

### Open Issues
- OI-004 vẫn OPEN ở cấp Project cho đến khi client implementation + QA hoàn tất.
