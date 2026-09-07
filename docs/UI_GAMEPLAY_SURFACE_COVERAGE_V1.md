# UI GAMEPLAY SURFACE COVERAGE V1

Status: IN PROGRESS
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Purpose

Track direct UX approval coverage for authoritative gameplay surfaces outside the already approved `Landing → Lobby → Room → HUD` cluster.

The approved shell specs do **not** imply full-game UX completion.

## Source priority

1. Latest direct user decision.
2. `docs/RULE_LEDGER.md` and current canonical Project docs.
3. Current source code / authoritative snapshot contracts.
4. Tests.
5. Historical Migration Pack / V5–V10.1 prototypes as non-authoritative reference.

## Coverage sequence

| # | Gameplay surface group | Current UX status | Next action |
|---|---|---|---|
| 1 | Mandatory presentation / obligations / liquidation / bankruptcy | **USER-APPROVED V1** — `docs/UI_MANDATORY_APPROVED_V1.md`; canonical duration 5s | Implementation/QA follow handoffs |
| 2 | Status Purchase | **USER-APPROVED V1** — `docs/UI_STATUS_APPROVED_V1.md` | Chat 06 implement |
| 3 | Voluntary shell | **USER-APPROVED V1** — `docs/UI_VOLUNTARY_APPROVED_V1.md` | Chat 06 implement |
| 3a | Market | **USER-APPROVED V1** — `docs/UI_MARKET_APPROVED_V1.md` | Chat 06 implement |
| 3b | Recovery | **USER-APPROVED V1** — `docs/UI_RECOVERY_APPROVED_V1.md` | Chat 06 implement |
| 3c | Support | **USER-APPROVED V1** — `docs/UI_SUPPORT_APPROVED_V1.md` | Chat 06 implement |
| 3d | Birth | **USER-APPROVED V1** — `docs/UI_BIRTH_APPROVED_V1.md` | Chat 06 implement |
| 4 | Marriage lifecycle / proposals / notices | **USER-APPROVED V1** — `docs/UI_MARRIAGE_APPROVED_V1.md` | Chat 06 implement |
| 5 | Residence / Family / current Residence semantics | **USER-APPROVED V1** — `docs/UI_RESIDENCE_FAMILY_APPROVED_V1.md` | Chat 06 implement |
| 6 | Waiting Queue / reconnect / NPC takeover / no reclaim | **USER-APPROVED V1** — `docs/UI_WAITING_QUEUE_RECONNECT_APPROVED_V1.md` | Chat 06 implement |
| 7 | Government / ASXH / PAYG / reserves / support/crisis | **USER-APPROVED V1** — `docs/UI_GOVERNMENT_SOCIAL_SYSTEMS_APPROVED_V1.md` | Chat 06 implement via `H-20260907-057-06-GOVERNMENT-SOCIAL-SYSTEMS-DESIGN-IMPLEMENTATION` |
| 8 | Elderly medical / mortality / Grief / inheritance results | **SOURCE VALIDATION ACTIVE** — `docs/UI_ELDERLY_MORTALITY_GRIEF_INHERITANCE_SOURCE_VALIDATION_V1.md` | Obtain direct E1–E8 approval |
| 9 | Immigration / NPC takeover communication | NOT DIRECTLY APPROVED | Source validate after elderly/mortality |
| 10 | World Event effect detail | PARTIAL — temporary banner approved | Approve detail surface |
| 11 | Niên sử detailed contents / provenance | PARTIAL — entry + two tabs approved | Approve detailed contents |
| 12 | End Report / scoring / extinction / Host replay | NOT DIRECTLY APPROVED | Source validate |

## Cross-surface constraints already locked

- No gameplay/protocol/timer changes to make UI easier.
- Mandatory is presentation-only, no skip/decision timer/countdown; canonical server presentation duration = 5 seconds.
- Status uses authoritative 15s; Voluntary uses one authoritative 60s total timer.
- Marriage pending has no expiry countdown; accepted proposal is binding and settles end acceptedRound.
- Residence focus uses current authoritative Residence; co-residence does not imply shared Economic Household.
- Reconnect leaves old Character permanently NPC-controlled and moves Human to Queue end; UI never implies reclaim.
- Government is automatic/read-only; public finance and social-system values come from authoritative state.
- Government V1 user choice G3 B visually aggregates PAYG + Pension Reserve + Support Fund as `TỔNG QUỸ AN SINH`; aggregation is presentation-only and never merges underlying gameplay funds.
- Government V1 user choice G4 B keeps detailed 10% ASXH split explanation in Rules/Tutorial rather than Government panel.
- Elderly medical is passive end-round and cannot itself force liquidation/borrowing/bankruptcy; Grief Fee is a next-Mandatory obligation and may contribute to bankruptcy there.
- Inheritance distribution must use authoritative settlement result; client must not recalculate estate/beneficiaries/resource conversion.
- Current approved HUD/Room shell remains valid unless a concrete contradiction is found.

## Exit criteria

Coverage is complete only when every group above has either:
1. an authoritative direct-user-approved UX spec/path; or
2. an explicit approved decision that no dedicated surface is required.

Do not claim full UX completion before the table is closed.