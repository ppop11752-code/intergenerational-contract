handoff_id: H-20260908-092-05-PRODUCTION-VISUAL-FIDELITY-AUDIT
from: 00
to: 05
status: OPEN
title: Audit production visual fidelity against user-approved UI/UX illustrations

## Trigger
Direct user feedback after playing published v1.0.0: the game is visually poor despite prior detailed UI/UX illustrations and repeated implementation passes.

## Context
`reports/05_CURRENT.md` explicitly states source/design approval coverage is complete but actual client implementation and visual fidelity of approved surfaces were unverified at the Chat 05 stage. Later release gates concentrated on functional/runtime semantics, responsive behavior, authoritative state, navigation and regression, but did not establish full visual parity against the user-approved illustrations.

## Required work
Perform a production-first visual fidelity audit against the direct user-approved UI/UX illustrations/specs for the full player-facing path. Do not redesign gameplay. Determine where the published UI materially diverges from approved composition, hierarchy, spacing, typography, art usage, scale, density, polish, transitions and overall visual character.

At minimum inspect:
- Landing / Lobby / Room / HUD;
- Mandatory / Status / Voluntary shell;
- Market / Recovery / Support / Birth / Marriage;
- Residence / Family / map;
- Government/social systems;
- Chronicle / World Event;
- lifecycle/death/inheritance states;
- End Report;
- desktop and mobile presentation.

## Output
- Classify findings by severity: major visual mismatch / moderate fidelity drift / polish-only.
- Identify exact approved source/illustration each mismatch violates.
- Separate visual-design drift from implementation bugs and from personal taste/new redesign requests.
- Produce a prioritized correction spec for Chat 06 using existing approved design; do not invent a new art direction unless a genuine ambiguity is found.
- Update `reports/05_CURRENT.md`.
- Create corrective handoff(s) to Chat 06 if implementation mismatch is confirmed.

## Constraints
- Do not change gameplay, protocol or authoritative semantics.
- Do not treat functional QA success as evidence of visual fidelity.
- User feedback is a new authoritative signal that v1.0.0 visual quality is not acceptable; release publication status remains historical, but post-release visual defects may require v1.0.1/v1.1.0.
