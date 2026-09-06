# 07 — RELEASE & QA — CURRENT REPORT

## AI SPECIALIST REPORT

### Status

Bị chặn — `H-20260907-038-07-UIUX-ART-FINAL-QA` source/regression PASS nhưng production runtime không có raster assets do Docker image bỏ sót `client/public/`.

### Changed

- Đọc H038, H037, `docs/UI_ART_ASSET_CONTRACT_V1.md` và `docs/UI_ART_BINARY_REVIEW_V1.md`.
- Thêm QA-only `qa/uiux-art-final-e2e.mjs` + `.github/workflows/uiux-art-final-e2e.yml` cho final desktop/mobile Wave 4 art gate.
- Clean client suite PASS **37/37**, gồm final Wave 4 manifest, production raster hooks, presentation-only art runtime, action payload regressions, Tutorial và QR regressions.
- Initial browser attempt bị deployment timing race và không được tính là product defect.
- Final diagnostic run `34054650882`, head `b549df7e54194b4a062bc90e958cbc01e2f156f7`: Render đã live trước browser execution nhưng live client vẫn `data-ui-art="fallback"`; toàn bộ required asset readiness markers thiếu.
- Root cause xác nhận trong `Dockerfile`: runtime stage copy `index.html`, `styles.css`, compiled `dist/` nhưng không copy `client/public/`; server dùng `STATIC_DIR=/app/client`.
- Tạo `H-20260907-039-04-DEPLOY-UI-ART-PUBLIC-ASSETS` cho Chat 04; H038 chuyển BLOCKED.

### Source

- `handoffs/H-20260907-038-07-UIUX-ART-FINAL-QA.md`
- `handoffs/H-20260907-039-04-DEPLOY-UI-ART-PUBLIC-ASSETS.md`
- `docs/UI_ART_ASSET_CONTRACT_V1.md`
- `docs/UI_ART_BINARY_REVIEW_V1.md`
- `client/src/ui-assets.ts`
- `client/public/assets/ui/v1/manifest.json`
- `Dockerfile`
- `server/backend/server/src/index.ts`
- `qa/uiux-art-final-e2e.mjs`
- `.github/workflows/uiux-art-final-e2e.yml`
- workflow run `34054650882`
- artifact `9995595825`
- digest `sha256:26f6bc41e11f686220a9c3419c9ecd5f285f299ff6453e6862da6a0e02b59404`

### Impact

Wave 4 art source/integration is present and deterministic regressions pass, but deployed players still receive fallback presentation because production image omits the binary asset directory. Therefore H038/H019 cannot close and full player-facing UI is not release-ready. No gameplay/server protocol rule is affected.

### Verified

- Chat 05 raster binary batches A–D: APPROVED.
- Chat 06 final integration source present.
- Clean client build/tests: **37/37 PASS**.
- Final Wave 4 manifest/hooks/presentation-only tests: PASS.
- Market/Recovery/Support/Marriage non-default payload capture regressions: PASS.
- Birth response, Tutorial, waiting queue and QR contract regressions: PASS.
- Render tested head was `live` before diagnostic browser execution.
- Live art runtime status: `fallback`; all required raster readiness markers absent.
- Production Docker runtime omits `client/public/` while `STATIC_DIR=/app/client`.

### Unverified

- Required raster assets loading in deployed production runtime after packaging fix.
- Final desktop/mobile terrain/landmark/residence/icon/frame/portrait/ambience composition.
- Final art/timer browser smoke after packaging fix.
- H019 full UI/UX closure.

### Handoff

Chat 04 xử lý `H-20260907-039-04-DEPLOY-UI-ART-PUBLIC-ASSETS`. Sau khi deployed manifest/raster assets được phục vụ, trả H038 về Chat 07 để rerun final desktop/mobile gate. Chỉ trả Chat 06 nếu sau deploy xuất hiện client integration defect riêng.

### Open Issues

- `H-20260907-038-07-UIUX-ART-FINAL-QA`: BLOCKED / FAIL pending deployment packaging fix.
- `H-20260907-039-04-DEPLOY-UI-ART-PUBLIC-ASSETS`: OPEN.
- `H-20260906-019-06-FULL-UIUX-IMPLEMENTATION`: OPEN pending final art QA.
- `H-20260907-033-07-LOBBY-QR-QA`: DONE / PASS.
- `H-20260907-029-07-UIUX-DISPLAY-QA`: DONE / PASS.
- OI-001–OI-006 remain CLOSED/VERIFIED.
