# B — Ngọc sáng: external design review, 2026-09-30

Status: DRAFT / NOT USER-APPROVED / NOT FIGMA AUTHORITY
Owner: Chat 05. Scope: H094 anchors; no client/server changes.

## Delivered evidence
IC-Ngoc-Sang-Design-Draft-2026-09-30.zip — 38 files, 20,392,858 bytes.
SHA-256: 5365f73b89710dc0557cbbff34b28d12ab5830e83a6fa1a9ac10baa311e99c11
Persistent artifact: libfile_bd60d99d53f88191ae55c22244d41950 / file_00000000db7c8211b99c31b0de08a532.
GitHub remains project state authority; archive is review evidence, not approved implementation source.

The archive contains:
- preview.html with local assets, opens offline after extraction;
- Landing, Lobby, Room/HUD and Logo/Icon views, desktop/mobile composition;
- two editable SVG logo candidates: contract + sprout (recommended) and lifecycle/hourglass seal;
- fourteen editable SVG icon candidates using a shared 24 px grid;
- native CSS/token draft and local-only fixture state controls;
- nine review screenshots and layout/contrast check outputs;
- original background/portrait images and two newly generated RGBA sprite studies (residence, tree);
- README, asset provenance and SHA-256 manifest.

No production app was implemented. Action buttons explain intended behavior; they do not connect to a room or simulate gameplay. Local state switches are solely design review controls. No timers count down; no founder, queue or eligibility calculation occurs.

## Verified on the local design preview
- Chromium render at 1440, 1024, 768, 390 and 320 px; no JavaScript errors, horizontal document overflow or horizontally clipped button/minimap targets in tested states.
- Actual desktop/mobile screenshots inspected. Found and fixed absent CSS background images, and a clipped minimap at 768 px. Compact composition now starts at 900 px.
- Landing has five separate menu buttons, contract seal above wordmark, three foreground characters and reconnect/no-reclaim wording. Removed whole-left-column tint to respect approved composition.
- Lobby uses Human-only fixture roster with local/host markers and problem connection text; non-host has a waiting card instead of a disabled Start action.
- HUD uses distinct current pointer/local home badge, recognizable gear, Chronicle icon and simplified minimap illustration.
- Local/current signals switch independently in preview; secondary mobile stats expand.
- Solid color text/surface contrast: ink/parchment 9.81:1, parchment/jade 9.58:1, error text/pale background 7.92:1. This does not measure every image-overlay region or establish accessibility compliance.
- Both new sprite files have RGBA alpha ranging 0–255. Source pixels not post-edited.
- Archive integrity checked.

## Limitations / corrections still needed
- This is not an actual Figma screenshot or user anchor approval. Existing master nodes are unchanged.
- Logo choice awaits user input. Georgia/Arial are preview fallbacks; final typography not locked.
- Icons are vector drafts, not proven final pixel rasterization. Native pixel scale across backgrounds, sprites and portraits remains ART-BLOCKED for production.
- Lobby uses repeated portraits to test twelve items; Lobby-specific identity set remains missing.
- QR is an explicitly labeled placeholder, not a functioning invitation code.
- Minimap/world marker positions are schematic; no authoritative geometry or identity mapping is claimed.
- Background crop on mobile is an art composition study, not runtime camera behavior.
- Screen-reader/200% text zoom/full keyboard flow/real-device/performance checks remain unverified.
- No complete Founder reveal, reusable Figma component library or versioned approved handoff bundle yet.
- Full modular art still needs terrain/roads/water, Government/plaza, approved architectural variants, Human/NPC identity treatment and ambience assets. Two sprite studies do not complete that set.

## Next gate
User can choose the logo direction and comment on preview composition. This does not bypass H094's actual editable Figma anchor approval gate.
When Figma access/quota permits: port the selected draft treatments into the same master, visually verify actual frames, obtain approval, then export Figma-derived bundle and hand off Chat 06.

The prior statement that all outside-Figma work was exhausted was too broad. This pass completes the explicitly authorized external preview/icon/sprite-study batch, while final production art and anchor approval remain open.
