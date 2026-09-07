# UI SUPPORT — SOURCE VALIDATION V1

Status: CLOSED — USER VERIFIED
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
- Server exposes private `eligibleSupportTargets` during the acting Character's Voluntary turn.
- Client must not derive kinship/eligibility from map proximity or reconstruct family rules independently.

## USER-VERIFIED PRESENTATION DECISIONS

- **SP1:** Use one large centered Support panel. Every currently eligible recipient Character is represented by a **separate card** on the panel. No requirement to split the panel into fixed `CHA MẸ` / `CON CÁI` sections; relation remains visible on each card.
- **SP2:** Each recipient card shows portrait/avatar, player-facing identity/name where authoritative, relation, age/stage label, current Status and a short financial-context line only where safely exposed.
- **SP3:** Persistent compact explanation: `ĐÂY LÀ CHU CẤP TỰ NGUYỆN, TÁCH BIỆT VỚI CÁC KHOẢN CHU CẤP BẮT BUỘC ĐÃ ĐƯỢC XỬ LÝ.`
- **SP4:** Every recipient card contains its own amount controls at the bottom: `− / editable amount / + / MAX / CHU CẤP`. The player does not need a second shared strip or modal.
- **SP5:** Panel footer always shows authoritative `TIỀN KHẢ DỤNG` and `HẠN MỨC CHI CÒN LẠI` where applicable.
- **SP6:** When there is no eligible parent/child target, the `CHU CẤP` Voluntary dock action remains discoverable and can be selected; selecting it shows a clear explanation that there is currently no eligible recipient. Do not hide the action. This is the approved interpretation of the user's `B. Chọn nút thì có giải thích không đủ điều kiện.`
- **SP7:** Successful transfer keeps Support open, refreshes cash/quota authoritatively and shows inline confirmation such as `ĐÃ CHU CẤP X` on the recipient card.

## Cross-surface constraints

- Approved Voluntary right-edge dock remains visible and `CHU CẤP` is highlighted while the panel is open.
- HUD remains the only main 60s timer.
- World Map persists behind the Support surface.
- Opening Residence/Government/Niên sử or marriage notices does not pause Voluntary time.
- Internal Character IDs are never the player-facing target selector.
- Support availability, recipient eligibility, cash and quota are authoritative; UI must not infer them client-side.

## Data dependency note

If the client contract lacks enough player-facing identity/portrait data to render eligible Human/NPC family members cleanly, Chat 06 must open a narrow contract handoff rather than exposing raw Character IDs.

## Gate result

Source Validation Gate is CLOSED. `docs/UI_SUPPORT_APPROVED_V1.md` is the authoritative user-approved Support UX spec. Chat 06 may implement it without changing gameplay semantics.
