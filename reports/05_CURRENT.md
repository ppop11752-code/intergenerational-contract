# 05 — UI/UX & ART — CURRENT REPORT

## AI SPECIALIST REPORT

### Status
Đang làm — Parent handoff `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` vẫn OPEN. Landing/Lobby/Room/HUD, Mandatory, Status, Voluntary shell, Market, Recovery, Support, Birth và Marriage đã có direct user-approved V1. Chat 05 hiện chạy Source Validation cho Residence / Family.

### Changed
- User approved Marriage MR1–MR8, all option A.
- Marriage V1 is world-first: no global Marriage hub; eligible target profile exposes `CẦU HÔN`.
- During sender own economic turn, `CẦU HÔN` remains visible but disabled with the approved outside-turn explanation.
- Incoming proposal notices are compact/collapsible; expanded view shows separate cards for all pending incoming proposals with independent Accept/Reject.
- One outgoing pending card stays visible with Cancel only while pending; no pending expiry countdown.
- Accepted proposal locks to `ĐÃ ĐỒNG Ý — KẾT HÔN CUỐI VÒNG NÀY`; Reject/Cancel disappear; subtle temporary dotted-heart Residence relation line is approved.
- Rejected/cancelled/invalidated outcomes show short result/reason before history treatment.
- Executed marriage shows short non-blocking `ĐÃ KẾT HÔN` notice and then Residence/Family reflects authoritative settlement; no full-screen wedding scene.
- `docs/UI_MARRIAGE_SOURCE_VALIDATION_V1.md` CLOSED — USER VERIFIED.
- Created `docs/UI_MARRIAGE_APPROVED_V1.md`.
- Created handoff `H-20260907-054-06-MARRIAGE-DESIGN-IMPLEMENTATION` → OPEN for Chat 06.
- Updated `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`: Marriage = USER-APPROVED V1; Residence/Family = SOURCE VALIDATION ACTIVE.
- Created `docs/UI_RESIDENCE_FAMILY_SOURCE_VALIDATION_V1.md`.
- Residence authoritative semantics rechecked: Residence ≠ Economic Household; Stage1–2 child may co-reside with parents while remaining separate economic household; one-parent survivor, two-parent orphan-retained Residence, Stage2→3 normal move vs retained-house conversion, and abandoned Residence visual lifecycle must be represented correctly.
- No gameplay, Rule Ledger, protocol, timers, household/residence assignment or marriage lifecycle changed.

### Source
- Latest direct user decisions in Chat 05.
- `docs/UI_MARRIAGE_APPROVED_V1.md`.
- `docs/UI_MARRIAGE_SOURCE_VALIDATION_V1.md`.
- `docs/UI_RESIDENCE_FAMILY_SOURCE_VALIDATION_V1.md`.
- `docs/UI_ROOM_APPROVED_V1.md`.
- `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`.
- `docs/RULE_LEDGER.md`.
- `handoffs/H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE.md`.

### Impact
- Chat 06 may implement Marriage V1 but must not create expiry/countdown semantics or local eligibility/settlement truth.
- Residence/Family is now the active direct-approval gate.
- Turn Track / map focus logic must resolve a Character's current authoritative Residence instead of hard-coding parents' Residence.
- Child co-residence must not visually merge the child's separate economic household into parents' finances.
- Full-game UX coverage remains incomplete.

### Verified
- MR1–MR8 are direct user decisions.
- Marriage V1 matches A1+B1+C1 lifecycle and approved world-first shell.
- Residence/Family source gate uses current authoritative survivor/orphan/Stage2→3 semantics and Room V1 panel/location constraints.

### Unverified
- Residence/Family RF1–RF8 final presentation choices.
- Whether current server/client state exposes a clean authoritative current-Residence mapping and all identity/family data required for polished implementation; implementation may need a narrow Chat 03 contract handoff.
- Queue/Reconnect, Government, mortality/inheritance, immigration/NPC takeover, World Event detail, Niên sử detail and End Report coverage remain open.
- Client implementation/visual fidelity for approved gameplay surfaces remains open.
- Mandatory reading-duration gameplay dependency remains external to Chat 05.

### Handoff
- Chat 06: `H-20260907-054-06-MARRIAGE-DESIGN-IMPLEMENTATION` — OPEN.
- Chat 06: existing Birth/Support/Recovery/Market/Voluntary/Status/Mandatory implementation handoffs remain active.
- Chat 01: `H-20260907-047-01-MANDATORY-READING-DURATION` — external timing dependency.
- Chat 05: resolve Residence/Family RF1–RF8, then continue Waiting Queue/Reconnect.
- Parent `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` remains OPEN.

### Open Issues
- Residence/Family direct design approval OPEN.
- Current-Residence mapping / detail-data contract sufficiency may need implementation verification.
- Queue/Government/event/Niên sử/end-report and remaining gameplay surface approvals OPEN.
- Implementation/visual verification for approved specs remains OPEN.
