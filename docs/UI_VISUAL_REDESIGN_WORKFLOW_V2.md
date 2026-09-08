# UI VISUAL REDESIGN WORKFLOW V2 — LOW-COST FIGMA REVISION

Status: **CANONICAL — USER APPROVED 2026-09-08; low-cost revision approved in Chat 00 v2.**

## Current operating sequence — supersedes the original Figma-every-stage sequence

Explore outside Figma → user selects direction → build editable Figma design → user approves actual Figma anchors → versioned GitHub handoff → implementation → visual and performance verification.

Prepare references, content, assets, state inventory and lightweight concept previews outside Figma. Start with two alternatives on the SAME representative Main Gameplay HUD; make a third only if the first two do not meet the user's needs. Do not fully implement an HTML prototype and then rebuild the whole product in Figma. Local HTML/CSS/SVG or image concepts are exploration artifacts, not approved production authority and not a revival of historical V5–V10.1 prototypes.

Choose the direction before building the canonical Figma master/design system. Direction selection is not final screen approval. The actual editable Figma anchor frames require explicit approval after construction. Existing Phase numbers below remain stable for references; execute Phase 2 and exploratory Phase 3 before Phase 1/4/5.

### Cost and retrieval discipline

- Reuse one recorded master file, known page/node IDs, assets and unchanged design data.
- Group related feedback into small bounded edits; respect tool/skill operation limits rather than using one giant script.
- Capture and inspect images after meaningful visual changes and at approval milestones; quota saving never removes visual verification.
- Use screenshots returned by the same edit operation when supported, avoiding a redundant capture of the unchanged result.
- Read only relevant nodes. Reuse versioned handoff data when its revision is unchanged; re-read when design changes or information is missing.
- No promise of unlimited/free use or a known remaining quota. On a quota/access error, record the exact failure and stop retrying that path. Continue independent preparation without bypassing limits or silently replacing Figma approval.
- Normal user work is reviewing images, giving feedback, choosing and approving, not operating Figma.

### Capability evidence and limits

Chat 00 v2 successfully tested account identification, blank-file creation, file structure inspection via use_figma, editable text/frame/button creation, a subsequent blue-to-green button edit, and inline screenshot retrieval on 2026-09-08.
Test file: https://www.figma.com/design/xBiqlKUYTo4IfGM67Zaq6y?node-id=2-2
Frame: 2:2; button: 2:4. This is a TEST FILE, not the UI Master or an approved design.
The account reported Starter / View. Remaining quota, dedicated get_design_context/get_metadata/get_screenshot/download tools, live-page capture, and full-project design throughput were not verified. Successful use_figma calls do not prove quota reset or exemption for every operation.


## Purpose

This workflow replaces the prior pattern of treating source/design coverage plus functional QA as sufficient evidence that the UI is complete.

Direct user feedback on published `v1.0.0` establishes that the current production UI is visually unacceptable despite functional correctness and prior UI/UX specification work.

The goal is to produce a final UI that is simultaneously:

- faithful to direct user-approved visual direction;
- aesthetically production-grade;
- coherent as one game rather than a collection of patched web panels;
- functionally correct against authoritative gameplay/server state;
- responsive on desktop and mobile;
- performant in real browser use.

## Authority order

For gameplay/rules/authoritative state:

1. latest direct user decision;
2. Rule Ledger / canonical gameplay docs;
3. authoritative server/engine contracts.

For presentation/visual implementation:

1. latest direct user visual decision;
2. Figma frame explicitly marked `APPROVED` by the user;
3. canonical approved UI/UX docs;
4. implementation.

A Figma frame never overrides gameplay, protocol, timers, scoring, eligibility or authoritative server semantics.

## Core rule

A UI surface may not be called `COMPLETE` unless all four gates are true:

1. `DESIGN APPROVED`
2. `IMPLEMENTED`
3. `VISUAL PASS`
4. `PERFORMANCE PASS`

Functional/regression PASS does not substitute for Visual PASS. Visual PASS does not substitute for Performance PASS.

## Roles

### Chat 05 — UI/UX & ART

Owner of visual direction, Figma source, design system, approved frames and visual signoff.

Chat 05 does not hand off implementation until the relevant design is approved by the user.

### Chat 06 — CLIENT IMPLEMENTATION

Owner of implementation and client performance.

Chat 06 reads exact approved Figma nodes and does not invent visual styling where approved design information exists.

### Chat 07 — RELEASE & QA

Owner of functional QA, visual regression evidence and performance acceptance.

### Chat 08 — CONSISTENCY AUDITOR

Independent audit only when requested or when design/implementation appears to conflict with canonical gameplay, protocol or project state.

### Chat 00 — PROJECT CONTROL

Coordinates gates and may not classify the redesigned UI as complete while any required gate is missing.

---

# PHASE 0 — FREEZE THE CURRENT RELEASE AS BASELINE

Published `v1.0.0` remains historical release evidence, not the aesthetic baseline to copy.

Current production is used only to:

- inventory existing functionality and states;
- capture before/after evidence;
- identify visual drift;
- profile lag/performance;
- preserve working authoritative bindings.

Do not use the current production appearance as the design authority.

---

# PHASE 1 — FIGMA MASTER FILE

Chat 05 creates or adopts one canonical Figma design file:

`Intergenerational Contract — UI Master`

Recommended pages:

- `00 — CURRENT PRODUCTION`
- `01 — REFERENCES`
- `02 — ART DIRECTIONS`
- `03 — DESIGN SYSTEM`
- `04 — CORE SCREENS`
- `05 — GAMEPLAY SCREENS`
- `06 — RESPONSIVE`
- `07 — APPROVED`
- `08 — IMPLEMENTATION QA`

The user is not required to operate Figma manually. Chat 05 manages Figma through the connected Figma integration and shows screenshots/previews in chat for approval.

## Production capture

Capture the current live production views into `00 — CURRENT PRODUCTION` for visual comparison. Captured production is reference evidence only, never the final editable design source.

When the Figma integration supports both live-page capture and editable design construction, use the capture as pixel-accurate reference and build/refine the actual editable design separately.

---

# PHASE 2 — VISUAL AUDIT

Before redesigning, Chat 05 compares:

- current production;
- direct user-approved illustrations and prior UI decisions;
- approved UI surface docs;
- current art assets;
- relevant high-quality reference products.

Audit at minimum:

- composition;
- hierarchy;
- typography;
- spacing;
- scale;
- density;
- color;
- panel/card language;
- iconography;
- character/scene art;
- background/depth;
- focal point;
- game feel;
- responsive behavior;
- transition/motion character.

Classify issues as:

- major visual mismatch;
- moderate fidelity drift;
- polish-only;
- implementation bug;
- missing/insufficient visual source.

If a previously approved illustration cannot actually be inspected, mark it `MISSING-VISUAL-SOURCE` and ask the user to re-surface only that reference. Do not reconstruct final visual authority from prose alone.

---

# PHASE 3 — REFERENCE RESEARCH + ART DIRECTION

Chat 05 curates a small, high-quality reference board, normally 10–20 references rather than a large undifferentiated moodboard.

For each useful reference, record what is being borrowed and what is explicitly not being borrowed.

Then prepare two materially distinct visual directions outside Figma on the same representative Main Gameplay HUD composition. Show image or lightweight prototype previews in chat. Create a third option only if the first two are insufficient. After the user selects a direction, construct and refine that direction as editable Figma nodes; do not build full Figma component libraries for rejected concepts.

Each direction must define:

- overall visual character;
- palette;
- typography family roles;
- panel/button language;
- icon style;
- character/environment treatment;
- background/depth treatment;
- texture level;
- animation/motion character;
- readability implications;
- performance implications.

**User approval is required before one direction becomes canonical.**

Chat 05 must not choose the final art direction on the user's behalf.

---

# PHASE 4 — DESIGN SYSTEM LOCK

After art direction approval, Chat 05 builds the design system inside Figma.

At minimum define reusable variables/tokens for:

- colors;
- typography;
- spacing;
- radii;
- strokes;
- shadows;
- opacity;
- motion durations/easing where relevant.

At minimum define reusable component families for:

- buttons;
- icon buttons;
- panels;
- cards;
- tabs;
- badges;
- tooltips;
- modals/sheets;
- HUD stats;
- Character cards/portraits;
- resource/action rows;
- notifications/toasts;
- phase headers;
- World Event/banner surfaces.

Where applicable define states/variants:

- default;
- hover;
- pressed;
- disabled;
- selected;
- warning;
- error;
- success.

Chat 06 may not invent a competing component style when an approved design-system component already covers the case.

---

# PHASE 5 — FOUR ANCHOR SCREENS

Do not redesign the entire game at once.

First produce high-fidelity designs for exactly these anchor groups:

1. Landing
2. Lobby
3. Room
4. Main Gameplay HUD

These screens establish the visual language for the whole product.

Each anchor must include the desktop composition and, where materially different, a dedicated mobile composition.

Do not treat mobile as a desktop frame simply scaled down.

The user reviews screenshots/previews in Chat 05 and explicitly approves or rejects each design.

Do not expand to the remaining gameplay surfaces until the anchor set is visually accepted by the user.

---

# PHASE 6 — APPROVED NODE LOCK

Every approved frame must have an immutable handoff identity containing at least:

- Figma file name;
- `fileKey`;
- exact `nodeId`;
- screen/state name;
- viewport/composition target;
- approval status;
- approval date/decision reference.

Recommended naming convention:

- `LANDING / DESKTOP / APPROVED`
- `LANDING / MOBILE / APPROVED`
- `LOBBY / DESKTOP / APPROVED`
- `ROOM / DESKTOP / APPROVED`
- `HUD / DESKTOP / APPROVED`

If an approved design is materially revised, create a new approved revision/node or explicitly update the approval record. Do not silently mutate visual authority after handoff.

---

# PHASE 7 — DESIGN-TO-CODE CONTRACT

Chat 06 implementation handoffs must reference the exact approved Figma nodes.

Chat 05 must save a versioned handoff bundle in GitHub, preferably under design/figma/handoff/<revision>/, containing exact fileKey/nodeId identities, frame revision and approval decision/date, viewport/state, approved screenshots, geometry/layout rules, typography/colors/spacing tokens, component states and asset files with provenance. Include an actual extraction from the approved Figma source, not inferred measurements from an image. Revisions must remain linked to the approved nodes; material changes require a new approval record.

Chat 06 must use this Figma-derived design context rather than coding by eyeballing screenshots alone. Reuse the bundle while the approved revision is unchanged; read exact Figma nodes for missing information or changed revisions. This does not require repeated live retrieval of an unchanged node or a specific unverified tool. Where useful, inspect:

- node structure;
- dimensions;
- screenshot;
- variables/tokens;
- component metadata;
- downloadable assets;
- motion context;
- Code Connect mappings.

For reusable Figma components, establish Code Connect mappings only when they reduce ambiguity and duplication enough to justify the setup; they are not a prerequisite for the first anchor batch.

Implementation order should prefer:

1. design tokens;
2. primitive reusable components;
3. complex reusable components;
4. layout shell/HUD;
5. actual screens/states.

Do not solve major composition differences through a new layer of late CSS overrides when the approved component/layout structure can be implemented directly.

If approved design requires authoritative data that does not exist in the client contract, Chat 06 must hand off narrowly to Chat 03 rather than inventing client truth.

---

# PHASE 8 — VISUAL FIDELITY LOOP

Each implemented approved surface goes through this loop:

`FIGMA APPROVED → IMPLEMENT → SCREENSHOT → COMPARE → VISUAL FAIL/PASS`

A screen with major visual mismatch does not advance merely because its DOM, actions or unit tests pass.

## Reverse capture

For web views, capture the implementation back into Figma when useful and place it beside the approved design in `08 — IMPLEMENTATION QA`.

Recommended side-by-side structure:

- `<SCREEN> — APPROVED DESIGN`
- `<SCREEN> — ACTUAL IMPLEMENTATION`

This is comparison evidence, not a replacement for the editable approved source.

## Visual comparison targets

Check at minimum:

- overall composition;
- hierarchy;
- typography;
- spacing;
- alignment;
- component sizing;
- color/tone;
- icon/art fidelity;
- overflow/clipping;
- state fidelity;
- mobile re-composition.

Automated pixel diff may support the gate, but do not require zero-pixel difference because font rasterization/anti-aliasing can vary. Major visible mismatch must still fail.

Final visual acceptance belongs to Chat 05 against the user-approved design source, with Chat 07 retaining independent runtime QA responsibility.

---

# PHASE 9 — PERFORMANCE GATE

Performance is an independent requirement, not a visual tradeoff.

Chat 06 profiles real browser behavior including where relevant:

- repeated rerenders;
- MutationObserver loops;
- unnecessary DOM mutation;
- layout thrashing;
- expensive animation;
- oversized raster assets;
- repeated event listeners;
- redundant snapshot processing;
- long tasks/input blocking.

Do not degrade approved visual quality to solve performance until the actual bottleneck is measured.

Chat 07 records a `PERFORMANCE PASS` only from observed evidence suitable for the current client/runtime.

---

# PHASE 10 — EXPAND TO GAMEPLAY SURFACES

Only after the four anchors and the design system are approved may Chat 05 expand the system to remaining surfaces, including:

- Mandatory;
- Status;
- Voluntary shell;
- Market;
- Recovery;
- Support;
- Birth;
- Marriage;
- Residence/Family;
- Waiting Queue/Reconnect;
- Government/social systems;
- Elderly/Mortality/Grief/Inheritance;
- Immigration/NPC takeover;
- World Event;
- Chronicle;
- End Report.

Reuse approved components/tokens wherever possible. New visual primitives require explicit design-system extension rather than one-off styling.

---

# PHASE 11 — FINAL QA

A release candidate containing the redesign may only be classified as UI complete when all required surfaces have:

- `DESIGN APPROVED`;
- `IMPLEMENTED`;
- `VISUAL PASS`;
- `PERFORMANCE PASS`;
- functional/regression PASS for affected flows.

Representative visual baselines should include deterministic screenshots for standard desktop/mobile viewports. Exact viewport matrix may be adjusted by Chat 05/07 to match the actual supported product, but must cover both desktop and mobile compositions.

Any future release status must distinguish:

- gameplay correctness;
- visual fidelity;
- performance.

No one of these may be used as evidence for the others.

---

# USER WORKFLOW

The user is not expected to learn Figma.

The user's normal responsibilities are only:

1. review visual alternatives shown in chat;
2. say what is liked/disliked;
3. request revisions;
4. explicitly say `APPROVED` only when genuinely satisfied.

Chat 05 manages the Figma file and approval records through the connected Figma integration.
