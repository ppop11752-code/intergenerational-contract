# UI ELDERLY MEDICAL / MORTALITY / GRIEF / INHERITANCE — SOURCE VALIDATION V1

Status: USER VERIFICATION REQUIRED
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
- Medical due = authoritative formula based on PI and elderly stage.
- Medical deducts available cash only.
- **Medical fee itself does not force liquidation, borrowing or bankruptcy.**
- Partial medical payment affects mortality risk.
- Stage7 base mortality risk = 0.
- Risk increases by authoritative stage rule; Stage12 is forced 100% terminal.
- Mortality resolves at end round; there is no player medical decision/action.

### Grief Fee

- If a living parent loses a child, that parent receives one Grief Fee obligation for the **next Mandatory**.
- Each affected living parent Character creates one unit; two parents in one Household may therefore aggregate two units.
- Grief Fee is an ordinary Mandatory obligation and can contribute to forced liquidation/bankruptcy in the next Mandatory.

### Inheritance

- Current Rule Ledger `FINAL POLICY A` is authoritative.
- If one spouse dies and one survives, the surviving spouse's funded ASXH is not part of the deceased estate.
- Estate uses the authoritative divisible-joint-assets + deceased funded-ASXH rule.
- Beneficiaries are surviving spouse + deceased Character's direct living children, divided authoritatively.
- Stepchildren do not automatically inherit from a step-parent.
- No surviving spouse: direct living children inherit; if none, estate goes to Government Budget.
- Parents are not heirs under the current rule.
- Public debt is not inherited.
- If both spouses die in the same end-round settlement, joint estate is settled once to avoid order bias.
- Resource inheritance uses the authoritative conversion rule; no production-failure roll and no client-side conversion logic.
- Status refund due to death before activation occurs before inheritance.

## CURRENT DATA / UX CONSTRAINTS

Current public Character state exposes elderly medical due/paid and mortality-risk context. Detailed estate distribution may require structured result data beyond generic Chronicle text; if the approved UX needs beneficiary-by-beneficiary amounts and the server does not expose them cleanly, Chat 06 must request a narrow Chat 03 contract addition rather than reconstruct inheritance locally.

## CROSS-SURFACE CONSTRAINTS

- Death/inheritance presentation must not pause/reset authoritative timers for other active players.
- Residence/Family updates only from authoritative post-settlement state.
- Human death still transitions that Human into the approved Waiting Queue flow.
- Do not imply that elderly medical underpayment itself directly causes bankruptcy.
- Do not label mortality outcome as a deterministic medical cause unless the authoritative result explicitly supplies one.
- Grief Fee must be worded as a **next-Mandatory obligation**, not an immediate deduction at the moment of death.

## USER VERIFICATION QUESTIONS

### E1 — Elderly Character detail

A. In selected elderly Character detail, include a compact `SỨC KHỎE TUỔI GIÀ` section showing authoritative medical due/paid state and mortality-risk context when available.
B. Keep all elderly medical/mortality information out of Character detail; only show end-round results.
C. Show only age/stage, no medical or mortality context anywhere until death.

Recommendation: **A** — makes the automatic aging system legible without creating a fake medical action.

### E2 — End-round elderly medical result

A. Use a small non-blocking result card/row: `Y TẾ TUỔI GIÀ — ĐÃ TRẢ X / Y`; if partial, add a short warning that insufficient payment increases mortality risk. No button/action.
B. Only update cash silently.
C. Use a centered modal requiring acknowledgement.

Recommendation: **A**.

### E3 — Natural elderly death presentation

A. Short non-blocking world notice with portrait/name and `ĐÃ QUA ĐỜI`, then update Residence/Family/Turn Track from authoritative state; no forced camera and no long cinematic.
B. Full-screen death scene.
C. Silent map update + Niên sử only.

Recommendation: **A**.

### E4 — Grief Fee communication

A. When a living parent loses a child, show a compact follow-up notice: `PHÍ TANG CHẾ SẼ ĐƯỢC TÍNH Ở BẮT BUỘC VÒNG SAU`, with authoritative amount/unit context where exposed.
B. Do not notify at death; only let it appear later inside the next Mandatory breakdown.
C. Deduct/display it immediately at the moment of death.

Recommendation: **A** — makes the delayed obligation understandable without changing its timing.

### E5 — Inheritance result presentation

A. After authoritative settlement, show a compact `DI SẢN ĐÃ PHÂN CHIA` result with estate total + beneficiary portraits/names + amount received; deeper formula remains optional detail/Rules.
B. Show only each recipient's amount as a toast; no estate summary.
C. Show the full inheritance formula and resource conversion calculation by default.

Recommendation: **A**.

### E6 — One spouse dies

A. Use one combined family result surface: death notice first, then inheritance summary for surviving spouse/direct children; Residence/Family updates immediately from authoritative post-settlement state.
B. Separate every beneficiary into its own modal.
C. Show only the surviving spouse result and leave child inheritance to Niên sử.

Recommendation: **A**.

### E7 — Both spouses die in the same settlement

A. Present one combined `GIA ĐÌNH ĐÃ QUA ĐỜI / DI SẢN ĐƯỢC PHÂN CHIA` result for the joint estate, never two sequential inheritance calculations.
B. Show two separate spouse death + inheritance sequences.
C. Hide the special case and only update balances.

Recommendation: **A** — mirrors the authoritative single-settlement rule and avoids visual order bias.

### E8 — No living spouse/child heir

A. Explicit result line: `KHÔNG CÓ NGƯỜI THỪA KẾ HỢP LỆ — DI SẢN CHUYỂN VỀ NGÂN SÁCH CHÍNH PHỦ`.
B. Move the assets silently to Government.
C. Show `DI SẢN MẤT` without saying where it went.

Recommendation: **A**.

## Gate

Do not create the final elderly/mortality/Grief/inheritance design spec or Chat 06 implementation handoff until E1–E8 are directly approved by the user.