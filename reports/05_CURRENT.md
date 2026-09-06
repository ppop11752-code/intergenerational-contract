# 05 — UI/UX & ART — CURRENT REPORT

## AI SPECIALIST REPORT

### Status
Đang làm — giai đoạn thiết kế giao diện có user approval trực tiếp. Cụm hiện tại: `Landing → Lobby → Room → HUD`. Chưa có redesign nào được khóa hoặc bàn giao Chat 06.

### Changed
- Người dùng đã xác nhận 18 preference/decision mới cho hướng thiết kế và hoàn tất reconciliation nhóm cấu trúc lịch sử A1–A28 cho Landing/Lobby/Room/HUD.
- Tạo `docs/UI_V5_V10_1_DECISION_RECONCILIATION_A_B.md` làm bản đối chiếu user-confirmed giữa prototype V5–V10.1 và quyết định hiện tại.
- Các điểm lịch sử được giữ: Landing có 5 menu entries; Create/Join tách màn; Lobby Human-only; no Ready; no Host NPC controls; vào World Map trực tiếp sau Lobby/Founder reveal; Turn Track dọc trái 5–6 entries; Government là landmark trung tâm; Market không có map building; settlement mở rộng tự nhiên; Residence không zoning theo Status; Residence architecture theo Status + wealth scale nhẹ 0.90–1.15, family size không đổi house scale; pan/zoom tự do; map vẫn hiện dưới drawers/sheets; no permanent Player Bar; World Event banner non-blocking; mobile không đổi gameplay.
- Các điểm lịch sử được sửa theo user/recommendation: reconnect CTA là secondary; PIN là primary và QR secondary; society-start info compact; Founder Draw là overlay/transition non-blocking thay vì standalone screen; HUD top-oriented nhưng chia cụm/adaptive thay vì một dải dashboard đặc; map quick-nav dùng icon compact; Government được mở bằng cách click trực tiếp công trình Nhà nước trên World Map.
- `docs/UI_USER_DESIGN_DECISIONS_2026-09-07.md` vẫn là nguồn preference trực tiếp cho pixel art + Japanese anime/chibi, Human/NPC visual distinction, bright-world/darker-UI direction, logo, Lobby portrait grid, adaptive HUD và các quyết định mới khác.
- Không thay gameplay, protocol, timer hoặc authoritative logic.

### Source
- Quyết định trực tiếp mới nhất của người dùng trong Chat 05 ngày 2026-09-07.
- `docs/UI_USER_DESIGN_DECISIONS_2026-09-07.md`.
- `docs/UI_V5_V10_1_DECISION_RECONCILIATION_A_B.md`.
- `docs/UI_PROTOTYPE_V5_V10_1_REFERENCE.md`.
- Lịch sử cuộc trò chuyện `Game mô phỏng nhân sinh`, Source Index và Migration Pack.

### Impact
- Nhóm structural decisions A1–A28 không còn mơ hồ và không được phép tự quay lại baseline prototype trái với reconciliation mới.
- Chat 05 chỉ còn cần reconcile các chi tiết visual/motion/responsive còn sót của cụm này trước khi trình Landing design đầu tiên.
- Chat 06 chưa được nhận redesign mới cho đến khi user duyệt từng màn/cụm.

### Verified
- Đã ghi nhận đầy đủ user decisions cho A1–A28, gồm các mục `GIỮ` và các mục `SỬA` theo recommendation/user wording.
- Không có quyết định nào trong reconciliation làm thay đổi gameplay/protocol/timer/action semantics.

### Unverified
- Chưa có user approval cho layout cụ thể của Landing, Lobby, Room hoặc HUD.
- Một số quyết định lịch sử về typography, visual density, icon treatment, ambience/motion và responsive presentation của chính cụm này vẫn cần user tái xác nhận.

### Handoff
- Chưa có. Chờ user hoàn tất historical visual/motion reconciliation và duyệt thiết kế Landing trước.

### Open Issues
- User design approval cho Landing/Lobby/Room/HUD đang OPEN.
- Historical visual/motion/responsive reconciliation cho cụm này đang OPEN.
