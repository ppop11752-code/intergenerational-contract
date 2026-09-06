# 07 — RELEASE & QA — CURRENT REPORT

## AI SPECIALIST REPORT

### Status

Bị chặn — `H-20260906-023-07-SUPPORT-FLOW-QA` phát hiện client defect thật: form value bị reset trước khi `game:action` gửi lên authoritative server. Support flow chưa PASS.

### Changed

- Đọc handoff `H-20260906-023-07-SUPPORT-FLOW-QA`, report 03/06 và authoritative Support regression.
- Xác nhận server `eligibleSupportTargets` đã hoàn tất; client đã tích hợp selector authoritative.
- Thêm QA-only browser harness `qa/support-flow-e2e.mjs` + workflow `.github/workflows/support-flow-e2e.yml` dùng production client qua Socket.IO với compiled `GameEngine` + `AuthoritativeRoom`; fixture parent/child chỉ tạo state kiểm thử, không thay gameplay.
- CI build authoritative engine PASS và production client build PASS.
- Support selector đã hiển thị đúng authoritative parent/child targets và không lộ raw Character ID trước khi action test fail.
- Phát hiện khi browser nhập Support amount `5`, authoritative mutation chỉ chuyển `1` (`actor 100 -> 99`, target 0 -> 1`).
- Root cause: `run()` gọi `render()` trước khi deferred callback đọc DOM; input/select bị rebuild về default trước khi action payload được tạo.
- Pattern tương tự có khả năng ảnh hưởng Market units, Recovery units và Marriage candidate; đã giao Chat 06 audit/fix.

### Source

- `handoffs/H-20260906-023-07-SUPPORT-FLOW-QA.md`
- `reports/03_CURRENT.md`
- `reports/06_CURRENT.md`
- `server/backend/test/support-targets-snapshot.mjs`
- `client/src/main.ts`
- `qa/support-flow-e2e.mjs`
- `.github/workflows/support-flow-e2e.yml`
- QA workflow run `34046838461`, head SHA `ca4d90a6320ade9e85586a70b7d48e7ea1a13077`
- Defect handoff `H-20260906-024-06-CLIENT-FORM-STATE-LOSS`

### Impact

Support production flow không đáng tin cậy với giá trị người dùng nhập khác default; target selection cũng có nguy cơ reset về option đầu tiên. Vì cùng pattern tồn tại ở các action form khác, Wave 1/P0 cần regression lại sau fix. Không thay đổi hoặc nghi ngờ gameplay rule/server validation.

### Verified

- Server authoritative Support target/action regression: PASS theo Chat 03; parent/child only, unrelated/dead/wrong phase/wrong turn và no-side-effect covered.
- Client build trong QA CI: PASS.
- Authoritative engine build trong QA CI: PASS.
- Browser selector mirror đúng `eligibleSupportTargets` trước action submit.
- Parent + child đều có trong authoritative target list fixture.
- Player-facing labels không chứa raw Character ID.
- Browser nhập amount `5`, server mutation thực tế là `1`: defect reproduced deterministically.
- Source inspection xác nhận DOM values được đọc trong callback sau `run()` đã gọi `render()`.

### Unverified

- Valid Support amount/target sau khi Chat 06 fix.
- Invalid amount/cash/50% cap feedback qua production UI sau fix; current defect ngăn test đáng tin cậy các giá trị non-default.
- Empty target state/timer checks trong harness chưa chạy tới cuối vì fail sớm tại valid mutation assertion; server/client source/regression riêng vẫn có coverage.
- Market/Recovery/Marriage runtime impact của cùng pattern chưa được browser-prove; Chat 06 phải audit và regression.

### Handoff

Chat 06 xử lý `H-20260906-024-06-CLIENT-FORM-STATE-LOSS`. Sau PASS, trả lại Chat 07 rerun `H-20260906-023-07-SUPPORT-FLOW-QA` và relevant Wave 1 form actions.

### Open Issues

- `H-20260906-023-07-SUPPORT-FLOW-QA`: BLOCKED / QA FAIL pending client fix.
- `H-20260906-024-06-CLIENT-FORM-STATE-LOSS`: OPEN.
- `H-20260906-019-06-FULL-UIUX-IMPLEMENTATION`: OPEN — Wave 2–4 còn việc.
- OI-001–OI-006 remain CLOSED; this is a newer client UI regression, not a reopening of gameplay-rule issues.
