# UI DESIGN APPROVAL WORKFLOW V2

Status: ACTIVE — USER-DIRECTED
Owner: 05 — UI/UX & ART

This workflow is mandatory before Chat 05 proposes or locks each new UI screen/cluster.

## Purpose

Prevent old prototype assumptions, Migration Pack normalization, current implementation, or QA status from silently becoming design truth. Every materially relevant UI decision must be traced, classified, and, when uncertain, re-validated with the user before design options are proposed.

## Scope order

Current cluster remains:
1. Landing
2. Lobby
3. Room / World shell
4. HUD

Do not expand to later screens until the user approves this cluster.

Landing V1 was approved after extensive historical reconciliation and remains approved unless a later source audit reveals a material contradiction requiring explicit user review.

## Mandatory pre-design gate

Before proposing design alternatives for a new screen/cluster, Chat 05 must review:

1. The relevant parts of the original conversation `Game mô phỏng nhân sinh`.
2. The Project Migration Pack, especially UI/UX spec, Decision Log, Source Index, combined pack, and any relevant current canonical docs.
3. Historical UI prototype changes and decisions across V5, V5.1, V6, V7, V8, V9, V10, V10.1.
4. Current implementation only as an implementation reference, never as automatic design authority.
5. Existing direct user decisions and reconciliation documents created during the current approval phase.

## Decision classification

Every relevant design statement should be classified as one of:

- `CURRENT_USER_CONFIRMED` — directly confirmed by the user in the current design-approval phase.
- `HISTORICAL_USER_CONFIRMED` — direct historical user decision that has not been superseded.
- `MIGRATION_NORMALIZED` — recorded in Migration Pack/spec but direct user confirmation is not independently verified.
- `PROTOTYPE_ONLY` — appears in V5–V10.1 implementation/prototype only.
- `REJECTED_OR_SUPERSEDED` — explicitly rejected, superseded, or conflicts with a newer user decision.
- `CONFLICTING` — sources disagree and no newer direct user decision resolves them.
- `UNVERIFIED` — materially relevant but source/intent is not reliable enough to use.

## User verification gate

Before design proposals:

1. Do not re-ask items already covered by `CURRENT_USER_CONFIRMED` unless a genuine contradiction is discovered.
2. Ask the user only about materially relevant `MIGRATION_NORMALIZED`, `PROTOTYPE_ONLY`, `CONFLICTING`, or `UNVERIFIED` items.
3. Phrase questions as concrete retain/remove/modify or specific alternatives wherever possible.
4. Explain briefly why the item needs re-validation when the ambiguity is not obvious.
5. Record the resulting decision in the current design decision/reconciliation docs.

No material uncertain item may be silently resolved by Chat 05.

## Design proposal gate

Only after the historical/source verification gate is clear enough:

1. Describe the current implementation briefly.
2. Identify layout, hierarchy, style, color, art, interaction, motion and responsive weaknesses.
3. Propose 2–3 concrete design directions when multiple reasonable choices remain.
4. Explain pros/cons.
5. Give a recommendation.
6. Wait for direct user choice/feedback.

## Approval and handoff

After user approval:

1. Write/update a screen-specific approved design spec.
2. Update `reports/05_CURRENT.md` AI SPECIALIST REPORT.
3. Create a handoff to Chat 06 only for the approved screen/cluster.
4. Chat 06 must not extrapolate redesign choices to unapproved screens.
5. Chat 07 QA PASS does not substitute for user design approval.

## Source rules

Priority:
1. Newest direct user decision.
2. Direct user-confirmed design decision/reconciliation docs from the current approval phase.
3. Canonical Project gameplay/protocol rules where UI semantics depend on them.
4. Historical direct user decisions.
5. Migration Pack normalization.
6. Current implementation/tests.
7. Frozen V5–V10.1 prototypes.

The Migration Pack remains an important reconstruction source, but a normalized UI statement is not automatically treated as direct user approval when that provenance is unclear.

## Non-negotiable constraints

- Do not change gameplay.
- Do not change protocol.
- Do not change authoritative timers.
- Do not create hidden gameplay state through UI.
- Do not let visual design invent gameplay semantics.
- Do not call a screen final because it was coded or QA passed.
- Do not hand off an unapproved redesign to Chat 06.
