# UI VOLUNTARY SHELL — SOURCE VALIDATION V1

Status: CLOSED — USER VERIFIED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

The shared Voluntary phase shell that gives access to exactly four action groups:
- `THỊ TRƯỜNG` / Market;
- `PHỤC HỒI` / Recovery;
- `CHU CẤP` / Support;
- `SINH CON` / Birth.

Detailed design of each action surface is handled after this shell gate closes.

## CURRENT / AUTHORITATIVE BEHAVIOR

- Voluntary max duration = **60 seconds total**, authoritative server deadline.
- The 60 seconds is shared across Market / Recovery / Support / Birth.
- Switching between action surfaces never resets, pauses or extends the timer.
- Residence / Government / Niên sử / marriage notifications do not pause the Voluntary timer.
- Server accepts actions only up to the authoritative deadline.
- End Turn does not require confirmation.
- Only these four action groups exist; there is no old generic Action Menu and Status is not inside Voluntary.
- Each spouse has their own Character turn and can decide their own investment/recovery/support actions subject to authoritative shared-cash/quota constraints.
- Market appears only when the player activates `THỊ TRƯỜNG`.
- Approved HUD V1 owns the authoritative phase/timer display.

## USER-VERIFIED SOURCE VALIDATION — 2026-09-07

The user directly approved:

- **V1 A — Desktop launcher:** compact vertical four-action dock on the **right edge**, below/clear of the upper-right minimap.
- **V2 A — Persistence:** all four action buttons remain visible throughout Voluntary; current action is highlighted while its surface is open.
- **V3 A — Timer:** use only the approved HUD phase/timer. Do not duplicate a large or independent timer inside Voluntary panels.
- **V4 A — Unavailable actions:** keep them visible but dimmed/locked; hover/tap reveals the authoritative reason.
- **V5 A — End Turn:** persistent secondary `KẾT THÚC LƯỢT` at the bottom of the action dock; one click ends the turn with no confirmation.
- **V6 A — Mobile:** compact bottom action rail with four actions + secondary End Turn; action surfaces open as bottom/full-height sheets while the rail remains accessible where layout permits.

## Gate result

Source Validation Gate is CLOSED. The shared Voluntary shell is approved for implementation. Detailed Market / Recovery / Support / Birth surfaces still require their own direct approval and must not be invented by Chat 06.
