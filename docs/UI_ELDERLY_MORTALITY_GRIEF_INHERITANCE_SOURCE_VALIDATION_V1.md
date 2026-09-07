# UI ELDERLY MEDICAL / MORTALITY / GRIEF / INHERITANCE — SOURCE VALIDATION V1

Status: CLOSED — USER VERIFIED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Player-facing presentation for:
- elderly end-round medical cost and mortality risk/result;
- natural elderly death;
- child-death Grief Fee owed by living parents next Mandatory;
- inheritance / estate distribution results;
- simultaneous spouse death and no-heir Government transfer.

## CURRENT / AUTHORITATIVE BEHAVIOR — DO NOT RE-ASK

### Elderly medical / mortality

- Elderly = Stage >= 7.
- End-round medical charge is passive/automatic.
- Medical deducts available cash only.
- Medical fee itself does not force liquidation, borrowing or bankruptcy.
- Partial medical payment affects mortality risk.
- Stage7 base mortality risk = 0; Stage12 is terminal.
- Mortality resolves at end round; there is no player medical action.

### Grief Fee

- If a living parent loses a child, that parent receives one Grief Fee obligation for the next Mandatory.
- Each affected living parent Character creates one unit.
- Grief Fee is an ordinary Mandatory obligation and can contribute to forced liquidation/bankruptcy there.

### Inheritance

- Rule Ledger `FINAL POLICY A` is authoritative.
- Surviving spouse funded ASXH is not part of deceased estate.
- Beneficiaries are authoritative surviving spouse/direct living children as applicable.
- Stepchildren do not automatically inherit from step-parent.
- No surviving spouse: direct living children inherit; if none, estate goes to Government Budget.
- Parents are not heirs; public debt is not inherited.
- Both spouses dying in one end-round settlement uses one joint-estate settlement.
- Resource inheritance conversion remains authoritative server logic.
- Client must not reconstruct estate calculations.

## USER DECISIONS

- **E1 A** — selected elderly Character detail includes compact `SỨC KHỎE TUỔI GIÀ` with authoritative medical due/paid and mortality-risk context where exposed.
- **E2 A** — end-round medical uses a small non-blocking `Y TẾ TUỔI GIÀ — ĐÃ TRẢ X / Y`; partial payment may warn that mortality risk increases; no action button.
- **E3 A** — natural elderly death uses a short non-blocking portrait/name `ĐÃ QUA ĐỜI` notice; Residence/Family/Turn Track update authoritatively; no forced camera.
- **E4 B** — do **not** notify Grief Fee at the moment of death. It appears only in the next Mandatory breakdown when it actually becomes due.
- **E5 A** — after authoritative settlement show compact `DI SẢN ĐÃ PHÂN CHIA` with estate total + beneficiary portraits/names + amounts received. Full formula stays in Rules/detail.
- **E6 A** — one spouse dies: death notice then one family inheritance summary for surviving spouse/direct children; Residence/Family refreshes from authoritative post-settlement state.
- **E7 A** — both spouses die in same settlement: one combined `GIA ĐÌNH ĐÃ QUA ĐỜI / DI SẢN ĐƯỢC PHÂN CHIA`; never present two sequential inheritance calculations.
- **E8 A** — no eligible heir: explicitly show `KHÔNG CÓ NGƯỜI THỪA KẾ HỢP LỆ — DI SẢN CHUYỂN VỀ NGÂN SÁCH CHÍNH PHỦ`.

## Guardrails

- E4 B does not change Grief timing; it only suppresses early UI notice.
- Death/inheritance presentation never pauses/resets authoritative timers for other active players.
- Human death still transitions that Human into approved Waiting Queue flow.
- Do not imply elderly medical underpayment directly causes bankruptcy.
- Do not call mortality a deterministic medical cause unless authoritative result states that.
- If beneficiary-by-beneficiary inheritance result data is not exposed structurally, Chat 06 must request a narrow Chat 03 contract addition rather than calculate estate distribution locally.

## Gate result

CLOSED — USER VERIFIED. Final implementation source: `docs/UI_ELDERLY_MORTALITY_GRIEF_INHERITANCE_APPROVED_V1.md`.
