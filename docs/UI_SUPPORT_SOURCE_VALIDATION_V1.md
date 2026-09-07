# UI SUPPORT — SOURCE VALIDATION V1

Status: USER VERIFICATION REQUIRED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Detailed `CHU CẤP` voluntary action surface inside the approved Voluntary shell.

## CURRENT / AUTHORITATIVE BEHAVIOR — DO NOT RE-ASK

- Support exists only inside Voluntary and shares the one authoritative 60s total timer.
- Voluntary Support is separate/additional to Mandatory support already processed by the engine.
- Eligible voluntary recipients are **direct parents or direct children only**.
- Siblings, neighbors, unrelated Characters and spouse are not eligible recipients.
- Spouse is not a recipient because spouses share one economic Household.
- This is not ASXH donation, gifting, early inheritance or unrestricted wealth transfer.
- Multiple transfers are allowed while time/cash/quota remain.
- There is no artificial percentage cap specific to voluntary Support; amount must remain >0 and within authoritative available cash plus spending-quota constraints.
- Server exposes private `eligibleSupportTargets` during the acting Character's Voluntary turn, including authoritative relation and Character identity fields available to the client.
- Client must not derive kinship/eligibility from visual map proximity or reconstruct family rules independently.

## CURRENT CLIENT / HISTORICAL GAP

The old prototype required players to type a raw Character ID. Previous UI audit explicitly classified this as unacceptable player UX. Production UI must present eligible family members directly and keep internal IDs hidden.

Historical UI discussed separate parent/child support sections, but exact layout has not yet been directly approved.

## Cross-surface constraints

- Approved Voluntary right-edge dock remains visible and `CHU CẤP` is highlighted.
- HUD remains the only main 60s timer.
- World Map persists behind the Support surface.
- Opening Residence/Government/Niên sử or marriage notices does not pause the Voluntary timer.
- Support action results/remaining cash/quota must refresh from authoritative state.
- UI wording must distinguish `CHU CẤP TỰ NGUYỆN` from Mandatory support already handled automatically.

## USER VERIFICATION QUESTIONS

### SP1 — Desktop layout

A. Large centered family-support panel with two sections: `CHA MẸ` and `CON CÁI`, each containing eligible Character cards.
B. Middle-right panel with one mixed eligible-recipient list, relation shown on each row.
C. One compact target selector + detail card.

Recommendation: **A** — relation is central to this mechanic and two clear family groups are easy to scan.

### SP2 — Recipient card contents

A. Always show portrait/avatar, display identity/name where authoritative, relation, age/stage label, current Status and a short financial-context line only where safely exposed.
B. Show only identity + relation; age/status on hover.
C. Minimal portrait + name only.

Recommendation: **A** — enough context to distinguish family members without exposing internal IDs.

### SP3 — Mandatory-vs-voluntary explanation

A. Persistent compact note at top: `ĐÂY LÀ CHU CẤP TỰ NGUYỆN, TÁCH BIỆT VỚI CÁC KHOẢN CHU CẤP BẮT BUỘC ĐÃ ĐƯỢC XỬ LÝ.`
B. Show that explanation only on first visit/tutorial.
C. No explanation in the panel.

Recommendation: **A** — prevents double-payment confusion.

### SP4 — Amount entry

A. Selecting a recipient expands that card with `− / editable amount / + / MAX / CHU CẤP`.
B. One shared amount strip below the recipient list.
C. Free numeric input only in a second modal.

Recommendation: **A** — keeps target and amount causally connected and matches Market/Recovery interaction language.

### SP5 — Cash/quota context

A. Footer always shows authoritative `TIỀN KHẢ DỤNG` and `HẠN MỨC CHI CÒN LẠI` where applicable.
B. Only show these after selecting a recipient.
C. Do not show them; rely on server errors.

Recommendation: **A**.

### SP6 — Empty/no-eligible-target state

A. Keep the Support panel open with a clear empty state: `HIỆN KHÔNG CÓ CHA MẸ HOẶC CON CÁI ĐỦ ĐIỀU KIỆN NHẬN CHU CẤP TỰ NGUYỆN.`
B. Disable the Support dock button entirely and never open the panel.
C. Hide `CHU CẤP` from the dock.

Recommendation: **A** — consistent with the approved discoverable-but-unavailable Voluntary policy.

### SP7 — Successful transfer feedback

A. Keep Support open; update cash/quota authoritatively and show inline confirmation on the target card such as `ĐÃ CHU CẤP X`.
B. Keep panel open with generic toast only.
C. Close Support after each transfer.

Recommendation: **A** — supports multiple transfers within the same shared Voluntary phase.

## Data dependency note

If the actual client contract does not provide a player-facing identity/portrait source sufficient to render eligible NPC/Human family members cleanly, Chat 06 must open a narrow contract handoff instead of displaying raw Character IDs.

## Gate

Do not create final Support spec or Chat 06 Support handoff until SP1–SP7 are directly approved by the user.
