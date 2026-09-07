# UI WORLD EVENT DETAIL — SOURCE VALIDATION V1

Status: USER VERIFICATION REQUIRED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Detailed player-facing presentation for authoritative World Events beyond the already approved temporary HUD banner.

## ALREADY APPROVED — DO NOT RE-ASK

From `docs/UI_HUD_APPROVED_V1.md` and Room/art decisions:

- Important authoritative World Events use a **separate compact temporary banner** near upper-center, below normal HUD clusters.
- The banner is distinct from phase/timer.
- It never pauses/resets/extends gameplay timers.
- No persistent World Event HUD cell when no event is active.
- Banner may expose more detail on hover/focus/tap.
- World ambience may change subtly only when authoritative event state supports it.
- World Map remains primary and camera-interactive.

## AUTHORITATIVE EVENT BEHAVIOR — DO NOT RE-ASK

World Events occur on scheduled rounds 4/8/12/16/20/24/28/32. Current authoritative event types/effects include:

- `THIÊN TAI` — both renewable/nonrenewable resource pools reduced.
- `KHỦNG HOẢNG TÀI CHÍNH` — resource return penalty and EIF reduction.
- `BÙNG NỔ CÔNG NGHỆ` — resource return bonus and EIF increase.
- `MỞ RỘNG PHÚC LỢI` — Government support-fund injection subject to fiscal funding.
- `DỊCH BỆNH` — authoritative Mandatory medical fee per living Character in that round.
- `KHUYẾN SINH` — birth proposal limit increases to 3.
- `KHỦNG HOẢNG NỢ CÔNG` — debt-interest multiplier increases.
- `ĐẦU TƯ CÔNG` — Recovery cost reduced.
- `BIẾN ĐỘNG THỊ TRƯỜNG` — wider market multiplier bounds.

Client must never derive event effects, exact numeric deltas, eligibility or duration from event name alone if authoritative state/result fields are not exposed.

## UX RISKS

1. Event banner cannot look like another phase/timer.
2. Players need to understand what changed without reading formulas mid-turn.
3. Event detail must not imply effects beyond the authoritative round/state.
4. `DỊCH BỆNH` event detail must not be confused with elderly passive end-round medical cost.
5. Event-specific ambience must remain subtle and must not create fake gameplay cues.

## USER VERIFICATION QUESTIONS

### WE1 — Expanded event detail location

A. Tap/click/hover-focus the temporary banner to open a **compact floating event card directly below/near the banner**, keeping the world visible.
B. Open a middle-right detail panel like Government/Residence.
C. Open a centered modal.

Recommendation: **A** — event context stays attached to its temporary banner without turning into another major subsystem panel.

### WE2 — Default temporary banner content

A. Show event name + one very short player-facing impact phrase, e.g. `ĐẦU TƯ CÔNG · PHỤC HỒI RẺ HƠN`.
B. Show event name only; impact appears only after expansion.
C. Show full multi-line effect detail in the banner itself.

Recommendation: **A** — immediately answers “event này làm gì?” while staying compact.

### WE3 — Expanded detail content

A. Show a short `TÁC ĐỘNG VÒNG NÀY` list using authoritative player-facing effects/values where exposed; formulas remain in Rules/Tutorial.
B. Show the exact gameplay formulas by default.
C. Only repeat the event description with no concrete effect rows.

Recommendation: **A** — useful during active play without duplicating Rule Ledger math.

### WE4 — Event-specific direct-cost warning

A. For events such as `DỊCH BỆNH`, if authoritative current-round amount is exposed, show a clear line like `PHÍ Y TẾ BẮT BUỘC VÒNG NÀY: X / NHÂN VẬT`; keep it explicitly separate from elderly end-round medical cost.
B. Never show the amount in Event detail; players discover it only in Mandatory.
C. Show a client-calculated estimated amount before authoritative data exists.

Recommendation: **A** — material immediate impact should be legible, but only from authoritative values.

### WE5 — Event ambience

A. Apply subtle event-themed world ambience where appropriate and authoritative: e.g. weather/darker sky for disaster, restrained celebratory/technical cues for tech boom; never obscure gameplay or imply extra effects.
B. Keep world ambience identical for every event.
C. Use strong full-screen visual filters for every event.

Recommendation: **A** — reinforces that the world changed while preserving the approved bright readable map.

### WE6 — Event history access

A. Expanded detail includes a small `XEM TRONG NIÊN SỬ` link that opens/focuses the corresponding World chronology entry when available.
B. No link; user must open Niên sử manually.
C. Event detail contains its own permanent history list.

Recommendation: **A** — connects transient event UI to permanent history without duplication.

### WE7 — Multiple affected systems

A. Group impact rows by plain player-facing meaning (`THỊ TRƯỜNG`, `PHỤC HỒI`, `SINH CON`, `CHÍNH PHỦ`, etc.) only when that event actually affects them; do not show unaffected systems.
B. Always show a fixed matrix of every system with many `KHÔNG ĐỔI` rows.
C. Show only one generic sentence even for multi-system events.

Recommendation: **A** — compact and scannable.

### WE8 — Mobile expansion

A. Keep the compact event banner; tapping opens a small bottom sheet/event card with the same impact rows and Niên sử link.
B. Use a full-screen event page.
C. Only show the banner name on mobile with no detail access.

Recommendation: **A**.

## Contract dependency

If exact current-round event effects/amounts needed by the approved UX are not exposed cleanly, Chat 06 must request a narrow Chat 03 contract addition. Never calculate authoritative effects from the event label on the client.

## Gate

Do not create final World Event detail spec or Chat 06 handoff until WE1–WE8 are directly approved by the user.
