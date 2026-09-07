handoff_id: H-20260907-048-06-STATUS-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Implement user-approved Status Purchase V1

## Context

User has directly approved the Status Purchase production UX after Source Validation Gate closure.

## Authoritative design source

- `docs/UI_STATUS_APPROVED_V1.md`
- `docs/UI_STATUS_SOURCE_VALIDATION_V1.md`
- `docs/UI_HUD_APPROVED_V1.md`
- `docs/UI_ROOM_APPROVED_V1.md`
- `docs/RULE_LEDGER.md`

## Required implementation

Implement Status Purchase exactly to approved V1 without changing gameplay semantics:

- large centered three-card chooser over persistent World Map;
- three visible tier cards with authoritative fee, affordability, access/unlocks and `HIỆU LỰC VÒNG SAU`;
- married representative sees `CHỌN CHO HỘ GIA ĐÌNH` and authoritative household fee directly;
- **do not duplicate the 15s countdown inside the Status panel**; use the approved HUD phase/timer cluster only;
- when authoritative remaining time falls below 5 seconds, show the concise timeout-fallback explanation;
- Noble card may initially align with other tiers, but after Noble selection explicitly explain end-round competition/cap resolution and avoid guaranteed-Noble wording;
- successful selection shows brief `ĐÃ CHỌN — HIỆU LỰC VÒNG SAU` confirmation then follows authoritative transition into Voluntary;
- no second confirmation action;
- no Status phase for the later spouse;
- responsive/mobile treatment must preserve discoverability of all three tiers within the deadline.

## Hard constraints

- Never client-calculate Status fee, married fee, affordability, AverageCitizenAssets, timeout fallback, Noble slots/rank/priority or refund.
- Do not apply selected Status to current-round Market access, current turn order or Residence architecture.
- Noble selection is not final until authoritative end-round resolution.
- Use authoritative server quote/state/error data only.

## Verification expected

- Confirm all three cards render correct authoritative data.
- Verify timer exists only in HUD, not duplicated in chooser.
- Verify fallback warning appears only below 5s.
- Verify Noble selection communicates pending resolution.
- Verify married representative and later-spouse flows.
- Verify transition into Voluntary and mobile treatment.
- Report any missing display field to Chat 05/03 rather than inventing client semantics.
