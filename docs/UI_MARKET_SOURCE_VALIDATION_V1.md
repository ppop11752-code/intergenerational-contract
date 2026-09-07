# UI MARKET — SOURCE VALIDATION V1

Status: CLOSED — USER VERIFIED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Detailed Market action surface inside the approved Voluntary shell.

## AUTHORITATIVE BEHAVIOR PRESERVED

- Market exists only inside Voluntary and uses the same shared 60s total timer.
- Opening/closing Market never pauses/resets the timer.
- Market opens only after the player activates `THỊ TRƯỜNG`.
- Exactly six abstract resources exist: Renewable Low/Mid/High and Nonrenewable Low/Mid/High.
- Cards expose authoritative Price, Return, Failure Risk, Pool, Owned and access/availability state.
- Current-round Status controls access; locked cards remain visible with reason.
- Quantity is constrained by authoritative cash, supply pool, spouse spending quota and engine limits.
- No reservation before BUY; concurrent orders resolve by server receive order.
- Pool updates realtime; pool 0 remains visible as `HẾT NGUỒN CUNG`.
- Successful purchase keeps Market open.
- Child may buy/hold resources but cannot produce before Stage3.
- Production/realization remains next-round and lot-owner/stage authoritative.
- Client does not independently calculate final eligibility, price, clamp, outcome or future proceeds.

## USER-VERIFIED DESIGN DECISIONS — 2026-09-07

- **MK1 A:** Desktop Market is a large centered floating panel using a 2×3 six-card grid.
- **MK2 C:** The six cards are independent; there are no dedicated row/column group headers for Renewable/Nonrenewable or Low/Mid/High. Each card itself must still make its resource type and grade unmistakable using its title plus dedicated icon/shape treatment; color is not the sole cue.
- **MK3 A:** Every card always shows Price, Return, Risk, Pool, Owned and access/availability.
- **MK4 B:** Every card contains its own quantity controls and `MUA` action. Do not move purchase controls into one shared bottom strip.
- **MK5 COMBINED A+B:** Each accessible card uses `− / editable numeric quantity / + / MAX`. The player may type a number directly as well as use step controls. Authoritative limits govern validity/clamping/disabled reason; client-side UI must not invent economic limits.
- **MK6 A:** Locked cards remain fully visible, dimmed/locked, with authoritative access reason on card or hover/tap/focus.
- **MK7 A:** Out-of-supply cards retain their full data and show strong `HẾT NGUỒN CUNG`; purchase controls are disabled.
- **MK8 A:** Successful purchase keeps Market open, updates Pool/Owned from authoritative state and shows brief inline confirmation near the relevant card.
- **MK9 A:** Market always carries a compact production-timing note explaining that resources bought this round are processed/produced from a later round when that Character is eligible; child context may be more explicit.

## ACCESSIBILITY / CLARITY GUARDRAILS

MK2 removes explicit grid grouping, but this does not authorize color-only meaning. Every card should visibly identify both resource family and grade through text/icon/shape cues.

## Gate result

Source Validation Gate is CLOSED. `docs/UI_MARKET_APPROVED_V1.md` is the authoritative Market implementation spec.
