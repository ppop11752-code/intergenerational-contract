# UI MARKET — APPROVED V1

Status: USER-APPROVED DESIGN
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Parent shell: `docs/UI_VOLUNTARY_APPROVED_V1.md`

## Purpose

Production UX for `THỊ TRƯỜNG` inside Voluntary. This spec changes presentation only and must not alter market rules, timing, eligibility, formulas or server authority.

## Desktop layout

- Large centered floating Market panel over the persistent World Map.
- Six resource cards arranged in a 2 rows × 3 columns grid.
- Cards are **independent**; do not add fixed row/column group headers for Renewable/Nonrenewable or Low/Mid/High.
- Every card must independently identify its resource family and grade using explicit readable text plus dedicated pixel icon/shape treatment. Color alone is insufficient.
- Approved right-edge Voluntary dock remains visible and `THỊ TRƯỜNG` is highlighted.
- Approved HUD remains the only main 60s timer.

## Six cards

Exactly six abstract resource cards:
- Renewable Low
- Renewable Mid
- Renewable High
- Nonrenewable Low
- Nonrenewable Mid
- Nonrenewable High

Do not rename them as real-world commodities.

Each card always shows authoritative:
- resource family + grade;
- Price;
- Return if successful;
- Failure Risk;
- Current supply Pool;
- Owned quantity;
- current access/availability state.

## Card purchase controls

Each accessible card has its own purchase area:
- `−`
- editable numeric quantity field
- `+`
- `MAX`
- `MUA`

The player may type quantity directly or use step controls.

Important:
- UI may validate basic numeric format, but economic/action limits must come from authoritative state/quote/server response.
- Do not independently calculate a new cash/pool/quota/engine cap in the client.
- `MAX` uses the authoritative maximum exposed to the client or an authoritative request/response path; never guess it.
- Invalid/excess state must explain the authoritative reason where available.

## Locked cards

- Remain fully visible.
- Dim/lock treatment, but keep Price/Return/Risk/Pool/Owned readable.
- Explain authoritative lock reason on-card or hover/tap/focus.
- Do not hide locked cards.

## Out of supply

- Keep full card visible.
- Strong `HẾT NGUỒN CUNG` state.
- Disable purchase interaction.
- Continue showing current Pool/other card data.

## Purchase feedback

After successful purchase:
- keep Market open;
- refresh Pool and Owned from authoritative state;
- show short inline confirmation near the purchased card/control area;
- allow subsequent purchases while Voluntary time remains.

Concurrent supply changes remain server-authoritative; stale local expectation must yield to returned/current state.

## Production timing explanation

Always display a compact explanatory note, equivalent in meaning to:

`TÀI NGUYÊN MUA VÒNG NÀY ĐƯỢC XỬ LÝ/SẢN XUẤT TỪ VÒNG SAU KHI NHÂN VẬT ĐỦ ĐIỀU KIỆN.`

For Stage1–2 child Characters, UI may add a more explicit contextual explanation that they can buy/hold resources now but cannot produce before Stage3. This is explanation only, not a new rule.

## Mobile

- Preserve the same semantic six-card inventory and full authoritative card data.
- Use a mobile-appropriate full-height/bottom-sheet Market surface under the approved Voluntary bottom action rail.
- Cards may stack/reflow for readability; do not require a literal desktop 2×3 grid on narrow screens.
- Per-card purchase controls remain attached to their respective card.

## Art direction

- Pixel-fantasy card frames, restrained ornament, readable compact data.
- Resource family/grade distinctions use dedicated pixel icons and shape/text hierarchy.
- No emoji primary icons.
- Market panel must remain a game surface over the bright world, not a web shop/dashboard.

## Acceptance criteria

Implementation is conformant only if:
1. exactly six abstract resources are always represented;
2. desktop uses centered 2×3 independent cards with no forced row/column category headers;
3. each card always exposes Price/Return/Risk/Pool/Owned/access;
4. each card owns its own `− / editable qty / + / MAX / MUA` controls;
5. locked and sold-out cards stay visible and explain state;
6. success does not close Market;
7. Pool/Owned refresh authoritatively;
8. production timing is persistently explained;
9. Voluntary dock remains accessible and one shared 60s HUD timer remains authoritative;
10. no market gameplay calculation or timer behavior is changed by the client.
