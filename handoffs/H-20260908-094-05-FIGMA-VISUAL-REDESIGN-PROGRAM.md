handoff_id: H-20260908-094-05-FIGMA-VISUAL-REDESIGN-PROGRAM
from: 00
to: 05
status: OPEN
title: Run Figma-first visual redesign program and lock anchor screens before implementation

## Context

Published `v1.0.0` is functionally released but direct user play feedback says the game is visually poor and laggy. H092 independently confirmed a **major production visual fidelity mismatch**. Repeated direct code correction is no longer the approved workflow.

The user has now explicitly approved the new canonical Figma-first workflow:

`docs/UI_VISUAL_REDESIGN_WORKFLOW_V2.md`

The connected Figma integration is available. The user does **not** know or need to operate Figma manually.

## Source

- Latest direct user decision approving the Figma-first workflow, 2026-09-08.
- `docs/UI_VISUAL_REDESIGN_WORKFLOW_V2.md`.
- `docs/UI_PRODUCTION_VISUAL_FIDELITY_AUDIT_2026-09-08.md`.
- `handoffs/H-20260908-092-05-PRODUCTION-VISUAL-FIDELITY-AUDIT.md` — DONE / audit FAIL.
- Existing direct user-approved UI decisions and `docs/UI_*_APPROVED_V1.md` remain UX/semantic/reference input, but current production is not the aesthetic baseline.
- H093 direct client correction is CLOSED / SUPERSEDED before implementation.

## Required work

Follow `docs/UI_VISUAL_REDESIGN_WORKFLOW_V2.md` exactly.

### 1. Establish canonical Figma master

Create or adopt one design file:

`Intergenerational Contract — UI Master`

Use the connected Figma integration. The user is not required to manipulate Figma.

Create/organize pages equivalent to:

- `00 — CURRENT PRODUCTION`
- `01 — REFERENCES`
- `02 — ART DIRECTIONS`
- `03 — DESIGN SYSTEM`
- `04 — CORE SCREENS`
- `05 — GAMEPLAY SCREENS`
- `06 — RESPONSIVE`
- `07 — APPROVED`
- `08 — IMPLEMENTATION QA`

Record the Figma file URL/key in `reports/05_CURRENT.md` once created.

### 2. Capture current production as evidence

Capture representative live `v1.0.0` views into `00 — CURRENT PRODUCTION` as before-state evidence only.

Do not use captured production as final design authority.

### 3. Reconcile prior visual sources

Review:

- direct user decisions in Chat 05;
- existing approved UI docs;
- H092 audit;
- available approved illustrations/mockups/reference art;
- current production screenshots.

If a previously approved illustration is referenced by prose but cannot actually be visually inspected, classify it `MISSING-VISUAL-SOURCE` and ask the user to re-surface only that visual. Do not reconstruct final authority from prose alone.

### 4. Curated reference research

Build a focused reference board, normally 10–20 strong references. For each, state what visual principle is useful and what must not be copied.

The goal is deliberate art direction, not a generic moodboard.

### 5. Produce 2–3 art directions in Figma

Create 2–3 materially distinct, production-grade art directions.

All directions must demonstrate the **same representative Main Gameplay HUD/gameplay composition**, so the user can compare them fairly.

Each direction must visibly address:

- overall game character;
- hierarchy;
- typography;
- color;
- panels/buttons;
- iconography;
- character/environment art language;
- depth/background;
- texture;
- game feel;
- readability;
- expected performance cost.

Show screenshots/previews to the user in Chat 05.

**Stop and wait for explicit user selection. Do not choose the canonical direction yourself.**

### 6. After user selects direction: lock design system

Build actual Figma variables/tokens and reusable components/variants according to the canonical workflow.

Do not proceed to client implementation yet.

### 7. Design the four anchor screens

Create high-fidelity designs for:

1. Landing
2. Lobby
3. Room
4. Main Gameplay HUD

Include dedicated mobile compositions where materially different.

Iterate with the user until the user explicitly approves the anchor screens.

### 8. Lock approved nodes

For every approved anchor, record:

- file name;
- Figma `fileKey`;
- exact `nodeId`;
- screen/state;
- viewport/composition target;
- approval decision/date.

Move/copy/organize approved canonical frames under `07 — APPROVED` without silently changing already-approved visual authority.

### 9. Only after anchor approval: create Chat 06 handoff

The Chat 06 handoff must reference exact Figma approved nodes and require design-context-based implementation, not screenshot eyeballing.

Where useful, establish Code Connect mappings for reusable components.

Do not ask Chat 06 to redesign or improvise styling.

## Explicit stop gates

Do not:

- hand off visual implementation before art direction is chosen;
- hand off visual implementation before anchor screens are explicitly approved;
- call source/design coverage `UI complete`;
- treat functional QA as visual acceptance;
- preserve current production styling merely because it already exists;
- change gameplay/protocol/timers/scoring/authoritative semantics.

## User interaction rule

The user should only need to:

- review screenshots/previews in chat;
- say what they like/dislike;
- choose among alternatives;
- explicitly say `APPROVED` when satisfied.

Do not require the user to learn Auto Layout, variables, components, Dev Mode or manual Figma editing.

## Expected output

Before this handoff may be marked DONE, Chat 05 must have:

- canonical Figma master created/adopted and recorded;
- current production captured for comparison;
- visual source audit reconciled;
- reference board created;
- 2–3 art directions presented and one explicitly chosen by the user;
- design system created/locked after that choice;
- Landing/Lobby/Room/Main HUD high-fidelity anchors explicitly approved by the user;
- exact approved Figma node identities recorded;
- `reports/05_CURRENT.md` updated;
- next implementation handoff to Chat 06 created only after those gates.

If the user has not yet approved the art direction or anchor screens, keep this handoff OPEN/IN PROGRESS rather than declaring completion.

## Constraints

- No gameplay changes.
- No protocol changes.
- No authoritative-state invention.
- No new final art direction without direct user approval.
- Figma presentation authority applies only after explicit user approval.
