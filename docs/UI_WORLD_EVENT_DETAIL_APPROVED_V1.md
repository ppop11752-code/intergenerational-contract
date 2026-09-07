# UI WORLD EVENT DETAIL — APPROVED V1

Status: USER-APPROVED
Date: 2026-09-07
Owner: 05 — UI/UX & ART

## Purpose

Authoritative player-facing World Event presentation layered on the approved HUD/World shell. This spec changes presentation only; event mechanics, values, timing and server authority are unchanged.

## Core behavior

- Use the already-approved temporary compact World Event banner near upper-center, below normal HUD clusters.
- No persistent World Event HUD cell when no event is active.
- Banner is visually distinct from phase/timer and never pauses/resets/extents timers.
- **No separate desktop `view details` surface.** Event explanation is integrated into the main banner.

## Banner content

Show:
1. authoritative Event name;
2. concise but **specific** player-facing impact rows;
3. only systems actually affected by the event;
4. authoritative numeric values where exposed;
5. optional `XEM TRONG NIÊN SỬ` navigation when the corresponding chronology entry exists.

Do not reduce impact text to a vague slogan. Multiple concise lines are allowed when needed for comprehension.

Example semantic structure only:

`DỊCH BỆNH`
`BẮT BUỘC · PHÍ Y TẾ VÒNG NÀY: X / NHÂN VẬT`
`XEM TRONG NIÊN SỬ`

## Event-specific numeric warnings

- For `DỊCH BỆNH`, show authoritative current-round Mandatory medical fee per Character when available.
- Explicitly distinguish it from passive elderly end-round medical cost.
- Never estimate event costs/effects client-side.

## Multiple affected systems

Use plain system labels only for systems actually changed, such as:
- `THỊ TRƯỜNG`;
- `PHỤC HỒI`;
- `SINH CON`;
- `CHÍNH PHỦ`;
- `BẮT BUỘC`.

Do not render a fixed matrix containing unaffected systems.

## Ambience

Subtle event-themed ambience is approved when supported by authoritative event state:
- restrained weather/sky changes for disasters;
- light technical/celebratory cues for technology boom;
- similarly restrained context-specific effects for other events where appropriate.

Ambience must never obscure gameplay, alter readability or imply additional mechanics.

## Niên sử link

- Main banner may include `XEM TRONG NIÊN SỬ`.
- This navigates to the corresponding permanent World chronology entry.
- It is not a substitute detail screen and does not pause active timers.

## Mobile

- Keep a compact temporary event banner.
- Tap may open a small bottom sheet/card **only as responsive reflow of the same approved banner content**.
- Mobile sheet may repeat the same Event name, concise impact rows and Niên sử link.
- It must not expose extra formulas, hidden detail or additional event truth unavailable on desktop.

## Data authority

- Client consumes authoritative event state/effect values only.
- Never infer event effects, duration, numeric deltas or eligibility from Event name alone.
- If an approved numeric impact is not exposed cleanly, open a narrow Chat 03 contract handoff rather than calculate it in Chat 06.

## Approval record

User decisions:
- WE1: no separate detail-opening feature.
- WE2: event name + concrete impacts, not ultra-short slogan copy.
- WE3: concise detail integrated into main banner.
- WE4 A: show authoritative direct-cost amount such as epidemic Mandatory fee where available.
- WE5 A: subtle authoritative event ambience.
- WE6 A: Niên sử link.
- WE7 A: only affected systems.
- WE8 A: mobile bottom sheet/card permitted as same-content responsive reflow only.
