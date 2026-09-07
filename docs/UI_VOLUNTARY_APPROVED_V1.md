# UI VOLUNTARY SHELL — APPROVED V1

Status: USER-APPROVED DESIGN
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Purpose

Authoritative UX shell for the Voluntary phase. This spec defines navigation/persistence/timer/disabled-state/end-turn/mobile behavior only. Market, Recovery, Support and Birth content layouts remain separate specs.

## Authoritative gameplay constraints

- One authoritative **60-second TOTAL** Voluntary timer shared across Market / Recovery / Support / Birth.
- Switching surfaces never resets, pauses or extends that timer.
- Residence / Government / Niên sử / marriage notices do not pause it.
- Only the four action groups above exist in Voluntary.
- End Turn requires no confirmation.
- Action eligibility and disabled reasons come from authoritative state/quotes; client does not infer gameplay eligibility.

## Desktop layout

- Use a compact **vertical action dock on the right edge**.
- Dock must remain below/clear of the approved upper-right minimap.
- Order should remain stable for spatial memory:
  1. `THỊ TRƯỜNG`
  2. `PHỤC HỒI`
  3. `CHU CẤP`
  4. `SINH CON`
  5. secondary `KẾT THÚC LƯỢT`
- Keep all four gameplay actions visible for the entire Voluntary phase.
- Opening one action surface does not hide the dock.
- Current action is visually highlighted.
- Market is not permanently open; it appears only after `THỊ TRƯỜNG` is activated.

## Timer

- Do **not** duplicate the 60s timer inside individual action panels.
- Approved HUD V1 is the only main timer display.
- Action navigation must never present itself as a fresh/new timer.

## Unavailable state

- Keep unavailable action buttons visible.
- Dim/lock them instead of hiding them.
- Hover/tap/focus reveals the authoritative reason.
- Never let the client invent eligibility or convert server rejection into a new rule.

## End Turn

- `KẾT THÚC LƯỢT` is a secondary action at the bottom of the dock.
- One click sends the authoritative End Turn action immediately.
- No second confirmation.
- It must be visually subordinate to the four gameplay actions while remaining easy to find.

## Action surfaces

- Detailed Market / Recovery / Support / Birth surfaces open over the persistent World Map.
- They may use approved floating-panel/sheet patterns.
- Switching among them is navigation inside one Voluntary phase.
- Their final layouts/content must follow their own approved specs.

## Mobile

- Use a compact **bottom action rail** with the four gameplay actions plus secondary End Turn.
- Opening an action uses bottom/full-height sheet presentation according to content density.
- Keep the rail accessible where screen space permits; do not force a repeated full-screen action-menu step.
- Same authoritative timer and eligibility semantics as desktop.

## Visual direction

- Pixel-fantasy plaques/icons consistent with approved Room/HUD chrome.
- Dedicated pixel-art icons; no emoji primary controls.
- Bright World Map remains visible/dominant behind surfaces.
- Short UI transitions only; no animation may affect server timing.

## Explicit non-goals

Do not add:
- old generic Action Menu;
- Status inside Voluntary;
- per-panel countdowns;
- timer reset when switching actions;
- hidden unavailable actions;
- End Turn confirmation modal;
- client-side eligibility calculations.

## Implementation dependency

Chat 06 may implement this shared shell independently, but must not invent the final content arrangement of Market / Recovery / Support / Birth before those specs are user-approved.
