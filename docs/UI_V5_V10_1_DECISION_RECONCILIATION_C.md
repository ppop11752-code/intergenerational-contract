# UI V5–V10.1 DECISION RECONCILIATION — GROUP C

Status: USER-CONFIRMED
Scope: Landing / Lobby / Room / HUD visual language, motion and responsive behavior.

This document records direct user confirmation of historical prototype decisions. It supersedes conflicting V5–V10.1 assumptions for the current redesign phase. It does not yet approve any specific screen mockup/layout.

## Confirmed decisions

- **C1 — KEEP WITH REFINEMENT:** Keep credit `Một trò chơi của QuacQuaz` on Landing, but place it subtly in a low-priority area so it does not compete with the logo/menu.
- **C2 — MODIFY:** Keep the main title `INTERGENERATIONAL CONTRACT`; **remove the subtitle entirely**. Do not display `Khế ước giữa các thế hệ` as a Landing subtitle.
- **C3 — KEEP WITH REFINEMENT:** Use three typography roles: fantasy/display face for major titles/logo treatment, highly readable body face for prose/UI copy, and pixel/mono/data face for numbers/HUD. Do not use pixel/mono for long body text.
- **C4 — KEEP:** UI chrome may use parchment / wood / dark-fantasy pixel frames while the world/map remains brighter and more colorful.
- **C5 — KEEP:** Do not use emoji as primary production icons. Use real pixel-art icons for HUD/actions/navigation.
- **C6 — KEEP:** Local player gets a green map/Residence marker. The marker should also use shape/icon treatment so meaning is not color-only.
- **C7 — KEEP:** When Government is the active turn, the Government building gets a subtle red border/glow; do not recolor the whole building red.
- **C8 — KEEP:** Turn Track uses clear current-turn emphasis, local-player green treatment and Government red treatment, combined with shape/icon cues rather than color alone.
- **C9 — KEEP:** Residence Status is communicated primarily by architecture. Do not place large `POOR/MIDDLE/NOBLE` labels directly on the map.
- **C10 — KEEP WITH REFINEMENT:** Keep living-world ambience such as drifting clouds, birds, chimney smoke, water ripples and subtle vegetation motion. Motion must be slow/subtle and must not distract from gameplay.
- **C11 — KEEP:** Edge fog may animate subtly to suggest the world extends beyond the visible settlement.
- **C12 — KEEP:** Authoritative World Events may cause mild atmospheric visual changes only when the event/state already exists. Art must not invent new gameplay meaning.
- **C13 — KEEP:** Render core pixel art with nearest-neighbor / integer-friendly scaling. Avoid blur/smoothing on primary pixel assets.
- **C14 — KEEP:** Drawer/panel motion should generally be short (~150–250 ms). Founder reveal and round-transition motion may be longer. No visual animation may pause, extend or delay gameplay timers/authority.
- **C15 — KEEP:** Desktop and mobile keep the same art direction but use different layout adaptations. Desktop may use drawers/floating panels; mobile uses bottom sheets/full-height sheets. Do not merely shrink desktop UI.
- **C16 — KEEP:** Mobile Turn Track becomes a compact strip/rail rather than retaining the full desktop vertical column, while preserving turn order and click/tap-to-focus behavior.

## Current effect

The historical visual/motion/responsive decisions relevant to the current `Landing → Lobby → Room → HUD` cluster are now reconciled. The next step is direct design exploration and user approval, starting with Landing.
