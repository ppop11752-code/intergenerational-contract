# UI ART ASSET CONTRACT V1

**Owner:** 05 — UI/UX & ART  
**Status:** LOCKED FOR CLIENT INTEGRATION  
**Scope:** Visual asset contract only; no gameplay/protocol changes.

## 1. Authority and purpose

This document translates the locked `04_UI_UX_SPEC.md` art direction into a concrete production asset contract for Chat 06.

Authoritative visual constraints preserved:
- asset-driven top-down pixel-art map; CSS-only fake pixel art is not acceptable;
- anime/chibi pixel portraits;
- timeless fantasy countryside, mainland/open expansion, outer fog;
- natural greens/blues/warm yellows/browns;
- parchment/wood/dark-fantasy pixel frames with hard pixel shadows and 9-slice-like use;
- readable fantasy serif/display headings + bitmap/mono data treatment;
- no emoji as primary icons;
- no gameplay semantics may be inferred from decoration.

## 2. Asset root and versioning

Use one versioned root:

`client/public/assets/ui/v1/`

Recommended subfolders:

```text
ui/v1/
  terrain/
  landmarks/
  residences/
  ambience/
  frames/
  portraits/
  icons/
  transitions/
  manifest.json
```

A breaking visual atlas/layout change increments `v1` → `v2`. Minor additions that preserve filenames/coordinates may remain in v1.

## 3. Pixel grid and export rules

- Logical world tile: **32 × 32 px**.
- Pixel art is authored on integer pixels; no subpixel strokes.
- World assets use nearest-neighbor scaling (`image-rendering: pixelated`).
- Do not apply browser blur, smoothing or CSS gradients as a replacement for raster art.
- Transparent assets: PNG with alpha.
- Large static backdrops/fog textures may use lossless WebP if visually identical at 1:1.
- UI icons: 24 × 24 logical px, exported at 24 or 48 px but rendered on an integer scale.
- Portraits: 96 × 96 logical px square.
- All transparent assets must have 2 px minimum safe transparent padding unless intentionally tileable.

## 4. World terrain package

### Required files

`terrain/terrain_atlas.png`

Minimum tile set, each on the 32 px grid:
- grass A/B/C;
- dirt A/B;
- meadow/flower A/B;
- water still A/B;
- water edge/corner variants sufficient for irregular ponds/rivers;
- shallow bank;
- stone path straight/corner/T/cross;
- dirt path straight/corner/T/cross;
- sparse rock;
- shrub;
- tree small/medium/large;
- stump/dead tree for crisis ambience;
- open-ground transition tiles so settlement edges do not look like a fixed island.

### World composition rules

- Government is the central landmark anchor, not a map-wide Status zone.
- Residences scatter naturally; Status does not create colored districts.
- Map edge uses expanding mainland terrain + fog/darkness, never an island shoreline enclosure.
- Population expansion reveals/uses more terrain rather than scaling buildings beyond defined bounds.
- Market has no world-map building.

## 5. Government landmark

Required:

`landmarks/government.png`
`landmarks/government_turn_glow.png`

Logical footprint target: **160 × 160 px** (approximately 2–2.5× a normal residence footprint).

Visual language:
- civic fantasy hall / council structure;
- neutral public institution, not royal palace ownership;
- warm stone/wood/brass accents;
- red authoritative turn treatment belongs in UI highlight/glow asset, not permanent building color.

The glow is subtle and non-blocking; it must not force camera movement.

## 6. Residence package

Required architecture variants:

`residences/poor.png`
`residences/middle.png`
`residences/noble.png`

Logical base footprint: **64 × 64 px** each.

Optional bounded wealth scale is handled by client transform only in the locked range **0.90–1.15**. Family size must not choose a different house asset or scale.

Architecture intent:
- `poor`: modest timber/earthen cottage, maintained but sparse;
- `middle`: larger timber/stone home with practical decoration;
- `noble`: refined manor/townhouse vocabulary without becoming Government-scale.

Required markers:

`residences/local_marker.png` — green local-player marker.

Do not create Human/NPC marker assets.

## 7. Ambience and fog

Required:

`ambience/fog_edge.png`
`ambience/cloud_01.png`
`ambience/cloud_02.png`
`ambience/bird_01.png`
`ambience/smoke_01.png`
`ambience/water_ripple_01.png`

Optional crisis overlays:

`ambience/crisis_drought.png`
`ambience/crisis_fiscal.png`

Rules:
- ambience is low-contrast and may animate only via slow translation/frame cycling;
- no ambience may obscure interactive targets or data labels;
- crisis visuals are subtle atmosphere only, never new gameplay indicators unless authoritative UI state already exposes the crisis;
- fog must visually support open expansion, not hide controls.

## 8. Frame / panel package

Use asset-backed 9-slice-capable frames.

Required:

`frames/parchment_panel.png`
`frames/wood_panel.png`
`frames/dark_panel.png`
`frames/tooltip.png`
`frames/button_primary.png`
`frames/button_secondary.png`
`frames/button_danger.png`
`frames/tab_active.png`
`frames/tab_idle.png`

Recommended authoring size: **96 × 96 px** with corners occupying 16–24 px. Chat 06 must use `border-image`/9-slice or equivalent so corners do not stretch.

Usage:
- parchment: readable information/history/tutorial surfaces;
- wood: primary game controls/navigation;
- dark: modal/high-contrast state, end report, serious warnings;
- danger: destructive/reject/failure actions only.

Hard pixel shadow may be baked into assets or applied as integer-offset CSS shadow; no blurred dashboard-style elevation.

## 9. Portrait/avatar approach

Portrait system is **template + palette/feature variation**, not one handcrafted portrait per Character.

Required starter set:

`portraits/base_01.png` … `base_08.png`

Each 96 × 96 px anime/chibi pixel portrait should vary silhouette/face/hair enough for quick recognition while remaining setting-neutral.

Overlay slots allowed:
- hair/accessory;
- clothing/status accent;
- age/lifecycle accent.

Do not encode Human/NPC identity visually.

Status may alter clothing trim/accessory richness, but face/body identity must remain recognizable across Status changes.

If full procedural compositing is not implemented in Wave 4, Chat 06 may deterministically assign one of the 8 bases from Character ID. This is presentation-only and must not be interpreted as gameplay state.

## 10. Icon set

Primary icon style:
- 24 × 24 px;
- single readable silhouette;
- 2–4 tone pixel shading;
- no emoji glyph fallback in production UI except temporary development debug.

Required filenames:

### HUD / navigation
- `icons/round.png`
- `icons/year.png`
- `icons/population.png`
- `icons/inflation.png`
- `icons/debt.png`
- `icons/event.png`
- `icons/chronicle.png`
- `icons/settings.png`
- `icons/government.png`
- `icons/home.png`
- `icons/zoom_in.png`
- `icons/zoom_out.png`

### Gameplay
- `icons/market.png`
- `icons/recovery.png`
- `icons/support.png`
- `icons/birth.png`
- `icons/marriage.png`
- `icons/status.png`
- `icons/cash.png`
- `icons/resource_renewable.png`
- `icons/resource_nonrenewable.png`
- `icons/queue.png`
- `icons/reconnect.png`
- `icons/info.png`
- `icons/close.png`
- `icons/accept.png`
- `icons/reject.png`
- `icons/cancel.png`
- `icons/end_turn.png`

The six abstract resources remain abstract. Do not create wheat/wood/fish/etc. commodity icons that imply renamed resources.

## 11. Transition assets

Required:

`transitions/founder_seal.png`
`transitions/round_divider.png`
`transitions/extinction_mark.png`

Animation remains non-blocking. These assets decorate Founder Draw reveal, round transition and extinction ending; they never determine timing/state.

## 12. Palette tokens

Lock the following UI palette families; exact per-pixel shading inside assets may use nearby values while preserving contrast:

```text
ink-950       #17120D
ink-800       #2A1D12
wood-700      #6F4B26
wood-500      #9A6B37
parchment-100 #F3E5BF
parchment-300 #D8C08B
brass-400     #C79D5C
forest-700    #31523A
forest-500    #4E7552
water-600     #3E6470
sky-400       #7FA7B0
warning-600   #A84F3D
success-600   #47734A
```

Rules:
- local-current green and Government red must remain distinguishable from decorative greens/reds;
- never rely on color alone for selected/error/status meaning;
- text contrast on primary reading surfaces should target WCAG AA where practical despite pixel styling.

## 13. Typography contract

Typography roles, not gameplay semantics:

- **Display / H1–H2:** fantasy serif/display face with full Vietnamese coverage; uppercase may be used sparingly.
- **Body:** highly readable serif or humanist text face with full Vietnamese diacritics.
- **Data / timers / numeric HUD:** mono/bitmap-inspired face with tabular numerals.

Production requirement:
- no font may be chosen if Vietnamese diacritics are incomplete;
- no bitmap font below a readable effective 14 CSS px on desktop or mobile;
- body minimum 16 CSS px; critical timers/data 14–16 px minimum;
- line-height body 1.35–1.55;
- client must provide a safe system fallback stack if custom font loading fails.

This contract does not require adding a new network font dependency. Chat 06 may retain current fonts until licensed/bundled final font files are chosen, but final art compliance requires the three roles above to be visually distinct and Vietnamese-safe.

## 14. Asset manifest contract

Create `ui/v1/manifest.json` containing at minimum:

```json
{
  "version": 1,
  "tileSize": 32,
  "iconSize": 24,
  "portraitSize": 96,
  "assets": {
    "terrainAtlas": "terrain/terrain_atlas.png",
    "government": "landmarks/government.png",
    "residencePoor": "residences/poor.png",
    "residenceMiddle": "residences/middle.png",
    "residenceNoble": "residences/noble.png"
  }
}
```

Chat 06 may extend the manifest, but these core keys and version semantics must remain stable within v1.

## 15. Client integration requirements

Chat 06 should:
- create an asset loader with graceful missing-asset fallback for development only;
- use real raster assets for map, landmark, residence, frame, portrait and icon surfaces;
- remove CSS geometry that visually impersonates final landmarks/houses once equivalent assets exist;
- preserve existing semantic DOM/action bindings;
- keep map visible beneath floating drawers/panels;
- apply integer/nearest-neighbor rendering for world pixel art;
- never gate gameplay on asset load completion; loading art may fall back visually without changing authoritative state.

## 16. Acceptance criteria for Wave 4 art compliance

Wave 4 may be called **art-complete** only when all are true:

1. No production map/residence/Government landmark is represented primarily by CSS boxes/shapes.
2. Required world terrain/landmark/residence/fog assets are present under the versioned asset root.
3. Primary HUD/navigation/action icons use the icon asset set, not emoji.
4. Main panels/buttons use asset-backed pixel-fantasy frame treatment.
5. Character/profile surfaces use pixel portrait assets rather than generic geometric placeholders.
6. Desktop and mobile render without smoothing/blurry non-integer pixel scaling on core art.
7. Missing assets do not alter gameplay semantics or server actions.
8. Tutorial spotlight and motion remain non-blocking.
9. No resource is visually renamed into a real-world commodity.
10. Chat 07 performs visual/runtime regression after integration.

## 17. Current delivery status

This document **locks the asset package contract** and removes ambiguity for Chat 06.

It does **not** claim that the final raster binaries already exist in the repository. Until the required files under `client/public/assets/ui/v1/` are actually created/imported and visually verified, Wave 4 remains **ART-ASSET BLOCKED / NOT ART-COMPLETE**.
