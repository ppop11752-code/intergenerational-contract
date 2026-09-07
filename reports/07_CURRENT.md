# 07 — RELEASE & QA — CURRENT REPORT

## AI SPECIALIST REPORT

### Status

Bị chặn — `H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA` vẫn BLOCKED sau H081 vì exact Chronicle row đã map đúng `chronicleEntryId` nhưng visible focus vẫn bị clobber. H067 trước đó vẫn DONE / PASS WITH WARNINGS.

### Changed

- H081 đã DONE và production deploy chứa `world-event-chronicle-focus.js`.
- Cập nhật workflow H080 để theo dõi runtime/test H081.
- Sửa H080 fixture để thực sự load `world-event-chronicle-focus.js`; run trước đó `34154207203` vì thiếu runtime trong fixture không được dùng làm verdict Client sau H081.
- Fresh authoritative run `34154349342`, head `ff4f3860894785df769599f5a3605a27954fafd8`:
  - clean Client regression **72/72 PASS**;
  - production H079/H081 runtime presence checks PASS;
  - direct World Event banner/no legacy detail surface PASS;
  - exact row receives `data-chronicle-entry-id="chron-h080"` for `event.id="we-h080"` PASS;
  - visible `.focused-event` remains FAIL.
- Phân loại defect: legacy Chronicle focus path in `resolved-ui-contracts.ts` can still toggle focus by `data-world-event-id` and clobber H081 exact-id focus.
- Tạo `H-20260908-082-06-WORLD-EVENT-CHRONICLE-FOCUS-CLOBBER` cho Chat 06.

### Source

- `handoffs/H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA.md`
- `handoffs/H-20260908-081-06-WORLD-EVENT-CHRONICLE-FOCUS-ID.md`
- `handoffs/H-20260908-082-06-WORLD-EVENT-CHRONICLE-FOCUS-CLOBBER.md`
- `docs/UI_WORLD_EVENT_DETAIL_APPROVED_V1.md`
- `client/src/resolved-ui-contracts.ts`
- `client/src/world-event-chronicle-focus.ts`
- `client/src/approved-ui-finalize.ts`
- `qa/world-event-approved-ui-qa.mjs`
- `.github/workflows/world-event-approved-ui-qa.yml`
- workflow run `34154349342`
- artifact `10030437925`
- digest `sha256:67dc73052dbd568dc9adfb1052acd8a261aca13307381822a8d855dee16d9079`

### Impact

Approved World Event banner presentation and exact Chronicle-id data mapping are mostly correct, but the visible Chronicle focus can still be lost due to competing Client runtime behavior. This is presentation/navigation only; no gameplay, protocol, event mechanics or timer rules changed. H080 cannot PASS until H082 removes the conflict.

### Verified

- Production contains H081 runtime and H079 direct-banner implementation.
- Clean Client suite 72/72 PASS.
- No separate desktop `CHI TIẾT` / detail sheet path.
- Event name + concrete authoritative structured impacts render directly in banner.
- Only affected systems render in fixture.
- Chronicle button appears when `chronicleEntryId` exists.
- Exact chronology row receives authoritative `data-chronicle-entry-id` when event id differs.
- No event-name inference in source/regression.
- Deployed Marriage disabled-affordance copy remains present.

### Unverified

After H082 must rerun:
- exact visible Chronicle focus PASS;
- timer continuity / no pause-reset;
- mobile same-content responsive reflow;
- targeted Marriage visible-but-disabled browser assertion.

### Handoff

Chat 06: `H-20260908-082-06-WORLD-EVENT-CHRONICLE-FOCUS-CLOBBER` — consolidate exact World Event → Chronicle focus so legacy event-id logic cannot remove H081 focus; add ordering/mutation regression; return H080 to Chat 07.

### Open Issues

- `H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA`: BLOCKED.
- `H-20260908-082-06-WORLD-EVENT-CHRONICLE-FOCUS-CLOBBER`: OPEN.
- `H-20260908-081-06-WORLD-EVENT-CHRONICLE-FOCUS-ID`: DONE but not sufficient alone for visible focus acceptance.
- `H-20260908-079-06-WORLD-EVENT-APPROVED-UI-DRIFT`: DONE.
- `H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA`: DONE / PASS WITH WARNINGS.
- OI-001–OI-006 remain CLOSED/VERIFIED.
