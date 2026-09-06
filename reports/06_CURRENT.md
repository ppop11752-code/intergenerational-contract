# 06 — CLIENT IMPLEMENTATION — CURRENT REPORT

### Status
Đang làm — H-20260906-019 Wave 1 hoàn thành; Wave 2–3 đã mở rộng đáng kể; Wave 4 integration-ready nhưng NOT ART-COMPLETE vì chưa có raster binaries thật và còn một số authoritative display fields/QA.

### Changed
- Giữ toàn bộ production shell, Support authoritative selector và form-state fix hiện có.
- Hoàn thành `H-20260907-027-06-UIUX-ART-INTEGRATION` ở mức integration scaffolding.
- Tạo canonical asset root `client/public/assets/ui/v1/` và `manifest.json` theo contract v1: tile 32, icon 24, portrait 96, stable core keys.
- Thêm `client/src/ui-assets.ts`: loader async, probe từng asset, graceful fallback khi manifest/binary thiếu, không gate gameplay/transport/action.
- Loader chỉ kích hoạt presentation hook cho asset tải thành công bằng CSS variable + data attribute.
- Thêm deterministic 8-base portrait-key mapping, presentation-only.
- Bootstrap art loader trước `main.js` trong `client/index.html`.
- Thêm regression `client/test/ui-assets.test.mjs` cho manifest/version/root/path và portrait mapping.
- Thêm README runtime root, ghi rõ Chat 06 không fabricate missing raster binaries.

### Source
- handoffs/H-20260906-019-06-FULL-UIUX-IMPLEMENTATION.md
- handoffs/H-20260907-027-06-UIUX-ART-INTEGRATION.md
- docs/UI_ART_ASSET_CONTRACT_V1.md
- docs/UI_UX_FULL_AUDIT_2026-09-06.md
- docs/UI_TUTORIAL_SPEC.md
- Migration Pack `04_UI_UX_SPEC.md`

### Impact
- Client đã sẵn sàng nhận đúng filenames/binaries theo art contract mà không phải đổi gameplay semantics hoặc action bindings.
- Missing art chỉ ảnh hưởng presentation; không ảnh hưởng authoritative state/timer/action.
- Khi file thật xuất hiện, Government/frame/button/cloud/fog hooks có thể tự chuyển sang asset-backed rendering theo loader; các surface còn lại dùng cùng manifest contract để nối tiếp.
- Không được gọi Wave 4 art-complete chỉ vì scaffold đã xong.

### Verified
- Local current-client `npm test`: PASS 21/21.
- TypeScript build trong test suite: PASS.
- Regression xác nhận manifest v1 stable core geometry/keys.
- Regression xác nhận asset URL nằm dưới `./public/assets/ui/v1/`.
- Regression xác nhận portrait assignment deterministic 1–8 và không mang gameplay semantics.
- Existing reconnect/form-state/UI shell/tutorial regressions vẫn PASS trong cùng suite.

### Unverified
- Raster binaries cuối chưa tồn tại nên chưa visual-verify terrain/Government/residence/portrait/icon/frame asset thực.
- Chưa đạt Section 16 acceptance của `UI_ART_ASSET_CONTRACT_V1.md`.
- Browser/server/visual QA sau khi có binaries chưa chạy.
- Lobby QR vẫn là placeholder.
- `H-20260907-025-03-UIUX-DISPLAY-CONTRACT` vẫn là dependency cho World Event / Mandatory breakdown / Recovery quote / Status quote authoritative.
- UI chưa được tuyên bố player-facing release-ready.

### Handoff
- Chat 03: `H-20260907-025-03-UIUX-DISPLAY-CONTRACT`.
- Chat 05/asset production: cung cấp raster binaries đúng `UI_ART_ASSET_CONTRACT_V1.md`; không cần đổi contract v1 nếu filename/layout không breaking.
- Chat 07: visual/runtime regression chỉ sau khi real binaries được tích hợp; các QA flow hiện có vẫn cần rerun theo handoff tương ứng.

### Open Issues
- `H-20260906-019` remains OPEN.
- `H-20260907-027-06-UIUX-ART-INTEGRATION` DONE ở mức scaffold/integration-ready.
- Wave 4 remains NOT ART-COMPLETE until actual binaries + Section 16 QA pass.
