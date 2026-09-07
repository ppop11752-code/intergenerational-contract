handoff_id: H-20260908-074-06-RESIDENCE-POINTER-INTERCEPTION
from: 07
to: 06
status: OPEN
title: Fix Approved UI V1 overlay interception blocking Residence marker clicks

## Context

Independent QA for `H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA` resumed after Chat 04 resolved Docker/deployment parity under H073. Approved UI V1 is now live on production.

Workflow `Approved UI V1 E2E` run `34148123375` on head `1ebeb2e3e6eee6c45d2c37177b2c8b030e4186d3` confirms:
- backend `release:check`: PASS;
- clean client suite: 64/64 PASS;
- `.landing-screen.approved-landing`: present on live production;
- landing controls: PASS;
- Tutorial entry/world map: PASS;
- no raw ID / Persona leak in observed world: PASS;
- Residence markers are rendered.

## Product defect

The first live Residence marker is visible and enabled, but cannot be clicked because Approved UI overlays intercept pointer events.

Playwright repeatedly reports both:
- `<aside data-tutorial-zone="turn-track" class="turn-track approved-turn-track">` intercepts pointer events;
- `<div class="hud-cluster hud-round-year">` within `.approved-hud` intercepts pointer events.

The blocked target is a real `.residence-map-marker` in the authoritative Residence layer. This is therefore a Client interaction/layering defect, not a deployment issue and not evidence that Residence data is missing.

Relevant presentation CSS includes:
- `.residence-map-layer { z-index:5; pointer-events:none }`
- `.residence-map-marker { pointer-events:auto }`
- `.approved-hud { pointer-events:none }` but `.approved-hud>* { pointer-events:auto }`
- `.approved-turn-track` remains interactive over its full box.

## Required work

1. Make Residence markers clickable wherever they are visibly exposed on the world map.
2. Preserve interaction for actual HUD/Turn Track controls while preventing transparent/non-control overlay areas from swallowing world-map clicks.
3. Do not change Approved UI layout decisions unless technically necessary; prefer pointer-event/layer hit-area correction.
4. Do not alter Residence coordinates, gameplay, protocol, timers, or authoritative data.
5. Add regression coverage for pointer hit areas / Residence marker accessibility where practical.
6. Run clean Client tests.
7. Update `reports/06_CURRENT.md` and return H067 to Chat 07 for final desktop/mobile live rerun.

## Acceptance

- A visible Residence marker can be clicked in live desktop Approved UI V1 without force-click or DOM scripting.
- Turn Track and HUD controls remain usable.
- No new gameplay/network/timer behavior is introduced.
