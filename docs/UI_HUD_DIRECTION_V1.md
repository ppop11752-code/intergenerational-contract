# UI HUD — DIRECTION V1

Status: USER-CONFIRMED DIRECTION / NOT YET FINAL SCREEN APPROVAL
Date: 2026-09-07
Owner: 05 — UI/UX & ART

## Selected direction

User selected **HDA — Cụm thông tin nổi** as the base HUD composition.

## Core direction

- Do **not** use a dense full-width HUD bar or a continuous top frame spanning the viewport.
- HUD information is split into several compact floating clusters over the World Map.
- Clusters use darker fantasy/pixel chrome but remain visually light enough that the bright World Map stays dominant.
- The upper-right always-informational minimap from `docs/UI_ROOM_APPROVED_V1.md` keeps its own reserved space and must not be covered by HUD clusters.
- The left edge remains reserved for the approved Turn Track.
- Phase/timer is an adaptive floating cluster that may expand/emphasize when it is the local player's turn and reduce emphasis while waiting.
- Important World Events remain a separate compact temporary banner, not a persistent HUD cell.
- Niên sử and Settings remain accessible from the HUD/shell, but their exact floating placement is still subject to final detail approval.

## Confirmed HUD semantics carried forward

- Round/Year are part of the core macro HUD.
- Population uses a small persistent trend arrow; detailed delta is hover/tap detail.
- Inflation uses a small persistent trend arrow; detailed delta is hover/tap detail.
- Public debt and debt ceiling are both directly visible in compact HUD.
- Phase/timer remains visible to all players; it is visually stronger on the local player's turn and reduced while waiting, with current actor context where appropriate.
- Healthy network state is hidden; degraded/disconnected/reconnecting states surface warnings only.
- No permanent Player Bar.
- No permanent Help `?` control inherited from the old implementation.
- No permanent Music/SFX HUD buttons; Settings owns those controls.
- World Event detail may be revealed by hover/focus/tap on the temporary banner.
- Mobile uses a two-level HUD: primary row always visible + expandable secondary information.

## Design intent

HDA should read as a set of information instruments floating over the world rather than a website/dashboard header. Spacing between clusters is intentional and should expose map pixels between them.

The visual hierarchy should be:
1. current phase/timer when action is required;
2. compact macro simulation state;
3. Round/Year context;
4. Niên sử/Settings utilities;
5. exception-only World Event/network warnings.

## Not yet approved

Final direct user approval is still required for:
- exact location of the phase/timer cluster;
- exact grouping of Round/Year vs Population/Inflation/Debt;
- Niên sử and Settings placement relative to the upper-right minimap;
- World Event banner anchor;
- cluster frame density/ornament and compact spacing;
- exact mobile primary-row contents and expand affordance.

No HUD implementation handoff to Chat 06 may be created until these details are approved.
