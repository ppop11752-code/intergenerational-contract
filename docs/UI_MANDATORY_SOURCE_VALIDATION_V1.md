# UI MANDATORY — SOURCE VALIDATION V1

Status: USER VERIFICATION REQUIRED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Mandatory presentation at Character-turn start, including obligation breakdown, forced liquidation presentation and bankruptcy outcome communication.

## CURRENT / AUTHORITATIVE BEHAVIOR — DO NOT RE-ASK

From latest direct decisions + Rule Ledger:

- Character turn flow starts with Mandatory presentation.
- Mandatory obligations are automatic/server-authoritative.
- Mandatory has **no gameplay decision** and no skip button.
- Mandatory remains visible for a configured reading duration; baseline server v5.0 is 7 seconds.
- The reading duration is presentation timing only, not a decision deadline.
- Mandatory may include Living Cost, Tax, ASXH contribution, dependent-child support, conditional elderly-parent support, Grief Fee, Epidemic Medical Fee and other locked mandatory obligations.
- Status fee is not Mandatory.
- The engine aggregates all Mandatory obligations due to the economic Household using authoritative attribution rules.
- If cash is insufficient for bankruptcy-causing Mandatory obligations, eligible inventory may be forcibly liquidated at `75% × current spot market value`.
- If the Household still cannot pay after valid liquidation, Household bankruptcy occurs immediately.
- Married Household bankruptcy affects both spouses and cancels their remaining turns.
- For a married Household, shared Mandatory is processed once by the earlier spouse/household representative; the later spouse does not pay shared Mandatory again.
- Tax/ASXH that are Character-defined remain attributable per Character but are paid from shared Household cash.
- If bankruptcy occurs, the turn does not proceed to Status or Voluntary.

## HISTORICAL / MIGRATION-NORMALIZED UX

Migration Pack normalized the Mandatory UI as:
- presentation-only;
- no skip;
- auto transition after a short reading duration;
- show obligation breakdown;
- show forced liquidation if it occurred;
- bankruptcy terminates the turn before Status/Voluntary.

The old client baseline only showed a basic explanatory sentence and was explicitly audited as insufficient.

## CROSS-SURFACE CONTRADICTION TO RESOLVE

Approved HUD V1 says phase/timer remains visible and becomes more prominent when action is required.

For Mandatory, **there is no action required**. Therefore the Mandatory HUD treatment must not look like a decision countdown. It may show phase identity and presentation progress/remaining reading time, but must visually distinguish this from Status/Voluntary action timers.

## USER VERIFICATION QUESTIONS

### M1 — Mandatory placement

A. Large centered presentation card over the World Map.
B. Middle-right floating panel consistent with Room V1 world panels.
C. Wide lower-third presentation card, leaving Government/settlement center visible.

Recommendation: **A**. Mandatory is a transient compulsory reading state and deserves stronger focus than optional detail panels, without becoming a full-screen takeover.

### M2 — Reading progress / HUD treatment

A. Show `BẮT BUỘC · ĐANG XỬ LÝ` with a subtle progress bar/ring and no large second-by-second countdown.
B. Show `BẮT BUỘC · 7s` countdown but explicitly label `TỰ ĐỘNG TIẾP TỤC`.
C. Show no timing at all; panel simply auto-transitions when server advances.

Recommendation: **A**. It communicates why the panel remains on-screen while avoiding decision-timer semantics.

### M3 — Obligation breakdown density

A. Always show every due obligation as a full line item.
B. Show grouped summary rows by obligation type, with expandable/hover details where attribution is useful.
C. Show only total Mandatory amount unless liquidation/bankruptcy happens.

Recommendation: **B**. It preserves explainability without overwhelming common turns.

### M4 — Married Household attribution

A. Show only Household totals.
B. Show shared Household obligations first, then a compact `THEO NHÂN VẬT` sub-section for Character-defined Tax/ASXH attribution.
C. Split the whole panel into two spouse columns.

Recommendation: **B**. It matches the economic-Household rule while still explaining why per-Character charges exist.

### M5 — Forced liquidation presentation

A. Insert a clearly separated `THANH LÝ BẮT BUỘC` section inside the same Mandatory card, listing resource units sold, 75% liquidation basis and cash raised.
B. Use a second short modal after the obligation panel.
C. Only show a one-line `Đã tự động thanh lý tài nguyên` notice.

Recommendation: **A**. It keeps the causal chain visible: obligations → cash shortage → liquidation → resulting balance.

### M6 — Bankruptcy outcome

A. Transform the same Mandatory card into a strong `PHÁ SẢN HỘ GIA ĐÌNH` outcome state, summarize unpaid shortfall/consequence, then transition out of the turn.
B. Close Mandatory and show a separate full-screen bankruptcy scene.
C. Use a small toast/banner and immediately move on.

Recommendation: **A**. It is explicit enough for a terminal turn outcome without unnecessarily replacing the persistent world shell.

## Gate

Do not produce final Mandatory design or implementation handoff until M1–M6 are directly approved by the user.
