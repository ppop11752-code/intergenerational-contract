# UI ROOM / WORLD SHELL — SOURCE VALIDATION V1

Status: USER VERIFICATION REQUIRED
Date: 2026-09-07
Owner: 05 — UI/UX & ART

This document applies `docs/UI_DESIGN_APPROVAL_WORKFLOW_V2.md` before concrete Room / World shell design alternatives are produced.

## Scope

Room = the in-game World Map / game shell entered directly after Lobby/Founder reveal. HUD is a neighboring surface but its detailed composition remains a separate approval step after the Room shell direction is clear.

## Source findings

### CURRENT_USER_CONFIRMED

Do not ask again unless a genuine contradiction appears:

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
- Quick navigation for Government / Home / Zoom In / Zoom Out remains, but should use compact icon-led controls rather than prototype-style text buttons.
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

### HISTORICAL / MIGRATION-NORMALIZED BUT NOT DIRECTLY VERIFIED

Migration Pack `04_UI_UX_SPEC.md` contains several specific statements for which direct-user provenance was not independently recovered:

- `Asset-driven top-down pixel-art map`.
- Government center landmark approximately `2–2.5× house`.
- Residence has no Human/NPC marker.
- Residence hover shows name/member count.
- Clicking Residence opens a right Residence/Family drawer.
- Clicking Character opens Character Profile with `← GIA ĐÌNH`.
- Quick-navigation semantic controls `[Government] [Home] [+] [-]` but no direct-user-verified exact placement/visibility policy.
- Outer fog/darkened terrain, but no direct-user-verified camera-boundary semantics.
- No explicit direct-user evidence for a minimap policy.
- No explicit direct-user evidence for whether ambient chibi inhabitants physically move through the map.

These details may be useful references but must not be silently inherited.

### PROTOTYPE-ONLY / REFERENCE

- V6 introduced drag/pan, zoom indication, map focus pulse and clickable turn avatars.
- V9 consolidated the persistent map as the visual base with top HUD, left Turn Track and floating panels.
- V10/V10.1 preserved/corrected the persistent world-shell information architecture.
- All V5–V10.1 prototypes remain frozen/non-authoritative and do not prove user approval of exact map composition or perspective.

## Resolved without additional user question

The following historical details are already superseded/resolved by newer user decisions:

- `No Human/NPC marker` cannot be treated as authoritative because the current user explicitly requires Human/NPC distinction in map presentation.
- Text quick-nav buttons are superseded by current icon-led quick navigation.
- Government click behavior is already directly confirmed by the user.
- Settlement/fog/open-mainland structure, Residence placement/status architecture, camera overview, pan/zoom and persistent map are already directly confirmed.

## User verification questions still open

1. **Map perspective:** strict top-down, 3/4 top-down with visible building façades, or isometric-like view?
2. **Ambient inhabitants:** should generic chibi inhabitants visibly walk/idle in the settlement, or should movement be limited mostly to environmental ambience?
3. **Human/NPC distinction on the map:** should the distinction live on Residence markers/nameplates, focused Character UI, or both?
4. **Residence labels:** always visible, hover-only, or selectively persistent for local/current/focused Residence while others appear on hover?
5. **Residence click behavior:** direct-open Residence/Family drawer, focus-first then second action, or small preview card before full drawer?
6. **Government visual scale:** keep normalized 2–2.5× house size, use a more moderate fixed scale, or make prominence come from architecture/plaza/placement rather than a fixed ratio?
7. **Quick-nav placement/visibility:** where should Government/Home/Zoom controls live, and should they remain always visible or partially collapse when idle?
8. **Minimap policy:** no minimap, optional/collapsible minimap, or always-visible minimap?
9. **Fog/camera boundary:** stop camera before dense fog, allow a short pan into fog with elastic return, or allow free panning into fogged space?

## Gate

Do not propose concrete Room / World shell compositions until these materially relevant source ambiguities are resolved by the user.
