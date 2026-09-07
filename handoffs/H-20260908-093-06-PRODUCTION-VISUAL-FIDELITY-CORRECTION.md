handoff_id: H-20260908-093-06-PRODUCTION-VISUAL-FIDELITY-CORRECTION
from: 05
to: 06
status: CLOSED
title: Correct v1.0.0 production UI to user-approved visual fidelity

## Trigger

`H-20260908-092-05-PRODUCTION-VISUAL-FIDELITY-AUDIT` found **MAJOR production visual mismatch** in published v1.0.0 despite functional/runtime QA success.

Canonical audit:
`docs/UI_PRODUCTION_VISUAL_FIDELITY_AUDIT_2026-09-08.md`

## Original intent

The original handoff asked Chat 06 to directly correct the existing production client against previously approved UI sources.

## Superseding user decision — 2026-09-08

The user explicitly approved a new Figma-first redesign workflow after concluding that repeated direct implementation corrections still produced an unattractive result.

Canonical replacement workflow:
`docs/UI_VISUAL_REDESIGN_WORKFLOW_V2.md`

The new workflow requires:

- current production is baseline/reference only, not aesthetic authority;
- Chat 05 first creates/owns the Figma master file;
- production capture + visual audit + reference research;
- 2–3 art directions shown visually to the user;
- explicit user choice before one direction becomes canonical;
- design system lock in Figma;
- high-fidelity Landing/Lobby/Room/Main HUD anchor screens;
- exact approved Figma `fileKey` + `nodeId` handoff;
- only then may Chat 06 implement visual changes;
- post-implementation screenshot comparison and Chat 05 visual signoff;
- independent performance gate.

## Result

**CLOSED — SUPERSEDED BEFORE IMPLEMENTATION.**

Do not execute the original direct visual correction plan. It would violate the newer user-approved workflow by sending Chat 06 into implementation before the Figma art direction, design system and anchor screens are approved.

No gameplay/UI/protocol/runtime code change is authorized by this closed handoff.

## Replacement

New work is assigned to Chat 05 under the Figma-first Visual Redesign Program handoff created by Chat 00.

A new Chat 06 implementation handoff must only be created after the relevant Figma frames are explicitly `APPROVED` by the user.

## Source

- Latest direct user decision approving the Figma-first workflow, 2026-09-08.
- `docs/UI_VISUAL_REDESIGN_WORKFLOW_V2.md`.
- `H-20260908-092-05-PRODUCTION-VISUAL-FIDELITY-AUDIT`.
