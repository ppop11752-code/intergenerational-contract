handoff_id: H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE
from: 08
to: 05
status: DONE
title: Hoàn thiện UX coverage cho các gameplay surface ngoài Landing/Lobby/Room/HUD

## Context

Independent audit `H-20260907-044-08-UI-RULE-LEDGER-AUDIT` found that the direct user-approved `Landing → Lobby → Room → HUD` cluster was broadly rule-consistent, but it was not full-game UX coverage.

## Required work

Source-validate and obtain direct user approval for:

1. Mandatory presentation + obligation breakdown + forced liquidation + bankruptcy outcome.
2. Status Purchase + timer/next-round/married/fallback/Noble cap-refund semantics.
3. Voluntary shell + Market / Recovery / Support / Birth.
4. Marriage proposals/lifecycle/notifications.
5. Residence / Family detail.
6. Waiting Queue / reconnect / permanent NPC takeover / no reclaim.
7. Government / ASXH / PAYG / Pension Reserve / Support Fund / crisis explanation.
8. Elderly medical / mortality / Grief / inheritance.
9. Immigration / NPC takeover communication.
10. World Event effect presentation.
11. Niên sử detailed coverage.
12. End Report / scoring / extinction / Host-only replay.

## Result — 2026-09-07

**DONE — SOURCE/DESIGN COVERAGE COMPLETE.**

All required gameplay groups now have direct user-approved V1 UX sources recorded in `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`.

Resolved specific ambiguities:
- Mandatory is presentation-only with no decision countdown/skip; canonical duration is 5s.
- Character/Turn Track focus resolves to current authoritative Residence rather than hard-coded parents' Residence.
- Landing reconnect copy now says `KẾT NỐI LẠI PHÒNG` and explicitly communicates permanent NPC takeover/no reclaim.
- World Event uses concrete effects in the main banner; no separate desktop detail surface.
- End Report uses authoritative rankings/endingReason and never declares a standard winner on early extinction.

Final design surface added:
- `docs/UI_END_REPORT_APPROVED_V1.md`
- implementation handoff `H-20260907-062-06-END-REPORT-DESIGN-IMPLEMENTATION`

Coverage source:
- `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md` — `COMPLETE — SOURCE/DESIGN APPROVAL COVERAGE`.

## Verification boundary

This handoff is complete at **source/design approval level only**.

It does not claim:
- Chat 06 implementation complete;
- structured server contract sufficiency for every approved UI field;
- integration/E2E/visual QA complete;
- release readiness.

Remaining implementation/verification belongs to Chat 06 / Chat 03 where narrow contract additions are required / Chat 07 QA, with Chat 08 available for independent re-audit when requested.

## Audit source

Original source: `reports/08_CURRENT.md`, commit `12e2b29365b02045f28981cb01e34dd6d0016b0a`.
