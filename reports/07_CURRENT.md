# 07 — RELEASE & QA — CURRENT REPORT

## AI SPECIALIST REPORT

### Status

Hoàn thành — `H-20260906-021-07-UIUX-WAVE1-QA` PASS WITH WARNINGS. Wave 1/P0 player-facing flow đã có live browser/server E2E evidence; chưa đánh dấu toàn UI release-ready vì Wave 2–4 và Support server dependency vẫn còn ngoài phạm vi handoff này.

### Changed

- Rà `reports/06_CURRENT.md`, client production shell, transport, regression tests và `H-20260906-020-03-SUPPORT-TARGETS`.
- Thêm QA-only Playwright runner `qa/uiux-wave1-e2e.mjs` + workflow `.github/workflows/uiux-wave1-e2e.yml`; không thay gameplay/client/server production semantics.
- Hai run đầu fail do runner assumptions và đã được phân loại là test-tooling defects, không phải product defects.
- Final GitHub Actions run `34045789102` PASS; artifact `9993058844`, digest `sha256:ea19d392569df1eed39a9a0ebcc599d22bb9ea282dc820251339283307d09955`.
- Final live E2E đạt 14/14 checks PASS trên Render.

### Source

- `handoffs/H-20260906-021-07-UIUX-WAVE1-QA.md`
- `reports/06_CURRENT.md`
- `client/src/main.ts`
- `client/src/transport.ts`
- `client/test/ui-shell.test.mjs`
- `client/test/tutorial.test.mjs`
- `handoffs/H-20260906-020-03-SUPPORT-TARGETS.md`
- `qa/uiux-wave1-e2e.mjs`
- `.github/workflows/uiux-wave1-e2e.yml`
- Live URL `https://intergenerational-contract.onrender.com`
- Successful run `34045789102`, head SHA `7865f3a182a6b5ebd08c83b3f0ffd99ebed55a8f`
- Artifact `9993058844`

### Impact

Wave 1/P0 core player flow có bằng chứng live integration. Không có defect mới cần trả Chat 06/03. Support vẫn ở safe unavailable state cho tới khi Chat 03 hoàn thành authoritative target list. Wave 2–4 không được nâng trạng thái bởi QA này.

### Verified

- Landing production shell render: PASS.
- Create Room -> Lobby: PASS.
- Host Start presentation + start -> game shell: PASS.
- Saved reconnect token -> `room:reconnect` + `room:get-state` -> restored Lobby: PASS.
- Join Room -> Lobby; non-host không có Start: PASS.
- Late join sau start -> Waiting Queue: PASS.
- Waiting Queue không có gameplay action controls: PASS.
- World HUD + map shell + Turn Track render live: PASS.
- Tutorial entry isolated: PASS.
- Help/feedback không dừng authoritative timer: PASS (`7s -> 6s`).
- Normal room không có Tutorial overlay: PASS.
- Support không expose raw Character ID; khi server field chưa có thì safe unavailable state: PASS.
- Client local regression đã được Chat 06 báo PASS 8/8 gồm TypeScript build.
- Incoming Birth accept/reject UI và host-only Replay presentation được deterministic regression/source kiểm tra.

### Unverified

- Incoming Birth proposal accept/reject chưa được ép thành live browser state trong run Wave 1 vì cần proposal authoritative cụ thể.
- Host-only Replay chưa được chạy qua một live game-ended state trong run Wave 1.
- `eligibleSupportTargets` active selector chưa thể integration-test vì `H-20260906-020-03-SUPPORT-TARGETS` vẫn OPEN.
- Wave 2–4, final art, animation, QR lobby và các hạng mục ngoài Wave 1/P0 chưa được QA hoàn tất.

### Handoff

Không tạo handoff defect mới. Chat 03 tiếp tục `H-20260906-020-03-SUPPORT-TARGETS`; Chat 06 tiếp tục Wave 2–4 theo `H-20260906-019-06-FULL-UIUX-IMPLEMENTATION`. Sau các wave tiếp theo cần quay lại Chat 07 cho QA tương ứng.

### Open Issues

- `H-20260906-021-07-UIUX-WAVE1-QA`: CLOSED — PASS WITH WARNINGS.
- `H-20260906-020-03-SUPPORT-TARGETS`: OPEN — server dependency.
- `H-20260906-019-06-FULL-UIUX-IMPLEMENTATION`: OPEN — Wave 2–4 còn việc.
