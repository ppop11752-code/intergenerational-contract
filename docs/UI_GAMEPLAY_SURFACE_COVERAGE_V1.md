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
| 1 | Mandatory presentation / obligations / liquidation / bankruptcy | **USER-APPROVED V1** — `docs/UI_MANDATORY_APPROVED_V1.md`; exact reading-duration gameplay dependency external | Chat 06 implement; Chat 01 owns timing decision |
| 2 | Status Purchase / 15s / next-round effect / married rep / fallback / Noble cap-refund | **USER-APPROVED V1** — `docs/UI_STATUS_APPROVED_V1.md` | Chat 06 implement |
| 3 | Voluntary shell + shared 60s timer | **USER-APPROVED V1** — `docs/UI_VOLUNTARY_APPROVED_V1.md` | Chat 06 implement |
| 3a | Market | **USER-APPROVED V1** — `docs/UI_MARKET_APPROVED_V1.md` | Chat 06 implement |
| 3b | Recovery | **USER-APPROVED V1** — `docs/UI_RECOVERY_APPROVED_V1.md` | Chat 06 implement |
| 3c | Support | **USER-APPROVED V1** — `docs/UI_SUPPORT_APPROVED_V1.md` | Chat 06 implement |
| 3d | Birth | **USER-APPROVED V1** — `docs/UI_BIRTH_APPROVED_V1.md` | Chat 06 implement via `H-20260907-053-06-BIRTH-DESIGN-IMPLEMENTATION` |
| 4 | Marriage lifecycle / proposals / notices | **SOURCE VALIDATION ACTIVE** — `docs/UI_MARRIAGE_SOURCE_VALIDATION_V1.md` | Obtain direct Marriage presentation approval |
| 5 | Residence / Family / child-orphan-current Residence semantics | PARTIAL — shell interaction approved only | Source validate after Marriage |
| 6 | Waiting Queue / reconnect / permanent NPC takeover / no reclaim | PARTIAL — room semantics known, UX not approved | Source validate |
| 7 | Government / ASXH / PAYG / reserves / support/crisis explanation | PARTIAL — Government access approved, detail UX not approved | Source validate |
| 8 | Elderly medical / mortality / Grief / inheritance results | NOT DIRECTLY APPROVED | Source validate |
| 9 | Immigration / NPC takeover communication | NOT DIRECTLY APPROVED | Source validate |
| 10 | World Event effect detail | PARTIAL — temporary banner approved | Approve detail surface |
| 11 | Niên sử detailed contents / provenance | PARTIAL — entry + two tabs approved | Approve detailed contents |
| 12 | End Report / scoring / extinction / Host replay | NOT DIRECTLY APPROVED | Source validate |

## Cross-surface constraints already locked

- No gameplay/protocol/timer changes to make UI easier.
- Mandatory is presentation-only and has no gameplay decision timer.
- Status has authoritative max 15s; Status V1 shows that timer only in HUD.
- Voluntary has one authoritative 60s total timer shared across Market/Recovery/Support/Birth; switching surfaces never resets/pauses it.
- Voluntary V1 uses a persistent desktop right-edge action dock below/clear of minimap and mobile bottom action rail.
- Market, Recovery, Support and Birth use authoritative state/results and no independent timers.
- Birth default-Accept warning appears only in the final <10s of the responder's Voluntary window; accepted Birth executes end round.
- Residence/Government/Niên sử/marriage notifications do not pause Voluntary timer.
- Marriage actions are social actions outside the sender's own economic turn for sending, while recipients may Accept/Reject pending proposals; Marriage must not create or pause a gameplay phase timer.
- Current approved HUD/Room shell remains valid unless a concrete contradiction is found.
- Chat 06 must never invent missing gameplay semantics, eligibility or economic limits.

## Active external dependency from Mandatory

The user requested a shorter Mandatory reading duration than the earlier canonical value. Exact timing is outside Chat 05 and remains owned by `H-20260907-047-01-MANDATORY-READING-DURATION`. Mandatory V1 displays no countdown/progress and follows authoritative server timing.

## Exit criteria

Coverage is complete only when every group above has either:
1. an authoritative direct-user-approved UX spec/path; or
2. an explicit approved decision that no dedicated surface is required.

Do not claim full UX completion before the table is closed.
