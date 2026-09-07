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
| 7 | Government / ASXH / PAYG / reserves / support/crisis | **USER-APPROVED V1** — `docs/UI_GOVERNMENT_SOCIAL_SYSTEMS_APPROVED_V1.md` | Chat 06 implement |
| 8 | Elderly medical / mortality / Grief / inheritance results | **USER-APPROVED V1** — `docs/UI_ELDERLY_MORTALITY_GRIEF_INHERITANCE_APPROVED_V1.md` | Chat 06 implement via `H-20260907-058-06-ELDERLY-MORTALITY-INHERITANCE-DESIGN-IMPLEMENTATION` |
| 9 | Immigration / NPC takeover communication | **SOURCE VALIDATION ACTIVE** — `docs/UI_IMMIGRATION_NPC_TAKEOVER_SOURCE_VALIDATION_V1.md` | Obtain direct I1–I8 approval |
| 10 | World Event effect detail | PARTIAL — temporary banner approved | Approve after Immigration/NPC takeover |
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
- Government V1 G3 B `TỔNG QUỸ AN SINH` is presentation aggregation only; underlying funds remain authoritative/separate.
- Elderly medical cannot itself force liquidation/borrowing/bankruptcy.
- Grief Fee UI follows E4 B: no early death-time warning; it appears only in next Mandatory when due.
- Inheritance distribution must use authoritative settlement result; client never recalculates estate/beneficiaries/resource conversion.
- Immigration is authoritative round-start NPC arrival; immigrants never enter Waiting Queue and must not be presented as Human-controlled newcomers.
- Disconnect NPC takeover and immigrant NPC are distinct causes even though both are NPC-controlled afterward.
- Current approved HUD/Room shell remains valid unless a concrete contradiction is found.

## Exit criteria

Coverage is complete only when every group above has either:
1. an authoritative direct-user-approved UX spec/path; or
2. an explicit approved decision that no dedicated surface is required.

Do not claim full UX completion before the table is closed.
