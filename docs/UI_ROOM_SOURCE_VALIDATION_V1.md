# UI ROOM / WORLD SHELL — SOURCE VALIDATION V1

Status: CLOSED — USER VERIFIED
Date: 2026-09-07
Owner: 05 — UI/UX & ART

This document applies `docs/UI_DESIGN_APPROVAL_WORKFLOW_V2.md` before concrete Room / World shell design alternatives are produced.

## Scope

Room = the in-game World Map / game shell entered directly after Lobby/Founder reveal. HUD is a neighboring surface but its detailed composition remains a separate approval step after the Room shell direction is clear.

## Source findings

### CURRENT_USER_CONFIRMED

- Lobby/Founder reveal enters World Map directly; there is no extra standalone pre-game Room screen.
- Initial camera shows the whole settlement at a useful overview scale.
- Turn Track is a narrow left-side vertical rail on desktop, roughly 5–6 upcoming entries, top-to-bottom.
- Clicking a Turn Track Character focuses/pans camera to that Character's Residence; child maps to parents' Residence; Government maps to Government.
- Turn Track navigation only moves/focuses camera; it does not auto-open another panel.
- Government is the central settlement landmark.
- Market has no dedicated map building.
- Settlement expands outward with population; map reads as mainland/continued world with fog rather than a fixed island/border enclosure.
- Residences are distributed naturally; no Poor/Middle/Noble district zoning; adult children should appear reasonably near parents when placement permits.
- Residence architecture communicates Status; wealth only changes scale subtly around 0.90–1.15; family size does not enlarge the house asset.
- Free click-drag pan + zoom remains supported.
- No forced camera tracking for every event; only light focus where useful.
- Government / Residence / Niên sử / feature surfaces appear over a persistent map rather than replacing/shrinking it.
- Government opens by clicking the Government building on the World Map.
- Quick navigation for Government / Home / Zoom In / Zoom Out remains, rendered as compact icon-led controls.
- Human and NPC should be visually distinguishable in avatar/map presentation through both styling and UI marker treatment, while staying in the same art world.
- Local Residence/map uses a green marker with shape/icon support.
- Government turn gets a subtle red outline/glow, not a full-building recolor.
- World/map is bright and lively with darker fantasy chrome/panels.
- World subtly evolves over years/generations without changing into separate historical eras.
- Subtle ambience may include clouds, birds, chimney smoke, water ripples and vegetation motion.
- Edge fog may animate gently.
- Authoritative World Events may alter ambience lightly; art may not invent gameplay state.
- Core pixel art uses nearest-neighbor / integer-friendly scaling.
- Mobile uses a compact horizontal Turn Track and sheet-based surfaces rather than shrinking desktop layout.

### USER-VERIFIED SOURCE VALIDATION — 2026-09-07

The user resolved the remaining Room / World shell ambiguities:

- **R1 — Perspective:** use **3/4 top-down**. The camera still reads as a map view, but buildings may show façades/height rather than strict orthographic top-down.
- **R2 — Ambient inhabitants:** **do not show generic chibi inhabitants walking/idling around the map**. World life comes primarily from environmental ambience and authoritative/focused character presentation.
- **R3 — Human/NPC distinction:** keep Human/NPC distinction primarily in **focus/hover Character/Residence presentation**, not as always-on marker clutter across the whole map.
- **R4 — Residence labels:** use **selective persistence**. Local/current/focused Residence may keep a light persistent label/marker; other Residences show details on hover/focus.
- **R5 — Residence click:** clicking a Residence **opens the Residence/Family drawer directly**.
- **R6 — Government prominence:** **do not lock a fixed Government-to-house ratio**. Government should feel dominant through architecture, central placement, plaza/grounds and composition rather than simple overscaling.
- **R7 — Quick-nav:** place Government / Home / Zoom controls at the **bottom-right** as a compact icon group; keep them available but reduce opacity when idle.
- **R8 — Minimap:** provide an **optional/collapsible minimap**, default compact/closed rather than permanently occupying map space.
- **R9 — Fog/camera:** allow a **short pan into fogged outer space with elastic return** to the useful world area rather than a hard stop or unrestricted drift.

## Historical statements now resolved

- Strict top-down is superseded by user-approved 3/4 top-down.
- Government `2–2.5× house` is not authoritative; architectural/plaza prominence is preferred.
- Always-on Human/NPC markers are rejected in favor of focus/hover distinction.
- Residence information is selective, not always globally visible.
- Residence click opens the Residence/Family drawer directly.
- Quick-nav is bottom-right with reduced idle opacity.
- Minimap is optional/collapsible.
- Generic ambient chibi inhabitants are not part of the Room map presentation.
- Fog permits limited overscroll with elastic return.

## Gate result

Source Validation Gate is CLOSED. Chat 05 may now audit the current implementation and present concrete Room / World shell design alternatives. No design may be handed to Chat 06 until the user selects and approves a concrete Room composition.
