# 07 — RELEASE & QA — CURRENT REPORT

## AI SPECIALIST REPORT

### Status

Bị chặn — `H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA` hiện bị chặn bởi production CSS packaging, không còn bởi H074 Client source.

### Changed

- Xác nhận `H-20260908-074-06-RESIDENCE-POINTER-INTERCEPTION` DONE ở source Client.
- Tăng cường live H067 gate để kiểm Residence click, Turn Track/HUD interaction và responsive desktop/mobile.
- Fresh workflow `Approved UI V1 E2E` run `34149188131`, head `84b5a0309bc889ce6c3520657e965f3c6ff32473`:
  - backend `release:check`: PASS;
  - clean Client suite: **67/67 PASS**;
  - H074 pointer source regressions: PASS;
  - live browser: FAIL tại Residence marker click; Turn Track/HUD vẫn intercept.
- Kiểm tra Dockerfile xác định runtime image chỉ copy `client/index.html`, `client/styles.css`, `client/public` và compiled `client/dist`.
- Các stylesheet Approved UI được `index.html` tham chiếu nhưng không được đóng gói: `approved-ui-v1.css`, `residence-pointer-fix.css`, `residence-ui-v1.css`, `resolved-ui-contracts.css`.
- Tái phân loại finding thành Deployment/static packaging defect.
- Tạo `H-20260908-075-04-APPROVED-UI-V1-CSS-PACKAGING` cho Chat 04.

### Source

- `handoffs/H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA.md`
- `handoffs/H-20260908-074-06-RESIDENCE-POINTER-INTERCEPTION.md`
- `handoffs/H-20260908-075-04-APPROVED-UI-V1-CSS-PACKAGING.md`
- `client/index.html`
- `client/residence-pointer-fix.css`
- `Dockerfile`
- workflow run `34149188131`
- artifact `10028775419`
- digest `sha256:8f8064804243926bb2cc6e809a32fea2dfeaa7229add3b623717574634d4fa6d`

### Impact

Approved UI runtime/source và clean regression đều khỏe, nhưng production chưa chứa đầy đủ stylesheet Approved UI V1. Vì thế UI live có thể mang class/runtime mới nhưng hành vi layout/hit-area vẫn theo CSS thiếu. H067 chưa thể PASS. Không có gameplay/protocol/timer rule nào bị thay đổi.

### Verified

- Backend full release regression trên current QA head: PASS.
- Clean Client suite: 67/67 PASS.
- H074 source pointer tests: PASS.
- Production Approved UI landing/runtime tồn tại.
- Residence marker live tồn tại, visible/enabled.
- Residence live click vẫn fail vì Turn Track/HUD intercept.
- Dockerfile hiện không copy bốn stylesheet bổ sung mà production index tham chiếu.

### Unverified

Chờ H075 rồi rerun:
- desktop/mobile Residence click/navigation;
- HUD/Turn Track interaction;
- Queue/reconnect/Marriage world-first navigation;
- timer continuity + Mandatory no-countdown;
- QR regression;
- final privacy/raw-ID/Persona check;
- responsive/mobile acceptance;
- authoritative MAX/reason, lifecycle, World Event→Chronicle browser coverage;
- no-render-loop closure.

### Handoff

- Chat 04: `H-20260908-075-04-APPROVED-UI-V1-CSS-PACKAGING` — package/deploy toàn bộ CSS được `client/index.html` tham chiếu và smoke live.
- Sau H075 DONE, trả H067 về Chat 07 để rerun final browser QA.

### Open Issues

- `H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA`: BLOCKED.
- `H-20260908-073-04-APPROVED-UI-V1-DOCKER-BUILD`: DONE.
- `H-20260908-074-06-RESIDENCE-POINTER-INTERCEPTION`: DONE source-level.
- `H-20260908-075-04-APPROVED-UI-V1-CSS-PACKAGING`: OPEN.
- Previous Mandatory 5s QA chain remains DONE / PASS.
- `H-20260907-038-07-UIUX-ART-FINAL-QA`: CLOSED / PASS.
- OI-001–OI-006 remain CLOSED/VERIFIED.
