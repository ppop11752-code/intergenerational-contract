# 06 — CLIENT IMPLEMENTATION — CURRENT REPORT

### Status
Đang làm — H071 authoritative Residence client integration đã DONE ở phạm vi implementation. H063–H066 server dependencies đều đã DONE. H072 Residence lifecycle audit đã được mở cho Chat 08; H067 broader approved UI clean/browser QA vẫn OPEN. Sau khi gỡ Residence blocker, H056 Queue/Reconnect và H059 Immigration/NPC còn OPEN cho phần client riêng chưa tích hợp.

### Changed
- Giữ nguyên approved UI V1 batch đã triển khai trước: Landing/Lobby/HUD/Mandatory/Government/End Report và presentation layer `approved-ui-v1`.
- Xác nhận H063–H066 server contract dependencies đều DONE.
- H071: tạo `client/src/residence-ui-v1.ts` để bind trực tiếp `game.residenceDirectory`, `activeMapResidenceIds`, Character/private `currentResidenceId` và `residenceTransitions`.
- Active World Map + minimap render Residence theo server-authored normalized coordinates; `reclaimed` bị loại khỏi active map/navigation.
- Generic Home landmark cũ bị ẩn; queued Human không có local Home marker.
- Turn Track Character click focus đúng authoritative current Residence và không auto-open profile/panel.
- Residence overview dùng authoritative occupants/role keys/family references, tách khỏi Economic Household; exact economy chỉ hiện cho local Character.
- Stage2→3 notices dùng đúng `residenceTransitions.kind` (`adult_move` / `adult_retained`), không derive từ age/history.
- `empty`/`abandoned` không có property action; `reclaimed` chỉ còn trong Chronicle/history.
- Chronicle bổ sung Residence transitions + reclaimed historical rows từ structured contract, không parse chronology.
- Tạo `client/residence-ui-v1.css`; production `client/index.html` tải Residence CSS/runtime trước `main.js`.
- Tạo `client/test/residence-ui-v1.test.mjs` source regression.
- Sửa edge case để một Residence đang được chọn không bị MutationObserver ép quay về local Home.
- H055 Residence/Family chuyển DONE.
- H056 Queue/Reconnect chuyển OPEN: Residence dependency đã giải quyết, còn bind H065 `recentLifecycleResults` cho death/reconnect/new-life transitions.
- H059 Immigration/NPC chuyển OPEN: Residence dependency đã giải quyết, còn immigrant Residence arrival/highlight/focus path.
- H072 Chat 08 audit được xác nhận unblocked.

### Source
- D-053 / `docs/RULE_LEDGER.md`.
- `docs/UI_RESIDENCE_FAMILY_APPROVED_V1.md`.
- `docs/UI_ROOM_APPROVED_V1.md`.
- H069 Residence lifecycle engine.
- H070/H063 authoritative Residence snapshot/map contract.
- `server/backend/src/residence.ts`.
- `server/backend/src/authoritative-room.ts`.

### Impact
- Client không còn cần suy Residence từ `householdId`, cha/mẹ hoặc vị trí map.
- Residence, co-residence, map focus, local Home, family navigation và Stage2→3 presentation dùng authoritative server state.
- Reclaimed Residence không thể trở lại active map do Client filter bằng canonical active/navigation flags.
- Queue spectator vẫn xem public Residence map nhưng không có current Home.
- Không thêm property ownership/sale/inheritance/reuse hoặc gameplay-distance mechanic.
- Gameplay, protocol, timer và Residence assignment rules không thay đổi.

### Verified
- Source inspection xác nhận server H070 cung cấp stable Residence IDs, occupants, family refs, coordinates, active map set, currentResidenceId và transition kind.
- Residence client module không chứa `householdId`/`parentHouseholdId` Residence inference.
- Source regression khóa active-map exclusion of reclaimed, Queue no-local-Home, structured transitions, exact adult notices, Turn Track focus và Chronicle no-chronology parsing.
- H071 implementation commits recorded in handoff.

### Unverified
- Clean `client/npm test` / full TypeScript build cho H071 chưa được chạy độc lập trong Chat 06.
- Desktop/mobile browser QA của authoritative Residence map/panel chưa chạy.
- H067 broader approved UI QA vẫn OPEN.
- H072 independent consistency audit vẫn OPEN.
- H071/H055 DONE là implementation completion, không phải release certification.

### Handoff
- Chat 08: `H-20260907-072-08-RESIDENCE-LIFECYCLE-AUDIT` — now unblocked.
- Chat 07: `H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA` — broader clean build/browser gate.
- Chat 06 remaining OPEN work: H056 Queue/Reconnect lifecycle-result integration; H059 Immigration/NPC Residence-arrival integration.

### Open Issues
- H071 DONE; H055 DONE.
- H056 OPEN.
- H059 OPEN.
- H067 OPEN to Chat 07.
- H072 OPEN to Chat 08.
- H048/H049/H050/H051/H052/H053 and H058/H060/H061 were previously blocked on H064/H065/H066; those server dependencies are now DONE and should be re-evaluated in subsequent Chat 06 work rather than treated as server-blocked.
- Do not mark the whole approved UI batch release-ready until the remaining client integrations and QA/audit gates complete.
