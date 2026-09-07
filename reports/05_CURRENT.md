# 05 — UI/UX & ART — CURRENT REPORT

## AI SPECIALIST REPORT

### Status
Đang làm — Landing đã được user duyệt và khóa thành V1. Lobby đã đóng Source Validation Gate và đang ở bước concrete design exploration; chưa được phép handoff Chat 06 cho Lobby trước khi user duyệt layout. Room / HUD vẫn chờ sau Lobby.

### Changed
- User đã xác minh toàn bộ 8 presentation semantics còn mở của Lobby.
- `docs/UI_LOBBY_SOURCE_VALIDATION_V1.md` chuyển sang `CLOSED — USER VERIFIED`.
- Quyết định mới: mỗi Human có accent color riêng nhưng chỉ nhẹ ở border/nameplate; Lobby portrait là temporary Lobby-only visual và biến mất khi game bắt đầu; connection state dùng chấm trạng thái nhỏ, text chỉ khi có vấn đề; Host dùng fantasy seal/icon, local player giữ marker `BẠN`; share controls có cả `SAO CHÉP MÃ` + `SAO CHÉP LIÊN KẾT`; Founder reveal >10 Humans hiển thị 10 Founder trước rồi thông báo Waiting Queue position cho non-founders; giữ câu `XÃ HỘI ĐÃ ĐƯỢC THÀNH LẬP`; non-host Start area là waiting/status card thay vì disabled button.
- Đã đọc lại implementation Lobby hiện tại trong `client/src/main.ts` + `client/styles.css` để bước sang concrete design exploration.
- Current Lobby implementation vẫn là baseline cũ: header room PIN + QR placeholder/connection; body chia 2 cột roster dạng row-list + society-start panel; player rows dùng tone background lặp 5 màu; technical labels `CHỦ PHÒNG/HUMAN · ONLINE/OFFLINE`; Host có Start button, non-host có text wait.
- Không thay gameplay, protocol, timer hoặc authoritative logic.

### Source
- Quyết định trực tiếp mới nhất của user trong Chat 05.
- `docs/UI_LOBBY_SOURCE_VALIDATION_V1.md`.
- Historical conversation `Game mô phỏng nhân sinh`.
- Project Migration Pack v1.0.
- `docs/UI_DESIGN_APPROVAL_WORKFLOW_V2.md`.
- `docs/UI_V5_V10_1_DECISION_RECONCILIATION_A_B.md`.
- `client/src/main.ts`, `client/styles.css` trên main chỉ dùng để audit implementation hiện tại.

### Impact
- Lobby hiện đã đủ nguồn xác nhận để đưa 2–3 design alternatives cụ thể.
- Chat 06 chưa được phép triển khai Lobby redesign cho tới khi user chọn và duyệt phương án.
- Các chi tiết cũ như technical row labels, full-row tone backgrounds, separate large society panel và placeholder QR không còn được coi là design authority.

### Verified
- Source Validation Gate của Lobby đã đóng hoàn toàn.
- 8 user decisions mới không thay gameplay/protocol/timer/action semantics.
- Current implementation structure/styles đã được đọc trực tiếp.

### Unverified
- Chưa có user approval cho một Lobby composition cụ thể.
- Founder reveal visual composition/motion style và responsive Lobby layout vẫn cần được duyệt trong concrete design pass.

### Handoff
- Chat 06: `H-20260907-038-06-LANDING-DESIGN-IMPLEMENTATION` — Landing V1 only.
- Chat 05: đang trình Lobby design alternatives; chưa có Lobby implementation handoff.

### Open Issues
- Landing implementation/visual verification vẫn OPEN sau handoff.
- Lobby design approval đang OPEN.
- User design approval cho Room / HUD vẫn OPEN.
