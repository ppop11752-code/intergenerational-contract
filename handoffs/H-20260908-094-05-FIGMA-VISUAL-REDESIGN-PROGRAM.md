handoff_id: H-20260908-094-05-FIGMA-VISUAL-REDESIGN-PROGRAM
from: 00
to: 05
status: OPEN
title: Explore outside Figma, approve editable Figma anchors, then hand off implementation

## Current instruction — user approved 2026-09-08 in Chat 00 v2

Follow docs/UI_VISUAL_REDESIGN_WORKFLOW_V2.md, LOW-COST FIGMA REVISION.
This revision replaces the original requirement to build every art-direction alternative in Figma. It preserves Figma as the approved editable design authority, user approval gates, and visual/performance verification.

## Source

- Latest user approval: “ok tiếp tục đi” after Chat 00 v2 proposed the low-cost revision.
- docs/UI_VISUAL_REDESIGN_WORKFLOW_V2.md.
- docs/UI_PRODUCTION_VISUAL_FIDELITY_AUDIT_2026-09-08.md.
- Existing direct-user-approved UI/UX docs and latest user decisions; gameplay remains governed by Rule Ledger.
- docs/DECISION_LOG.md low-cost Figma entry.

## Required sequence

1. Reconcile approved UI decisions, available visual references and H092 audit; capture representative production before-states as evidence only. Mark unavailable approved visual sources MISSING-VISUAL-SOURCE and request only those visuals.
2. Prepare references, content, assets, component/state inventory and lightweight previews outside Figma. Do not build a complete HTML client first or revive historical prototypes as authority.
3. Present TWO visual alternatives on the SAME Main Gameplay HUD composition. Add a third only if needed. Wait for the user's direction selection.
4. Create/adopt and record one canonical “Intergenerational Contract — UI Master”. Build the selected direction using editable text, layout and reusable components/tokens, with raster art as assets rather than a flattened full-screen substitute.
5. Complete Landing, Lobby, Room and Main Gameplay HUD, including distinct mobile compositions where needed. The user must review actual Figma frame screenshots and explicitly approve the anchors. Initial concept selection alone is insufficient.
6. Save a versioned Figma-derived handoff bundle in GitHub: exact fileKey/nodeId, revision, state/viewport, approval date/decision, approved screenshots, layout/type/color/spacing data, component states and assets/provenance.
7. Only after anchor approval create Chat 06 visual implementation handoff. Unchanged extracted data may be reused; missing/changed source information requires targeted Figma retrieval.
8. Extend the approved system to remaining gameplay screens/states; representative anchors do not constitute whole-game completion.

## Efficient operation

Reuse file/page/node identities and unchanged data. Work in bounded edits, collect related feedback, and visually check meaningful changes. Avoid unnecessary repeat exports and whole-file reads. Do not assume use_figma is unlimited or bypass quota/access failures. Record errors and stop automatic retries of a blocked path.
The user reviews previews and approves; no manual Figma operation is required.

## Capability test evidence

On 2026-09-08 Chat 00 v2 created and inspected a blank Figma design, created editable text/frame/button nodes, changed the saved button blue→green in a later call, and retrieved an inline screenshot.
Test: https://www.figma.com/design/xBiqlKUYTo4IfGM67Zaq6y?node-id=2-2
This file is NOT the master or an approved product design. Remaining quota, dedicated read/export tools, live capture and production-scale design have not been verified.

## Gates and ownership

- Keep OPEN/IN PROGRESS until direction selection, actual Figma anchor approval, versioned bundle and implementation handoff are complete.
- H093 PRODUCTION-VISUAL-FIDELITY-CORRECTION remains CLOSED/SUPERSEDED.
- Chat 06 performance profiling H095 can proceed separately without visual redesign.
- Chat 05 owns design and visual signoff; Chat 07 independently verifies runtime/responsive/performance.
- No gameplay, protocol, timer, scoring, eligibility or authoritative-state changes.
- Update reports/05_CURRENT.md as design work proceeds. Do not equate a successful connectivity test, spec coverage or functional QA with UI completion.
