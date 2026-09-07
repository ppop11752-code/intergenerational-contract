# UI NIÊN SỬ — SOURCE VALIDATION V1

Status: CLOSED — USER VERIFIED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Detailed `NIÊN SỬ` presentation beyond the already-approved HUD entry point and top-level tabs:
- `HÀNH TRÌNH` — personal Human history across lives;
- `THẾ GIỚI` — authoritative society/world history.

## AUTHORITATIVE DATA — DO NOT RE-ASK

### Personal history
Current `PlayerHistory` exposes lives, highestAssets, highestStatus, marriages, children, milestone events, and authoritative score snapshots by Round/Year.

Milestone types include:
- `life_start`;
- `reincarnation`;
- `marriage`;
- `child_birth`;
- `status_milestone`;
- `death`;
- `bankruptcy`;
- `disconnect`.

### World history
Current public state exposes `chronology` plus `historySnapshots` containing Round/Year, population/workers/elderly/children, total resident assets, inflation/PI, public debt, Government budget, pension payout ratio, Renewable/Nonrenewable pools, event name and immigration count.

Client must not parse raw Chronicle strings to invent structured identities, categories or causal relationships.

## USER DECISIONS — 2026-09-07

- **N1 A** — Desktop uses a large centered parchment/ledger panel over the persistent lightly dimmed World Map; not full-screen.
- **N2 A** — `HÀNH TRÌNH` groups personal history by `KIẾP #1 / KIẾP #2 / ...`, each with a Round/Year vertical timeline.
- **N3 A** — Main personal timeline includes meaningful authoritative milestones only; routine economic transactions stay out.
- **N4 A** — Top of `HÀNH TRÌNH` shows authoritative `ĐIỂM TÀI SẢN TRUNG BÌNH QUA CÁC KIẾP` plus a compact score trend by round; snapshot detail may appear on hover/tap.
- **N5 A** — `THẾ GIỚI` uses a Round/Year timeline with compact categories such as Event, Population, Government, Family/Society and Crisis only where authoritative data exists.
- **N6 A** — `THẾ GIỚI` has a secondary switch `DÒNG THỜI GIAN / CHỈ SỐ`; `CHỈ SỐ` shows simple historical charts for selected authoritative snapshots such as Population, Inflation, Public Debt, Total Assets, Pension payout and Resources.
- **N7 A** — World timeline uses compact filter chips such as `TẤT CẢ / SỰ KIỆN / DÂN SỐ / CHÍNH PHỦ / GIA ĐÌNH`; `XEM TRÊN BẢN ĐỒ` or profile focus appears only when authoritative identity/location linkage exists.
- **N8 A** — `XEM TRONG NIÊN SỬ` from World Event opens `THẾ GIỚI` and focuses/highlights the matching Round/Event entry.
- **N9 A** — Mobile uses a full-height sheet with sticky top-level tabs, vertical timelines and one-at-a-time chart selector.

## Guardrails

- Opening Niên sử never pauses/resets authoritative timers.
- Scoring displayed in Niên sử must use authoritative score snapshots/AverageLifeAssetScore semantics, never raw Household cash.
- Married snapshot display must not confuse full Household assets with the Human's authoritative score share.
- Raw Character/Household IDs are never player-facing.
- Any desired structured world entry or map/profile deep link missing from the contract requires a narrow Chat 03 handoff; Chat 06 must not infer it from chronology text.

## Result

Source gate CLOSED. Final approved implementation spec: `docs/UI_CHRONICLE_APPROVED_V1.md`.
