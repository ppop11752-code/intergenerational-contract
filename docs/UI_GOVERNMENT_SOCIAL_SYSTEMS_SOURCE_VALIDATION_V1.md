# UI GOVERNMENT / SOCIAL SYSTEMS — SOURCE VALIDATION V1

Status: CLOSED — USER VERIFIED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Government detail surface opened from the approved World Map, covering Government budget / reserve / public debt / debt ceiling, tax/maintenance/borrowing/debt-service context, ASXH/PAYG/Pension Reserve/Support Fund presentation, pension/fiscal crisis explanation, current Government interventions and automatic Government-turn presentation.

## CURRENT / AUTHORITATIVE BEHAVIOR — PRESERVED

- Worker ASXH contribution remains 10% personal realized net income: 5% personal funded ASXH, 3% PAYG, 2% Support Fund.
- Personal funded ASXH remains Character-tagged, included in HHA, locked/non-liquid and not Government cash.
- PAYG pension target / waterfall / Government backstop / benefit-cut and Pension Crisis rules remain authoritative.
- Support Fund continues to fund child allowance + birth subsidy with its own Government backstop rules.
- Public debt is Government liability only; debt ceiling / Fiscal Crisis / maintenance / reserve-floor / borrowing remain authoritative.
- Government remains automatic/read-only to players and keeps its own Turn Track entry.
- Current public server snapshot remains the source for Government/social-system displayed values. Client may not recompute crisis state, pension target, fund flows, debt ceiling or Government strategy.

## USER VERIFIED DECISIONS

- **G1 A** — one Government surface with 3 tabs: `TỔNG QUAN / AN SINH / CAN THIỆP`.
- **G2 A** — Tổng quan prominently shows `NGÂN SÁCH`, `QUỸ DỰ PHÒNG`, `NỢ CÔNG / TRẦN NỢ`, plus compact current-round tax, maintenance, borrowing, debt repayment and subsidy rows; Fiscal Crisis becomes a strong authoritative warning.
- **G3 B** — the An sinh tab uses one consolidated `TỔNG QUỸ AN SINH` presentation instead of three separate PAYG / Pension Reserve / Support Fund cards. This is **display aggregation only** and must not alter or imply fungibility of the three underlying authoritative mechanisms.
- **G4 B** — the 10% split diagram is not repeated in Government; detailed `5% / 3% / 2%` explanation belongs in Rules/Tutorial.
- **G5 A** — An sinh still shows pension outcome metrics: target, paid, payout ratio, Government state transfer where present, worker/elder counts and authoritative Pension Crisis warning.
- **G6 A** — `CAN THIỆP` shows current-round interventions + short authoritative history; read-only, no policy controls.
- **G7 A** — Government turn: subtle red building outline/glow + small temporary `CHÍNH PHỦ ĐANG HÀNH ĐỘNG` summary; no forced camera and no blocking modal.
- **G8 A** — mobile keeps the same 3 semantic tabs inside a bottom/full-height sheet.

## Important interpretation guardrail for G3 B

`TỔNG QUỸ AN SINH` is a UI summary value only. PAYG, Pension Reserve and Support Fund remain mechanically distinct. The implementation must not transfer balance between them, imply that one can freely cover another beyond authoritative waterfall/backstop rules, or use the aggregated display value for gameplay decisions. If the UI shows the aggregate, it may derive it only from authoritative exposed balances as a presentation sum.

## Gate result

Government/social-systems source validation is complete. Final approved spec may be implemented by Chat 06 without changing gameplay/protocol/calculations.