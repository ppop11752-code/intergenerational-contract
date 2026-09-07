# UI STATUS PURCHASE — SOURCE VALIDATION V1

Status: CLOSED — USER VERIFIED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Status Purchase surface after Mandatory, including 15s authoritative decision timer, next-round effect, Household representative semantics, timeout fallback, married fee handling, Noble cap/competition/refund and transition into Voluntary.

## CURRENT / AUTHORITATIVE BEHAVIOR

- Status Purchase occurs after Mandatory and before Voluntary for the Household representative only.
- Maximum decision time = **15 seconds**, authoritative server deadline.
- Later spouse in a married Household does not get a separate Status phase; that spouse enters Voluntary directly after their own turn-start flow.
- Choice/pay happens in the current round, but selected Status becomes effective **next round**.
- Current-round Status still controls current turn order and current Market access.
- Residence architecture changes next round, not immediately on purchase.
- Poor/Bình dân fee = 0.
- Failure to afford a higher Status does not cause bankruptcy.
- Timeout fallback: server first tries to keep current Status if affordable/eligible; otherwise recursively downgrades to the nearest affordable tier, ultimately free Poor.
- Single fees use the locked round-start `AverageCitizenAssets` snapshot.
- Married fee is exactly **2×** the corresponding single fee.
- Noble slots = `ceil(10% * living Character population)`; married Noble Household consumes 2 slots.
- Noble candidates resolve at end round using authoritative priority: incumbent Noble first, then higher Household assets, then deterministic authoritative tie-break.
- A married Household needing 2 Noble slots fails if only 1 slot is available.
- Noble loser falls to Middle and receives refund equal to Noble fee minus Middle fee.
- Status price snapshot does not recompute during the round.
- At end-round marriage merge, next-round Status targets/paid fees reconcile by authoritative rule; UI must not precompute the outcome client-side.
- Server exposes a private `statusQuote` only to the current Household representative during Status, containing authoritative fees/affordability and Noble competition/fallback/refund facts.

## USER-VERIFIED PRESENTATION — 2026-09-07

- **S1 — Placement: A.** Use a large centered three-card chooser over the persistent World Map.
- **S2 — Timer: B.** The authoritative 15s countdown appears only in the approved HUD phase/timer cluster. Do not duplicate the countdown inside the Status panel. The panel itself communicates `CHỌN ĐỊA VỊ CHO VÒNG SAU`.
- **S3 — Card contents: A.** Every tier card always shows tier name, authoritative fee, affordability, main access/unlocks and `HIỆU LỰC VÒNG SAU`. Noble also has competition/cap communication, subject to S6 timing.
- **S4 — Married Household: A.** Keep the same three-card layout; show `CHỌN CHO HỘ GIA ĐÌNH` and display the authoritative married fee directly. Do not foreground the single-person base fee.
- **S5 — Timeout fallback: B.** Do not show the fallback explanation persistently. Surface the automatic fallback rule only when the authoritative timer is below 5 seconds.
- **S6 — Noble competition: B.** During the initial selection, Noble may visually align with the other tier cards. Explain that Noble is subject to end-round competition immediately **after the player selects Noble**, including the waiting-for-resolution state. Do not imply guaranteed Noble activation.
- **S7 — Successful selection: A.** Briefly transform the same panel into `ĐÃ CHỌN — HIỆU LỰC VÒNG SAU`, then auto-transition to Voluntary with no second confirmation.

## Interaction / wording constraints

- Status is a real decision phase, so the HUD timer remains actionable and visually prominent according to approved HUD V1.
- Panel itself does not duplicate the timer.
- Below 5s, show a concise fallback warning such as: `HẾT GIỜ: hệ thống sẽ ưu tiên giữ địa vị hiện tại nếu hợp lệ; nếu không sẽ tự hạ bậc.`
- If Noble is selected, confirmation must explicitly communicate that selection/payment creates a Noble candidate for end-round resolution rather than guaranteed final Noble.
- If Noble later loses the cap resolution, later result communication must state Middle fallback + authoritative refund difference.
- No client-side fee, affordability, slot, priority, fallback or refund calculation.
- No immediate Residence architecture or current-round Market access change is implied.

## Gate result

Source Validation Gate is CLOSED. Status Purchase V1 may be specified and handed to Chat 06 using these directly approved presentation decisions.
