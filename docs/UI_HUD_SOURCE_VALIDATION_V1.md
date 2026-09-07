# UI HUD — SOURCE VALIDATION V1

Status: CLOSED — USER VERIFIED
Date: 2026-09-07
Owner: 05 — UI/UX & ART

This document applies `docs/UI_DESIGN_APPROVAL_WORKFLOW_V2.md` before concrete HUD design alternatives are produced.

## Scope

Persistent/adaptive in-game HUD only. Room / World shell spatial structure is already approved separately in `docs/UI_ROOM_APPROVED_V1.md`.

## CURRENT_USER_CONFIRMED

- HUD remains top-oriented but is split into meaningful visual clusters rather than a dense full-width dashboard strip.
- Default HUD is compact/adaptive.
- Phase/timer emphasis changes inside the HUD as gameplay phase importance changes.
- Important World Events use a **separate compact temporary banner**, not a full-screen takeover.
- Niên sử direction is two tabs: `HÀNH TRÌNH` + `THẾ GIỚI`.
- No permanent separate Player Bar; personal/household information is contextual or lives in relevant Residence/feature surfaces.
- Music and SFX are controlled separately in Settings; no permanent Music/SFX buttons on the HUD.
- Use pixel/mono/data typography for HUD numbers, readable UI typography for labels/copy, and dedicated pixel-art icons rather than emoji.
- Room V1 reserves the left edge for the Turn Track and upper-right for the always-informational minimap; HUD layout must coexist with both.

## HISTORICAL_USER_CONFIRMED

Recovered direct user decisions from the original `Game mô phỏng nhân sinh` conversation that remain compatible unless superseded:

- Core macro HUD direction contains Round/Year, Population, Inflation and Public Debt information.
- The right-side persistent utility is Settings (gear), not a miscellaneous utility cluster.
- Niên sử is accessed from the HUD.
- Separate Player Bar is removed; player information is accessed contextually, including through the player's Residence.
- Historical World Event behavior requested event detail access on hover/focus.

## SUPERSEDED HISTORICAL DECISION

Historical always-on `World Event` HUD cell is superseded by the newer direct decision:
- important World Events use a **separate compact temporary banner**.

When a World Event banner is present, hover/focus/tap may reveal more event detail. Do not restore an always-on World Event HUD cell unless the user explicitly changes this newer decision.

## USER-VERIFIED SOURCE VALIDATION — 2026-09-07

The user resolved the five remaining HUD ambiguities:

- **H1 — Population / Inflation trends:** use persistent small trend arrows in compact HUD; detailed numeric delta appears on hover/tap rather than always occupying space.
- **H2 — Public debt / ceiling:** compact HUD shows **both current public debt and debt ceiling directly**.
- **H3 — Phase/timer outside the local player's turn:** all players still see current authoritative phase + remaining time, but it is visually reduced while waiting; when it is the local player's turn, phase/timer becomes much more prominent. Waiting state should also emphasize the current acting player/person where appropriate.
- **H4 — Connection/network state:** normal healthy connection is not persistently displayed. Show warning/banner/icon only for degraded connection, disconnect or reconnect states.
- **H5 — Mobile HUD:** use a two-level mobile model: a primary row always shows important information; secondary/less urgent HUD information appears through an expand interaction. Do not use a pure horizontally scrollable desktop-like HUD as the default mobile treatment.

## Resolved historical / implementation assumptions

- Persistent World Event cell: rejected by newer temporary-banner decision.
- Permanent Player Bar/personal cash/HHA strip: rejected.
- Permanent Music/SFX buttons: rejected.
- Persistent Help `?` button from current implementation is not authoritative and should not be part of the default HUD.
- Settings remains the persistent utility control, but exact placement must coexist with the approved upper-right minimap.
- Population/Inflation trends are retained in compact form with detail-on-demand.
- Public debt and ceiling both remain directly readable.
- Phase/timer remains globally visible but adaptively emphasized.
- Network state is exception-only rather than always-on.
- Mobile HUD uses primary + expandable secondary layers.

## Gate result

Source Validation Gate is CLOSED. Chat 05 may now audit the current implementation and present concrete HUD composition alternatives. No HUD design may be handed to Chat 06 until the user selects and approves a concrete HUD composition.
