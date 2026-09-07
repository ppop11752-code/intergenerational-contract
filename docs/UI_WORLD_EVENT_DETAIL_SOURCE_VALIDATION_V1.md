# UI WORLD EVENT DETAIL — SOURCE VALIDATION V1

Status: CLOSED — USER VERIFIED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Player-facing presentation for authoritative World Events using the already approved temporary HUD event banner.

## ALREADY APPROVED

From `docs/UI_HUD_APPROVED_V1.md` and Room/art decisions:

- Important authoritative World Events use a **separate compact temporary banner** near upper-center, below normal HUD clusters.
- The banner is distinct from phase/timer.
- It never pauses/resets/extends gameplay timers.
- No persistent World Event HUD cell when no event is active.
- World ambience may change subtly only when authoritative event state supports it.
- World Map remains primary and camera-interactive.

## AUTHORITATIVE EVENT BEHAVIOR

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

Client must never derive event effects, exact numeric deltas, eligibility or duration from event name alone when authoritative values are not exposed.

## USER VERIFIED DECISIONS

### WE1 — No separate detail-opening feature

User decision:
- **Do not add a separate desktop feature for opening World Event detail.**
- The main temporary event banner itself carries the useful event explanation.
- There is no separate floating detail card, middle-right panel or modal for extra event detail.

### WE2 — Banner content

User selected A with custom wording:
- Banner shows **event name + concrete player-facing impacts**.
- Impact wording should be specific enough to understand what actually changed; it should not be reduced to an excessively short slogan.
- Keep the banner compact/readable, but allow multiple concise lines when an event affects multiple systems.

### WE3 — Detail integrated into the main banner

User selected A with custom behavior:
- The short `TÁC ĐỘNG VÒNG NÀY` information is integrated directly into the main temporary banner.
- No second detail surface is required on desktop.
- Show authoritative values where exposed; formulas remain in Rules/Tutorial.

### WE4 — Direct-cost warning

User selected A:
- For `DỊCH BỆNH`, when the authoritative current-round amount is exposed, the banner may show a clear line such as `PHÍ Y TẾ BẮT BUỘC VÒNG NÀY: X / NHÂN VẬT`.
- Keep this explicitly distinct from passive elderly end-round medical cost.
- Never estimate it client-side.

### WE5 — Event ambience

User selected A:
- Apply subtle event-themed ambience where appropriate and supported by authoritative event state.
- Examples may include restrained weather/sky treatment for disaster or light technical/celebratory cues for tech boom.
- Ambience must never obscure gameplay or imply unprovided mechanics.

### WE6 — Niên sử link

User selected A:
- Main event banner includes a compact `XEM TRONG NIÊN SỬ` action/link when a matching chronology entry is available.
- This is navigation to permanent history, not a separate event-detail surface.

### WE7 — Multiple affected systems

User selected A:
- Show only systems actually affected by the current event.
- Player-facing labels may include `THỊ TRƯỜNG`, `PHỤC HỒI`, `SINH CON`, `CHÍNH PHỦ`, etc.
- Do not show a fixed matrix with unaffected systems.

### WE8 — Mobile responsive presentation

User selected A. Reconciled with WE1 as a **responsive reflow only**:
- Mobile keeps a compact event banner.
- Because the same approved impact content may not fit comfortably on a small screen, tapping may open a small bottom sheet/card containing **the same event name, same concise impact rows and same Niên sử link already represented by the main banner**.
- The mobile sheet must **not add extra detail, extra formulas or additional event truth** beyond the approved banner content.
- Therefore WE8 does not create a separate semantic `view details` feature; it is only a small-screen presentation of the same content.

## Implementation guardrails

1. No client-side event-effect inference from event name.
2. No extra detail modal/panel on desktop.
3. Desktop event explanation lives in the temporary banner itself.
4. Mobile bottom sheet, if used, is same-content responsive reflow only.
5. Event banner never acts as phase/timer and never pauses/reset timers.
6. `XEM TRONG NIÊN SỬ` navigates to history only.
7. If an exact player-facing numeric effect required by this UX is not exposed authoritatively, Chat 06 must request a narrow Chat 03 contract addition instead of calculating it locally.

## Gate result

WE1–WE8 are directly user-approved under the compatibility rule above.

Ready to create `docs/UI_WORLD_EVENT_DETAIL_APPROVED_V1.md` and a Chat 06 implementation handoff.