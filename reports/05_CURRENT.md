# 05 — UI/UX & ART — CURRENT REPORT

## AI SPECIALIST REPORT

### Status
Đang làm — Landing đã được user duyệt và khóa thành V1. Lobby đã đóng Source Validation Gate và user đã chọn direction `LBA — Đại sảnh tập hợp`; hiện đang ở final concrete-detail pass trước khi có thể khóa Lobby V1. Room / HUD vẫn chờ sau Lobby.

### Changed
- User đã chọn Lobby direction `LBA — Đại sảnh tập hợp`.
- Tạo `docs/UI_LOBBY_DIRECTION_V1.md` làm source cho direction đã được user xác nhận nhưng chưa phải final screen approval.
- E1: PIN bên trái, QR bên phải trong invitation header.
- E2: portrait Human dạng tròn/oval pixel, **nameplate đặt phía dưới portrait**.
- E3: Lobby dùng background nội thất đại sảnh/guild-hall fantasy pixel-art.
- E4: Founder reveal dùng seal lớn overlay portrait trong thời gian ngắn rồi thu nhỏ thành marker gọn.
- Các semantics đã xác nhận trước đó vẫn giữ: Human-only portrait grid; accent color nhẹ ở border/nameplate; portrait chỉ tồn tại trong Lobby; connection dot nhỏ; Host fantasy seal + `BẠN` marker; copy code + copy link; Founder reveal top10 rồi Waiting Queue position; giữ câu `XÃ HỘI ĐÃ ĐƯỢC THÀNH LẬP`; non-host dùng wait/status card.
- Không thay gameplay, protocol, timer hoặc authoritative logic.

### Source
- Quyết định trực tiếp mới nhất của user trong Chat 05.
- `docs/UI_LOBBY_DIRECTION_V1.md`.
- `docs/UI_LOBBY_SOURCE_VALIDATION_V1.md`.
- `docs/UI_DESIGN_APPROVAL_WORKFLOW_V2.md`.
- `docs/UI_V5_V10_1_DECISION_RECONCILIATION_A_B.md`.

### Impact
- Lobby không còn ở bước chọn concept; chỉ còn final composition/detail approval trước khi khóa spec.
- Chat 06 chưa được phép implement Lobby redesign.
- Room / HUD chưa được phép tiến trước Lobby approval.

### Verified
- Source Validation Gate Lobby đã CLOSED.
- Direction LBA + E1–E4 được user chọn trực tiếp.
- Không có thay đổi gameplay/protocol/timers/action semantics.

### Unverified
- Exact desktop spacing/proportion, grid density behavior, society-start strip, Start/wait placement, Founder reveal secondary treatment, compact/mobile composition, typography/frame density chưa được user duyệt cuối.

### Handoff
- Chat 06: `H-20260907-038-06-LANDING-DESIGN-IMPLEMENTATION` — Landing V1 only.
- Chat 05: hoàn tất final Lobby detail pass; chưa có Lobby implementation handoff.

### Open Issues
- Landing implementation/visual verification vẫn OPEN sau handoff.
- Lobby final design approval đang OPEN.
- User design approval cho Room / HUD vẫn OPEN.
