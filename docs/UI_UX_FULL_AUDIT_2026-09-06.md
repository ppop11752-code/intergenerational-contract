# FULL UI/UX AUDIT — 2026-09-06

**Owner:** 05 — UI/UX & ART  
**Scope:** Current `client/` on `main`, compared against locked UI/UX baseline and `docs/UI_TUTORIAL_SPEC.md`.  
**Result:** NOT RELEASE-READY — functional prototype only.  
**Gameplay/protocol changes:** none.

## 1. Overall assessment

The current client proves transport, core actions and Tutorial guidance can be wired to the authoritative server, but it is not yet the intended game UI. It is a compact forms-and-panels prototype with generic HTML controls and minimal styling.

The locked UI baseline explicitly says the final game should not look like a web dashboard and should use an asset-driven top-down fantasy map, parchment/wood/dark-fantasy frames, a compact world HUD, Turn Track, map drawers/sheets and contextual gameplay surfaces. The current client does not yet implement that structure.

### Completion level

- **Transport-backed functional shell:** present.
- **Tutorial OI-004 guidance logic:** substantially present.
- **Final UI information architecture:** incomplete.
- **Final visual/art direction:** not implemented.
- **Responsive/mobile UX:** minimal only.
- **Release-quality feedback/loading/error states:** incomplete.
- **Animation/transition layer:** absent.

## 2. Screen / flow inventory

Current `client/src/main.ts` contains:

- combined Landing + join form;
- Tutorial start;
- basic room/game header;
- generic top navigation tabs;
- Overview world/character cards;
- Mandatory text panel;
- Status three-button chooser;
- Voluntary action cluster;
- Market form;
- Recovery form;
- Support form;
- Birth panel;
- Marriage panel;
- Chronicle list;
- Tutorial coach + recap;
- End report with raw JSON ranking dump;
- Replay button.

Current transport supports create/join/start/replay/action, but client transport does not currently expose reconnect/get-state helpers.

## 3. Gap audit by area

### P0 — Required before player-facing release

#### A. Landing / Create / Join / Lobby

**Baseline:** classic menu with separate `TẠO PHÒNG`, `THAM GIA PHÒNG`, `HƯỚNG DẪN`, `LUẬT CHƠI`, `CÀI ĐẶT`; no permanent forms. Lobby should show large room PIN + QR, Human names, host Start, NPC autofill note and founder-draw note where relevant.

**Current:** Landing permanently shows name input, Tutorial button and join-code form; no Create Room screen, no normal create-room flow, no dedicated Lobby, no participant list, no host Start UI, no QR, no founder-draw presentation.

**Decision:** must be rebuilt to baseline structure.

#### B. World map / HUD / Turn Track

**Baseline:** persistent full map; compact HUD for Round/Year/Population/Inflation/Public debt/Event/Niên sử/Settings; left Turn Track; Government and Residence navigation; feature panels float over map.

**Current:** no map, no residences, no Government landmark/drawer, no Turn Track, no world event display, no map navigation. Overview is a two-column dashboard card.

**Decision:** this is the largest UI architecture gap and blocks visual release readiness.

#### C. Mandatory / Status / Voluntary presentation quality

**Mandatory current:** one explanatory sentence only. Missing real breakdown, liquidation, bankruptcy presentation and short timed transition treatment.

**Status current:** three raw `poor/middle/noble` buttons. Missing current status, snapshot inputs, single/married fee, unlocks, next-round effect, Noble competition/cap/refund explanation and card treatment.

**Voluntary current:** basic buttons exist, but not fixed right-edge cluster and not integrated over persistent map. Controls do not yet convey availability/disabled reasons consistently.

**Decision:** rebuild presentation while preserving authoritative phase/timer semantics.

#### D. Market / Recovery / Support / Birth

**Market current:** select boxes + units input only. Missing six resource cards, current Status locks, authoritative price/pool/failure/return/subsidy context, out-of-supply state and transaction summary.

**Recovery current:** grade + units only. Missing pool, cost/unit, pending-next-round, cash/quota context.

**Support current:** requires raw `Character ID` typed by player. This is unacceptable player UX. Baseline requires direct parent/child targets, mandatory support already processed, and voluntary extra. Eligible targets must be presented from authoritative state; never require internal IDs.

**Birth current:** only initiate-birth button/empty text. Missing child #1/#2/#3 proposal presentation and spouse response UI for `incomingBirthProposals`.

**Decision:** all four require production UI implementation.

#### E. Marriage

**Current positives:** incoming accept/reject, outgoing cancel, candidate selector and send action are wired.

**Gaps:** raw proposal/character IDs are visible; no `ĐẾN NHÀ`; no persistent collapsed notices; no accepted-round notice/dotted-heart line; weak distinction between pending/accepted/executed/invalidation; no profile/residence social exploration context.

**Decision:** functional but not production-ready.

#### F. Queue / reconnect / late join

**Current:** Overview can show queue position when no character, but there is no dedicated Waiting Queue screen, no reincarnation explanation, no removal of Home semantics because Home/map do not exist yet.

Transport stores reconnect token during Tutorial creation, but client transport/UI has no `room:reconnect` flow and no startup recovery screen. Join response queue state is not designed as a player-facing flow.

**Decision:** reconnect is a P0 UX gap because server supports it but client does not expose it.

#### G. End game / results

**Current:** ending reason + raw `JSON.stringify(rankings)` in `<pre>` and Replay button.

**Baseline:** full-screen winner, final average score, ranking, Journey/World tabs, extinction-specific ending, Replay Host-only.

**Decision:** must be rebuilt. Replay must be visually host-only/disabled for non-host rather than relying on server error alone.

#### H. Feedback / error / loading / empty states

**Current:** one persistent plain error paragraph. Actions have no pending state, success confirmation, per-control validation, disabled reason, connection indicator or retry affordance. Most empty states are generic text.

**Decision:** add standardized loading, success, validation, server-error, disconnected/reconnecting and empty-state components. Never reinterpret server errors into new gameplay rules.

### P1 — Required for intended UX quality

#### I. Niên sử

**Current:** last 30 chronology strings in reverse list.

**Baseline:** large history/analysis panel with player journey across reincarnations, milestones/achievements and world snapshots/charts.

**Decision:** chronology feed may remain as a subview, not the whole feature.

#### J. Government / Residence / Character Profile

Entire baseline interaction model is absent: Government tabs, Residence/Family drawer, Character Profile, `← GIA ĐÌNH`, public-info filtering presentation, local Residence marker and character-to-residence navigation.

#### K. Founder Draw / round transition

No founder-draw reveal for >10 Humans and no `XÃ HỘI ĐÃ ĐƯỢC THÀNH LẬP` transition. No 2–3s round transition card showing Year/Round/Population/Inflation/Event.

#### L. Tutorial visual integration

Tutorial logic T0–T11 is present and local/versioned. However coach cards are generic fixed boxes; spotlight targeting is not implemented, T0 cannot actually point to the absent map/HUD surfaces, and help recap is not integrated with final Settings/HUD placement.

**Decision:** retain Tutorial state/trigger logic, re-skin and re-anchor after final surfaces exist.

### P2 — Polish / art / motion

#### M. Art direction

Current CSS is a generic dark-brown theme using `Georgia`, gradients, rounded rectangles and standard form controls. It does not implement:

- asset-driven top-down pixel map;
- anime/chibi pixel portraits;
- parchment/wood/dark-fantasy pixel frames;
- hard pixel shadows / 9-slice treatment;
- fantasy pixel/serif headings + bitmap/mono data hierarchy;
- natural greens/blues/warm yellows/browns world palette;
- timeless fantasy countryside ambience.

**Decision:** current CSS is temporary prototype styling, not art-complete.

#### N. Animation

No meaningful animation layer exists for founder draw, Turn Track movement, round transition, residence/government focus, accepted-marriage line, ambient map life or crisis ambience.

Animation must remain non-blocking where baseline says so and must never alter authoritative timing.

#### O. Responsive/mobile

Current media rule only collapses grid and turns coach card into a bottom sheet. Missing narrow Turn Track, compact/scrollable HUD, feature-panel bottom sheets and full-height Residence/Government/Niên sử sheets.

## 4. UX recommendations locked for implementation

These are UI-only recommendations and do not change gameplay:

1. Build the final shell first: Landing → Create/Join → Lobby → Map/HUD/Turn Track → drawers/sheets.
2. Preserve current authoritative transport/actions and Tutorial trigger logic; do not rewrite gameplay to fit UI.
3. Replace all player-facing internal IDs with names/profile rows; IDs may remain hidden identifiers in DOM/state.
4. Derive actionable targets from authoritative snapshots. If the server snapshot lacks data needed to render a safe selector, block that specific UI with an explanatory unavailable state and hand off the missing contract instead of asking users to type IDs.
5. Use one shared feedback system for pending/success/error/disconnected states.
6. Keep all authoritative timers visible from `phaseDeadlineAt`; opening panels, help or Niên sử must never pause/reset them.
7. Implement desktop map-overlay behavior and mobile sheet behavior from one semantic component model.
8. Treat current Tutorial implementation as a behavioral foundation, not final visual design.

## 5. Proposed implementation sequence for Chat 06

### Wave 1 — P0 shell and survivability

- Separate Landing/Create/Join/Lobby flows.
- Add normal Create Room + Host Start.
- Add reconnect/startup recovery using existing `room:reconnect` and `room:get-state` protocol.
- Add dedicated Waiting Queue state.
- Add standardized loading/error/connection feedback.
- Replace raw support target ID with authoritative eligible-family selector if data is already available; otherwise report exact missing snapshot field to Chat 03/00.
- Add incoming birth response UI.

### Wave 2 — Core game production surfaces

- Persistent World HUD + Turn Track + map shell.
- Mandatory breakdown surface.
- Status cards/details.
- Voluntary right-edge control cluster.
- Market six-card UI.
- Recovery details.
- Support family UI.
- Birth proposal/response UI.
- Marriage notices/candidate presentation.

### Wave 3 — World interaction / result surfaces

- Residence/Family/Character Profile.
- Government drawer.
- Niên sử analysis view.
- Founder Draw + round transition.
- Full End Report with host-only Replay presentation.

### Wave 4 — Art, responsive, motion

- Pixel-art assets and final frame system.
- Mobile sheets/HUD/Turn Track.
- Tutorial coach spotlight integration.
- Non-blocking animation/ambient layer.

## 6. Dependencies / unanswered behavior

No new gameplay rule is required by this audit.

Potential protocol/data dependency: Support target selection and some rich panels may require fields not currently represented in `client/src/types.ts`. Chat 06 must first inspect actual `player:state` / `room:state`. If the authoritative server already exposes the data, use it. If not, create a narrowly scoped handoff to Chat 03; do not invent client-side eligibility.

## 7. Release assessment

From UI/UX & ART perspective the game is **not ready for player-facing final release**. The current client is suitable as an integration prototype and OI-004 Tutorial behavior proof, but substantial UI architecture, presentation and art work remains.

This audit does not modify `docs/RELEASE_STATUS.md` and does not declare or reopen gameplay issues.