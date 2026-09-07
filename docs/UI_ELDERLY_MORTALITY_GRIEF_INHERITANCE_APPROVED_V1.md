# UI ELDERLY MEDICAL / MORTALITY / GRIEF / INHERITANCE — APPROVED V1

Status: USER-APPROVED
Date: 2026-09-07
Owner: 05 — UI/UX & ART

## Authority

This is the approved UI specification for elderly medical, mortality, Grief presentation and inheritance results. It does not change gameplay, Rule Ledger, timers or authoritative settlement logic.

## 1. Elderly Character detail

Selected elderly Character detail includes compact `SỨC KHỎE TUỔI GIÀ` showing authoritative:
- medical due;
- medical paid;
- mortality-risk context when exposed.

It is informational only. No medical action/purchase button exists.

## 2. End-round elderly medical result

Use a small non-blocking result treatment:
`Y TẾ TUỔI GIÀ — ĐÃ TRẢ X / Y`.

When payment is partial, a short note may state that insufficient payment increases mortality risk.

Never imply the medical charge itself forces liquidation, borrowing or bankruptcy.

## 3. Death presentation

Natural elderly death:
- short non-blocking world notice;
- portrait + player-facing name/identity;
- `ĐÃ QUA ĐỜI`;
- no forced camera;
- no blocking/full-screen death scene.

Residence/Family/Turn Track update from authoritative post-settlement state.

For a Human-controlled Character, the Human proceeds into the already approved Waiting Queue flow.

## 4. Grief Fee — approved UI timing

Do **not** show an early Grief Fee warning at the moment the child dies.

If the living parent receives a Grief Fee obligation, it appears normally inside the **next Mandatory breakdown**, when the obligation actually becomes due.

This presentation choice does not change Grief gameplay timing or amount.

## 5. Inheritance result

After authoritative inheritance settlement, show a compact result:
`DI SẢN ĐÃ PHÂN CHIA`.

Where authoritative structured data exists, show:
- estate total;
- beneficiary portrait/name;
- amount received per beneficiary.

Detailed formulas/resource conversion stay in Rules or deeper explanation, not the default result card.

Client must never calculate estate or beneficiary shares independently.

## 6. One spouse dies

Sequence:
1. short death notice;
2. one combined family inheritance summary for surviving spouse and eligible direct living children;
3. Residence/Family updates from authoritative post-settlement state.

Do not create separate blocking modals per beneficiary.

## 7. Both spouses die in same settlement

Use one combined result:
`GIA ĐÌNH ĐÃ QUA ĐỜI`
with the joint-estate result:
`DI SẢN ĐƯỢC PHÂN CHIA`.

Never visualize this as two sequential spouse-to-spouse inheritance settlements.

## 8. No eligible heir

Explicitly state:
`KHÔNG CÓ NGƯỜI THỪA KẾ HỢP LỆ — DI SẢN CHUYỂN VỀ NGÂN SÁCH CHÍNH PHỦ`.

Do not describe the estate as disappearing.

## 9. Cross-surface behavior

- Presentations are non-blocking for other players and do not alter timers.
- Residence/Family reflects only authoritative post-settlement state.
- No client-side inference of cause of death, heir eligibility, estate calculation, resource conversion or settlement ordering.
- Grief appears only through the approved Mandatory UI at the next due Mandatory.

## 10. Mobile

Use compact bottom/full-height sheet/notice equivalents consistent with existing mobile shell. Preserve the same semantics and non-blocking behavior.

## 11. Implementation dependency

If current protocol lacks structured authoritative estate total/beneficiary amounts required by section 5, Chat 06 must create a narrow handoff to Chat 03. Raw Chronicle parsing or client-side inheritance calculation is not acceptable.
