# UI PROTOTYPE V5 → V10.1 — REFERENCE SUMMARY

Status: HISTORICAL REFERENCE ONLY — NON-AUTHORITATIVE

Purpose: preserve useful ideas and the direction of UI iteration before UI work was deferred. These prototypes were later rejected/frozen as final UI. Do not treat any item here as current user approval unless it is separately reconfirmed.

## V5 — functional Vietnamese prototype

High-confidence recovered points:
- Vietnamese gameplay prototype with feature drawers/panels for `Market`, `Recovery`, `Support`, `Birth`.
- Birth surface already tried to show proposal state, waiting for spouse response, per-round birth limits, birth subsidy and future mandatory support context.
- Main emphasis was proving that game functions could be surfaced in one playable UI rather than establishing final art direction.

Reference value now:
- Useful for remembering which gameplay information the UI attempted to expose.
- Not useful as final layout/art reference.

## V5.1 — interaction + missing-flow pass

Recovered description explicitly labels V5.1 as adding **interaction + missing flows** to V5.

What can safely be inferred:
- It was an expansion/refinement pass over V5 rather than a new visual direction.
- It attempted to close holes in interaction flow before later map/UX work.

Evidence is insufficient to state every individual screen delta with confidence; use only as a marker that V5's functional prototype was being made more complete.

## V6 — broader world/interaction prototype

High-confidence recovered points:
- Expanded the prototype into a broader end-to-end UI including World Map, HUD, Turn Track, Residence/Government, Niên sử, Market/Recovery/Support/Birth, Tutorial, mobile behavior and the 32-round ending flow.
- Added map interaction details: drag/pan with grab/grabbing cursor, zoom indication, focus pulse.
- Turn avatars became clickable.
- Added clearer disabled states.
- Birth proposal flow and Niên sử timeline/chart concepts were represented.

Reference value now:
- Important structural exploration: the game began moving from a collection of forms toward a world/map-based simulation shell.

## V7 — early pixel-game consolidation

High-confidence recovered points:
- File/version was explicitly a pixel-oriented prototype.
- Included navigation/test surfaces for `Phòng chờ`, `Rút bài`, `Bản đồ`, `Hàng chờ`, `Kết quả`.
- Landing used the `INTERGENERATIONAL CONTRACT` title and framed the game around assets, population and intergenerational responsibility.
- Prototype contained many scenario states to exercise household turns, Government, reconnect, marriage, birth, death, bankruptcy, reincarnation and extinction.

Reference value now:
- Useful as the transition point from broad functional prototyping toward stronger game/pixel presentation and state coverage.

## V8 — art-direction pass

High-confidence recovered point:
- V8 was the explicit **final-art-direction** exploration at the time.
- It pushed strongly toward **game / pixel-fantasy** presentation and away from a web-dashboard feel.

Reference value now:
- Important for historical art-direction exploration only.
- The current user has since reconfirmed pixel art + Japanese anime/chibi, but old V8 color/frame choices are not automatically approved.

## V9 — pixel-game layout consolidation

High-confidence recovered points:
- Persistent map became the visual base of the game.
- Compact fixed HUD at the top.
- Vertical Turn Track on the left, roughly 5–6 upcoming entries.
- Feature panels floated above the map rather than shrinking/replacing it.
- Residence, Government and Niên sử moved toward drawer/panel behavior.
- Overall goal was to make the UI feel like a pixel game rather than a dashboard.

Reference value now:
- Strong reference for shell/information architecture, but placement and visuals must still be re-approved by the user.

## V10 — structure-correction pass

Confidence: medium.

The surviving filename identifies V10 as `structure-corrected`, and V10.1 immediately afterward is described as restoring/locking the intended UX structure. The exact independent delta list for V10 could not be recovered reliably.

Safe interpretation:
- V10 was a corrective pass after V9 focused more on screen/flow structure than on introducing a new art direction.
- Do not invent detailed V9→V10 changes that are not otherwise documented.

## V10.1 — UX-lock attempt before UI defer

High-confidence recovered points:
- Restored/locked the intended desktop-game flow at that time:
  - Landing as a game menu;
  - Create/Join on separate screens;
  - Lobby showing Humans only;
  - separate Founder Draw flow;
  - compact HUD;
  - vertical left Turn Track;
  - full persistent map;
  - floating feature panels;
  - six abstract resources;
  - marriage interaction outside the economic turn where allowed;
  - Mandatory automatic/non-skippable presentation;
  - Status 15 seconds;
  - Voluntary 60 seconds;
  - Waiting Queue, death/inheritance/extinction states;
  - round transition;
  - Vietnamese UI text.
- V10.1 also represented the more mature Mandatory → Status → Voluntary phase UX with obligation breakdowns and more explicit Status/household presentation.
- Mobile direction used bottom/full-height sheets without changing gameplay.

Reference value now:
- Best historical reference for the **intended information architecture before defer**.
- It was nevertheless rejected/frozen as final implementation because the prototypes did not fully match the user's intended look/experience.

## Overall evolution

The sequence can be summarized as:

`V5 functional panels → V5.1 interaction completion → V6 world/map + end-to-end flow → V7 stronger pixel/state coverage → V8 art-direction push → V9 persistent pixel-game shell → V10 structure correction → V10.1 UX-lock attempt`

## What was later rejected/frozen

The user ultimately did **not** approve V5–V10.1 as final UI. UI work was deferred to prioritize gameplay/backend. Therefore:
- prototype filenames containing `final` do not mean authoritative;
- current implementation/QA based on those baselines is not equivalent to user design approval;
- useful structural ideas may be reused, but each new Landing/Lobby/Room/HUD design must be approved directly by the user.
