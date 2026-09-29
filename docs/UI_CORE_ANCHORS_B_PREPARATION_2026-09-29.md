# H094 — Core anchors: B / Ngọc sáng — preparation pack

Status: DRAFT — NOT SCREEN-APPROVED — NOT AN IMPLEMENTATION HANDOFF
Owner: Chat 05
Date: 2026-09-29

## Authority and limits

Use UI_LANDING_APPROVED_V1, UI_LOBBY_APPROVED_V1, UI_ROOM_APPROVED_V1, UI_HUD_APPROVED_V1 and UI_USER_DESIGN_DECISIONS_2026-09-07 for semantics/composition. Latest direction choice B supplies jade/teal palette. UI_VISUAL_REDESIGN_WORKFLOW_V2 and H094 require approval of actual editable Figma anchors before Chat 06 implementation.

Historical statements that Landing/Lobby may already be implemented do not waive the newer H094 approval gate. No approved spec is overwritten by this draft. Typography sizes, positions and state treatments below are proposed construction targets, not extracted Figma measurements.

Master: qfSWFHfHAsuYut2fl2sZb6. Keep existing page 0:1 and HUD frames 5:2, 10:2, 10:43. IDs for other anchors are UNASSIGNED; do not invent them.

## Anchor construction targets

### Landing — 1440×810 desktop

Left column occupies about 37% of viewport; content inset 48 px, usable width about 440 px. Seal above two-line wordmark, both left aligned. Seal is secondary; wordmark remains primary. No subtitle or full-column background panel.

Menu buttons: identical visual family and width; target 48 px height, 10 px gap. Exact labels: TẠO PHÒNG; THAM GIA PHÒNG; HƯỚNG DẪN; LUẬT CHƠI; CÀI ĐẶT. Menu retains five separate items. Reconnect, when present, fits above menu and uses readable wrapping; reduce decorative art/logo space before squeezing controls.

Reconnect copy:
- KẾT NỐI LẠI PHÒNG ABC123
- NHÂN VẬT CŨ SẼ TIẾP TỤC DO NPC ĐIỀU KHIỂN · BẠN SẼ VÀO CUỐI HÀNG CHỜ

ABC123 is fixture text only. Never imply reclaiming old Character.
Right composition: world primary, three supporting chibi characters. Credit bottom-right: Một trò chơi của QuacQuaz.

### Landing — 390×844 mobile

16 px horizontal inset. Title, cropped art hero, optional reconnect, five stacked buttons and credit in normal document flow. For long reconnect copy or enlarged text allow vertical page scroll; do not hide any menu item to force a one-screen fit. Hero crop must retain Government and all three characters; if impossible, prepare dedicated crop/composition, not stretch the desktop image.

States: default; reconnect available; keyboard focus; pressed. Overlays reuse current behavior; this pack does not redesign tutorial/rules/settings content.

### Lobby — 1440×810 desktop

32 px outer inset. Invitation zone about 144 px high: PIN prominent left, compact expandable QR right; explicit SAO CHÉP MÃ and SAO CHÉP LIÊN KẾT. Central roster gets remaining height above an approximately 104 px bottom strip. Only roster scrolls.

Start at six grid columns; adapt within approved 5–7 desktop intent. Portrait above nameplate, local BẠN, host seal, small connection indicator. Allow two lines for long names then full name on focus/tap. Human accent restricted to border/nameplate. Do not populate decorative NPC roster items.

Bottom: authoritative society summary left, host BẮT ĐẦU or non-host waiting card right. Keep same region for both. No Ready control, NPC slider or locally computed founder selection.

### Lobby — 390×844 mobile

16 px inset. Compact stacked invitation block; readable PIN and two copy actions, expandable QR. Three portrait columns is the initial proposal at 390 px; use two where names/touch targets need space. Roster scrolls independently between header and compact bottom start/status block. Test reduced height and keyboard/text enlargement before locking fixed zones.

States: host; non-host; one participant connection issue; expanded QR; large roster; authoritative Founder result. The under/equal/over-10 society summaries are display fixtures; data must come from existing authoritative contract, never UI arithmetic.

Founder reveal: consume result, briefly emphasize selected portraits almost simultaneously, large seal shrinks to marker, display authoritative queue position for non-founders and XÃ HỘI ĐÃ ĐƯỢC THÀNH LẬP. No random draw or client timing gate. Reduced motion shows final result directly.

### Room and HUD

Room shell and HUD share world/rail/minimap/utility components. Do not make a second style or duplicate map controls. Room anchor shows whole settlement and shell; HUD anchor adds approved phase/macro composition. They are separate review states, not evidence that all gameplay panels are designed.

Apply docs/UI_HUD_B_R04_CORRECTION_DRAFT_2026-09-29.md. Keep existing desktop/mobile target frames. Initial camera and markers illustrated in design do not establish runtime coordinates or server state.

## Shared component ownership

| Family | Owner in design system | Required states/variants |
|---|---|---|
| Menu/button | One common button family | default, hover, focus, pressed, disabled with authoritative reason where applicable |
| Icon button | Utility family | settings, chronicle, zoom; labeled accessibility equivalent |
| Plaque | Common panel chrome | light parchment information, dark jade phase emphasis |
| Portrait | Common portrait primitive | Lobby identity separate from gameplay Character; host/local/current/connection markers composed independently |
| Minimap | World shell | overview, viewport, Government/Home marker focus |
| Status message | Feedback family | waiting, warning, reconnect; color plus text/icon |
| Sheet | Mobile surface primitive | closed/open/focused; return focus on close |
| Seal | Brand/role assets | brand, host and Founder remain visually distinct |
| Phase/banner | Gameplay status | local/waiting; temporary event only when authoritative |

Use semantic tokens rather than per-screen overrides. Candidate spacing scale 4/8/12/16/24/32/48 px; body 16 px, secondary 14 px, data 16 px, major title responsive. Noto Sans is the existing readable UI direction; monospace only for short data. Final display font selection and actual font availability remain unverified. Reuse existing Figma palette tokens after targeted read; do not declare new hex values canonical here.

## Art inventory and provenance

| Asset | Current evidence | Required before final handoff |
|---|---|---|
| World concept | Imported source 12:4; desktop rendering reviewed | Modular native pixel assets, consistent scale/rendering and gameplay-compatible assembly |
| Five portrait strip | Imported source 12:3; desktop crops reviewed | Human/NPC visual distinction, state coverage and final approval |
| Landing key art B draft | Generated and visually inspected in this turn | Actual text/menu composition, mobile crop, user approval |
| Lobby hall B draft | Generated and visually inspected in this turn | Roster/readability composition, mobile crop, user approval |
| Brand seal/wordmark | Direction approved; final asset missing | Editable contract/lifecycle symbol above wordmark; no IC placeholder signoff |
| Utility/role icons | Partial native Figma vectors; correction draft ready | Gear/book/current/local/host/Founder states unified |
| Minimap | Existing full-image overview too busy | Simplified roads/land/buildings with clear viewport/markers |

New images are concept previews automatically retained with this conversation, not committed binary assets or imported Figma fills. GitHub records provenance below; final selected binaries must be included in the approved handoff bundle. No request for manual user import.

Landing preview filename: exec-637a5e4f-00ba-46d0-9c32-e5ac50370b1b.png
SHA-256: ac239e24f1621d89282ceb8a3d4e7ded7a1e0760eacd0adeee097d036d225b08
Review: exactly three foreground characters; village/Government dominates; no baked-in UI/text. Left foliage has residual texture: check real menu contrast in composition. Characters are not strongly differentiated as Human/NPC yet; use approved styling/marker treatment in final system. Native pixel-grid fidelity remains unverified.

Lobby preview filename: exec-5e769e5d-90fa-46fc-9223-1537ca1af82c.png
SHA-256: c501c4bb4988fa581a0c0426fe6fa191f81d0d4765483158a573a532af0029ee
Review: recognizable timber/stone hall, jade accents, no people or baked-in controls, calmer center suitable for roster. Lighting and side ornament still need composition check; generated small ornaments are decorative, not approved project branding. Native pixel-grid fidelity remains unverified.

Generator: built-in image_gen. Reference: original B world image exec-91121b2a-c995-4ea0-946c-b753ead6e816.png, used for palette/architectural continuity. No claim of external third-party asset licensing or production readiness.

### Generation prompts

Landing:
Use case: stylized-concept. Asset type: draft landing key art for INTERGENERATIONAL CONTRACT, no UI. Use the attached world as a visual reference for jade foliage, teal roofs, stone Government hall and circular plaza, warm fantasy settlement. Create a wide 16:9 landscape scene seen from a nearby hill, bright sky, distant hills, village dominates. Leftmost 38 percent is quiet dark-jade foliage with low contrast and plenty of negative space for a separately editable menu, but NO drawn panel. Village and Government landmark occupy right 62 percent. Exactly THREE small Japanese anime/chibi pixel characters in lower-right foreground, a young adult, middle-aged adult and elder, friendly intergenerational group, together under 20 percent image height; do not obscure village focal point. Crisp intentional pixel-art clusters with a consistent visible pixel grid, nearest-neighbor look, no smooth painterly rendering, no blur. Bright jade green, cream stone, restrained brass, teal roofs. No text, logo, numbers, buttons, icons, border, watermark or additional people. This is concept art for design review, not a finished game screen.

Lobby:
Use case: stylized-concept. Asset type: draft lobby environment background for INTERGENERATIONAL CONTRACT, no UI. Reference image supplies palette and architectural world only; create a NEW INTERIOR, a welcoming fantasy gathering hall, wide 16:9. Warm timber beams, cream stone, jade-green hanging cloth, brass details, soft daylight through side windows with glimpses of teal village roofs. Symmetric welcoming composition with furnishings and detail kept to outer sides, upper rafters and lower corners. Large central 65 percent wide region is a calm low-contrast open hall wall/floor backdrop for a separately editable portrait roster; top invitation area and bottom action area uncluttered. Clearly a guild/community hall, not a throne room or tavern. Crisp intentional pixel art with consistent visible pixel clusters and nearest-neighbor look; no painterly soft render, no blur, no neon. No people, portraits, frames, UI, cards, QR, text, letters, numbers, crest, logo, watermark. Keep background subordinate to future human roster.

## Visual review coverage before approval

- Desktop 1440×810: Landing normal/reconnect; Lobby host/non-host; Room overview; HUD local/waiting.
- Mobile 390×844: same meaningful compositions plus HUD secondary layer open.
- Stress checks: 320 px width, long Vietnamese name, reconnect paragraph, roster overflow, enlarged text, reduced motion.
- QR uses real encoded join data when implemented; never treat decorative QR in a mockup as functional.
- Inspect actual screenshots for text, crop, hierarchy, state cues and source fidelity. Geometry checks alone are insufficient.
- Keep approval record, client implementation, runtime/QA and production fidelity separate.

## Resume point and remaining gates

Independent source reconciliation, bounded correction specification, anchor layout/state inventory, asset briefs and two new concept previews are prepared.

STOP at actual editable Figma construction/verification: observed Starter MCP limit remains unresolved and browser fallback failed. No automatic retries or alternative-account/master workaround. After access changes: targeted read → components and anchor edits → actual screenshots → user approval → Figma-derived versioned bundle → Chat 06.

Further gameplay screens remain out of scope until anchor approval. Final logo, modular world art and pixel-grid lock require review within the anchor composition; do not generate an unbounded asset catalog while that gate is blocked.
