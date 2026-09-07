handoff_id: H-20260908-093-06-PRODUCTION-VISUAL-FIDELITY-CORRECTION
from: 05
to: 06
status: OPEN
title: Correct v1.0.0 production UI to user-approved visual fidelity

## Trigger

`H-20260908-092-05-PRODUCTION-VISUAL-FIDELITY-AUDIT` found **MAJOR production visual mismatch** in published v1.0.0 despite functional/runtime QA success.

Canonical audit:
`docs/UI_PRODUCTION_VISUAL_FIDELITY_AUDIT_2026-09-08.md`

## Authority

Do **not** redesign gameplay or invent a new art direction.

Use the existing direct-user-approved UI sources as authority, including:
- `docs/UI_USER_DESIGN_DECISIONS_2026-09-07.md`;
- `docs/UI_ART_ASSET_CONTRACT_V1.md`;
- all `docs/UI_*_APPROVED_V1.md` surface specs;
- `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`.

## Problem summary

The current client largely patched approved semantics onto generic/dev-oriented UI. The released `ui/v1` raster pack is technically real PNG art but is generated from simple Pillow primitives and does not meet the approved anime/chibi fantasy production bar. Existing visual QA verifies asset presence/runtime structure rather than parity against approved visuals.

This is an **implementation visual-fidelity defect**, not a gameplay-rule defect.

## Required correction — P0

1. **Stop treating current primitive generated art as final visual-fidelity evidence.**
   - It may remain as an explicit development/fallback pack.
   - Do not generate another substitute art direction locally.
   - If production-grade raster/illustration assets needed by an approved surface are unavailable, mark that item ART-BLOCKED and hand back narrowly to Chat 05.

2. **Landing rebuild** against `UI_LANDING_APPROVED_V1.md`:
   - real fantasy contract/lifecycle seal, no legacy `IC` as final brand;
   - settlement/world dominant right-side key art;
   - exactly 3 readable Japanese anime/chibi foreground Characters;
   - meaningful depth (sky/distance/settlement/foreground);
   - approved left menu/right art hierarchy preserved;
   - dedicated mobile composition.

3. **Room/World rebuild** against `UI_ROOM_APPROVED_V1.md`:
   - near-full viewport 3/4 top-down fantasy settlement;
   - convincing Government radial/civic plaza and converging circulation;
   - organic Residence clusters, visible architecture/facade/height;
   - richer terrain/vegetation/fog/ambience;
   - preserve authoritative pan/zoom/minimap/Turn Track/profile navigation.

4. **Typography system**:
   - fantasy/display headings;
   - Vietnamese-safe readable body face;
   - mono/bitmap-inspired data/timer face only for data;
   - honor size/line-height requirements from `UI_ART_ASSET_CONTRACT_V1.md` §13.

5. **Production chrome/art**:
   - replace primitive rectangle-like frames/buttons with approved parchment/wood/dark-fantasy production assets;
   - replace crude portrait bases with actual anime/chibi pixel portraits;
   - dedicated production icons, no emoji fallback.

## Required correction — P1

Recompose these high-impact surfaces rather than only adding CSS overrides:

- **Mandatory:** large centered presentation card, not bottom phase-card reuse.
- **Birth:** large centered child-proposal card surface.
- **End Report:** dedicated terminal scene with faded final world, proper winner/Top3/full-rank hierarchy, extinction common-failure variant.
- **Chronicle:** large credible parchment/ledger experience, not generic feature panel.

Then normalize visual fidelity for:
- Lobby;
- HUD;
- Status;
- Voluntary dock;
- Market;
- Recovery;
- Support;
- Marriage;
- Residence/Family;
- Queue/Reconnect;
- Government/social systems;
- elderly/death/inheritance states;
- Immigration/NPC takeover;
- World Event.

Preserve all existing approved semantics and authoritative state bindings.

## Architecture constraint

Prefer **consolidation**, not another late patch layer:
- establish one final visual owner/component/style path per surface;
- retire obsolete decorators/overrides where safe;
- preserve action/state bindings;
- do not solve major composition defects solely with more CSS overrides.

## Desktop + mobile

Both must be corrected.

Mobile must follow approved mobile patterns (bottom/full-height sheets, compact horizontal Turn Track, real minimap, dedicated Landing composition) rather than merely shrinking desktop geometry.

## Verification / acceptance

Do not declare this handoff DONE from DOM/unit/E2E checks alone.

Required evidence:
1. deterministic desktop + mobile screenshots for representative approved surfaces at minimum:
   - Landing;
   - Lobby;
   - World/HUD;
   - Mandatory;
   - Status;
   - Market/Recovery/Support/Birth;
   - Residence/Government;
   - Chronicle;
   - End Report;
2. functional client regression remains green;
3. Chat 07 independently verifies runtime/responsive/E2E behavior;
4. screenshots/artifact set returns to **Chat 05 for visual-fidelity signoff** against approved specs.

## Constraints

- No gameplay changes.
- No protocol/timer/economic/scoring changes.
- No client-side invention of authoritative values.
- No new art direction without direct user approval.
- Functional QA PASS is not visual-fidelity PASS.

## Expected output

- corrected client implementation;
- explicit list of surfaces rebuilt vs retained;
- explicit list of any ART-BLOCKED assets requiring Chat 05;
- desktop/mobile screenshot artifact set;
- tests run/results;
- updated `reports/06_CURRENT.md`;
- handoff to Chat 07 for runtime QA and back to Chat 05 for visual signoff.
