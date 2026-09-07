handoff_id: H-20260907-061-06-CHRONICLE-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Implement user-approved Niên sử / Chronicle V1

## Source

Implement exactly from:
- `docs/UI_CHRONICLE_APPROVED_V1.md`
- `docs/UI_CHRONICLE_SOURCE_VALIDATION_V1.md`
- `docs/UI_HUD_APPROVED_V1.md`
- current authoritative server history/scoring contracts.

## Required implementation

- Large centered parchment/ledger desktop surface over persistent World Map.
- Top-level tabs exactly `HÀNH TRÌNH / THẾ GIỚI`.
- `HÀNH TRÌNH` grouped by lives (`KIẾP #...`) with Round/Year timeline and meaningful personal milestones.
- Show authoritative `ĐIỂM TÀI SẢN TRUNG BÌNH QUA CÁC KIẾP` plus compact score trend; never substitute cash/full married Household assets for score.
- `THẾ GIỚI` provides Round/Year timeline plus `DÒNG THỜI GIAN / CHỈ SỐ` switch.
- Use simple authoritative history charts and approved category filters.
- World Event `XEM TRONG NIÊN SỬ` opens/highlights the corresponding authoritative world entry when contract linkage supports it.
- Mobile uses full-height sheet, sticky tabs and one-at-a-time chart selector.

## Hard constraints

- Niên sử never pauses/resets/extends gameplay timers.
- No raw internal Character/Household IDs in player UI.
- Do not parse chronology strings to invent categories, identity, causality or map links.
- Do not calculate AverageLifeAssetScore client-side if authoritative value/snapshots already exist.
- If structured deep-link/world-entry/scoring data is insufficient, create a narrow handoff to Chat 03; do not fabricate local truth.
- No gameplay/protocol/scoring/history semantics changes.

## Verification expected

- Desktop + mobile layout fidelity.
- Correct multi-life grouping.
- Correct score semantics including married Human share.
- World Event → Chronicle focus path where supported.
- Timer remains unaffected while Chronicle is open.
- No raw IDs / invented structured history.

## Handoff back

Update `reports/06_CURRENT.md` after implementation and create any required narrow Chat 03 dependency handoff.
