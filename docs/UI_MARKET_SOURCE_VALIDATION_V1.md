# UI MARKET — SOURCE VALIDATION V1

Status: USER VERIFICATION REQUIRED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Detailed Market action surface inside the already approved Voluntary shell.

## CURRENT / AUTHORITATIVE BEHAVIOR — DO NOT RE-ASK

- Market exists only inside Voluntary and uses the same shared 60s total timer.
- Opening/closing Market does not pause/reset the timer.
- Market is not permanently open; it appears after the player activates `THỊ TRƯỜNG`.
- Six abstract resource cards always exist:
  - Renewable Low / Mid / High;
  - Nonrenewable Low / Mid / High.
- Do not rename them to named commodities.
- Each card has authoritative Price, Return if successful, Failure risk, Current supply pool and Owned quantity.
- Current-round Status controls access; locked cards stay visible with authoritative reason.
- Quantity is constrained authoritatively by cash, pool, spending quota and engine limits.
- No reservation before BUY; concurrent orders resolve by server receive order.
- Pool updates realtime.
- Pool 0 stays visible with `HẾT NGUỒN CUNG`.
- Successful purchase keeps Market open.
- Child may buy/hold resources but cannot produce before Stage3.
- Production happens next round according to authoritative lot-owner/stage rules.
- Client must not calculate final eligibility, price, clamp, success/failure or future proceeds independently from server state/quotes.

## CURRENT CLIENT / HISTORICAL GAP

Current client is select boxes + units input. It does not provide six comparison cards, access locks, pool state, risk/return context, owned quantity or production-timing explanation.

Historical UI used six resource cards, but exact layout and interaction are not authoritative until reconfirmed.

## Cross-surface constraints

- Right-side Voluntary dock remains visible while Market is open.
- Approved HUD remains the only main Voluntary timer.
- World Map persists behind the Market surface.
- Market success should not auto-close the panel.
- Locked/out-of-supply cards remain discoverable.
- Player-facing UI must not expose internal resource IDs as the primary labels.

## USER VERIFICATION QUESTIONS

### MK1 — Desktop Market placement

A. Large centered floating Market panel with six cards in a **2 rows × 3 columns** grid.
B. Wide middle-right panel with six cards in a **3 rows × 2 columns** grid, keeping more map visible on the left.
C. Full-width lower-half market tray with six horizontal cards.

Recommendation: **A** — fastest direct comparison between Low/Mid/High and Renewable/Nonrenewable within the 60s shared phase.

### MK2 — Resource grouping

A. Two clear rows: top = `TÁI TẠO`, bottom = `KHÔNG TÁI TẠO`; columns = Low / Mid / High.
B. Three columns by grade, each column contains Renewable + Nonrenewable stacked.
C. Six independent cards with only icon/color differentiation and no explicit row/column grouping.

Recommendation: **A** — the renewable/nonrenewable distinction is economically important and should be immediately legible.

### MK3 — Always-visible card data

A. Show all authoritative data directly on every card: Price, Return, Risk, Pool, Owned, access/availability.
B. Show Price + Return + Risk always; Pool/Owned appear in a compact footer or hover/tap detail.
C. Only Price + availability on card; all other values in a selected-card detail pane.

Recommendation: **A** — 6 cards × compact metrics is still manageable and minimizes exploratory clicks under time pressure.

### MK4 — Purchase interaction

A. Clicking an accessible card selects it; a shared purchase strip below the grid shows quantity stepper/input, `MAX`, calculated authoritative payable preview where exposed, and `MUA`.
B. Each card contains its own quantity controls + `MUA` button.
C. Clicking a card opens a second modal dedicated to purchase.

Recommendation: **A** — keeps cards readable and avoids duplicating controls six times.

### MK5 — Quantity input

A. `− / quantity / +` plus `MAX`; invalid/excess values clamp/disable using authoritative limits and reason.
B. Free numeric input only.
C. Preset buttons `1 / 5 / 10 / MAX` only.

Recommendation: **A** — combines speed and precision without forcing raw input.

### MK6 — Locked card treatment

A. Card remains fully visible but dimmed with a lock overlay; show required Status/reason directly or on hover/tap.
B. Hide detailed numbers for locked cards and reveal only after unlock.
C. Remove locked cards entirely.

Recommendation: **A** — matches approved Voluntary unavailable-state policy and helps players understand future Status value.

### MK7 — Out-of-supply treatment

A. Keep full card data visible, add strong `HẾT NGUỒN CUNG`, disable purchase controls.
B. Collapse sold-out card to a small placeholder.
C. Hide sold-out card.

Recommendation: **A**.

### MK8 — Purchase success feedback

A. Keep Market open; update Pool/Owned immediately from authoritative snapshot and show a short inline `ĐÃ MUA …` confirmation near the selected card/purchase strip.
B. Keep Market open but only use a generic toast.
C. Close Market after every purchase.

Recommendation: **A** — supports multiple purchases inside one Voluntary phase while keeping the player oriented.

### MK9 — Production timing explanation

A. Persistent compact note in Market header/footer: `TÀI NGUYÊN MUA VÒNG NÀY ĐƯỢC XỬ LÝ/SẢN XUẤT TỪ VÒNG SAU KHI NHÂN VẬT ĐỦ ĐIỀU KIỆN.` Child state may show a more specific contextual note.
B. Show this only on first Market visit/tutorial.
C. Do not show production timing in Market; leave it to Rules/Tutorial.

Recommendation: **A** — prevents the common misunderstanding that purchase produces immediate income.

## Gate

Do not create final Market spec or Chat 06 Market handoff until MK1–MK9 are directly approved by the user.
