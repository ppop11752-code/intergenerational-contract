# 08 — CONSISTENCY AUDITOR — CURRENT REPORT

## Status

H-20260907-044-08-UI-RULE-LEDGER-AUDIT completed.

- Approved cluster `Landing → Lobby → Room → HUD`: **PASS WITH WARNINGS**.
- Full-game UX/UI coverage against Rule Ledger: **FAIL / INCOMPLETE COVERAGE**.
- This is not a gameplay/code failure. It means many authoritative gameplay surfaces do not yet have direct user-approved UX/UI specifications.

OI-001 and OI-002 remain CLOSED / independently verified.

## Changed

No gameplay, code, server, client or UI changes. Independent consistency audit only.

## Source

- Latest direct user-approved UI specs:
  - `docs/UI_LANDING_APPROVED_V1.md`
  - `docs/UI_LOBBY_APPROVED_V1.md`
  - `docs/UI_ROOM_APPROVED_V1.md`
  - `docs/UI_HUD_APPROVED_V1.md`
- `docs/RULE_LEDGER.md` / full Rule Ledger semantics from Migration Pack v3.
- `reports/05_CURRENT.md`.
- `docs/OPEN_ISSUES.md`.

## Impact

- The approved shell cluster may continue to implementation; no material gameplay contradiction was found in its core Landing/Lobby/Room/HUD semantics.
- The project must NOT treat that cluster as full-game UX/UI completion.
- Chat 05 must design/validate remaining gameplay surfaces before those areas can be considered user-approved.
- Chat 06 should implement only already-approved semantics and must not invent missing gameplay UX.

## Verified — OK / aligned

- Landing keeps separate Create / Join / Tutorial / Rules / Settings semantics and has a reconnect entry point without changing protocol.
- Lobby Human-only roster, no Ready, no manual NPC control, and founder semantics for `<10`, `=10`, `>10` Humans match Rule Ledger.
- Founder selection remains server-authoritative; Waiting Queue position is presented after authoritative result.
- Room world shell preserves Government centrality, Residence as map entity, Status-based architecture, map-first hierarchy, authoritative World Event ambience, Turn Track and Government entry.
- HUD directly exposes current public debt + debt ceiling and does not introduce private debt.
- World Event HUD banner is temporary and non-blocking.
- HUD/Room transitions explicitly do not pause/reset/extend gameplay timers.
- Human/NPC distinction does not expose Hidden Persona.
- `reports/05_CURRENT.md` correctly says only the main `Landing → Lobby → Room → HUD` cluster has direct user approval; it does not claim all gameplay UX is approved.

## Findings

### HIGH — MISSING COVERAGE

1. **Mandatory / forced liquidation / bankruptcy surface**
   - Rule requires automatic Mandatory, 7s default reading presentation, no manual skip, no gameplay decision timer, aggregate obligations, forced liquidation and immediate household bankruptcy when unresolved.
   - No direct user-approved gameplay surface exists in the four approved specs for explaining these outcomes.

2. **Status Purchase / Noble cap surface**
   - Missing approved UX for 15s Status decision, next-round activation, spouse representative-only behavior, timeout fallback, married 2x fee, Noble-slot resolution, downgrade/refund and pending-marriage interaction.

3. **Core Voluntary surfaces**
   - No approved UX for Market, Recovery, Support and Birth despite these being the only four Voluntary groups sharing one 60s timer.
   - Missing presentation of Market access/locked cards/supply/quantity, Recovery pending timing, family support targeting, Birth proposal/consent/default-accept flow.

4. **Marriage lifecycle surface**
   - No approved UX for persistent proposals, send timing restriction, max one outgoing/multiple incoming, binding accept, cancel/reject rules, invalidation, end-round settlement and competing accepts.

5. **End-game / scoring / replay surface**
   - No approved UX for full-32-round winner vs early-extinction failure, `AverageLifeAssetScore`, queue participants in final ranking, score 0 cases, or Host-only same-room replay.

### MEDIUM — MISSING COVERAGE / AMBIGUITY

6. **Residence / Family detail**
   - Room allows Residence click but detailed Residence/Family surface is not approved.
   - Missing explicit UX for separate economic household of Stage1–2 child, merged married household, dependent relations and family financial attribution.

7. **Child Residence focus wording**
   - Room says a Turn Track child maps to `parents' Residence`.
   - Rule has orphan/survivor and Stage2→3 transitions. This wording is too broad unless implementation resolves the Character's authoritative current Residence rather than assuming living parents.

8. **Reconnect / Waiting Queue detail**
   - Landing reconnect copy such as `TIẾP TỤC PHÒNG` can be misread as reclaiming the old Character.
   - Rule says disconnected Character permanently becomes NPC; reconnecting Human enters end of Waiting Queue and does not reclaim that Character.
   - Approved specs lack explicit reconnect consequence/queue-state UX.

9. **ASXH / pension / Support Fund / Government detail**
   - HUD debt/ceiling is aligned but insufficient as full fiscal/social-insurance UX.
   - No approved detail surface for personal funded ASXH, PAYG, pension reserve/waterfall, Support Fund/backstop, Government budget/maintenance/strategy or Fiscal/Pension Crisis explanation.

10. **Elderly / mortality / Grief / inheritance**
    - No approved UX explaining passive elderly medical payment, mortality outcome, next-Mandatory Grief Fee, inheritance beneficiaries/value settlement, or simultaneous spouse death handling.

11. **Immigration / NPC takeover**
    - Human/NPC visual distinction is compatible, but approved surfaces do not specify immigrant arrival communication, NPC takeover state, or how queue/reconnect changes are explained to the Human.

12. **World Event detail**
    - Temporary banner is rule-compatible, but approved spec does not define enough detail for communicating the actual authoritative effect when an event materially changes fees, risk, return, birth limit, debt interest, recovery cost or market bounds.

13. **Niên sử detail source traceability**
    - HUD references an `already approved two-tab direction` (`HÀNH TRÌNH` / `THẾ GIỚI`), but the four current approved specs do not define the detailed contents/coverage of those tabs. Do not count Niên sử gameplay coverage as complete from HUD placement alone.

### AMBIGUITY — Mandatory timer semantics

14. HUD says all players see authoritative `phase + remaining time` while Rule Ledger explicitly says Mandatory has a configured reading duration but **no gameplay decision timer**.
    - This is not necessarily a contradiction if Mandatory shows only a presentation countdown/progress indicator.
    - UI must not make Mandatory look actionable or imply the player can extend/skip/respond to that countdown.

## Verified / falsification notes

- No evidence that Lobby founder reveal performs client-side randomization.
- No evidence that Room/HUD restores a private-debt concept.
- No evidence that HUD changes authoritative timer duration.
- No evidence Chat 05 falsely declared all game UX approved; its report explicitly limits approval to the main cluster and says new surfaces require normal approval workflow.
- Therefore the main defect is missing UX coverage, not incorrect gameplay semantics in the four approved shell specs.

## Unverified

- Visual/client implementation fidelity of the four approved specs.
- Whether legacy/current client already contains usable versions of the missing gameplay panels; even if it does, those surfaces are not established here as direct user-approved current UX specs.
- Detailed Niên sử content approval outside the four canonical approved files.

## Handoff

- Chat 05: design/source-validate the missing authoritative gameplay surfaces before declaring full UX/UI complete. See `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`.
- Chat 06: no new implementation handoff from this audit; do not invent semantics for missing surfaces before Chat 05 approval.
- Chat 03: no protocol contradiction proven by this audit; no handoff required.
- Chat 01: Rule Ledger was sufficiently clear for the audited issues; no gameplay-rule decision required.

## Open Issues

- Full-game UX/UI rule coverage remains OPEN.
- Approved Landing/Lobby/Room/HUD cluster may proceed, subject to the warnings above.
- OI-001 CLOSED. OI-002 CLOSED.
