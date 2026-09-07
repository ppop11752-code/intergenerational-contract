# 07 — RELEASE & QA — CURRENT REPORT

## AI SPECIALIST REPORT

### Status

Bị chặn — `H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA` đang BLOCKED bởi lỗi exact World Event → Chronicle focus. H067 trước đó vẫn DONE / PASS WITH WARNINGS.

### Changed

- Xác nhận H079 đã lên production; Render live deployment quan sát tại commit `a9e95b3a02751d468ca83e4ddc47003a5039284a`.
- Tạo targeted H080 gate: `qa/world-event-approved-ui-qa.mjs` + workflow `World Event Approved UI QA`.
- Fresh run `34153570608`, job `101840631652`:
  - clean Client regression **69/69 PASS**;
  - production runtime check PASS cho direct `.world-event-banner-detail`;
  - legacy `CHI TIẾT` / `.world-event-detail-panel` không còn trên deployed runtime;
  - structured impacts, only-affected-system rows và Chronicle button xuất hiện đúng trong authoritative fixture;
  - FAIL tại exact Chronicle focus.
- Root cause xác minh từ source: `worldEvent()` lưu `chronicleFocus = ev.chronicleEntryId`, nhưng `chronicle()` lại so sánh/select theo `data-world-event-id`, giá trị này lấy từ `WorldEventOccurrence.id`.
- Tạo `H-20260908-081-06-WORLD-EVENT-CHRONICLE-FOCUS-ID` cho Chat 06.

### Source

- `handoffs/H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA.md`
- `handoffs/H-20260908-079-06-WORLD-EVENT-APPROVED-UI-DRIFT.md`
- `handoffs/H-20260908-081-06-WORLD-EVENT-CHRONICLE-FOCUS-ID.md`
- `docs/UI_WORLD_EVENT_DETAIL_APPROVED_V1.md`
- `client/src/resolved-ui-contracts.ts`
- `client/src/approved-ui-finalize.ts`
- workflow run `34153570608`
- artifact `10030187563`
- digest `sha256:57a25f81878b298d784a1325bc50fe26c45f4086d1b1d392bb83198f6ad9acb3`

### Impact

World Event approved banner semantics đã phần lớn đúng trên production, nhưng `XEM TRONG NIÊN SỬ` chưa đảm bảo focus đúng entry khi `chronicleEntryId` khác `event.id`. Đây là presentation/navigation defect, không phải gameplay/protocol defect. H080 chưa thể PASS.

### Verified

- H079 deployed production runtime tồn tại.
- Clean Client suite 69/69 PASS.
- Desktop direct event detail nằm trong temporary banner.
- Không còn separate desktop `CHI TIẾT` / detail sheet path.
- Event name + concrete authoritative structured impact rows render trực tiếp.
- Fixture chỉ render systems thực sự bị ảnh hưởng; không thêm fixed extra systems.
- Chronicle button chỉ xuất hiện khi `chronicleEntryId` có dữ liệu.
- Deployed Marriage approved disabled-affordance copy có mặt.
- Exact focus defect được tái hiện bằng `event.id = we-h080`, `chronicleEntryId = chron-h080` và xác minh trực tiếp trong source.

### Unverified

Sau H081 cần rerun phần còn lại của H080:
- exact Chronicle focus PASS;
- timer continuity / không pause-reset;
- no event-name inference;
- mobile same-content responsive reflow;
- targeted Marriage visible-but-disabled browser assertion.

### Handoff

Chat 06: `H-20260908-081-06-WORLD-EVENT-CHRONICLE-FOCUS-ID` — sửa mapping exact `chronicleEntryId` → corresponding World chronology entry, thêm regression với hai ID khác nhau, rồi trả H080 về Chat 07.

### Open Issues

- `H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA`: BLOCKED.
- `H-20260908-081-06-WORLD-EVENT-CHRONICLE-FOCUS-ID`: OPEN.
- `H-20260908-079-06-WORLD-EVENT-APPROVED-UI-DRIFT`: DONE source/deployed; exact Chronicle acceptance remains blocked by H081.
- `H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA`: DONE / PASS WITH WARNINGS.
- OI-001–OI-006 remain CLOSED/VERIFIED.
