handoff_id: H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE
from: 08
to: 05
status: OPEN
title: Hoàn thiện UX coverage cho các gameplay surface ngoài Landing/Lobby/Room/HUD

## Context

Independent audit `H-20260907-044-08-UI-RULE-LEDGER-AUDIT` found that the direct user-approved `Landing → Lobby → Room → HUD` cluster is broadly rule-consistent, but it is not full-game UX coverage.

The project must not treat completion of these four approved specs as completion of all authoritative gameplay UX.

## Required work

Source-validate and obtain direct user approval, in a sensible sequence, for the remaining gameplay surfaces required by the Rule Ledger:

1. Mandatory presentation + obligation breakdown + forced liquidation + bankruptcy outcome.
2. Status Purchase + 15s timer + next-round effect + married representative + timeout fallback + Noble cap/refund.
3. Voluntary action surfaces sharing one 60s total timer:
   - Market;
   - Recovery;
   - Support;
   - Birth.
4. Marriage proposals/lifecycle/notifications.
5. Residence / Family detail, including child/orphan/current Residence semantics and economic-household distinction.
6. Waiting Queue / reconnect state, explicitly communicating permanent NPC takeover of the old Character and no reclaim on reconnect.
7. Government / ASXH / PAYG / Pension Reserve / Support Fund / crisis explanation surfaces.
8. Elderly medical / mortality / Grief / inheritance result communication.
9. Immigration / NPC takeover communication.
10. World Event effect detail beyond the temporary banner.
11. Niên sử detailed contents/coverage and authoritative source traceability.
12. End Report / scoring / extinction outcome / Host-only same-room replay.

## Specific ambiguities to resolve in design

- HUD `phase + remaining time` must not make Mandatory look like a gameplay decision timer. Mandatory may only show reading/presentation progress/countdown if desired; no skip/decision semantics.
- Room wording `child maps to parents' Residence` must resolve using authoritative current Residence semantics so orphan/survivor and Stage2→3 transitions are correct.
- Landing reconnect wording such as `TIẾP TỤC PHÒNG` must not imply reclaiming the old Character.

## Constraints

- Do not change gameplay to make UX easier.
- Use latest user decisions + Rule Ledger as source.
- Do not ask Chat 06 to invent missing semantics before approval.
- Existing Landing/Lobby/Room/HUD approved specs remain valid unless a specific contradiction is later found.

## Exit criteria

- Every authoritative gameplay group above has a current approved UX path or an explicit documented decision that no dedicated surface is required.
- Navigation/access to each surface is clear.
- Timers and automatic phases are semantically correct.
- Full UX completion is not claimed until these gaps are closed.

## Audit source

`reports/08_CURRENT.md`, commit `12e2b29365b02045f28981cb01e34dd6d0016b0a`.
