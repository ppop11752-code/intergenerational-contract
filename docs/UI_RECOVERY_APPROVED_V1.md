# UI RECOVERY — APPROVED V1

Status: USER-APPROVED DESIGN
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Parent coverage: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Production UX for `PHỤC HỒI` inside the approved Voluntary shell. This spec changes no gameplay rule, formula, timer or authoritative calculation.

## Authoritative constraints

- Recovery is available only in Voluntary and shares the one authoritative 60s total timer with Market / Support / Birth.
- Opening/switching Recovery never pauses, resets or extends that timer.
- Recovery applies to Renewable resources only.
- The acting Character does not need to own the corresponding resource.
- Cost/unit, current pool, carrying capacity, pending-next-round recovery and remaining capacity come from authoritative server quotes.
- Recovery bought in round R is pending and applies at the start of round R+1.
- Spending is subject to authoritative cash, spending quota and capacity limits.
- Public Investment may reduce authoritative recovery cost; UI only displays the authoritative quoted result and event context.
- Client must not independently recompute price, capacity, accepted units or spending eligibility.

## User-approved design decisions

### RC1 — Layout

Use one large centered floating Recovery panel over the persistent World Map with **three horizontal cards**:
- Low;
- Mid;
- High.

The approved Voluntary right-edge dock remains visible.

### RC2 — Always-visible card data

Each card always shows authoritative:
- current Pool;
- Carrying Capacity;
- Pending recovery for next round;
- Capacity Remaining;
- Cost / unit.

### RC3 — Pool visualization

Each card includes a clear gauge for `Pool / Capacity` plus numeric Pending and Remaining values.

The gauge represents current authoritative pool state. Do not invent predictive future-pool values unless the server explicitly provides them.

### RC4 — Quantity controls

Each card has its own purchase controls:
- `−`;
- editable numeric quantity field;
- `+`;
- `MAX`;
- `PHỤC HỒI` action.

All limits/validation must use authoritative server data/results. Client UX may constrain obvious input format but must not invent economic eligibility or silently substitute different gameplay limits.

### RC5 — Financial context

Panel footer always shows, where applicable:
- `TIỀN KHẢ DỤNG`;
- `HẠN MỨC CHI CÒN LẠI`.

Use authoritative/private financial snapshot values. Do not expose raw internal IDs.

### RC6 — Public Investment event

If authoritative `ĐẦU TƯ CÔNG` is active and affects Recovery pricing, display a compact event badge adjacent to the affected quoted price/cost.

Do not recompute or display an alternative client-estimated discount.

### RC7 — Success state

Successful Recovery investment:
- keeps the Recovery panel open;
- updates Pool/Pending/Capacity/Cash/quota from the next authoritative snapshot;
- shows short inline confirmation such as:
  `ĐÃ ĐẦU TƯ PHỤC HỒI +X — HIỆU LỰC VÒNG SAU`.

No second confirmation and no panel auto-close.

## Visual treatment

- Same restrained pixel-fantasy plaque/card language as approved HUD/Voluntary surfaces.
- Bright World Map remains visible behind the panel.
- Cards must remain readable under time pressure; avoid burying core values behind hover.
- Mobile adapts to the approved Voluntary bottom/full-height sheet model rather than shrinking three desktop cards.

## Implementation constraints

Chat 06 must consume authoritative `recoveryQuotes` / private financial data and server action results. If a required value is absent from the actual client contract, create a narrow server-data handoff rather than deriving it client-side.
