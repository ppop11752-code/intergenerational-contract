# 07 — RELEASE & QA — CURRENT REPORT

## AI SPECIALIST REPORT

### Status

Bị chặn — `H-20260907-038-07-UIUX-ART-FINAL-QA` đã vượt qua blocker deployment H039, nhưng final browser QA phát hiện Government raster bị non-integer scaling trong client.

### Changed

- Xác nhận `H-20260907-039-04-DEPLOY-UI-ART-PUBLIC-ASSETS` CLOSED; production smoke run `34055138772` PASS manifest + Government PNG.
- Rerun final Wave 4 browser QA trên production live.
- Clean client suite tiếp tục PASS **37/37**.
- Required raster package hiện được tải thật; deployment blocker không còn.
- Diagnostic QA run `34055446102`, head `43ee3a00004efadcdd01e7b08a63053c7986ded8` xác định exact offender của icon-size/integer-scaling gate.
- Government icon có CSS `24×24` nhưng render ~`32.4×32.4` vì parent `button.landmark.gov` dùng `transform: scale(1.35)` trên desktop; compact/mobile hiện dùng `scale(1.1)`.
- Tạo `H-20260907-040-06-UI-ART-INTEGER-SCALING` cho Chat 06.

### Source

- `handoffs/H-20260907-038-07-UIUX-ART-FINAL-QA.md`
- `handoffs/H-20260907-039-04-DEPLOY-UI-ART-PUBLIC-ASSETS.md`
- `handoffs/H-20260907-040-06-UI-ART-INTEGER-SCALING.md`
- `docs/UI_ART_ASSET_CONTRACT_V1.md`
- `docs/UI_ART_BINARY_REVIEW_V1.md`
- `client/src/ui-assets.ts`
- `client/styles.css`
- `qa/uiux-art-final-e2e.mjs`
- workflow run `34055446102`
- artifact `9995814481`
- digest `sha256:1fb5154ebb05fac8b9b9cf6531d964c94e3253952f1efeb856c87f7463d92313`

### Impact

Wave 4 raster package is now present in production and source regressions remain healthy. H038/H019 still cannot close because core Government pixel art is scaled by non-integer factors, violating the locked final art acceptance criterion. No gameplay, server protocol or timer semantics are affected.

### Verified

- H039 deployment packaging fix: CLOSED / production smoke PASS.
- Required live raster package is reachable and readiness checks pass before icon-size assertion.
- Clean client build/tests: **37/37 PASS**.
- Manifest/hooks/presentation-only art regression: PASS.
- Market/Recovery/Support/Marriage payload regressions: PASS.
- Birth response, Tutorial, waiting queue and QR contract regressions: PASS.
- Exact scaled offender: Government raster icon inside `.landmark.gov`.
- Desktop parent transform: `scale(1.35)` -> 24px icon renders ~32.4px.
- Compact/mobile CSS also uses non-integer `scale(1.1)`.

### Unverified

- Final desktop/mobile QA after Government integer-scaling fix.
- Remaining downstream frame/portrait/ambience/timer checks after the current fail-fast assertion.
- H019 full UI/UX closure.

### Handoff

Chat 06 xử lý `H-20260907-040-06-UI-ART-INTEGER-SCALING`. Sau fix, trả H038 về Chat 07 để rerun final desktop/mobile gate. Không cần trả Chat 04 trừ khi xuất hiện lỗi static-serving/deployment mới.

### Open Issues

- `H-20260907-038-07-UIUX-ART-FINAL-QA`: BLOCKED pending H040.
- `H-20260907-040-06-UI-ART-INTEGER-SCALING`: OPEN.
- `H-20260907-039-04-DEPLOY-UI-ART-PUBLIC-ASSETS`: CLOSED / production verified.
- `H-20260906-019-06-FULL-UIUX-IMPLEMENTATION`: OPEN pending final art QA.
- `H-20260907-033-07-LOBBY-QR-QA`: DONE / PASS.
- `H-20260907-029-07-UIUX-DISPLAY-QA`: DONE / PASS.
- OI-001–OI-006 remain CLOSED/VERIFIED.
