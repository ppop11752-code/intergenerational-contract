# 07 — RELEASE & QA — CURRENT REPORT

## AI SPECIALIST REPORT

### Status

Bị chặn — `H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA` vẫn BLOCKED sau H082. Exact `chronicleEntryId` mapping đúng và focus ownership đã hợp nhất, nhưng visible Chronicle focus vẫn mất qua Approved UI rerender/mutation integration. H067 trước đó vẫn DONE / PASS WITH WARNINGS.

### Changed

- H082 đã DONE và production hiện live với unified Chronicle focus trong `resolved-ui-contracts.ts`; duplicate H081 runtime đã được loại bỏ.
- Đồng bộ H080 QA gate theo kiến trúc H082: bỏ mọi tham chiếu tới runtime H081 đã xóa, kiểm production unified exact-id logic trực tiếp trong `resolved-ui-contracts.js`.
- Fresh run `34154976166`, head `4c662825668b6c97a1cfb0eafbab2a13de511fe3`:
  - clean Client regression **73/73 PASS**;
  - production unified H082 focus logic PASS;
  - direct World Event banner/no legacy detail surface PASS;
  - structured authoritative impacts và only-affected-system rows PASS;
  - chronology row có đúng `data-world-event-id="we-h080"` và `data-chronicle-entry-id="chron-h080"` PASS;
  - visible `.focused-event` sau `XEM TRONG NIÊN SỬ` vẫn FAIL.
- Artifact `10030646674`, digest `sha256:6813d8a7fb9af05ee92673fd43652bf275469198830db993d7fccd102d072530`.
- Tạo `H-20260908-083-06-WORLD-EVENT-CHRONICLE-FOCUS-RERENDER` cho Chat 06.

### Source

- `handoffs/H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA.md`
- `handoffs/H-20260908-082-06-WORLD-EVENT-CHRONICLE-FOCUS-CLOBBER.md`
- `handoffs/H-20260908-083-06-WORLD-EVENT-CHRONICLE-FOCUS-RERENDER.md`
- `docs/UI_WORLD_EVENT_DETAIL_APPROVED_V1.md`
- `client/src/resolved-ui-contracts.ts`
- `client/src/approved-ui-finalize.ts`
- `qa/world-event-approved-ui-qa.mjs`
- `.github/workflows/world-event-approved-ui-qa.yml`
- workflow run `34154976166`
- artifact `10030646674`

### Impact

World Event approved banner semantics, exact Chronicle-id data mapping và single focus ownership đều đúng ở source/deployed runtime, nhưng visible focus chưa sống qua integration rerender. Đây là Client presentation/navigation defect; không thay gameplay, protocol, World Event mechanics hoặc timer rule. H080 chưa thể PASS.

### Verified

- H082 production deploy live.
- Clean Client suite 73/73 PASS.
- Direct event detail nằm trong temporary banner.
- Không còn separate desktop `CHI TIẾT` / detail sheet path.
- Event name + concrete authoritative impacts render trực tiếp.
- Chỉ affected systems render trong fixture.
- Chronicle link hiện khi exact `chronicleEntryId` tồn tại.
- Exact row identity `event.id != chronicleEntryId` được giữ đúng.
- Production unified focus logic không dùng event-name inference.
- H080 gate không còn load runtime H081 đã xóa.

### Unverified

Sau H083 cần rerun:
- exact visible Chronicle focus PASS qua rerender;
- timer continuity / no pause-reset;
- mobile same-content responsive reflow;
- targeted Marriage visible-but-disabled browser assertion.

### Handoff

Chat 06: `H-20260908-083-06-WORLD-EVENT-CHRONICLE-FOCUS-RERENDER` — bảo toàn exact `chronicleEntryId` focus qua Approved UI rerender/mutation lifecycle, thêm integration regression với runtime combination thực tế, rồi trả H080 về Chat 07.

### Open Issues

- `H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA`: BLOCKED.
- `H-20260908-083-06-WORLD-EVENT-CHRONICLE-FOCUS-RERENDER`: OPEN.
- `H-20260908-082-06-WORLD-EVENT-CHRONICLE-FOCUS-CLOBBER`: DONE but insufficient for integrated visible focus acceptance.
- `H-20260908-081-06-WORLD-EVENT-CHRONICLE-FOCUS-ID`: DONE.
- `H-20260908-079-06-WORLD-EVENT-APPROVED-UI-DRIFT`: DONE.
- `H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA`: DONE / PASS WITH WARNINGS.
- OI-001–OI-006 remain CLOSED/VERIFIED.
