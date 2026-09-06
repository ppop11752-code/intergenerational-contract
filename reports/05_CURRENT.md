# 05 — UI/UX & ART — CURRENT REPORT

## AI SPECIALIST REPORT

### Status
Đang làm — giai đoạn thiết kế giao diện có user approval trực tiếp. Cụm hiện tại: `Landing → Lobby → Room → HUD`. Chưa có redesign nào được khóa hoặc bàn giao Chat 06.

### Changed
- Người dùng đã xác nhận 18 preference/decision mới cho hướng thiết kế. Nhóm đầu gồm: pixel art + Japanese anime/chibi; Human/NPC phân biệt trực quan; world/map sáng sống động + UI chrome/panel trầm hơn; pixel-frame mềm hơn; Market chỉ mở khi bấm; Voluntary actions ưu tiên bố trí gọn; Niên sử `HÀNH TRÌNH` + `THẾ GIỚI`; HUD adaptive; Music + SFX trong Settings; thiết kế logo thật trên Landing.
- Nhóm xác nhận mới bổ sung: world thay đổi nhẹ theo năm/thế hệ nhưng vẫn một fantasy world thống nhất; logo dạng fantasy contract seal + lifecycle imagery; Landing dùng world landscape + chibi/anime foreground; Human/NPC khác cả character styling và UI marker; Lobby dùng compact portrait grid; Founder Draw có reveal ngắn nhưng non-blocking; camera vào game bắt đầu ở settlement overview; HUD dùng phase/timer emphasis trong HUD + World Event banner riêng.
- `docs/UI_USER_DESIGN_DECISIONS_2026-09-07.md` đã được cập nhật với toàn bộ 18 quyết định; đây là confirmed preferences, chưa phải approval một layout cụ thể.
- `docs/UI_PROTOTYPE_V5_V10_1_REFERENCE.md` là historical reference non-authoritative cho prototype V5–V10.1.
- Source Index/Migration Pack xác nhận prototype V5–V10.1 là frozen/non-authoritative; tên `final` không làm chúng authoritative.
- Tiếp tục rà từng quyết định UI lịch sử còn chưa được user tái xác nhận theo cách `GIỮ / BỎ / SỬA`, trước hết chỉ trong phạm vi Landing/Lobby/Room/HUD.
- Không thay gameplay, protocol, timer hoặc authoritative logic.

### Source
- Quyết định trực tiếp mới nhất của người dùng trong Chat 05 ngày 2026-09-07.
- `docs/UI_USER_DESIGN_DECISIONS_2026-09-07.md`.
- `docs/UI_PROTOTYPE_V5_V10_1_REFERENCE.md`.
- Lịch sử cuộc trò chuyện `Game mô phỏng nhân sinh`, Source Index và Migration Pack.
- `client/src/main.ts`, `client/styles.css` trên branch `main` chỉ là implementation reference.

### Impact
- Các art/layout assumptions cũ bị supersede ở chỗ xung đột với 18 quyết định mới.
- Các quyết định lịch sử chưa tái xác nhận không được coi là mặc định giữ lại.
- Chat 06 chưa được nhận redesign mới cho đến khi user duyệt từng màn/cụm.
- Prototype V5–V10.1 chỉ dùng để tham khảo ý tưởng/delta, không làm source of truth.

### Verified
- Đã khôi phục được các mốc chính V5→V10.1 và trạng thái frozen/non-authoritative.
- Đã ghi nhận đầy đủ 18 quyết định trực tiếp mới nhất của user vào tài liệu design decisions.

### Unverified
- Delta chi tiết độc lập của V10 so với V9/V10.1 chưa khôi phục đủ bằng chứng; reference giữ confidence medium.
- Chưa có user approval cho layout cụ thể của Landing, Lobby, Room hoặc HUD.
- Một số quyết định lịch sử về menu structure, Lobby presentation, Turn Track, map navigation, Government/Residence drawers và shell vẫn cần user chọn GIỮ/BỎ/SỬA.

### Handoff
- Chưa có. Chờ user hoàn tất review GIỮ/BỎ/SỬA và duyệt cụm Landing/Lobby/Room/HUD.

### Open Issues
- User design approval cho Landing/Lobby/Room/HUD đang OPEN.
- Historical decision reconciliation cho cụm này đang OPEN.
