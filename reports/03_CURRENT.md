# 03 — MULTIPLAYER & SERVER — CURRENT REPORT

## AI SPECIALIST REPORT

### Status

Hoàn thành `H-20260906-020-03-SUPPORT-TARGETS`; server đã expose danh sách mục
tiêu hỗ trợ gia đình authoritative và bàn giao Chat 06 tích hợp production client.

### Changed

- Thêm pure query `GameEngine.isEligibleVoluntarySupportTarget()` dùng đúng luật
  direct parent/child đang được `voluntaryFamilySupport()` chấp nhận.
- Private snapshot luôn trả `eligibleSupportTargets`; chỉ populate cho đúng
  Character đang ở lượt Voluntary, các trạng thái khác trả `[]`.
- Mỗi target gồm `characterId`, `relation`, `ageLabel`, và Household `status`.
- Action `family:support` dùng chung pure relation query nhưng giữ nguyên toàn bộ
  error/amount/cash/spending-cap behavior.
- Bổ sung regression action parity, true/false cases và no-side-effect; đưa vào
  `test`/`smoke` gates và cập nhật multiplayer protocol.

### Source

- `server/backend/src/engine.ts`
- `server/backend/src/authoritative-room.ts`
- `server/backend/test/support-targets-snapshot.mjs`
- `server/backend/MULTIPLAYER_PROTOCOL_V50.md`
- `server/backend/package.json`
- Handoff `H-20260906-020-03-SUPPORT-TARGETS`
- Implementation commit `271da7b2a11b921c13bb454b8982b1a90975ec57`

### Impact

Production client có thể hiển thị selector cha/mẹ–con từ private authoritative
state, không yêu cầu người chơi nhập Character ID và không tự suy diễn quan hệ.
Giá trị tiền gửi, tiền mặt còn lại và giới hạn chi tiêu vẫn được server kiểm tra
khi nhận action như trước.

### Verified

- Backend `npm run release:check`: PASS.
- Typecheck: PASS.
- Rule Ledger: PASS 42/42.
- OI-002 regression: PASS 6/6.
- OI-001 regression: PASS 9/9.
- Birth eligibility regression: PASS.
- Support target regression: PASS — parent/child, unrelated, dead target, wrong
  phase, wrong turn, lobby, action parity và snapshot no-side-effect.
- Fuzz: PASS 20 games.
- Final simulation: PASS 30 games.
- Nested server typecheck/build: PASS.
- Socket event contract: PASS 9/9.
- Current client build/tests: PASS 8/8.

### Audit

- Authoritative source: existing `voluntaryFamilySupport()` direct parent/child rule.
- Blast radius checked: engine action, private snapshot, protocol, client placeholder.
- Falsification cases checked: unrelated/dead target, lobby, non-Voluntary và non-current turn.
- `docs/OPEN_ISSUES.md`: không có OI-001–OI-006 nào bị mở lại.
- Gameplay constants/rules: unchanged.
- Verification level: source + deterministic integration complete; live browser flow pending.

AUDIT: PASS

### Unverified

- Chưa xác minh selector Support mới trên live browser/deployed runtime.
- Chưa hoàn thành toàn bộ Wave 2–4 UI/UX; không có claim release-ready.

### Handoff

Chat 06 xử lý `H-20260906-022-06-SUPPORT-TARGETS-INTEGRATION`, sau đó chuyển
active Support flow cho Chat 07 browser/server QA.

### Open Issues

- Không mở lại OI-001–OI-006.
- UI/UX production work vẫn tiếp tục dưới `H-20260906-019-06-FULL-UIUX-IMPLEMENTATION`.
