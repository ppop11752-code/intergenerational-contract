# 07 — RELEASE & QA — CURRENT REPORT

## AI SPECIALIST REPORT

### Status

Bị chặn — `H-20260907-033-07-LOBBY-QR-QA` phát hiện defect presentation thật: QR Lobby bị crop ở mép phải/dưới và không decode được. Đã giao Chat 06 qua `H-20260907-034-06-LOBBY-QR-CROPPING`.

### Changed

- Đọc H033, `docs/UI_QR_CONTRACT_V1.md`, report 06 và production QR implementation.
- Thêm QA-only `qa/lobby-qr-e2e.mjs` + `.github/workflows/lobby-qr-e2e.yml` để chạy clean client suite và browser QR decode/deep-link/fallback checks.
- Clean client suite PASS 32/32, gồm 5 QR contract regressions.
- Hai browser run đầu fail do QA harness assumptions và đã được loại trừ khỏi product-defect classification.
- Diagnostic run `34051451933` trên head `196d8e3213b224c538d7a30fc84f48c1d2230e07` xác nhận QR production bị crop: visible QR container khoảng 202×202 nhưng QRCode.js render ảnh 192×192 bên trong vùng có padding; screenshot mất mép phải/dưới.
- Raw decode FAIL; thêm 32px viền trắng vào screenshot sau capture vẫn FAIL, chứng minh module QR đã bị cắt chứ không chỉ thiếu khoảng trắng bên ngoài.
- Tạo defect handoff `H-20260907-034-06-LOBBY-QR-CROPPING`; H033 chuyển BLOCKED.

### Source

- `handoffs/H-20260907-033-07-LOBBY-QR-QA.md`
- `handoffs/H-20260907-034-06-LOBBY-QR-CROPPING.md`
- `docs/UI_QR_CONTRACT_V1.md`
- `reports/06_CURRENT.md`
- `client/src/qr-contract.ts`
- `client/src/qr-runtime.ts`
- `client/test/qr-contract.test.mjs`
- `client/index.html`
- `qa/lobby-qr-e2e.mjs`
- `.github/workflows/lobby-qr-e2e.yml`
- diagnostic workflow run `34051451933`
- artifact `9994665230`
- digest `sha256:97a142c12ba2b8a4445d3483dc174d91357077c3b30c6351bdeaff9a712ef03c`

### Impact

Lobby QR chưa đạt contract scannable/decodable, vì vậy H033 chưa thể PASS. Đây là client presentation/layout defect; không có bằng chứng gameplay/server/protocol sai. Full player-facing UI vẫn chưa release-ready; ngoài QR blocker còn H019 art-complete scope.

### Verified

- Clean client suite: PASS 32/32.
- QR contract deterministic tests: same-origin normalized deep-link, valid prefill, invalid query ignore, no auto join, fallback wording: PASS.
- Lobby PIN visible: PASS.
- QRCode.js reaches ready state: PASS.
- Requested QR module image size: 192×192.
- Visible `.qr-functional` bounding box in browser: ~202×202.
- Artifact `qr-functional.png` visually shows right/bottom QR clipping.
- Raw browser screenshot decode: FAIL.
- Same screenshot with diagnostic +32px white border: FAIL; clipping is inside rendered modules, not only outer quiet-zone shortage.

### Unverified

- Exact decoded payload through a scannable browser QR: blocked by clipping.
- Valid deep-link browser prefill/no-auto-join explicit join, stale query, renderer-failure fallback, copy-link and clipboard-failure browser paths in the final successful sequence; deterministic source/tests cover most semantics, but H033 requires end-to-end rerun after layout fix.
- Final raster-art visual-complete scope under H019 remains open.

### Handoff

Chat 06 xử lý `H-20260907-034-06-LOBBY-QR-CROPPING`. Sau fix, trả H033 về Chat 07 để rerun toàn bộ Lobby QR browser QA.

### Open Issues

- `H-20260907-033-07-LOBBY-QR-QA`: BLOCKED / FAIL pending QR layout fix.
- `H-20260907-034-06-LOBBY-QR-CROPPING`: OPEN.
- `H-20260906-019-06-FULL-UIUX-IMPLEMENTATION`: OPEN — art/final visual scope còn việc.
- `H-20260907-029-07-UIUX-DISPLAY-QA`: DONE / PASS.
- OI-001–OI-006 remain CLOSED/VERIFIED.
