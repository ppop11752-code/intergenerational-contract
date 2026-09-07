# 05 — UI/UX & ART — CURRENT REPORT

## AI SPECIALIST REPORT

### Status
Đang làm — Parent handoff `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` remains OPEN. Landing/Lobby/Room/HUD, Mandatory, Status Purchase, Voluntary shell and Market now have direct user-approved V1 specs. Chat 05 is currently running Source Validation for Recovery.

### Changed
- User approved Market MK1–MK9.
- MK1 A: large centered Market panel, desktop 2×3 six-card grid.
- MK2 C: six cards are independent; no explicit Renewable/Nonrenewable row grouping or Low/Mid/High column grouping. Each card must still identify type + grade through text/icon/shape; color is not sole cue.
- MK3 A: every card always shows Price, Return, Risk, Pool, Owned and access/availability.
- MK4 B: each card owns its own quantity controls + `MUA`.
- MK5 combined A+B: controls = `− / editable numeric quantity / + / MAX`; direct numeric entry is allowed, while economic validity remains authoritative.
- MK6 A: locked cards stay fully visible, dim/locked, with reason.
- MK7 A: sold-out cards retain full data and show `HẾT NGUỒN CUNG`.
- MK8 A: successful purchase keeps Market open, refreshes Pool/Owned authoritatively and shows inline confirmation.
- MK9 A: persistent production-timing explanation; child context may clarify buy/hold now but no production before Stage3.
- `docs/UI_MARKET_SOURCE_VALIDATION_V1.md` CLOSED — USER VERIFIED.
- Created `docs/UI_MARKET_APPROVED_V1.md`.
- Created handoff `H-20260907-050-06-MARKET-DESIGN-IMPLEMENTATION` → OPEN for Chat 06.
- Updated `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`: Market = USER-APPROVED V1; Recovery = SOURCE VALIDATION ACTIVE.
- Verified current Recovery engine/server contract: three Low/Mid/High private recovery quotes expose currentPool, carryingCapacity, pendingNextRound, capacityRemaining and costPerUnit during the player's Voluntary turn.
- Created `docs/UI_RECOVERY_SOURCE_VALIDATION_V1.md`.
- No gameplay, Rule Ledger, protocol, timers, market/recovery formulas, eligibility or authoritative calculations changed.

### Source
- Latest direct user decisions in Chat 05.
- `docs/UI_MARKET_APPROVED_V1.md`.
- `docs/UI_MARKET_SOURCE_VALIDATION_V1.md`.
- `docs/UI_RECOVERY_SOURCE_VALIDATION_V1.md`.
- `docs/UI_VOLUNTARY_APPROVED_V1.md`.
- `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`.
- `docs/RULE_LEDGER.md`.
- `server/backend/src/engine.ts` recovery quote/investment implementation.
- `server/backend/src/authoritative-room.ts` private `recoveryQuotes` contract.
- `handoffs/H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE.md`.

### Impact
- Chat 06 may implement Market V1 but must not add grouping headers that contradict MK2 C or replace per-card controls with a shared purchase strip.
- `MAX`/quantity validity must remain authoritative; if the client contract lacks a reliable maximum, Chat 06 must surface a dependency rather than guess.
- Recovery now becomes the active direct-approval gate; Chat 06 must not invent final Recovery layout before approval.
- Full-game UX coverage remains incomplete.

### Verified
- Market MK1–MK9 are direct user decisions.
- Market V1 keeps one shared Voluntary 60s timer and does not alter pricing/supply/order/production rules.
- Current server exposes Recovery quote data needed to render grade-level state without client-side economic recomputation.

### Unverified
- Recovery RC1–RC7 final presentation choices.
- Support/Birth direct UX approval.
- Remaining gameplay surfaces #4–#12 in coverage matrix.
- Client implementation/visual fidelity for approved gameplay surfaces.
- Mandatory reading-duration gameplay dependency remains external to Chat 05.

### Handoff
- Chat 06: `H-20260907-050-06-MARKET-DESIGN-IMPLEMENTATION` — OPEN.
- Chat 06: `H-20260907-049-06-VOLUNTARY-SHELL-DESIGN-IMPLEMENTATION` — OPEN.
- Chat 06: `H-20260907-048-06-STATUS-DESIGN-IMPLEMENTATION` — OPEN.
- Chat 06: `H-20260907-046-06-MANDATORY-DESIGN-IMPLEMENTATION` — OPEN.
- Chat 01: `H-20260907-047-01-MANDATORY-READING-DURATION` — external gameplay timing dependency.
- Chat 05: resolve Recovery RC1–RC7, then continue Support → Birth.
- Parent `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` remains OPEN.

### Open Issues
- Recovery direct design approval OPEN.
- Support/Birth direct design approval OPEN.
- Marriage/Residence/Queue/Government/event/Niên sử/end-report and remaining gameplay surface approvals OPEN.
- Implementation/visual verification for approved specs remains OPEN.
