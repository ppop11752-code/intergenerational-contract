# 07 — RELEASE & QA — CURRENT REPORT

## AI SPECIALIST REPORT

### Status

Bị chặn — `H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA` vẫn BLOCKED. H083 đã sửa và QA độc lập xác nhận World Event → Chronicle exact focus sống qua rerender; blocker hiện tại là render loop ở Marriage profile khi candidate đang mở và Client nhận snapshot lặp lại.

### Changed

- Xác nhận H083 DONE và production chứa persistent Chronicle focus + one-shot scroll logic.
- Fresh H080 run `34156430047`, head `a3e3805ef66271a6a21bc31995896941d993ebaf`:
  - clean Client regression **76/76 PASS**;
  - direct World Event banner PASS;
  - không còn `CHI TIẾT` / separate detail surface PASS;
  - exact `event.id=we-h080` + `chronicleEntryId=chron-h080` identity PASS;
  - visible `.focused-event` sau Approved UI rerender PASS;
  - timer continuity PASS (`20s -> 18s`);
  - no event-name inference PASS.
- Targeted Marriage browser path vẫn khóa browser khi candidate profile active và snapshot ổn định được gửi lại. QA đã loại bỏ World Event rollback giả khỏi fixture nhưng hang vẫn tái hiện.
- Source inspection xác định `approved-ui-finalize.ts` `marriageFromProfile()` ghi lại `btn.textContent` trên mỗi `decorate()`; global MutationObserver childList/subtree có thể tự kích hoạt lại decoration vô hạn.
- Tạo `H-20260908-084-06-MARRIAGE-PROFILE-RERENDER-LOOP` cho Chat 06.
- Artifact run `34156430047`: `10031145654`; digest `sha256:baf3bb89aac89da6746f47faaea9e7b2aa9ff8927d23c0673abb3eefc320a34a`.

### Source

- `handoffs/H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA.md`
- `handoffs/H-20260908-083-06-WORLD-EVENT-CHRONICLE-FOCUS-RERENDER.md`
- `handoffs/H-20260908-084-06-MARRIAGE-PROFILE-RERENDER-LOOP.md`
- `docs/UI_WORLD_EVENT_DETAIL_APPROVED_V1.md`
- `client/src/resolved-ui-contracts.ts`
- `client/src/approved-ui-finalize.ts`
- `qa/world-event-approved-ui-qa.mjs`
- `.github/workflows/world-event-approved-ui-qa.yml`
- workflow run `34156430047`
- artifact `10031145654`

### Impact

World Event approved banner/Chronicle requirements hiện đã qua QA độc lập ở fixture production-runtime. H080 chưa thể đóng vì Marriage profile presentation có thể làm browser/event loop không phản hồi khi nhận snapshot; mobile tail chưa được chạy tới trong cùng final gate. Không có gameplay/protocol/timer rule nào bị thay đổi.

### Verified

- H083 production/runtime logic hiện diện.
- Clean Client 76/76 PASS.
- Direct World Event banner semantics PASS.
- Only affected structured systems render.
- Exact Chronicle focus khi event id khác Chronicle id PASS qua rerender.
- Timer không pause/reset.
- Không suy diễn theo event name.
- Marriage approved disabled-copy có trong deployed runtime.
- Render-loop tái hiện sau profile candidate + repeated stable snapshot, kể cả sau khi loại bỏ unrelated World Event rollback khỏi QA fixture.

### Unverified

Sau H084 cần rerun:
- Marriage candidate visible + disabled + exact approved copy dưới repeated snapshots, không render loop;
- mobile same-content World Event responsive reflow/no horizontal overflow;
- final retained regression cho Chronicle focus/timer/no-name-inference.

### Handoff

Chat 06: `H-20260908-084-06-MARRIAGE-PROFILE-RERENDER-LOOP` — làm `marriageFromProfile()` idempotent dưới MutationObserver, thêm integration regression repeated snapshot, rồi trả H080 về Chat 07.

### Open Issues

- `H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA`: BLOCKED.
- `H-20260908-084-06-MARRIAGE-PROFILE-RERENDER-LOOP`: OPEN.
- `H-20260908-083-06-WORLD-EVENT-CHRONICLE-FOCUS-RERENDER`: DONE / independently accepted for focus path.
- `H-20260908-082-06-WORLD-EVENT-CHRONICLE-FOCUS-CLOBBER`: DONE.
- `H-20260908-081-06-WORLD-EVENT-CHRONICLE-FOCUS-ID`: DONE.
- `H-20260908-079-06-WORLD-EVENT-APPROVED-UI-DRIFT`: DONE.
- `H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA`: DONE / PASS WITH WARNINGS.
- OI-001–OI-006 remain CLOSED/VERIFIED.
