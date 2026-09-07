# UI NIÊN SỬ — SOURCE VALIDATION V1

Status: USER VERIFICATION REQUIRED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Detailed `NIÊN SỬ` presentation beyond the already-approved HUD entry point and two top-level tabs:
- `HÀNH TRÌNH` — personal Human history across lives;
- `THẾ GIỚI` — authoritative society/world history.

## ALREADY APPROVED — DO NOT RE-ASK

- HUD has an icon-led `NIÊN SỬ` control to the left of the upper-right minimap.
- Niên sử top-level tabs are exactly `HÀNH TRÌNH` and `THẾ GIỚI`.
- Opening Niên sử does not pause/reset Voluntary or other authoritative timers.
- World Map remains the underlying shell.

## CURRENT AUTHORITATIVE DATA

### Personal history

Current `PlayerHistory` exposes:
- lives;
- highestAssets;
- highestStatus;
- marriages;
- children;
- event timeline with authoritative event types:
  - `life_start`;
  - `reincarnation`;
  - `marriage`;
  - `child_birth`;
  - `status_milestone`;
  - `death`;
  - `bankruptcy`;
  - `disconnect`;
- score snapshots by round/year with `householdAssets`, `scoreAssets`, married state and reason.

### World history

Current public state exposes:
- recent authoritative `chronology` entries;
- round `historySnapshots` with:
  - round/year;
  - population, workers, elderly, children;
  - total resident assets;
  - inflation, price index;
  - public debt, Government budget;
  - pension payout ratio;
  - Renewable/Nonrenewable pools;
  - Event name;
  - immigration count.

Some Chronicle text is currently string-based. Client must not invent structured relations/causes that are not exposed.

## UX RISKS

1. `HÀNH TRÌNH` must describe the Human player's sequence of lives, not just current Character.
2. Married score snapshots must not be displayed as full Household assets when authoritative scoring uses a Character share.
3. `THẾ GIỚI` must remain readable rather than becoming a raw server-log dump.
4. World Event history should connect naturally from approved `XEM TRONG NIÊN SỬ` links.
5. Any map/profile deep link needs authoritative identity/location data; raw IDs are never player-facing.

## USER VERIFICATION QUESTIONS

### N1 — Desktop presentation

A. Open Niên sử as a **large centered parchment/ledger panel** over the persistent lightly dimmed World Map, large enough for timeline reading but not full-screen.
B. Use the normal middle-right floating information panel.
C. Full-screen separate Chronicle scene.

Recommendation: **A** — Chronicle is reading-heavy and needs more width than Residence/Government while preserving the world behind it.

### N2 — `HÀNH TRÌNH` structure

A. Group personal history by `KIẾP #1 / KIẾP #2 / ...`; each life is a vertical chronological timeline with Round + Year and important event entries.
B. One flat timeline across all lives with no life grouping.
C. One card per life with only summary statistics.

Recommendation: **A** — makes reincarnation/life continuity immediately understandable.

### N3 — Personal event density

A. Show all meaningful authoritative personal milestone types by default (life start/reincarnation, marriage, children, Status milestones, death, bankruptcy, disconnect), using compact icon + text entries; routine economic actions stay out of the main personal timeline.
B. Show only birth/marriage/death.
C. Include every purchase/support/recovery action in the main timeline.

Recommendation: **A** — keeps the timeline biographical rather than transactional.

### N4 — Personal scoring visibility

A. At top of `HÀNH TRÌNH`, show current authoritative `ĐIỂM TÀI SẢN TRUNG BÌNH QUA CÁC KIẾP` plus a compact round-by-round score trend; exact snapshot detail is available on hover/tap.
B. Show only current score, no trend.
C. Hide score entirely until End Report.

Recommendation: **A** — scoring is a long-term objective and the server already stores authoritative score snapshots.

### N5 — `THẾ GIỚI` structure

A. Use a chronological world timeline grouped by Round/Year. Each round may contain compact categorized entries such as `SỰ KIỆN`, `DÂN SỐ`, `CHÍNH PHỦ`, `GIA ĐÌNH/XÃ HỘI`, `KHỦNG HOẢNG` only where authoritative data exists.
B. Show the current raw Chronicle strings as one unformatted log.
C. Show statistics only, no event timeline.

Recommendation: **A** — readable history without discarding authoritative chronology.

### N6 — Society indicators inside `THẾ GIỚI`

A. Add a compact secondary switch inside `THẾ GIỚI`: `DÒNG THỜI GIAN / CHỈ SỐ`. `CHỈ SỐ` shows simple historical charts for selected authoritative snapshots such as Population, Inflation, Public Debt, Total Assets, Pension payout and Resources.
B. No historical charts; timeline only.
C. Put all charts above the timeline at once.

Recommendation: **A** — historical trends are valuable but should not crowd the event timeline.

### N7 — Filters and navigation

A. Provide compact category filter chips in World timeline (e.g. `TẤT CẢ / SỰ KIỆN / DÂN SỐ / CHÍNH PHỦ / GIA ĐÌNH`) and allow a structured entry to expose `XEM TRÊN BẢN ĐỒ` / profile focus only when authoritative identity/location linkage exists.
B. No filters or deep links.
C. Add full-text search and extensive filter menus.

Recommendation: **A** — enough control without turning Chronicle into database tooling.

### N8 — World Event link behavior

A. `XEM TRONG NIÊN SỬ` from the World Event banner opens Niên sử directly to `THẾ GIỚI` and focuses/highlights the matching Round/Event entry.
B. Open Niên sử at its last-used tab/position.
C. Open a separate Event history screen.

Recommendation: **A** — preserves causal continuity from transient banner to permanent history.

### N9 — Mobile

A. Use a full-height sheet with sticky `HÀNH TRÌNH / THẾ GIỚI` tabs; timelines scroll vertically; charts use one-at-a-time selector rather than squeezing multiple charts side-by-side.
B. Full-screen dedicated Chronicle route.
C. Mobile shows only recent entries.

Recommendation: **A**.

## Contract dependency

If a desired structured world entry, personal identity, score value or map-deep-link is not exposed authoritatively, Chat 06 must request a narrow Chat 03 contract addition. Do not parse raw Chronicle text to invent gameplay identity/causality.

## Gate

Do not create final Niên sử spec or Chat 06 handoff until N1–N9 are directly approved by the user.