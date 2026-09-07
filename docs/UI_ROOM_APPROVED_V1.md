# UI ROOM / WORLD SHELL — APPROVED V1

Status: USER-APPROVED
Date: 2026-09-07
Owner: 05 — UI/UX & ART

## Authority

This is the approved Room / World shell design source for implementation. It supersedes conflicting Room/map presentation assumptions from frozen V5–V10.1 prototypes, Migration Pack normalization, current client baseline, and older Chat 05 art integration where those differ.

Gameplay, protocol, timers and authoritative map/game state are unchanged.

## Core direction — WSA: Thế giới là màn hình

- World Map occupies almost the full viewport and is the primary visual surface.
- 3/4 top-down pixel-art perspective with visible building façades/height.
- Bright/lively world with darker fantasy UI chrome floating lightly above it.
- HUD, Turn Track, minimap, zoom controls and opened panels must not frame the world into a dashboard window.
- Initial camera shows the whole settlement at a useful overview scale.
- Free click-drag pan + zoom remains supported.
- Camera may overscroll a short distance into outer fog and then elastic-return to the useful map region.

## Settlement / world composition

- Government is the central landmark.
- Government prominence comes from architecture, central placement, **radial/circular plaza**, grounds and converging circulation/roads, not a fixed 2–2.5× house scale.
- Residence density is **balanced**: small natural clusters, vegetation/open space and roads remain visible; do not create Poor/Middle/Noble districts.
- Settlement expands outward as population grows.
- Adult children should preferentially appear reasonably near parents where placement permits.
- Residence architecture communicates Status; wealth only changes scale subtly within the approved bounded range; family size does not select a larger house asset.
- Market has no dedicated world-map building.
- No generic ambient chibi inhabitants walk/idle around the map.
- Living-world motion comes from restrained environmental ambience such as clouds, birds, chimney smoke, water ripples and vegetation movement.
- World may evolve subtly over years/generations without switching into visibly separate historical eras.
- Authoritative World Events may lightly alter ambience only when the server provides the event state.

## Residence / identity interaction

- Human/NPC distinction is shown primarily when a Character/Residence is focused or hovered; avoid always-on identity clutter across the settlement.
- Local/current/focused Residence may keep a light persistent label/marker.
- Other Residence detail appears on hover/focus.
- Local player Residence/map marker uses green plus shape/icon support, not color-only meaning.
- Clicking a Residence directly opens the Residence/Family surface.
- Government building click directly opens Government.
- Opened Residence/Government/other shell information surfaces use **floating cards/panels around the middle-right**, not a large fixed full-height right drawer.
- When such a panel is open, the map is dimmed only lightly and remains a persistent, camera-interactive world.

## Turn Track

Desktop:
- Approximately 5–6 upcoming entries.
- Vertical sequence on the left edge, nearest/next entry highest.
- Each entry is an individual avatar/token rather than a large background panel.
- A **single vertical line runs from top to bottom through the center of the avatar tokens**, visually linking turn order.
- No substantial Turn Track panel background.
- Current turn is strongest; local player uses green treatment; Government uses red treatment; color is paired with shape/icon cues.
- Clicking a Turn Track Character pans/focuses camera to that Character's Residence; child maps to parents' Residence; Government maps to Government.
- Turn Track focus moves camera only and does not auto-open another panel.

Mobile:
- Convert to a compact horizontal/rail treatment while preserving order and camera-focus behavior.

## Minimap — always informational

Placement and size:
- **Upper-right corner** on desktop.
- Default compact size target is approximately **200 × 140 px**, responsive as needed.
- Mobile uses a smaller version but still visibly renders map information at all times.

Hard constraint:
- The minimap must NEVER collapse into an ordinary icon/button in its normal state.
- Its compact/default state is a real simplified map overview with useful spatial information.

Default information:
- simplified settlement/world footprint;
- major roads/land masses or other useful large-scale spatial structure;
- current camera viewport/visible-region indicator;
- highlighted Government landmark marker;
- highlighted local Home/Residence marker.

Navigation:
- Clicking a location on the minimap pans/recenters the main camera toward that location.
- Clicking the highlighted Government marker reproduces the old Government quick-focus behavior.
- Clicking the highlighted Home/local Residence marker reproduces the old Home quick-focus behavior.
- Hover/click/tap may expand the minimap or reveal extra detail; expansion enhances rather than enables its informational value.
- Direct drag of the viewport on the minimap is not required by V1.

## Quick navigation replacement

The older separate World Map buttons for `Government` and `Home` are REMOVED.

Reason:
- their camera-navigation function is now integrated into the real minimap via highlighted, clickable Government and Home markers;
- duplicate controls would add visual clutter and duplicate semantics.

Bottom-right world controls retain only compact icon-led zoom functions:
- Zoom In;
- Zoom Out.

These controls remain available but reduce opacity while idle.

## Panels / overlays

- Residence/Government/other world-shell surfaces use floating middle-right cards/panels on desktop.
- The main map stays visible behind them.
- Map dimming is subtle.
- Camera interaction remains available while the floating panel is open where technically compatible with the existing interaction surface.
- Typical transitions should remain short and non-blocking (~150–250 ms reference range); they never pause, reset or extend gameplay timers.
- Compact/mobile presentation may use bottom/full-height sheets instead of shrinking desktop floating cards.

## Pixel/rendering rules

- Core pixel art uses nearest-neighbor/integer-friendly scaling.
- Avoid blur/smoothing on primary pixel assets.
- Use dedicated pixel-art icons, not emoji, for production controls.
- Pixel/fantasy frames should remain readable and not excessively rigid or ornamental.

## Relationship to HUD

This Room V1 locks the shell/map spatial structure only. Detailed HUD composition remains a separate user-approval task.

HUD implementation must respect:
- World Map remains visually primary;
- minimap upper-right needs protected space;
- Turn Track left edge needs protected space;
- HUD should not become a dense dashboard frame around the world.

## Implementation acceptance

1. World Map is the primary almost-full-viewport surface in 3/4 top-down pixel art.
2. Government uses radial-plaza/architectural composition rather than fixed overscaling.
3. Residence density/grouping follows the balanced natural-settlement rule.
4. Turn Track uses individual avatar tokens connected by one vertical center line, without a large panel background.
5. Minimap is upper-right, always informational, compact ~200×140 desktop, and shows camera viewport plus Government/Home markers.
6. Government/Home markers on minimap are clickable camera-navigation targets.
7. Old standalone Government/Home world-map quick-nav buttons are absent.
8. Bottom-right keeps only low-idle-opacity zoom controls.
9. Residence click opens Residence/Family; Government click opens Government.
10. Desktop world panels float middle-right and only lightly dim the persistent map.
11. Mobile retains an always-informational minimap and uses horizontal Turn Track + sheet-based surfaces.
12. No gameplay/protocol/timer/authoritative-state changes are introduced.
