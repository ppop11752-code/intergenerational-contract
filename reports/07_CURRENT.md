# 07 — RELEASE & QA — CURRENT REPORT

## AI SPECIALIST REPORT

### Status

Bị chặn — OI-004 client integration QA phát hiện deployment blocker và 2 client-spec defects. Chưa đủ điều kiện E2E/release gate.

### Changed

- Nhận và xử lý handoff `H-20260906-010-07-OI004-CLIENT-QA`.
- Đối chiếu `client/` với `docs/UI_TUTORIAL_SPEC.md`, authoritative server và protocol hiện tại.
- Xác nhận Tutorial entry dùng cùng transport `room:create` + `game:start`; server start với 1 Human tự bổ sung 9 NPC founder.
- Xác nhận countdown client đọc trực tiếp `game.phaseDeadlineAt`; Tutorial không có code reset/pause/extend deadline và Mandatory không có nút skip.
- Phát hiện deployment blocker: `GameTransport` dùng same-origin Socket.IO (`io(undefined, ...)`) nhưng Docker hiện chỉ copy/build backend, không copy/serve `client/` và không set `STATIC_DIR`; do đó chưa có canonical live client origin để chạy browser/server E2E.
- Phát hiện client defect: Help recap mở bằng `showModal()` trong khi spec yêu cầu non-modal.
- Phát hiện client defect: Birth/T7 chỉ gate bằng `financial.representative`, không có authoritative birth-eligibility gate; có thể hiện nút/hướng dẫn Birth trước state hợp lệ, trái spec yêu cầu defer khi unavailable.

### Source

- `handoffs/H-20260906-010-07-OI004-CLIENT-QA.md`
- `reports/06_CURRENT.md`
- `docs/UI_TUTORIAL_SPEC.md`
- `client/src/main.ts`
- `client/src/tutorial.ts`
- `client/src/transport.ts`
- `client/test/tutorial.test.mjs`
- `Dockerfile`
- `server/backend/server/src/index.ts`
- `server/backend/src/authoritative-room.ts`

### Impact

OI-004 chưa thể đóng. Browser/server integration và full Tutorial lifecycle chưa thể được chứng minh trên deployment hiện tại. Gameplay rule không thay đổi.

### Verified

- Static source review: normal multiplayer join đặt `tutorial.active=false`, nên Tutorial overlay không bật trong normal join flow.
- Tutorial entry tạo room 1 Human rồi gọi `game:start` qua protocol hiện tại.
- Server `start()` với <=10 connected Human không founder draw; với 1 Human tạo đúng 9 NPC founder.
- Client timer tính từ authoritative `phaseDeadlineAt`; panel switching chỉ render lại client UI, không gửi action/timer-reset.
- Mandatory panel không có skip action.
- T0/T1/T2/T3/T4/T5/T6/T8/T9/T10/T11 trigger logic nhìn chung bám state; T7 có lỗi eligibility nêu trên.
- Local regression suite hiện có 6 test cases và Chat 06 đã báo PASS 6/6 ở implementation commit range kết thúc `298884576a9d52fa2448f61672d475d83ae6e67b`.
- Independent re-run của `npm test` trong Chat 07 chưa thực hiện được vì execution sandbox không resolve được GitHub để clone repository.

### Unverified

- Browser E2E với authoritative live backend.
- Static client serving trên Render hoặc một canonical client origin.
- Independent local `npm test`/TypeScript build từ fresh checkout trong Chat 07.
- Full T0–T11 playthrough qua game thực tế 32 vòng.
- T7/Birth eligibility behavior sau khi client được sửa.

### Handoff

- Chat 04: `H-20260906-011-04-CLIENT-STATIC-DEPLOY` — thiết lập/kiểm tra canonical static client serving hoặc explicit backend URL wiring.
- Chat 06: `H-20260906-012-06-OI004-QA-DEFECTS` — sửa Help non-modal và authoritative Birth/T7 eligibility gating.
- Sau khi cả hai PASS, quay lại Chat 07 để chạy integration/E2E/release QA lại.

### Open Issues

- OI-004: OPEN — QA FAILED/BLOCKED pending Chat 04 + Chat 06 fixes.
- OI-006: CLOSED — release QA verified.
