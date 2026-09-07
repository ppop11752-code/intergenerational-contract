# UI MANDATORY — SOURCE VALIDATION V1

Status: CLOSED — USER VERIFIED (UI) / GAMEPLAY TIMING LOCKED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Mandatory presentation at Character-turn start, including obligation breakdown, forced liquidation presentation and bankruptcy outcome communication.

## AUTHORITATIVE BEHAVIOR RETAINED

- Mandatory is automatic/server-authoritative.
- No gameplay decision and no skip button.
- Reading duration is server-authoritative presentation timing, not a decision deadline.
- Current canonical Mandatory reading duration is **5 seconds**, server-authoritative.
- Mandatory may include all authoritative due obligations from the Rule Ledger.
- Status fee is not Mandatory.
- Forced liquidation, where needed, uses `75% × current spot market value`.
- If the Household still cannot meet bankruptcy-causing obligations after valid liquidation, Household bankruptcy occurs immediately and the turn does not proceed to Status/Voluntary.
- Married shared Mandatory is processed once by the earlier spouse/household representative; later spouse does not pay it again.

## USER-VERIFIED PRESENTATION — 2026-09-07

- **M1 = A:** use a large centered Mandatory presentation card over the persistent World Map.
- **M2 = C:** show **no visible Mandatory reading timer/progress/countdown**. The card auto-transitions when the authoritative server advances. The HUD must not imply a decision deadline during Mandatory.
- **M3 = A:** always show every due obligation as a full line item.
- **M4 = A:** for married Households, show Household totals only in the normal Mandatory presentation rather than spouse-attribution columns/subsections.
- **M5 = A:** if forced liquidation occurs, include a clearly separated `THANH LÝ BẮT BUỘC` section inside the same card, including resources liquidated, the 75% basis and cash raised where authoritative data is available.
- **M6 = A:** if bankruptcy occurs, transform the same card into a strong `PHÁ SẢN HỘ GIA ĐÌNH` result state with shortfall/consequence summary, then end the turn path.

## Timing decision

The user selected **B — 5 seconds** and Chat 01 locked it as D-052.

- UI follows the authoritative server phase transition.
- UI does not display a countdown/progress indicator.
- Client must not hardcode a separate local delay.
- Five seconds is presentation timing, not a gameplay decision deadline.
- The approved presentation semantics above remain unchanged.

## Gate result

Mandatory UI Source Validation Gate is CLOSED for presentation design. `docs/UI_MANDATORY_APPROVED_V1.md` is the implementation authority for the visual/interaction surface. Gameplay timing is locked at 5 seconds; implementation and runtime QA remain downstream dependencies.
