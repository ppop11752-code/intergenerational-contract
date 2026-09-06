# 05 — UI/UX & ART — CURRENT REPORT

## AI SPECIALIST REPORT

### Status
Đang làm — giai đoạn thiết kế giao diện có user approval trực tiếp. Cụm hiện tại: `Landing → Lobby → Room → HUD`. Chưa có redesign nào được khóa hoặc bàn giao Chat 06.

### Changed
- Người dùng xác nhận 10 preference/decision mới cho hướng thiết kế:
  1. pixel art + Japanese anime/chibi;
  2. Human/NPC phải phân biệt được bằng visual presentation;
  3. world/map sáng sống động + UI chrome/panel trầm hơn;
  4. pixel-frame nhưng không quá vuông/cứng;
  5. Market chỉ mở khi bấm, không luôn hiện;
  6. vị trí Voluntary actions do Chat 05 tối ưu theo độ gọn/readability;
  7. Niên sử gồm `HÀNH TRÌNH` + `THẾ GIỚI`;
  8. HUD adaptive: gọn mặc định, nhấn mạnh thông tin quan trọng khi cần;
  9. Music + SFX chỉnh riêng trong Settings;
  10. Landing sẽ thiết kế logo/symbol thật, current `IC` sigil không final.
- Tạo `docs/UI_USER_DESIGN_DECISIONS_2026-09-07.md` để lưu các quyết định trên; đây là confirmed preferences, chưa phải approval một layout cụ thể.
- Rà lại lịch sử prototype V5–V10.1 và tạo `docs/UI_PROTOTYPE_V5_V10_1_REFERENCE.md` làm historical reference non-authoritative.
- Giữ nguyên nguyên tắc: code/QA PASS không đồng nghĩa user design approval; art direction cũ không tự authoritative nếu chưa được user trực tiếp xác nhận.
- Không thay gameplay, protocol, timer hoặc authoritative logic.

### Source
- Quyết định trực tiếp mới nhất của người dùng trong Chat 05 ngày 2026-09-07.
- Lịch sử cuộc trò chuyện `Game mô phỏng nhân sinh` và các frozen prototype V5–V10.1 được truy hồi.
- `client/src/main.ts`, `client/styles.css` trên branch `main` chỉ là implementation reference.

### Impact
- Các art assumptions cũ bị supersede ở chỗ xung đột với 10 quyết định mới.
- Chat 05 sẽ tiếp tục hỏi các điểm còn mơ hồ từ lịch sử UI trước khi dựng/khóa Landing/Lobby/Room/HUD.
- Chat 06 chưa được nhận redesign mới cho đến khi user duyệt từng màn/cụm.
- Prototype V5–V10.1 chỉ được dùng để tham khảo ý tưởng/delta, không làm source of truth.

### Verified
- Đã khôi phục được các mốc chính: V5 functional panels; V5.1 interaction/missing-flow pass; V6 world/map + end-to-end flow; V7 pixel/state coverage; V8 art-direction pass; V9 persistent map shell; V10 structure-correction pass (detail confidence medium); V10.1 UX-lock attempt.
- Đã xác nhận user trực tiếp chọn pixel art + Japanese anime/chibi, Human/NPC visual distinction, hybrid bright-world/darker-UI direction, adaptive HUD, two-tab Niên sử, Settings audio controls và Landing logo design.

### Unverified
- Delta chi tiết độc lập của V10 so với V9/V10.1 chưa khôi phục đủ bằng chứng; tài liệu reference đã ghi rõ confidence medium, không suy diễn thêm.
- Chưa có user approval cho layout cụ thể của Landing, Lobby, Room hoặc HUD.

### Handoff
- Chưa có. Chờ user tiếp tục trả lời các câu hỏi thiết kế còn mơ hồ và duyệt cụm Landing/Lobby/Room/HUD.

### Open Issues
- User design approval cho Landing/Lobby/Room/HUD đang OPEN.
- Còn cần làm rõ một số quyết định layout/interaction từ chat UI cũ trước khi bắt đầu khóa Landing.
