# 05 — UI/UX & ART — CURRENT REPORT

## AI SPECIALIST REPORT

### Status
Đang làm — Parent handoff `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` vẫn OPEN. Landing/Lobby/Room/HUD, Mandatory, Status, Voluntary shell, Market, Recovery, Support và Birth đã có direct user-approved V1. Chat 05 hiện chuyển sang Source Validation cho Marriage.

### Changed
- User approved Birth B1–B7.
- Birth V1 = large centered panel with separate proposal cards `CON #1/#2` and conditional `#3` under authoritative `Khuyến sinh` max=3.
- Earlier spouse proposes per card; successful proposal becomes `ĐÃ ĐỀ XUẤT — CHỜ PHẢN HỒI`.
- Later spouse responds independently per proposal with `ĐỒNG Ý / TỪ CHỐI`.
- Default-Accept warning is shown only when authoritative Voluntary timer is below 10 seconds.
- Unavailable Birth remains discoverable but locked/dimmed with authoritative reason.
- Accepted/default-accepted state communicates `SINH CON CUỐI VÒNG`; no newborn preview before authoritative execution.
- `docs/UI_BIRTH_SOURCE_VALIDATION_V1.md` CLOSED — USER VERIFIED.
- Created `docs/UI_BIRTH_APPROVED_V1.md`.
- Created handoff `H-20260907-053-06-BIRTH-DESIGN-IMPLEMENTATION` → OPEN for Chat 06.
- Updated `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`: Birth = USER-APPROVED V1; Marriage = SOURCE VALIDATION ACTIVE.
- Created `docs/UI_MARRIAGE_SOURCE_VALIDATION_V1.md` using A1+B1+C1 authoritative lifecycle and current world-first shell constraints.
- No gameplay, Rule Ledger, protocol, timers, marriage/birth semantics or authoritative calculations changed.

### Source
- Latest direct user decisions in Chat 05.
- `docs/UI_BIRTH_APPROVED_V1.md`.
- `docs/UI_BIRTH_SOURCE_VALIDATION_V1.md`.
- `docs/UI_MARRIAGE_SOURCE_VALIDATION_V1.md`.
- `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`.
- `docs/RULE_LEDGER.md`.
- `server/backend/src/engine.ts` and `server/backend/src/authoritative-room.ts`.
- `handoffs/H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE.md`.

### Impact
- Chat 06 may implement Birth V1 but must not create local outgoing-proposal truth if snapshot support is insufficient; request narrow Chat 03 contract support instead.
- Voluntary action family now has approved shell + Market + Recovery + Support + Birth UX.
- Marriage is the next direct-approval gate and must preserve world-first discovery plus authoritative persistent proposal lifecycle.
- Full-game UX coverage remains incomplete.

### Verified
- Birth B1–B7 are direct user decisions.
- Birth V1 preserves one shared Voluntary 60s timer, default Accept, separate proposal semantics and end-round execution.
- Marriage authoritative lifecycle A1+B1+C1 rechecked: one outgoing pending, multiple incoming, no timeout, pending Cancel/Accept/Reject rules, accepted binding, end-acceptedRound execution, immediate invalidation on eligibility loss, disconnect/NPC takeover not automatic invalidation, executed history retained.

### Unverified
- Marriage MR1–MR8 final presentation choices.
- Sufficiency of client-facing identity/proposal state for polished Marriage/Birth implementation may require narrow server contract additions.
- Residence/Queue/Government/mortality/immigration/event/Niên sử/end-report coverage remains open.
- Client implementation/visual fidelity for approved gameplay surfaces remains open.
- Mandatory reading-duration gameplay dependency remains external to Chat 05.

### Handoff
- Chat 06: `H-20260907-053-06-BIRTH-DESIGN-IMPLEMENTATION` — OPEN.
- Chat 06: existing Support/Recovery/Market/Voluntary/Status/Mandatory implementation handoffs remain active.
- Chat 01: `H-20260907-047-01-MANDATORY-READING-DURATION` — external timing dependency.
- Chat 05: resolve Marriage MR1–MR8, then continue Residence/Family.
- Parent `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` remains OPEN.

### Open Issues
- Marriage direct design approval OPEN.
- Birth proposer-side snapshot sufficiency may need implementation verification.
- Residence/Queue/Government/event/Niên sử/end-report and other remaining gameplay surface approvals OPEN.
- Implementation/visual verification for approved specs remains OPEN.
