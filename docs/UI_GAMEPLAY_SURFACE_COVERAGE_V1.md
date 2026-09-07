# UI GAMEPLAY SURFACE COVERAGE V1

Status: COMPLETE — SOURCE/DESIGN APPROVAL COVERAGE
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Purpose

Track direct UX approval coverage for authoritative gameplay surfaces outside the approved `Landing → Lobby → Room → HUD` cluster.

**Completion in this file means source/design approval coverage is complete. It does NOT mean client implementation, integration, visual fidelity or release QA is complete.**

## Source priority

1. Latest direct user decision.
2. `docs/RULE_LEDGER.md` and current canonical Project docs.
3. Current source code / authoritative snapshot contracts.
4. Tests.
5. Historical Migration Pack / V5–V10.1 prototypes as non-authoritative reference.

## Coverage sequence

| # | Gameplay surface group | Current UX status | Implementation path |
|---|---|---|---|
| 1 | Mandatory presentation / obligations / liquidation / bankruptcy | **USER-APPROVED V1** — `docs/UI_MANDATORY_APPROVED_V1.md`; canonical duration 5s | Chat 06/03/04/07 implementation/QA handoffs |
| 2 | Status Purchase | **USER-APPROVED V1** — `docs/UI_STATUS_APPROVED_V1.md` | Chat 06 implementation handoff |
| 3 | Voluntary shell | **USER-APPROVED V1** — `docs/UI_VOLUNTARY_APPROVED_V1.md` | Chat 06 implementation handoff |
| 3a | Market | **USER-APPROVED V1** — `docs/UI_MARKET_APPROVED_V1.md` | Chat 06 implementation handoff |
| 3b | Recovery | **USER-APPROVED V1** — `docs/UI_RECOVERY_APPROVED_V1.md` | Chat 06 implementation handoff |
| 3c | Support | **USER-APPROVED V1** — `docs/UI_SUPPORT_APPROVED_V1.md` | Chat 06 implementation handoff |
| 3d | Birth | **USER-APPROVED V1** — `docs/UI_BIRTH_APPROVED_V1.md` | Chat 06 implementation handoff |
| 4 | Marriage lifecycle / proposals / notices | **USER-APPROVED V1** — `docs/UI_MARRIAGE_APPROVED_V1.md` | Chat 06 implementation handoff |
| 5 | Residence / Family / current Residence semantics | **USER-APPROVED V1** — `docs/UI_RESIDENCE_FAMILY_APPROVED_V1.md` | Chat 06 implementation handoff |
| 6 | Waiting Queue / reconnect / NPC takeover / no reclaim | **USER-APPROVED V1** — `docs/UI_WAITING_QUEUE_RECONNECT_APPROVED_V1.md` | Chat 06 implementation handoff |
| 7 | Government / ASXH / PAYG / reserves / support/crisis | **USER-APPROVED V1** — `docs/UI_GOVERNMENT_SOCIAL_SYSTEMS_APPROVED_V1.md` | Chat 06 implementation handoff |
| 8 | Elderly medical / mortality / Grief / inheritance results | **USER-APPROVED V1** — `docs/UI_ELDERLY_MORTALITY_GRIEF_INHERITANCE_APPROVED_V1.md` | Chat 06 implementation handoff |
| 9 | Immigration / NPC takeover communication | **USER-APPROVED V1** — `docs/UI_IMMIGRATION_NPC_TAKEOVER_APPROVED_V1.md` | Chat 06 implementation handoff |
| 10 | World Event effect detail | **USER-APPROVED V1** — `docs/UI_WORLD_EVENT_DETAIL_APPROVED_V1.md` | Chat 06 implementation handoff |
| 11 | Niên sử detailed contents / provenance | **USER-APPROVED V1** — `docs/UI_CHRONICLE_APPROVED_V1.md` | `H-20260907-061-06-CHRONICLE-DESIGN-IMPLEMENTATION` |
| 12 | End Report / scoring / extinction / Host replay | **USER-APPROVED V1** — `docs/UI_END_REPORT_APPROVED_V1.md` | `H-20260907-062-06-END-REPORT-DESIGN-IMPLEMENTATION` |

## Cross-surface constraints locked

- No gameplay/protocol/timer changes were made to make UI easier.
- Mandatory is presentation-only, no skip/decision timer/countdown; canonical server presentation duration = 5 seconds.
- Status uses authoritative 15s; Voluntary uses one authoritative 60s total timer.
- Marriage pending has no expiry countdown; accepted proposal is binding and settles end acceptedRound.
- Residence focus uses current authoritative Residence; co-residence does not imply shared Economic Household.
- Reconnect leaves old Character permanently NPC-controlled and moves Human to Queue end; UI never implies reclaim.
- Government is automatic/read-only; public finance and social-system values come from authoritative state.
- Government V1 G3 B `TỔNG QUỸ AN SINH` is presentation aggregation only; underlying funds remain authoritative/separate.
- Elderly medical cannot itself force liquidation/borrowing/bankruptcy.
- Grief Fee UI follows E4 B: no early death-time warning; it appears only in next Mandatory when due.
- Inheritance distribution uses authoritative settlement result; client never recalculates estate/beneficiaries/resource conversion.
- Immigration V1 uses one short/small non-blocking notification, subtle Residence arrival highlight, no camera hijack and no Waiting Queue semantics.
- Disconnect NPC takeover preserves the same Character identity/history and changes controller presentation only.
- World Event V1 has no separate desktop detail surface; authoritative concrete effects are integrated into the temporary banner itself.
- Mobile World Event bottom sheet/card is same-content responsive reflow only, never an extra detail layer.
- Niên sử uses authoritative personal history/score snapshots and world history snapshots/chronology; client does not invent history causality or score truth.
- End Report uses authoritative rankings/endingReason. Standard winner exists only after full 32-round completion; true extinction early is common failure with no standard winner.
- Same-room replay is Host-only after game end, creates a fresh engine/game while retaining room connections.
- Current approved HUD/Room shell remains valid unless a concrete contradiction is later found.

## Exit criteria result

All required groups from parent handoff `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` now have a direct user-approved UX path.

Result: **PASS — SOURCE/DESIGN COVERAGE COMPLETE**.

Remaining work is outside this coverage gate:
- Chat 06 client implementation;
- narrow Chat 03 contract additions where approved UI needs structured authoritative fields not currently exposed;
- Chat 07 integration/E2E/regression/release QA;
- optional independent Chat 08 re-audit if requested by Chat 00/user or triggered by implementation concerns.
