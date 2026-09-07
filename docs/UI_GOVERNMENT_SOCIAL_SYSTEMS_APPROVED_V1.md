# UI GOVERNMENT / SOCIAL SYSTEMS — APPROVED V1

Status: USER-APPROVED DESIGN
Date: 2026-09-07
Owner: 05 — UI/UX & ART

## Authority

This is the approved Government/social-systems UX source for implementation. It does not change gameplay, Government strategy, ASXH/PAYG/Support Fund/Pension Reserve mechanics, public debt rules, timers or authoritative calculations.

## Entry / shell

- Clicking the Government building opens the Government detail surface.
- Desktop uses the approved floating middle-right world panel pattern over the persistent map.
- Mobile uses a bottom/full-height sheet.
- Government remains read-only/automatic for players.

## Tabs

Three tabs:
1. `TỔNG QUAN`
2. `AN SINH`
3. `CAN THIỆP`

## TỔNG QUAN

Primary metrics:
- `NGÂN SÁCH`
- `QUỸ DỰ PHÒNG`
- `NỢ CÔNG / TRẦN NỢ`

Secondary current-round rows:
- Thuế đã thu
- Bảo trì
- Vay mới
- Trả nợ
- Trợ giá / chi hỗ trợ liên quan theo authoritative snapshot

Authoritative Fiscal Crisis becomes a strong visible warning. Public debt must always be worded as Government/public debt, never Household/private debt.

## AN SINH

### Consolidated presentation

The user approved one consolidated `TỔNG QUỸ AN SINH` presentation instead of three separate PAYG / Pension Reserve / Support Fund cards.

This aggregation is presentation-only:
- underlying PAYG, Pension Reserve and Support Fund remain mechanically distinct;
- the client must not pool or move balances;
- the aggregate may be shown only as a display sum of authoritative exposed balances;
- gameplay logic continues to use the authoritative separate funds/waterfalls.

Do not repeat the detailed `10% → 5% / 3% / 2%` contribution diagram here. That explanation belongs in Rules/Tutorial.

### Pension outcome metrics

Always show authoritative:
- `MỤC TIÊU LƯƠNG HƯU`
- `ĐÃ CHI`
- `TỶ LỆ CHI TRẢ`
- Government state transfer/backstop where present
- number of Workers
- number of Elders

If authoritative Pension Crisis is active, show a clear warning treatment.

## CAN THIỆP

Read-only list of:
- current-round Government interventions;
- relevant subsidy / recovery / resource-investment context exposed by the server;
- short recent history.

No policy buttons, fake disabled controls or client-authored strategy decisions.

## Government turn presentation

When Government becomes current Turn Track entry:
- Government building gets the already approved subtle red outline/glow;
- show a small temporary `CHÍNH PHỦ ĐANG HÀNH ĐỘNG` presentation summarizing authoritative actions/results;
- do not force camera focus;
- do not auto-open the Government panel;
- do not block other players with a modal/cinematic.

## Mobile

Keep the same 3 tabs in a bottom/full-height sheet. Summary remains compact at the top; deeper content scrolls within the sheet.

## Data / implementation constraints

- Consume authoritative public snapshot values.
- Do not recompute pension target, payout ratio, crisis state, debt ceiling, Government strategy or fund flows client-side.
- `TỔNG QUỸ AN SINH` is a visual aggregate only and must never become an authoritative economic account.
- No gameplay/protocol/timer changes.