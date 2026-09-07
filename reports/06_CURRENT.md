# 06 — CLIENT IMPLEMENTATION — CURRENT REPORT

### Status
Hoàn thành ở phạm vi implementation — Approved UI V1 Client batch đã hoàn tất; H074/H076 pointer regressions, H079 World Event drift, H081 focus-ID mismatch, H082 focus-clobber, H083 Chronicle focus-rerender defect và H084 Marriage profile rerender loop đều đã được sửa. H080 đã được mở lại cho Chat 07 ghi nhận final QA acceptance; H072 (Chat 08) vẫn OPEN cho audit độc lập Residence lifecycle.

### Changed
- Giữ toàn bộ approved UI V1 shell và H063–H066/H071 integrations đã hoàn tất.
- H074/H076 giữ pointer hit-area corrections cho HUD/Turn Track/Mandatory.
- H079 giữ direct World Event banner semantics và Marriage own-turn visible-disabled affordance.
- H082/H083 giữ single-owner exact Chronicle focus và persistent focus qua Approved UI rerender.
- H084 sửa `client/src/approved-ui-finalize.ts` `marriageFromProfile()`:
  - thêm `profileStateSig` từ exact profile target + authoritative `canSendMarriage`;
  - nếu state signature không đổi thì return trước mọi DOM mutation;
  - `data-target`, `disabled`, `textContent`, `title` chỉ cập nhật khi giá trị thực sự khác;
  - giữ nguyên disabled affordance khi `canSendMarriage=false` với exact copy `CÓ THỂ GỬI NGOÀI LƯỢT CỦA BẠN`;
  - giữ nguyên existing `marriage:propose` action khi gửi được.
- Đồng thời tránh một text write lặp tương tự trong Chronicle empty-filter note bằng value guard; chỉ là ổn định presentation dưới cùng MutationObserver, không đổi semantics.
- Thêm source regression `client/test/marriage-profile-rerender-loop.test.mjs`.
- Thêm real-browser integration regression `qa/marriage-profile-rerender-loop.mjs` và workflow `.github/workflows/marriage-profile-rerender-loop.yml`.
- Không đổi gameplay, Marriage lifecycle, protocol, timer hoặc World Event mechanics.

### Source
- `handoffs/H-20260908-084-06-MARRIAGE-PROFILE-RERENDER-LOOP.md`.
- H080 QA run `34156430047`: World Event/Chronicle/timer checks PASS nhưng browser bị starve sau khi mở candidate profile và dispatch stable snapshot.
- Existing approved Marriage profile semantics from Chat05/H079 and authoritative `canSendMarriage`/`marriageCandidates` Client contract.

### Impact
- Candidate profile có thể nhận lặp cùng authoritative snapshot mà không tự tạo `MutationObserver -> decorate -> text mutation` loop.
- Browser/event loop tiếp tục phản hồi; snapshot processing không còn bị starve ở path này.
- Candidate vẫn hiện đúng; own-turn/non-send state vẫn disabled với copy approved.
- World Event/Chronicle behavior của H079–H083 không bị thay đổi.

### Verified
- H084 implementation commit `ac2affa621b68cf0021830412a772153d61c9b79`.
- Source regression commit `300b94351e2c1a2a0501345641aaddaae4702037`.
- Browser regression/workflow HEAD `478455ab1b2af1943cc3b7495f5e2117c94b1932`.
- GitHub Actions `Marriage Profile Rerender Loop QA` run `34156898583`: SUCCESS.
  - clean Client regression PASS;
  - real-browser repeated-identical-snapshot regression PASS.
- Existing `World Event Approved UI QA` run `34156855982` on H084 implementation commit: SUCCESS.

### Unverified
- Chat 07 still owns the final formal H080 acceptance record despite the fresh workflow success.
- H072 independent Residence lifecycle audit remains OPEN.

### Handoff
- Chat 07: `H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA` — OPEN/unblocked; record final acceptance after H084.
- Chat 08: `H-20260907-072-08-RESIDENCE-LIFECYCLE-AUDIT` — unchanged, OPEN.

### Open Issues
- H074 DONE.
- H076 DONE.
- H079 DONE.
- H081 DONE/superseded by unified focus ownership.
- H082 DONE.
- H083 DONE.
- H084 DONE.
- H080 OPEN to Chat 07 for final QA ownership/acceptance.
- H072 OPEN to Chat 08 for independent audit.
