# UI GAMEPLAY SURFACE COVERAGE V1

Status: IN PROGRESS
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Purpose

Track direct UX approval coverage for authoritative gameplay surfaces outside the already approved `Landing → Lobby → Room → HUD` cluster.

The four approved shell specs are valid but do **not** imply full-game UX completion.

## Source priority

1. Latest direct user decision.
2. `docs/RULE_LEDGER.md` and current canonical Project docs.
3. Current source code / authoritative snapshot contracts.
4. Tests.
5. Historical Migration Pack / V5–V10.1 prototypes as non-authoritative reference.

## Coverage sequence

| # | Gameplay surface group | Current UX status | Next action |
|---|---|---|---|
| 1 | Mandatory presentation / obligations / liquidation / bankruptcy | **USER-APPROVED V1** — `docs/UI_MANDATORY_APPROVED_V1.md`; canonical presentation duration now 5s | Chat 06/03/04/07 follow current implementation handoffs |
| 2 | Status Purchase / 15s / next-round effect / married rep / fallback / Noble cap-refund | **USER-APPROVED V1** — `docs/UI_STATUS_APPROVED_V1.md` | Chat 06 implement |
| 3 | Voluntary shell + shared 60s timer | **USER-APPROVED V1** — `docs/UI_VOLUNTARY_APPROVED_V1.md` | Chat 06 implement |
| 3a | Market | **USER-APPROVED V1** — `docs/UI_MARKET_APPROVED_V1.md` | Chat 06 implement |
| 3b | Recovery | **USER-APPROVED V1** — `docs/UI_RECOVERY_APPROVED_V1.md` | Chat 06 implement |
| 3c | Support | **USER-APPROVED V1** — `docs/UI_SUPPORT_APPROVED_V1.md` | Chat 06 implement |
| 3d | Birth | **USER-APPROVED V1** — `docs/UI_BIRTH_APPROVED_V1.md` | Chat 06 implement |
| 4 | Marriage lifecycle / proposals / notices | **USER-APPROVED V1** — `docs/UI_MARRIAGE_APPROVED_V1.md` | Chat 06 implement |
| 5 | Residence / Family / child/current Residence semantics | **USER-APPROVED V1** — `docs/UI_RESIDENCE_FAMILY_APPROVED_V1.md` | Chat 06 implement via `H-20260907-055-06-RESIDENCE-FAMILY-DESIGN-IMPLEMENTATION` |
| 6 | Waiting Queue / reconnect / permanent NPC takeover / no reclaim | **SOURCE VALIDATION ACTIVE** — `docs/UI_WAITING_QUEUE_RECONNECT_SOURCE_VALIDATION_V1.md` | Obtain direct Q1–Q8 approval |
| 7 | Government / ASXH / PAYG / reserves / support/crisis explanation | PARTIAL — Government access approved, detail UX not approved | Source validate after Queue/Reconnect |
| 8 | Elderly medical / mortality / Grief / inheritance results | NOT DIRECTLY APPROVED | Source validate |
| 9 | Immigration / NPC takeover communication | NOT DIRECTLY APPROVED | Source validate |
| 10 | World Event effect detail | PARTIAL — temporary banner approved | Approve detail surface |
| 11 | Niên sử detailed contents / provenance | PARTIAL — entry + two tabs approved | Approve detailed contents |
| 12 | End Report / scoring / extinction / Host replay | NOT DIRECTLY APPROVED | Source validate |

## Cross-surface constraints already locked

- No gameplay/protocol/timer changes to make UI easier.
- Mandatory is presentation-only, no skip/decision timer, no visible countdown/progress; canonical server presentation duration is now **5 seconds** per latest Rule Ledger / D-052.
- Status has authoritative max 15s; Status V1 shows that timer only in HUD.
- Voluntary has one authoritative 60s total timer shared across Market/Recovery/Support/Birth; switching surfaces never resets/pauses it.
- Voluntary V1 uses a persistent desktop right-edge action dock below/clear of minimap and mobile bottom action rail.
- Market, Recovery, Support and Birth use authoritative state/results and no independent timers.
- Birth default-Accept warning appears only in the final <10s of the responder's Voluntary window; accepted Birth executes end round.
- Marriage pending proposals have no expiry countdown; accepted proposals are binding and settle end acceptedRound.
- Residence/Government/Niên sử/marriage notifications do not pause Voluntary timer.
- Residence focus resolves to current authoritative Residence; co-residence does not imply shared Economic Household.
- Residence V1 uses minimal portrait/name/role occupant overview, then deeper Character detail on selection.
- Current approved HUD/Room shell remains valid unless a concrete contradiction is found.
- Chat 06 must never invent missing gameplay semantics, eligibility, kinship, residence assignment or economic limits.

## Mandatory timing dependency resolved

`H-20260907-047-01-MANDATORY-READING-DURATION` is DONE. User selected **5 seconds**; latest Rule Ledger now uses 5 seconds. Mandatory V1 remains unchanged visually because it shows no countdown/progress and follows authoritative server timing.

## Exit criteria

Coverage is complete only when every group above has either:
1. an authoritative direct-user-approved UX spec/path; or
2. an explicit approved decision that no dedicated surface is required.

Do not claim full UX completion before the table is closed.
