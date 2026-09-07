# UI HUD — SOURCE VALIDATION V1

Status: USER VERIFICATION REQUIRED
Date: 2026-09-07
Owner: 05 — UI/UX & ART

This document applies `docs/UI_DESIGN_APPROVAL_WORKFLOW_V2.md` before concrete HUD design alternatives are produced.

## Scope

Persistent/adaptive in-game HUD only. Room / World shell spatial structure is already approved separately in `docs/UI_ROOM_APPROVED_V1.md`.

## CURRENT_USER_CONFIRMED

Do not re-ask unless a real contradiction appears:

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

- The user accepted the core macro HUD direction containing Round/Year, Population, Inflation and Public Debt information.
- The user explicitly required the **right-side persistent utility to be Settings (gear)** rather than a cluster of miscellaneous utility buttons.
- Niên sử is accessed from the HUD.
- The separate Player Bar was explicitly removed; player information is accessed contextually, including through the player's Residence.
- Historical World Event behavior requested an event name plus detailed explanation on hover.

## SUPERSEDED HISTORICAL DECISION

Historical user decision once kept `World Event` as an always-present HUD cell and showed `KHÔNG` when no event.

This is superseded by the newer direct decision:
- important World Events use a **separate compact temporary banner**.

Carry forward the old intent for detail access where compatible:
- when a World Event banner is present, hover/focus/tap may reveal more event detail;
- do not restore an always-on World Event HUD cell unless the user explicitly changes the newer decision.

## MIGRATION_NORMALIZED / NOT DIRECTLY VERIFIED

Migration Pack `04_UI_UX_SPEC.md` normalizes the HUD as:
- Round;
- Year;
- Population **+ trend**;
- Inflation **+ trend**;
- Public debt / ceiling;
- World Event;
- Niên sử button;
- Settings gear;
- no permanent Music/SFX icons;
- mobile HUD compact/scrollable.

Current implementation additionally shows:
- phase + timer as a persistent HUD segment;
- a Help `?` button;
- event placeholder/value.

Not every presentation detail above has direct-user provenance.

## Resolved without another question

- Persistent World Event cell: rejected by the newer temporary-banner decision.
- Permanent Player Bar/personal cash/HHA strip: rejected by direct user decision.
- Permanent Music/SFX buttons: rejected.
- Persistent Help `?` button from the current implementation is **not authoritative** and conflicts with the older direct preference that the right-side persistent utility be Settings only. Do not carry it forward as a default HUD control; tutorial/help guidance can remain contextual or be reached through an approved non-HUD route.
- Niên sử stays reachable from HUD, but its exact button visual treatment is a later concrete-design choice.
- Settings remains a HUD utility control, but exact pixel placement may shift to coexist with the approved upper-right minimap.

## User verification questions still open

1. **Population / Inflation trend indicators:** should the HUD preserve the Migration-Pack `+ trend` information, and how persistently?
2. **Public debt / ceiling visibility:** should both current debt and ceiling remain directly visible in compact HUD, or should the ceiling become secondary detail?
3. **Phase/timer outside the local player's turn:** should every player always see the authoritative current phase + remaining time, or should the timer become less prominent/hidden while waiting?
4. **Connection/network state:** should the in-game HUD carry a normal connection indicator, or only surface a warning when connection becomes problematic?
5. **Mobile HUD overflow model:** Migration Pack says compact/scrollable, but the user has since required layout-specific mobile design rather than simply shrinking desktop. Need direct approval for the compact-mobile behavior.

## Gate

Do not propose final HUD composition alternatives until the five remaining materially relevant presentation ambiguities are resolved by the user.
