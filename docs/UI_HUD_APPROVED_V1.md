# UI HUD — APPROVED V1

Status: USER-APPROVED / AUTHORITATIVE FOR IMPLEMENTATION
Date: 2026-09-07
Owner: 05 — UI/UX & ART

This document is the authoritative HUD design spec for the current approved `Landing → Lobby → Room → HUD` cluster.

## Approved direction

User approved **HDA — Cụm thông tin nổi**.

Core principle:
- Do **not** render a dense full-width HUD bar or one continuous top frame.
- HUD consists of several compact floating information clusters over the persistent World Map.
- Intentional gaps between clusters must expose the map and preserve the `WSA — Thế giới là màn hình` hierarchy from `docs/UI_ROOM_APPROVED_V1.md`.
- HUD must not cover the left-side Turn Track or the upper-right always-informational minimap.

## Desktop composition

### K1 — Phase/timer position

Approved: **B**.

- Phase/timer is centered horizontally but sits **slightly lower than the top macro clusters**.
- It reads like an adaptive floating gameplay-status instrument rather than part of a top bar.
- All players can see authoritative phase + remaining time.
- On the local player's turn it becomes visually stronger and may expand slightly.
- While waiting it reduces emphasis and may include current actor context, e.g. `VOLUNTARY · 43s · Đang chờ Minh`.
- No animation may alter authoritative timers or delay interaction.

### K2 — Macro grouping

Approved: **A**.

Use two main macro groups:

1. **Round/Year cluster**
   - Round and Year together.
   - Compact contextual cluster, visually lower priority than actionable phase/timer.

2. **Society macro cluster**
   - Population + small persistent trend arrow.
   - Inflation + small persistent trend arrow.
   - Public Debt + Debt Ceiling directly visible.
   - Population/Inflation numeric deltas appear on hover/focus/tap rather than occupying permanent width.

Do not fragment every statistic into an individual floating card.

### K3 — Niên sử / Settings relative to minimap

Approved: **B**.

- `NIÊN SỬ` is an icon-led HUD control placed **to the left of the upper-right minimap**.
- `SETTINGS` remains the persistent utility gear at the **upper-right utility edge**, outside the minimap content area.
- Settings must not overlay meaningful minimap information.
- No permanent Help `?`, Music, or SFX HUD controls.

Niên sử opens the already approved two-tab direction:
- `HÀNH TRÌNH`
- `THẾ GIỚI`

### K4 — World Event banner

Approved: **B**.

- Important authoritative World Events use a **separate compact temporary banner** anchored near the upper-center of the World Map, lower than the normal HUD clusters.
- It must remain visually distinct from phase/timer.
- It may expose more event detail on hover/focus/tap.
- Do not restore a persistent World Event HUD cell when no event is active.
- The banner does not pause gameplay or timers.

### K5 — Cluster chrome

Approved: **B**.

- Use compact **pixel-fantasy plaques**.
- Dark-fantasy/wood/metal/parchment-inspired treatment is allowed, but frames remain light and restrained.
- Use thin ornament/border treatment and softer pixel-frame geometry.
- Do not create heavy decorative boxes that hide significant portions of the bright World Map.
- Core pixel art and HUD data remain nearest-neighbor / integer-friendly with no blur.

## Information semantics

### Population and Inflation

- Current values always visible.
- Small trend arrows remain visible persistently.
- Exact delta/value-change detail appears on hover/focus/tap.
- Meaning must not rely on color alone; arrow shape/direction is required.

### Public debt

Compact HUD directly shows both:
- current public debt;
- debt ceiling.

Example semantic form only:
`NỢ CÔNG 320 / 780`

Exact typography/number formatting may adapt responsively but must preserve both values.

### Network state

- Healthy connection has no persistent HUD indicator.
- Degraded connection, disconnect, or reconnect may show a temporary warning/banner/icon.
- Warning state must not displace the authoritative phase/timer in a way that hides it.

## Relationship with Room V1

HUD must coexist with `docs/UI_ROOM_APPROVED_V1.md`:

- Left edge: Turn Track = independent avatar tokens connected by one vertical line through avatar centers.
- Upper-right: live/informational minimap remains visible in compact form.
- Minimap highlighted markers provide Government and local Home camera focus; do not recreate separate Government/Home world-map navigation buttons in HUD.
- Bottom-right world controls retain only Zoom In / Zoom Out as approved by Room V1.
- World Map remains the primary visual surface.

## Approximate desktop hierarchy

```text
┌──────────────────────────────────────────────────────────────┐
│ [VÒNG · NĂM]     [DÂN SỐ ↑ | LẠM PHÁT ↓ | NỢ / TRẦN]       │
│                                      [NIÊN SỬ]   [MINIMAP] ⚙ │
│                                                              │
│                [ PHASE · TIMER · ACTOR ]                    │
│                                                              │
│              [temporary WORLD EVENT banner]                 │
│                                                              │
│                       WORLD MAP                              │
└──────────────────────────────────────────────────────────────┘
```

This diagram is compositional guidance, not pixel-perfect measurement.

## Mobile HUD

### K6 — Primary row

Approved: **A**.

Mobile uses the already confirmed two-level model.

Primary row always visible:
- Round/Year;
- Phase/Timer;
- Population.

Expandable secondary layer contains at minimum:
- Inflation + trend;
- Public Debt + Debt Ceiling;
- any other approved secondary macro HUD facts required by the implementation.

Requirements:
- Do not use a pure horizontal-scroll desktop HUD as the primary mobile pattern.
- Minimap remains a smaller but real informational minimap per Room V1.
- Mobile Turn Track remains a compact horizontal strip/rail.
- Niên sử / Settings remain reachable without covering the primary phase/timer state.
- Mobile presentation may use sheets/expanded rows, but gameplay/timers remain unchanged.

## World Event and phase motion

- Normal panel/cluster transitions should remain short, generally around 150–250 ms where transition is needed.
- Phase/timer emphasis may pulse/expand lightly when local action becomes available.
- World Event banner may enter/exit with a compact non-blocking transition.
- Never pause, reset, extend, delay, or mask authoritative phase timers.

## Explicit removals from old implementation/baselines

Do not carry forward as HUD defaults:
- dense full-width continuous HUD strip;
- persistent World Event cell showing `none/không` when inactive;
- permanent Player Bar;
- persistent Help `?` button;
- persistent healthy connection text/dot;
- permanent Music/SFX controls;
- separate Government/Home camera buttons.

## Constraints

This design does **not** authorize changes to:
- gameplay rules;
- timer durations;
- multiplayer protocol;
- authoritative server ordering/state;
- economic formulas;
- World Event semantics.

Client presentation must use authoritative snapshot/state rather than re-deriving gameplay logic.

## Approval result

HUD V1 is USER-APPROVED.

Together with:
- `docs/UI_LANDING_APPROVED_V1.md`
- `docs/UI_LOBBY_APPROVED_V1.md`
- `docs/UI_ROOM_APPROVED_V1.md`

this completes direct user design approval for the main `Landing → Lobby → Room → HUD` cluster.
