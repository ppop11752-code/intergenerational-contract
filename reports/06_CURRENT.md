# 06 — CLIENT IMPLEMENTATION — CURRENT REPORT

### Status
Đang làm — H-20260906-019: Wave 1 hoàn thành; Wave 2–3 đã mở rộng và authoritative display dependency đã tích hợp; Wave 4 integration-ready nhưng NOT ART-COMPLETE vì chưa có raster binaries thật và còn QA.

### Changed
- Giữ toàn bộ production shell, Support authoritative selector, form-state fix và art integration scaffold hiện có.
- Hoàn thành `H-20260907-028-06-UIUX-DISPLAY-INTEGRATION` theo server commit `9222968e2aba9970cd2f7038b9b901b304f40a89`.
- Mở rộng client snapshot types với `game.eventName`, `mandatoryQuote`, `recoveryQuotes`, `statusQuote` đúng contract server.
- Thêm `client/src/display-contract.ts` làm presentation-only layer cho bốn surface còn thiếu.
- `GameTransport` phát local browser event `ic:snapshot` sau room/player snapshot update; không đổi network protocol hay authoritative semantics.
- World HUD hiển thị authoritative World Event với fallback `Không có`.
- Mandatory hiển thị charge breakdown, liquidation/bankruptcy projection, shortfall và dominant cost trực tiếp từ `mandatoryQuote`; mọi liquidation/bankruptcy value đều được gắn nhãn DỰ KIẾN theo snapshot hiện tại.
- Recovery hiển thị current pool, carrying capacity, pending next round, capacity remaining và cost/unit trực tiếp từ `recoveryQuotes`.
- Status hiển thị authoritative fee/persons/affordability cho ba Status, cùng Noble slots/priority/end-round allocation/Middle fallback fee/potential refund từ `statusQuote`.
- Null/empty quote không được thay bằng phép tính client; UI giữ fallback an toàn.
- Thêm `client/test/display-contract.test.mjs` cho cả bốn surface.

### Source
- handoffs/H-20260906-019-06-FULL-UIUX-IMPLEMENTATION.md
- handoffs/H-20260907-028-06-UIUX-DISPLAY-INTEGRATION.md
- server commit `9222968e2aba9970cd2f7038b9b901b304f40a89`
- server/backend/src/authoritative-room.ts
- server/backend/src/engine.ts
- docs/UI_ART_ASSET_CONTRACT_V1.md
- docs/UI_UX_FULL_AUDIT_2026-09-06.md
- docs/UI_TUTORIAL_SPEC.md

### Impact
- World Event / Mandatory / Recovery / Status read-only presentation no longer needs client-side economic inference.
- Submitted gameplay actions and timers are unchanged and remain server authoritative.
- Chat 03 display-contract dependency is resolved.
- Remaining major visual gap is real raster pixel-art binaries plus browser/visual QA and Lobby QR.

### Verified
- Earlier current-client suite before display integration: `npm test` PASS 21/21, TypeScript build PASS.
- New display/type/transport modules were independently TypeScript-compiled locally: PASS.
- Deterministic local checks for World Event fallback, Mandatory projected facts, Recovery quote and Status/Noble quote: PASS.
- Regression file for all four surfaces has been committed and is included by existing `test/*.test.mjs` package pattern.
- Server implementation was inspected directly: all quote methods are side-effect-free display helpers and actions remain revalidated at action time.

### Unverified
- Full clean-repo `npm test` after the newest display integration was not runnable from the local container because GitHub DNS access is blocked; do not treat the modified-subset check as a full-suite PASS.
- Browser/server QA of the four newly integrated surfaces has not yet run.
- Raster binaries cuối vẫn chưa tồn tại; Section 16 art-complete acceptance chưa đạt.
- Lobby QR vẫn là placeholder.
- UI chưa được tuyên bố player-facing release-ready.

### Handoff
- Chat 07: `H-20260907-029-07-UIUX-DISPLAY-QA` — verify World Event, Mandatory projected details, Recovery quotes and Status/Noble quote through browser + authoritative server.
- Chat 05/asset production: raster binaries theo `UI_ART_ASSET_CONTRACT_V1.md` vẫn cần được tạo/import trước visual-complete QA.

### Open Issues
- `H-20260906-019` remains OPEN.
- `H-20260907-027-06-UIUX-ART-INTEGRATION` DONE ở mức scaffold/integration-ready.
- `H-20260907-028-06-UIUX-DISPLAY-INTEGRATION` DONE.
- Wave 4 remains NOT ART-COMPLETE until actual binaries + visual/runtime QA pass.
