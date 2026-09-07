# UI NIÊN SỬ — APPROVED V1

Status: USER-APPROVED
Date: 2026-09-07
Owner: 05 — UI/UX & ART

## Purpose

Production UI specification for `NIÊN SỬ`, preserving the already-approved top-level tabs:
- `HÀNH TRÌNH`;
- `THẾ GIỚI`.

No gameplay, scoring, timer, protocol or history semantics are changed.

## 1. Desktop shell

- Open as a **large centered parchment/ledger panel** over the persistent World Map.
- The World Map remains visible around the ledger and is only lightly dimmed.
- This surface is reading-heavy and may be wider than Residence/Government panels, but is not a full-screen scene.
- Opening/closing Niên sử never pauses, resets or extends authoritative timers.

## 2. `HÀNH TRÌNH`

### Multi-life structure

- Group history explicitly by `KIẾP #1 / KIẾP #2 / ...`.
- Each life uses a vertical Round/Year timeline.
- Reincarnation starts a new life group rather than flattening all lives together.

### Main events

Show meaningful authoritative milestones such as:
- life start / reincarnation;
- marriage;
- child birth;
- Status milestone;
- death;
- bankruptcy;
- disconnect.

Routine Market/Recovery/Support actions do not belong in the main biographical timeline.

### Scoring block

At the top show:
`ĐIỂM TÀI SẢN TRUNG BÌNH QUA CÁC KIẾP`

Requirements:
- value comes from authoritative scoring state;
- use a compact round-by-round score trend;
- hover/tap may show exact snapshot detail;
- never label raw cash or full married Household assets as the Human's score;
- married score snapshots respect the authoritative Character share.

## 3. `THẾ GIỚI`

### Timeline mode

- Chronological Round/Year world timeline.
- Entries may use compact categories only when authoritative data supports them, including:
  - `SỰ KIỆN`;
  - `DÂN SỐ`;
  - `CHÍNH PHỦ`;
  - `GIA ĐÌNH / XÃ HỘI`;
  - `KHỦNG HOẢNG`.
- Do not expose raw server-log presentation as the default player UX.
- Do not parse chronology strings to invent structure/causality.

### Indicator mode

Inside `THẾ GIỚI`, provide:
`DÒNG THỜI GIAN / CHỈ SỐ`

`CHỈ SỐ` uses simple historical charts sourced from authoritative snapshots, such as:
- Population;
- Inflation;
- Public Debt;
- Total resident assets;
- Pension payout ratio;
- Renewable/Nonrenewable resources.

Do not show all charts simultaneously by default.

## 4. Filters and navigation

World timeline uses compact filter chips such as:
`TẤT CẢ / SỰ KIỆN / DÂN SỐ / CHÍNH PHỦ / GIA ĐÌNH`

Structured entries may expose `XEM TRÊN BẢN ĐỒ` / profile focus **only** when authoritative identity/location linkage exists.

Internal Character/Household IDs never appear as player-facing labels.

## 5. World Event integration

The approved World Event action `XEM TRONG NIÊN SỬ`:
- opens Niên sử;
- switches directly to `THẾ GIỚI`;
- focuses/highlights the corresponding authoritative Round/Event entry.

If direct matching information is unavailable in the current contract, Chat 06 must request a narrow Chat 03 contract addition instead of fuzzy client matching.

## 6. Mobile

- Use a full-height sheet.
- `HÀNH TRÌNH / THẾ GIỚI` tabs remain sticky.
- Timelines scroll vertically.
- Indicator charts use a one-at-a-time selector rather than squeezing multiple charts side-by-side.
- Same authoritative information semantics as desktop.

## 7. Visual direction

- Pixel-fantasy ledger/parchment styling consistent with the approved world shell.
- Reading hierarchy must remain clear and restrained; avoid heavy ornament around every timeline row.
- Dedicated pixel icons may support event types; no emoji as production primary icons.

## 8. Data guardrails

- `HÀNH TRÌNH` comes from authoritative PlayerHistory / score snapshots.
- `THẾ GIỚI` comes from authoritative history snapshots / chronology / structured state.
- Client does not invent history categories, identities, causes, scoring or map links.
- Missing structured data is a contract dependency, not a reason to derive truth client-side.

## Approval record

User explicitly approved N1–N9 = option A on 2026-09-07.
