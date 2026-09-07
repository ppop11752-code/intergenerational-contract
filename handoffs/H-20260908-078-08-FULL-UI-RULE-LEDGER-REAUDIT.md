handoff_id: H-20260908-078-08-FULL-UI-RULE-LEDGER-REAUDIT
from: 00
to: 08
status: OPEN
title: Re-audit full-game Approved UI V1 coverage against Rule Ledger

## Context

The earlier H-20260907-044-08-UI-RULE-LEDGER-AUDIT found full-game UX/UI coverage incomplete because only Landing/Lobby/Room/HUD had direct user-approved design at that time.

Since then:
- Chat 05 completed H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE and reports direct user-approved V1 design coverage for all required gameplay surfaces;
- Chat 06 completed the Approved UI V1 implementation batch, including the H063-H066 contract integrations and H071 Residence client integration;
- Chat 07 completed H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA as PASS WITH WARNINGS with clean Client 68/68 PASS and production desktop/mobile/QR acceptance;
- Chat 08 independently passed H-20260907-072-08-RESIDENCE-LIFECYCLE-AUDIT;
- Chat 00 closed OI-007 under H-20260908-077-00-CLOSE-OI007-RESIDENCE;
- OI-001 through OI-007 are now CLOSED/VERIFIED.

## Required audit

Independently re-audit the current full-game Approved UI V1 against the latest Rule Ledger and current implementation. Determine whether the earlier H044 findings are now resolved, still partially open, or contradicted.

At minimum verify coverage and semantics for:
- Mandatory / forced liquidation / bankruptcy;
- Status Purchase / Noble cap / married fee and representative behavior;
- Voluntary Market / Recovery / Support / Birth;
- marriage proposal lifecycle;
- Residence / Family / Waiting Queue / reconnect;
- ASXH / pension / Support Fund / Government;
- elderly / mortality / Grief / inheritance;
- immigration / NPC takeover;
- World Event detail / Chronicle linkage;
- End Report / AverageLifeAssetScore / extinction / Host-only replay;
- authoritative timers, disabled reasons, MAX values and no client-side rule invention;
- responsive/client implementation drift where relevant to rule semantics.

## Constraints

- Audit only: DETECT -> VERIFY/FALSIFY -> CLASSIFY -> REPORT.
- Do not change gameplay, server, client or UI.
- Distinguish missing visual polish from actual Rule Ledger coverage/semantic defects.
- Do not reopen OI-001 through OI-007 without concrete evidence.

## Expected output

- PASS / PASS WITH WARNINGS / FAIL for full-game UI Rule Ledger coverage.
- Explicit disposition of the earlier H044 findings.
- Any concrete corrective handoff only if a real mismatch remains.
- Update reports/08_CURRENT.md.
- If full-game UI rule coverage passes, hand back to Chat 00 for final project-level release coordination.
