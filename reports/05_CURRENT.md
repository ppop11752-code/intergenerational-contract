# 05 — UI/UX & ART — CURRENT REPORT

## AI SPECIALIST REPORT

### Status
Đang làm — Parent handoff `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` vẫn OPEN. Landing/Lobby/Room/HUD, Mandatory, Status, Voluntary shell, Market, Recovery, Support, Birth, Marriage và Residence/Family đã có direct user-approved V1. Chat 05 hiện chạy Source Validation cho Waiting Queue / Reconnect.

### Changed
- User approved Residence/Family RF1–RF8 with custom presentation choices.
- RF1 modified A: Residence overview is **not a Character card grid**. Each current resident appears only as portrait + player-facing name + short role in the Residence; selecting portrait opens deeper detail.
- RF2 B: no explicit economic-household badge in Residence overview for co-resident child.
- RF3 A applies to deeper selected Character detail: identity, Human/NPC, age/stage, Status, role/context, compact state badges.
- RF4 A: compact clickable spouse/parents/children portrait relation strip/tree navigates to each Character's current authoritative Residence/profile.
- RF5 C: no ordinary explanatory orphan/survivor/current-Residence wording or permanent orphan badge.
- RF6 A: Stage2→3 uses short non-blocking `CHUYỂN RA Ở RIÊNG` or retained-house `TIẾP QUẢN NHÀ HIỆN TẠI` notice.
- RF7 A: Residence overview remains social/lifecycle-first; deeper financial detail binds to the correct authoritative Economic Household.
- RF8 A: empty Residence becomes `BỎ TRỐNG` then nature-reclaimed; no property mechanics.
- `docs/UI_RESIDENCE_FAMILY_SOURCE_VALIDATION_V1.md` CLOSED — USER VERIFIED.
- Created `docs/UI_RESIDENCE_FAMILY_APPROVED_V1.md`.
- Created handoff `H-20260907-055-06-RESIDENCE-FAMILY-DESIGN-IMPLEMENTATION` → OPEN for Chat 06.
- Updated `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`: Residence = USER-APPROVED V1; Waiting Queue/Reconnect = SOURCE VALIDATION ACTIVE.
- Created `docs/UI_WAITING_QUEUE_RECONNECT_SOURCE_VALIDATION_V1.md`.
- Rechecked latest canonical Mandatory timing: `H-20260907-047-01-MANDATORY-READING-DURATION` is DONE; user selected **5 seconds**, Rule Ledger now also says 5 seconds. Removed obsolete timing-dependency-open status from Chat 05 coverage/report.
- Queue/Reconnect canonical semantics rechecked: disconnect permanently converts old Character to NPC; reconnect enters Human at end of Waiting Queue with no reclaim; Human death and late join also enter Queue; queue order authoritative; newborn slots shuffle while queue order remains.
- No gameplay, Rule Ledger, protocol, timers, residence assignment, queue rules or reconnect rules changed by Chat 05.

### Source
- Latest direct user decisions in Chat 05.
- `docs/UI_RESIDENCE_FAMILY_APPROVED_V1.md`.
- `docs/UI_RESIDENCE_FAMILY_SOURCE_VALIDATION_V1.md`.
- `docs/UI_WAITING_QUEUE_RECONNECT_SOURCE_VALIDATION_V1.md`.
- `docs/UI_ROOM_APPROVED_V1.md`.
- `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`.
- `docs/RULE_LEDGER.md` current main.
- `handoffs/H-20260907-047-01-MANDATORY-READING-DURATION.md` DONE.
- `handoffs/H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE.md`.

### Impact
- Chat 06 may implement Residence/Family V1 but must not use full Character cards in the Residence overview or add economic-household/orphan labels that contradict direct decisions.
- Financial drill-down must still respect correct Economic Household even though RF2 hides that distinction at overview level.
- Current-Residence mapping remains authoritative; implementation must not hard-code parents' Residence.
- Landing reconnect example wording is now under narrow Queue/Reconnect review because `TIẾP TỤC PHÒNG` may imply reclaim of the old Character.
- Full-game UX coverage remains incomplete.

### Verified
- RF1–RF8 are direct user decisions.
- Residence/Family V1 preserves Residence ≠ Economic Household and survivor/orphan/Stage2→3 authoritative placement.
- Mandatory canonical presentation duration is now 5 seconds and prior Chat 05 timing dependency is resolved.
- Waiting Queue/Reconnect source gate is grounded in current Rule Ledger no-reclaim semantics.

### Unverified
- Queue/Reconnect Q1–Q8 final presentation choices.
- Whether current server/client state exposes clean current-Residence mapping and sufficient family identity/data for polished Residence implementation; may need narrow Chat 03 contract handoff during implementation.
- Government, mortality/inheritance, immigration/NPC takeover, World Event detail, Niên sử detail and End Report coverage remain open.
- Client implementation/visual fidelity for approved gameplay surfaces remains open.

### Handoff
- Chat 06: `H-20260907-055-06-RESIDENCE-FAMILY-DESIGN-IMPLEMENTATION` — OPEN.
- Chat 06: existing Marriage/Birth/Support/Recovery/Market/Voluntary/Status/Mandatory implementation handoffs remain active.
- Chat 05: resolve Waiting Queue/Reconnect Q1–Q8, then continue Government/social-system surfaces.
- Parent `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` remains OPEN.

### Open Issues
- Queue/Reconnect direct design approval OPEN.
- Residence current-mapping/detail-data contract sufficiency may need implementation verification.
- Government/event/Niên sử/end-report and remaining gameplay surface approvals OPEN.
- Implementation/visual verification for approved specs remains OPEN.
