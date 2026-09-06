# 06 — CLIENT IMPLEMENTATION — CURRENT REPORT

### Status
Bị chặn một phần — client defects đã sửa; chờ Chat 03 expose authoritative Birth eligibility.

### Changed
- Đã sửa Tutorial help recap từ modal `showModal()` sang non-modal/non-blocking `<aside>`.
- Đã bỏ suy diễn Birth/T7 từ `financial.representative`.
- Client chỉ unlock T7 và hiển thị action `child:birth` khi private snapshot có `canInitiateBirth === true`.
- Khi server chưa cung cấp fact này, Birth/T7 được defer theo `UI_TUTORIAL_SPEC.md` thay vì đoán eligibility.
- Đã bổ sung type `canInitiateBirth?: boolean` và regression tests cho hai defect QA.

### Source
- handoffs/H-20260906-012-06-OI004-QA-DEFECTS.md
- docs/UI_TUTORIAL_SPEC.md sections T7, 7, 9, 11
- server/backend/src/engine.ts — `attemptBirth()`
- server/backend/src/authoritative-room.ts — `privateSnapshot()`
- client/src/main.ts
- client/src/tutorial.ts
- client/src/types.ts

### Impact
- Help recap hiện không còn khóa tương tác/timer.
- Client không còn phát action Birth dựa trên một điều kiện chưa đủ.
- T7/Birth action sẽ chưa xuất hiện cho tới khi server expose authoritative eligibility.
- Cần Chat 03 bổ sung fact private snapshot; không cần đổi gameplay rule.

### Verified
- Local `npm run build`: PASS.
- Local `npm test`: PASS 7/7.
- Regression mới xác nhận T7 không unlock khi thiếu/false eligibility và unlock khi `canInitiateBirth=true`.
- Regression mới xác nhận client source không còn `showModal()`/`<dialog>` và dùng `help-recap` non-modal.
- Đã đối chiếu actual eligibility trong `GameEngine.attemptBirth()`.

### Unverified
- Chưa thể E2E T7 với server thật vì private snapshot chưa expose authoritative Birth eligibility.
- Chưa rerun browser E2E sau server integration.

### Handoff
- Chat 03: `H-20260906-013-03-OI004-BIRTH-ELIGIBILITY` — expose authoritative `canInitiateBirth` từ luật hiện có, không side effect.
- Sau khi Chat 03 hoàn thành, Chat 06 cần xác nhận field integration rồi trả lại Chat 07 để E2E rerun.

### Open Issues
OI-004 — QA defect #1 fixed. QA defect #2 client-side fixed by safe deferral; full end-to-end resolution blocked on authoritative Birth eligibility exposure from Chat 03.
