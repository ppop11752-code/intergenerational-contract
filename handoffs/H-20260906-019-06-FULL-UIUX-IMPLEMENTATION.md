handoff_id: H-20260906-019-06-FULL-UIUX-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Triển khai production UI/UX theo full audit

## Context

Chat 05 đã hoàn thành full UI/UX audit tại `docs/UI_UX_FULL_AUDIT_2026-09-06.md`.

Current client started as a functional/integration prototype and is being rebuilt toward the locked UI/UX baseline.

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
Substantially implemented and authoritative display dependency resolved:
- persistent HUD with Round/Year/Population/Inflation/Public debt + ceiling/phase timer/Niên sử;
- World Event now consumes authoritative `game.eventName`;
- Turn Track capped to 6 upcoming entries with current/local states;
- map semantic controls Government/Home/zoom;
- Mandatory now consumes authoritative `mandatoryQuote`, including charge breakdown and projected liquidation/bankruptcy facts, explicitly labeled projected;
- Status now consumes authoritative `statusQuote`: all fees/persons/affordability plus Noble competition/fallback/refund facts;
- Market six cards with price/pool/return/failure/subsidy/out-of-supply context;
- Recovery now consumes authoritative `recoveryQuotes`: current pool/capacity/pending/cost-per-unit;
- Support authoritative family selector;
- Birth proposals/responses;
- Marriage incoming/accepted presentation and player-facing labels.

### Wave 3
Implemented structurally:
- Residence/Family drawer;
- Character Profile + `← GIA ĐÌNH`;
- Government four tabs: Overview/Budget/Debt/Social Security;
- Niên sử Journey + World views;
- non-blocking Founder Draw banner;
- 2.5s non-blocking Round Transition;
- End Report Ranking/Journey/World + host-only Replay + extinction-safe failure presentation.

### Wave 4
Integration-ready but NOT ART-COMPLETE:
- responsive/mobile bottom/full-height sheets;
- Tutorial spotlight hooks/zones;
- non-blocking ambient cloud/fog/motion layer;
- UI art contract integration scaffold completed in `H-20260907-027-06-UIUX-ART-INTEGRATION`;
- canonical `client/public/assets/ui/v1/manifest.json` + async asset loader + graceful fallback + deterministic portrait mapping are in place.

Final raster binaries are still absent. Current fallback/CSS/placeholders remain development presentation only and do not satisfy art-complete acceptance.

## Verification

- Earlier current-client suite before display integration: TypeScript build PASS, `npm test` PASS 21/21.
- Display integration added deterministic regression for all four authoritative display surfaces.
- Modified display/type/transport modules were independently TypeScript-compiled and deterministic tests passed locally.
- Full clean-repo suite after the newest display integration has not been run from the local container because external GitHub DNS is unavailable.

## Remaining dependencies

- Chat 03 display-contract dependency is RESOLVED by server commit `9222968e2aba9970cd2f7038b9b901b304f40a89` and `H-20260907-028-06-UIUX-DISPLAY-INTEGRATION` DONE.
- Real raster binaries matching `docs/UI_ART_ASSET_CONTRACT_V1.md` must still be produced/imported under `client/public/assets/ui/v1/`.
- Chat 07 must run `H-20260907-029-07-UIUX-DISPLAY-QA` plus later visual/runtime regression after real art binaries exist.
- Lobby QR is still a placeholder; no renderer has been added.

Handoff remains OPEN. Do not declare art-complete or player-facing release-ready until remaining art/QA dependencies are complete.
