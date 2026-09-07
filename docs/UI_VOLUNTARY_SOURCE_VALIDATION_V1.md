# UI VOLUNTARY SHELL — SOURCE VALIDATION V1

Status: USER VERIFICATION REQUIRED
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

## CURRENT / AUTHORITATIVE BEHAVIOR — DO NOT RE-ASK

- Voluntary max duration = **60 seconds total**, authoritative server deadline.
- The 60 seconds is shared across Market / Recovery / Support / Birth.
- Switching between action surfaces never resets, pauses or extends the timer.
- Residence / Government / Niên sử / marriage notifications do not pause the Voluntary timer.
- Server accepts actions only up to the authoritative deadline.
- End Turn does not require a confirmation.
- Only these four action groups exist; there is no old generic Action Menu and Status is not inside Voluntary.
- Each spouse has their own Character turn and can decide their own investment/recovery/support actions subject to authoritative shared-cash/quota constraints.
- Market is not permanently open; direct user decision says it appears when the player activates `THỊ TRƯỜNG`.
- Current direct user preference allows Chat 05 to choose Voluntary action placement for compactness/readability, but exact composition has not yet been approved.
- Approved HUD V1 already displays authoritative phase/timer; Voluntary shell must use that same 60s timer and must not create an independent/resetting timer.

## CURRENT CLIENT / HISTORICAL GAP

Current client has a basic button cluster for voluntary actions, but it is not integrated into the approved persistent World Map shell and does not consistently communicate locked/disabled reasons or shared-timer semantics.

Historical prototypes explored a persistent right-side Voluntary action cluster. That placement is reference only until directly approved.

## Cross-surface constraints

- The World Map remains persistent behind Voluntary surfaces.
- Opening an action surface is navigation, not a new phase and not a timer reset.
- Action availability/disabled states must come from authoritative player state/quotes; Chat 06 must not infer eligibility client-side.
- If a surface is unavailable, explain the authoritative reason while keeping the action discoverable where appropriate.
- Mobile uses layout-specific sheets rather than shrinking desktop UI.

## USER VERIFICATION QUESTIONS

### V1 — Desktop action launcher placement

A. A compact vertical four-action dock on the **right edge**, below/clear of the upper-right minimap.
B. A compact horizontal four-action dock centered near the bottom of the World Map.
C. Four small floating action plaques distributed near the phase/timer area.

Recommendation: **A** — it keeps the map center clear, matches the historical functional direction, and gives all four actions stable spatial memory without becoming a full dashboard sidebar.

### V2 — Launcher persistence during Voluntary

A. Keep all four action buttons visible throughout the whole Voluntary phase, including while one action surface is open; the active action is highlighted.
B. Hide the launcher once a surface opens and provide a `QUAY LẠI` action to return to the four choices.
C. Collapse the launcher to one current-action button while a surface is open.

Recommendation: **A** — switching is frequent and must not feel like leaving/re-entering a phase.

### V3 — 60-second timer presentation

A. Use the approved HUD phase/timer only; do not duplicate a large timer inside individual Voluntary panels.
B. Mirror a small timer inside every action surface in addition to HUD.
C. Put the main timer next to the action launcher and reduce HUD timer prominence.

Recommendation: **A** — one authoritative visual timer prevents the four surfaces from feeling like separate countdowns.

### V4 — Locked/unavailable actions

A. Keep unavailable action buttons visible but dimmed/locked; hover/tap shows the authoritative reason.
B. Hide unavailable actions entirely.
C. Leave them visually normal and show an error only after click.

Recommendation: **A** — preserves discoverability and explains why an action cannot currently be used.

### V5 — End Turn

A. A persistent secondary `KẾT THÚC LƯỢT` button sits at the bottom of the Voluntary action dock; one click ends the turn immediately with no confirmation.
B. Put `KẾT THÚC LƯỢT` inside each action surface instead of the launcher.
C. Hide End Turn in an overflow/menu.

Recommendation: **A** — the action is global to Voluntary and should remain easy to find without being visually equal to the four gameplay actions.

### V6 — Mobile Voluntary shell

A. A compact bottom action rail with four icons/actions + secondary End Turn; tapping an action opens its bottom/full-height sheet while the rail remains accessible where space permits.
B. A single `HÀNH ĐỘNG` button opens a full-screen list of the four actions every time.
C. Use four floating corner buttons around the map.

Recommendation: **A** — it preserves fast switching while respecting the approved mobile sheet model.

## Gate

Do not produce final Voluntary shell spec or detailed Market/Recovery/Support/Birth design alternatives until V1–V6 are directly approved.
