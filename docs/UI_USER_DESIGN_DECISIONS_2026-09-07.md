# UI USER DESIGN DECISIONS — 2026-09-07

Status: CONFIRMED PREFERENCES / NOT YET SCREEN-APPROVED

These decisions are direct user confirmations for the new design-review phase. They supersede older art-direction assumptions where they conflict, but they do not yet constitute approval of a specific Landing/Lobby/Room/HUD layout.

## Confirmed

1. **Art style:** Pixel art with **Japanese anime/chibi** character treatment.
2. **Human vs NPC:** They should be visually distinguishable in avatar/map presentation.
3. **Overall tone:** Hybrid direction — world/map bright and lively; UI chrome/panels may use darker wood/parchment/fantasy treatment.
4. **Cards/frames:** Pixel-frame treatment, but avoid excessively rigid/blocky geometry.
5. **Market visibility:** Market is not permanently open; it appears when the player activates `THỊ TRƯỜNG`.
6. **Voluntary action placement:** Chat 05 may choose placement based on compactness/readability; keep it visually tidy.
7. **Niên sử:** Two-tab direction: `HÀNH TRÌNH` + `THẾ GIỚI`, using timeline/charts where appropriate.
8. **HUD:** Adaptive HUD — compact by default; important phase/event information may expand/emphasize temporarily.
9. **Audio:** Keep music + SFX with separate controls in Settings; no requirement for permanent HUD audio buttons.
10. **Logo:** Design a real logo/symbol as part of Landing design; do not treat the current `IC` sigil as final.
11. **World evolution over time:** Keep one coherent fantasy world/art language across all rounds, but allow **subtle visual evolution across years/generations** such as settlement density, vegetation, architecture details and roads. Do not turn the game into visibly separate historical eras.
12. **Logo concept:** Prefer a **fantasy contract seal / sigil combined with lifecycle imagery**, not a literal portrait-based logo.
13. **Landing key art:** Use a **hybrid composition** — landscape/world visual consistent with the playable map, plus chibi/anime characters in the foreground.
14. **Human/NPC distinction intensity:** Use **both character styling and UI marker treatment** to distinguish Human from NPC, while keeping both inside the same world/art style.
15. **Lobby roster:** Prefer a **hybrid compact portrait grid**; portraits/names remain readable, with more detail revealed on hover/click rather than large full cards for everyone.
16. **Founder Draw presentation:** Use a short dramatic reveal/contract-draw animation, but keep it **non-blocking**; authoritative server result still determines the outcome.
17. **Initial game camera:** Start by showing the **whole settlement at a useful overview scale**; `Home` and `Government` remain quick navigation targets.
18. **Adaptive HUD behavior:** Use a **hybrid emphasis model** — phase/timer state can change/emphasize inside the HUD, while important World Events appear as a separate compact temporary banner.
19. **Landing credit:** Keep `Một trò chơi của QuacQuaz`, but visually subordinate it so it does not compete with the logo/menu.
20. **Landing title treatment:** Keep the main title `INTERGENERATIONAL CONTRACT`; **do not show a subtitle** below it.
21. **Typography roles:** Use a fantasy/display face for major titles/logo treatment, a highly readable body face for UI copy, and a pixel/mono/data face for HUD numbers. Avoid pixel/mono for long prose.
22. **UI chrome:** Keep parchment / wood / dark-fantasy pixel-frame language for panels/chrome while preserving a brighter world/map.
23. **Icons:** No emoji as primary production icons; use dedicated pixel-art icons.
24. **Local marker:** Local player Residence/map uses a green marker with shape/icon support, not color-only meaning.
25. **Government turn treatment:** Government building gets a subtle red outline/glow when active; never recolor the entire building red.
26. **Turn Track emphasis:** Current turn is strongest; local player uses green treatment; Government uses red treatment; combine color with icon/shape cues.
27. **Residence status:** Communicate Status primarily through architecture; no large `POOR/MIDDLE/NOBLE` labels directly on the map.
28. **World ambience:** Keep subtle clouds, birds, chimney smoke, water ripples and vegetation movement; motion remains slow and non-distracting.
29. **Fog ambience:** Edge fog may animate gently to imply a larger world beyond the visible settlement.
30. **World Event atmosphere:** Existing authoritative World Events may alter ambience lightly; art may not invent gameplay states/signals.
31. **Pixel rendering:** Use nearest-neighbor / integer-friendly scaling for core pixel art; avoid smoothing/blur.
32. **Motion timing:** Drawer/panel transitions are generally short (~150–250 ms). Founder reveal/round transition may be longer. Motion never pauses, extends or delays authoritative timers/gameplay.
33. **Responsive direction:** Desktop and mobile share the same art direction but use layout-appropriate patterns; mobile uses bottom/full-height sheets rather than a shrunken desktop layout.
34. **Mobile Turn Track:** Use a compact horizontal/rail treatment rather than the desktop vertical column while preserving order and focus behavior.

## Constraints still active

- User directly approves designs before they are locked.
- QA PASS or existing code does not equal design approval.
- Do not change gameplay, protocol, timers or authoritative logic.
- Do not hand off a redesign to Chat 06 before user approval.
- Current target cluster only: Landing → Lobby → Room → HUD.
