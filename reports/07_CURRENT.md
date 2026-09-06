# 07 — RELEASE & QA — CURRENT REPORT

## AI SPECIALIST REPORT

### Status

Bị chặn — `H-20260907-029-07-UIUX-DISPLAY-QA` phát hiện presentation lifecycle defect ở Recovery: authoritative quote có trong snapshot nhưng không xuất hiện khi panel được mở sau snapshot.

### Changed

- Đọc `H-20260907-029-07-UIUX-DISPLAY-QA`, report 06 và client display integration.
- Thêm QA harness `qa/uiux-display-e2e.mjs` + workflow `.github/workflows/uiux-display-e2e.yml` dùng production client + compiled production `AuthoritativeRoom`/`GameEngine` qua Socket.IO.
- Workflow `UIUX Display E2E` run `34049782937` chạy trên head `f28a659700fc9c70b0e5dbbed93f793529428bfc`.
- Authoritative engine build PASS.
- Full clean client suite PASS 25/25.
- World Event và Mandatory browser integration PASS trước điểm fail.
- Browser fail tại Recovery: `player.recoveryQuotes` tồn tại nhưng mở panel không tạo `.server-quote`; timeout 30s.
- Xác định nguyên nhân khả dĩ: `display-contract` chỉ decorate trên `ic:snapshot`, trong khi local panel render xảy ra sau snapshot và không phát event mới.
- Tạo defect handoff `H-20260907-030-06-RECOVERY-DISPLAY-DECORATION` cho Chat 06.

### Source

- `handoffs/H-20260907-029-07-UIUX-DISPLAY-QA.md`
- `handoffs/H-20260907-030-06-RECOVERY-DISPLAY-DECORATION.md`
- `reports/06_CURRENT.md`
- `client/src/display-contract.ts`
- `client/src/transport.ts`
- `client/src/main.ts`
- `client/test/display-contract.test.mjs`
- `server/backend/src/authoritative-room.ts`
- server display contract commit `9222968e2aba9970cd2f7038b9b901b304f40a89`
- workflow run `34049782937`
- artifact `9994199735`
- artifact digest `sha256:e9fd43453820c4b555e1ca9eccd7016a96ce40bb2d449358afb855ad4cf6770a`

### Impact

World Event/Mandatory display đã browser-verify, nhưng Recovery authoritative display hiện không đáng tin khi người dùng mở panel sau snapshot. Status và các remaining checks chưa được chạy tới vì E2E dừng tại failure. Đây là presentation-only defect; không có bằng chứng gameplay/server rule bị sai.

### Verified

- Authoritative engine build: PASS.
- Full clean client suite: PASS 25/25.
- World Event active value từ authoritative snapshot: PASS.
- World Event null -> `Không có`: PASS.
- Mandatory quote tồn tại và toàn bộ breakdown labels/values hiển thị từ authoritative quote: PASS.
- Mandatory liquidation/bankruptcy/shortfall wording giữ `DỰ KIẾN`, không claim committed bankruptcy: PASS.
- Mandatory không có skip button: PASS.
- Mandatory display không đổi `phaseDeadlineAt`: PASS.
- Artifact ghi lại toàn bộ checks trước failure.

### Unverified

- Recovery quote rendering sau khi mở panel: FAIL hiện tại.
- Recovery action cost/unit revalidation browser path sau display fix.
- Status/Noble browser display end-to-end.
- Null/empty quote stale-value behavior ngoài case World Event.
- Final smoke Market/Support/Birth/Marriage trong cùng display run; clean client suite 25/25 vẫn PASS và Support có browser-authoritative E2E riêng trước đó.

### Handoff

Chat 06 xử lý `H-20260907-030-06-RECOVERY-DISPLAY-DECORATION`, sau đó trả `H-20260907-029-07-UIUX-DISPLAY-QA` về Chat 07 để rerun.

### Open Issues

- `H-20260907-029-07-UIUX-DISPLAY-QA`: BLOCKED / QA FAIL pending client presentation fix.
- `H-20260907-030-06-RECOVERY-DISPLAY-DECORATION`: OPEN.
- `H-20260906-019-06-FULL-UIUX-IMPLEMENTATION`: OPEN.
- OI-001–OI-006 remain CLOSED/VERIFIED.
