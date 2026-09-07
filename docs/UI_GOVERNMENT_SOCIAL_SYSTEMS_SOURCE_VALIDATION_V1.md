# UI GOVERNMENT / SOCIAL SYSTEMS — SOURCE VALIDATION V1

Status: USER VERIFICATION REQUIRED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Government detail surface opened from the approved World Map, covering:
- Government budget / reserve / public debt / debt ceiling;
- tax/maintenance/borrowing/debt-service context;
- ASXH contribution flow;
- PAYG;
- Pension Reserve;
- Support Fund;
- pension/fiscal crisis explanation;
- current Government interventions and automatic Government-turn presentation.

## CURRENT / AUTHORITATIVE BEHAVIOR — DO NOT RE-ASK

From current Rule Ledger:

### ASXH
Worker contribution = 10% personal realized net income:
- 5% → personal funded ASXH subaccount;
- 3% → PAYG;
- 2% → Support Fund.

Personal funded ASXH:
- Character-tagged;
- included in HHA;
- locked/non-liquid;
- elderly Stage7+ withdraws half remaining balance each elderly round;
- receives authoritative investment return.

### PAYG / Pension
Target pension per elder = 30% prior average worker income.
Waterfall:
1. PAYG;
2. Pension Reserve;
3. limited Government backstop;
4. benefit cut.

Government pension backstop max = 40% remaining shortfall.
Pension Crisis when payout <70% target.

### Support Fund
- funds child allowance and birth subsidy;
- Government backstop = 50% support-fund shortfall, subject to fiscal capacity/debt ceiling;
- benefits may be partial if funding is insufficient.

### Government / debt
- public debt is Government liability only; no private household debt;
- debt ceiling = 60% total resident HouseholdTotalAssets;
- maintenance = 28*PI per round;
- reserve floor concept = two rounds maintenance;
- Government may borrow within ceiling;
- required debt service beyond valid funding room can create Fiscal Crisis;
- Government has its own Turn Track entry;
- Government action presentation is automatic and must not force camera movement.

## CURRENT PUBLIC CONTRACT

Current server public snapshot exposes authoritative values sufficient for presentation, including:
- Government budget;
- reserveFloor;
- taxCollectedThisRound;
- maintenancePaidThisRound;
- borrowedThisRound;
- debtRepaidThisRound;
- subsidySpentThisRound;
- subsidyRate;
- interventions;
- fiscalCrisis;
- debt and debtCeiling;
- fiscalHistory;
- PAYG balance;
- Support Fund balance;
- Pension Reserve;
- pension target / paid / state transfer / payout ratio / crisis;
- social-security investment return;
- worker and elder counts.

Client must not reconstruct fund flows, pension target, crisis state, debt ceiling or Government strategy independently.

## EXISTING APPROVED SHELL

- Clicking Government opens Government detail.
- Government is the central architectural landmark.
- Desktop detail uses floating middle-right panel over persistent World Map.
- Mobile uses a bottom/full-height sheet.
- Government active turn uses subtle red outline/glow on the building and red+shape treatment in Turn Track.
- No forced camera movement on Government turn.

## UX RISKS

1. Personal funded ASXH must not be mistaken for a pooled Government fund.
2. PAYG, Pension Reserve and Support Fund have distinct purposes and must not collapse into one `an sinh` number.
3. Public debt must not be presented as Household/private debt.
4. Government is automatic; UI must not expose fake policy controls.
5. Crisis banners must reflect authoritative state only.

## USER VERIFICATION QUESTIONS

### G1 — Government panel structure

A. One Government panel with three tabs: `TỔNG QUAN` / `AN SINH` / `CAN THIỆP`.
B. One long scroll panel with all Government information.
C. Separate panels launched from different Government-building hotspots.

Recommendation: **A** — enough separation for complex systems without turning Government into a dashboard maze.

### G2 — Tổng quan metrics

A. Show prominent cards/rows for `NGÂN SÁCH`, `QUỸ DỰ PHÒNG`, `NỢ CÔNG / TRẦN NỢ`, then compact current-round rows for Tax collected, Maintenance, Borrowing, Debt repayment, Subsidy spending; Fiscal Crisis becomes a strong warning banner when authoritative.
B. Show only Budget + Public Debt and hide the rest under details.
C. Show a full accounting table by default.

Recommendation: **A**.

### G3 — An sinh fund presentation

A. Show three distinct system cards: `PAYG`, `QUỸ DỰ TRỮ HƯU TRÍ`, `QUỸ HỖ TRỢ`; include balances plus only the key authoritative flow/status metrics relevant to each.
B. Combine all three into one `TỔNG QUỸ AN SINH` number.
C. Use a spreadsheet-style ledger.

Recommendation: **A** — preserves the gameplay distinction between the three mechanisms.

### G4 — 10% ASXH contribution explanation

A. Add a compact flow diagram: `10% THU NHẬP RÒNG → 5% ASXH CÁ NHÂN / 3% PAYG / 2% QUỸ HỖ TRỢ`; clarify that the 5% personal account belongs to each Character and its own balance is viewed in Character detail, not as Government cash.
B. Explain the split only in Rules/Tutorial.
C. Show the percentages as plain text under PAYG only.

Recommendation: **A** — this is the simplest way to prevent pooled-vs-personal confusion.

### G5 — Pension state / crisis

A. In `AN SINH`, show `MỤC TIÊU LƯƠNG HƯU`, `ĐÃ CHI`, `TỶ LỆ CHI TRẢ`, Government state transfer where present, and worker/elder counts; authoritative Pension Crisis gets a clear warning when payout <70% target.
B. Show only whether Pension Crisis is active.
C. Show only PAYG balance and leave pension outcome to Niên sử.

Recommendation: **A**.

### G6 — Government interventions

A. `CAN THIỆP` shows compact current-round intervention entries and relevant authoritative subsidy/recovery/resource-investment context, plus a short history list; these are read-only and clearly automatic.
B. Show interventions only as Chronicle text.
C. Add buttons that look like policy controls but are disabled for players.

Recommendation: **A**.

### G7 — Government turn presentation

A. When Government Turn Track entry becomes active: subtle red building outline/glow + small temporary `CHÍNH PHỦ ĐANG HÀNH ĐỘNG` presentation summarizing authoritative actions; no forced camera, no blocking modal.
B. Open Government panel automatically every Government turn.
C. Only Turn Track highlight, no action presentation.

Recommendation: **A**.

### G8 — Mobile Government

A. Same three semantic tabs inside a bottom/full-height sheet; top summary remains compact, deeper fund/intervention sections scroll within the sheet.
B. Reduce mobile Government to Budget + Debt only.
C. Use separate mobile screens for each fund.

Recommendation: **A**.

## Gate

Do not create final Government/social-systems spec or Chat 06 implementation handoff until G1–G8 are directly approved by the user.