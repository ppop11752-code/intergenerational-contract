# UI STATUS PURCHASE — SOURCE VALIDATION V1

Status: USER VERIFICATION REQUIRED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Status Purchase surface after Mandatory, including 15s authoritative decision timer, next-round effect, Household representative semantics, timeout fallback, married fee handling, Noble cap/competition/refund and transition into Voluntary.

## CURRENT / AUTHORITATIVE BEHAVIOR — DO NOT RE-ASK

From latest Rule Ledger and current server display contract:

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

## CURRENT CLIENT / HISTORICAL UX GAP

Current client baseline exposes only three raw `poor/middle/noble` buttons. Previous UI audit explicitly identified missing:
- current Status;
- authoritative fee detail;
- affordability;
- next-round effect;
- married fee context;
- Noble competition/cap/refund explanation;
- timeout fallback explanation;
- production-quality card treatment.

Historical V10.1 explored three Status cards and a 15-second timed phase, but exact card composition remains non-authoritative unless reconfirmed.

## Cross-surface constraints

- Approved HUD phase/timer treatment applies here as a **real decision timer**; unlike Mandatory, remaining time must be visibly actionable.
- Status surface opens over the persistent World Map and must not pause/extend the 15s server deadline.
- After a valid selection, UI must not imply immediate current-round Status/Market-access change.
- Noble selection must not be presented as guaranteed final Noble if end-round competition remains unresolved.
- No client-side fee, affordability, slot, priority, fallback or refund calculation.

## USER VERIFICATION QUESTIONS

### S1 — Surface placement

A. Large centered three-card chooser over the persistent World Map.
B. Middle-right floating panel with three stacked cards.
C. Wide lower-third three-card chooser.

Recommendation: **A** — Status is a short, explicit timed choice and benefits from direct comparison between all three tiers.

### S2 — 15-second timer treatment

A. Large numeric countdown integrated at the top of the Status chooser, with a shrinking progress accent.
B. Medium countdown in the approved HUD phase/timer cluster only; Status panel itself only shows `CHỌN ĐỊA VỊ CHO VÒNG SAU`.
C. Timer appears both in HUD and panel with equal prominence.

Recommendation: **A**, while the HUD can still mirror the same authoritative time at lower prominence. The panel should make clear that this is a real decision deadline.

### S3 — Tier card information density

A. Every card always shows: tier name, authoritative fee, affordability, main access/unlocks, `HIỆU LỰC VÒNG SAU`; Noble adds competition/cap note.
B. Cards show tier + fee + affordability; access/effect detail appears on hover/tap.
C. Minimal tier + fee cards; details move to a shared side explanation panel.

Recommendation: **A** — 15 seconds is short, so core consequences should not require exploratory hover.

### S4 — Married Household representation

A. Same three-card layout, but top context explicitly says `CHỌN CHO HỘ GIA ĐÌNH`; cards show the authoritative married fee directly, without emphasizing the single-person base fee.
B. Show both `PHÍ 1 NGƯỜI` and `PHÍ HỘ GIA ĐÌNH ×2` on every card.
C. Split spouse identities/fees into two subrows on each card.

Recommendation: **A** — player needs the amount actually payable, not formula clutter.

### S5 — Timeout fallback communication

A. Persistent short footer: `HẾT GIỜ: HỆ THỐNG SẼ ƯU TIÊN GIỮ ĐỊA VỊ HIỆN TẠI NẾU HỢP LỆ, NẾU KHÔNG SẼ TỰ HẠ BẬC.`
B. Only show this rule when timer drops below 5s.
C. Hide fallback rule during the choice and only explain what happened if timeout occurs.

Recommendation: **A** — timeout has meaningful automatic behavior and should be known before the deadline.

### S6 — Noble competition presentation

A. Noble card is explicitly marked `ỨNG VIÊN QUÝ TỘC`; show current authoritative slot/competition context. After selection, show `ĐANG CHỜ XẾP HẠNG CUỐI VÒNG`; if unsuccessful, later result communication states Middle fallback + refund difference.
B. Present Noble like other tiers during selection and explain competition only after selection.
C. Hide cap/competition detail entirely unless the player loses the Noble resolution.

Recommendation: **A** — prevents the player from reading payment as guaranteed Noble status.

### S7 — Successful selection transition

A. Brief confirmation state inside the same card/panel: `ĐÃ CHỌN — HIỆU LỰC VÒNG SAU`, then auto-transition to Voluntary without extra confirmation.
B. Immediately close Status and show a small toast while Voluntary opens.
C. Require a second `XÁC NHẬN` button after selecting a tier.

Recommendation: **A** — confirms the delayed effect without adding another gameplay action.

## Gate

Do not create the final Status design spec or Chat 06 implementation handoff until S1–S7 are directly approved by the user.
