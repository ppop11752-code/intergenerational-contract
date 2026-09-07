# 05 — UI/UX & ART — CURRENT REPORT

## AI SPECIALIST REPORT

### Status
Đang làm — Landing V1 và Lobby V1 đã được user duyệt và handoff sang Chat 06. Room / World shell Source Validation Gate đã CLOSED và user đã chọn direction `WSA — Thế giới là màn hình`; hiện đang ở final concrete-detail pass trước khi có thể khóa Room V1. HUD sẽ xử lý sau khi Room shell đủ rõ.

### Changed
- User đã chọn Room direction `WSA — Thế giới là màn hình`.
- Tạo `docs/UI_ROOM_DIRECTION_V1.md` làm source cho direction đã được user xác nhận nhưng chưa phải final screen approval.
- User bổ sung constraint quan trọng cho minimap: ở trạng thái mặc định/compact, minimap phải **thật sự hiển thị thông tin bản đồ**, không được biến thành một nút/icon thông thường.
- `docs/UI_ROOM_SOURCE_VALIDATION_V1.md` đã được cập nhật để làm rõ R8: compact minimap luôn là một live/simplified map overview; hover/click chỉ dùng để enlarge/reveal thêm chi tiết.
- WSA giữ map chiếm gần toàn viewport; HUD/Turn Track/quick-nav/minimap nổi nhẹ trên map thay vì đóng map vào frame/dashboard.
- Minimap compact mặc định phải cho thấy ít nhất spatial overview + current viewport region; exact marker set và click-navigation behavior vẫn chờ final detail pass.
- Không thay gameplay, protocol, timers, authoritative state hoặc map rules.

### Source
- Quyết định trực tiếp mới nhất của user trong Chat 05.
- `docs/UI_ROOM_DIRECTION_V1.md`.
- `docs/UI_ROOM_SOURCE_VALIDATION_V1.md`.
- `docs/UI_DESIGN_APPROVAL_WORKFLOW_V2.md`.
- `docs/UI_V5_V10_1_DECISION_RECONCILIATION_A_B.md`.
- `docs/UI_USER_DESIGN_DECISIONS_2026-09-07.md`.

### Impact
- Room không còn ở bước chọn concept; chỉ còn final composition/detail approval trước khi khóa spec.
- Chat 06 chưa được phép implement Room redesign.
- Mọi implementation minimap dạng collapsed icon/button sẽ vi phạm current user decision.
- HUD detailed composition vẫn chưa được khóa; Room pass chỉ xác định shell/map spatial structure và interaction zones.

### Verified
- Room Source Validation Gate đã CLOSED.
- WSA được user chọn trực tiếp.
- Minimap default-state semantics đã được user làm rõ trực tiếp.
- Không có gameplay/protocol/timer/action semantic change.

### Unverified
- Exact desktop proportions, Government plaza/world composition, Residence density/grouping, Turn Track chrome, minimap dimensions/marker set/click behavior, quick-nav arrangement around minimap, drawer anchoring, mobile Room layout và ornament density chưa được user duyệt cuối.

### Handoff
- Chat 06: `H-20260907-038-06-LANDING-DESIGN-IMPLEMENTATION` — Landing V1.
- Chat 06: `H-20260907-041-06-LOBBY-DESIGN-IMPLEMENTATION` — Lobby V1.
- Chat 05: hoàn tất final Room detail pass; chưa có Room implementation handoff.

### Open Issues
- Landing implementation/visual verification OPEN.
- Lobby implementation/visual verification OPEN.
- Room / World shell final design approval OPEN.
- HUD design approval OPEN.
