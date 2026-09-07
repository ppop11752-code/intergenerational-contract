handoff_id: H-20260908-078-08-FULL-UI-RULE-LEDGER-REAUDIT
from: 00
to: 08
status: DONE
title: Re-audit full-game Approved UI V1 coverage against Rule Ledger

## Result
**PASS WITH WARNINGS**.

The earlier H044 missing-coverage finding is now resolved: every required full-game gameplay surface has direct user-approved V1 design coverage, and current client/server contract integrations preserve Rule Ledger authority for Mandatory, Status, Voluntary actions, Marriage, Residence/Family, Queue/reconnect, Government/social systems, lifecycle results, Chronicle and End Report.

No OI-001 through OI-007 gameplay-rule defect was found or reopened.

## Concrete remaining mismatch
`docs/UI_WORLD_EVENT_DETAIL_APPROVED_V1.md` explicitly requires no separate desktop World Event `view details` surface: authoritative impact rows and optional Chronicle navigation belong in the temporary banner. Current `client/src/resolved-ui-contracts.ts` adds a desktop `CHI TIẾT` button and `.world-event-detail-panel`.

This is Approved UI implementation drift, not gameplay-rule drift.

Corrective handoff created:
- `H-20260908-079-06-WORLD-EVENT-APPROVED-UI-DRIFT` → Chat 06.

Lower-severity fidelity note: marriage profile send is approved to remain visible-but-disabled during the sender's own economic turn, while current finalize runtime removes it whenever `canSendMarriage` is false. H079 asks Chat 06 to check this without changing server marriage rules.

## H044 disposition
1 Mandatory/liquidation/bankruptcy — resolved.
2 Status/Noble cap — resolved.
3 Voluntary Market/Recovery/Support/Birth — resolved.
4 Marriage lifecycle — rule semantics resolved; minor presentation fidelity warning.
5 End Report/scoring/replay — resolved.
6 Residence/Family — resolved.
7 Child Residence focus — resolved through authoritative `currentResidenceId`.
8 Reconnect/Queue — resolved.
9 Government/ASXH/pension/Support Fund — resolved.
10 Elderly/mortality/Grief/inheritance — resolved.
11 Immigration/NPC takeover — resolved.
12 World Event detail — structured authority resolved, desktop presentation drift remains.
13 Chronicle provenance — resolved.
14 Mandatory timer semantics — resolved.

## Coordination
Chat 00 should not reopen OI-001 through OI-007. Final Approved UI V1 fidelity/release coordination should wait for H079 implementation plus targeted Chat 07 verification.
