handoff_id: H-20260906-019-06-FULL-UIUX-IMPLEMENTATION
from: 05
to: 06
status: BLOCKED
title: Triển khai production UI/UX theo full audit

## Context

Chat 05 đã hoàn thành full UI/UX audit tại `docs/UI_UX_FULL_AUDIT_2026-09-06.md`.

Current client started as a functional/integration prototype and has been rebuilt toward the locked UI/UX baseline.

## Required work

### Wave 1 — P0 shell and survivability
- Landing / Create / Join / Lobby separation.
- normal Create Room + Host Start.
- reconnect/get-state recovery.
- Waiting Queue.
- loading/error/connection/success feedback.
- authoritative Support selector.
- incoming Birth response UI.

### Wave 2 — production gameplay surfaces
- World HUD + Turn Track + map shell.
- Mandatory / Status / Voluntary production presentation.
- Market six-card UI.
- Recovery / Support / Birth / Marriage production surfaces.

### Wave 3 — world/result surfaces
- Residence/Family/Character Profile.
- Government drawer.
- Niên sử analysis view.
- Founder Draw + round transition.
- Full End Report; Replay host-only.

### Wave 4 — visual completion
- final pixel-fantasy art/frame system.
- responsive/mobile sheets/HUD/Turn Track.
- Tutorial spotlight integration.
- non-blocking animation/ambient layer.

## Source

- `docs/UI_UX_FULL_AUDIT_2026-09-06.md`
- `docs/UI_TUTORIAL_SPEC.md`
- `docs/UI_ART_ASSET_CONTRACT_V1.md`
- locked Migration Pack `04_UI_UX_SPEC.md`
- current `client/`
- authoritative server snapshots/protocol

## Progress — Chat 06

### Wave 1
COMPLETE in client implementation:
- separate Landing/Create/Join/Tutorial/Lobby;
- normal room creation + Host Start;
- reconnect/startup recovery via `room:reconnect` + `room:get-state`;
- dedicated Waiting Queue;
- standard connection/pending/success/error feedback;
- authoritative Support selector from `eligibleSupportTargets`;
- incoming Birth proposal response UI;
- form-state loss defect H-20260906-024 fixed with immutable action payloads before busy render.

### Wave 2
IMPLEMENTED with authoritative display contracts:
- persistent HUD with Round/Year/Population/Inflation/Public debt + ceiling/phase timer/Niên sử;
- World Event consumes authoritative `game.eventName`;
- Turn Track capped to 6 upcoming entries with current/local states;
- map semantic controls Government/Home/zoom;
- Mandatory consumes authoritative `mandatoryQuote`, including charge breakdown and projected liquidation/bankruptcy facts, explicitly labeled projected;
- Status consumes authoritative `statusQuote`: all fees/persons/affordability plus Noble competition/fallback/refund facts;
- Market six cards with price/pool/return/failure/subsidy/out-of-supply context;
- Recovery consumes authoritative `recoveryQuotes`: current pool/capacity/pending/cost-per-unit;
- Support authoritative family selector;
- Birth proposals/responses;
- Marriage incoming/accepted presentation and player-facing labels.

Display lifecycle defect found by Chat 07 was fixed in `H-20260907-030-06-RECOVERY-DISPLAY-DECORATION`:
- latest authoritative snapshot cached in presentation layer;
- local `data-panel` renders trigger re-decoration on the next tick;
- Event/Mandatory/Recovery/Status remain server-derived without client economic recomputation.

Final authoritative display QA is DONE in `H-20260907-029-07-UIUX-DISPLAY-QA`:
- browser-authoritative checks 67/67 PASS;
- clean client suite 27/27 PASS;
- authoritative engine build PASS.

### Wave 3
IMPLEMENTED structurally:
- Residence/Family drawer;
- Character Profile + `← GIA ĐÌNH`;
- Government four tabs: Overview/Budget/Debt/Social Security;
- Niên sử Journey + World views;
- non-blocking Founder Draw banner;
- 2.5s non-blocking Round Transition;
- End Report Ranking/Journey/World + host-only Replay + extinction-safe failure presentation.

### Wave 4
INTEGRATION-READY but NOT ART-COMPLETE:
- responsive/mobile bottom/full-height sheets;
- Tutorial spotlight hooks/zones;
- non-blocking ambient cloud/fog/motion layer;
- UI art contract integration scaffold completed in `H-20260907-027-06-UIUX-ART-INTEGRATION`;
- canonical `client/public/assets/ui/v1/manifest.json` + async asset loader + graceful fallback + deterministic portrait mapping are in place.

Final raster binaries are still absent. Current fallback/CSS/placeholders remain development presentation only and do not satisfy art-complete acceptance.

## Verification

- `H-20260907-029-07-UIUX-DISPLAY-QA`: PASS.
- Browser-authoritative checks: 67/67 PASS.
- Clean client suite: 27/27 PASS.
- Authoritative engine build: PASS.
- Recovery open-after-snapshot lifecycle case specifically PASS after H-030 fix.

## Remaining blockers

1. Lobby baseline requires large room PIN + QR, but authoritative UI sources do not define the QR payload/navigation flow. Chat 06 will not invent whether QR encodes a join URL, room PIN text, or another flow.
2. Real raster PNG/WebP binaries matching `docs/UI_ART_ASSET_CONTRACT_V1.md` are still absent; Wave 4 cannot be called art-complete.
3. After real assets are integrated, Chat 07 must run final visual/runtime regression.

Created handoff:
- `H-20260907-031-05-UIUX-QR-ART-CLOSURE` -> Chat 05 to lock Lobby QR payload/flow and provide/route final raster art binaries.

## Blocked state

This handoff is BLOCKED, not complete. There is no remaining safe independent Chat 06 implementation work for final closure until H-031 returns with QR UX contract and/or real art binaries.

Do not declare art-complete or player-facing release-ready until those blockers and final visual/runtime QA are resolved.
