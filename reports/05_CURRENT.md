# 05 — UI/UX & ART — CURRENT REPORT

## AI SPECIALIST REPORT

### Status
Đang làm — Parent handoff `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` remains OPEN. Landing/Lobby/Room/HUD, Mandatory, Status Purchase, Voluntary shell, Market, Recovery và Support now have direct user-approved V1 specs. Chat 05 is currently running Source Validation for Birth.

### Changed
- User approved Support SP1–SP7 with custom presentation choices.
- Support V1 = large centered panel where **each authoritative eligible recipient Character is represented by a separate card**; no fixed parent/child section grouping is required.
- Recipient cards show portrait/player-facing identity, relation, age/stage, Status and only safe authoritative financial context.
- Persistent note distinguishes voluntary Support from Mandatory support.
- Every recipient card owns its own `− / editable amount / + / MAX / CHU CẤP` controls at card bottom.
- Footer always shows authoritative available cash + remaining spending quota where applicable.
- If no target is eligible, `CHU CẤP` remains discoverable/selectable and shows an explanation that there is no eligible recipient; action is not hidden.
- Successful transfer keeps Support open, refreshes authoritative financial state and shows inline result on the recipient card.
- `docs/UI_SUPPORT_SOURCE_VALIDATION_V1.md` CLOSED — USER VERIFIED.
- Created `docs/UI_SUPPORT_APPROVED_V1.md`.
- Created handoff `H-20260907-052-06-SUPPORT-DESIGN-IMPLEMENTATION` → OPEN for Chat 06.
- Updated `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`: Support = USER-APPROVED V1; Birth = SOURCE VALIDATION ACTIVE.
- Created `docs/UI_BIRTH_SOURCE_VALIDATION_V1.md`.
- Birth authoritative semantics cross-checked: representative proposes separate child #1/#2/(#3 under Khuyến sinh); later spouse independently Accept/Rejects; no response defaults Accept; accepted birth executes end round; bankruptcy before execution invalidates.
- Identified potential Birth contract dependency: proposer-side outgoing proposal status may require a narrow server snapshot addition if not currently exposed cleanly; Chat 06 must not invent it locally.
- No gameplay, Rule Ledger, protocol, timers, Support/Birth rules, kinship or authoritative calculations changed.

### Source
- Latest direct user decisions in Chat 05.
- `docs/UI_SUPPORT_APPROVED_V1.md`.
- `docs/UI_SUPPORT_SOURCE_VALIDATION_V1.md`.
- `docs/UI_BIRTH_SOURCE_VALIDATION_V1.md`.
- `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`.
- `docs/UI_VOLUNTARY_APPROVED_V1.md`.
- `docs/RULE_LEDGER.md`.
- `server/backend/src/engine.ts` birth proposal/response behavior.
- `server/backend/src/authoritative-room.ts` private Birth state contract.
- `handoffs/H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE.md`.

### Impact
- Chat 06 may implement Support V1 but must not use raw Character IDs or client-side kinship/economic inference.
- Support unavailable state must explain absence of eligible targets rather than hiding the mechanic.
- Birth is now the active direct-approval gate; Chat 06 must not invent final Birth proposer/responder UX before approval.
- If approved Birth UX needs outgoing proposal truth not present in current snapshot, Chat 06 should create a narrow Chat 03 contract handoff.
- Full-game UX coverage remains incomplete.

### Verified
- Support SP1–SP7 are direct user decisions.
- Support V1 preserves one shared Voluntary 60s timer and direct parent/child-only semantics.
- Engine has separate birth proposal objects and separate responder Accept/Reject action.
- Authoritative fallback treats pending/no-response proposal as accepted for execution unless later invalidated; UI must communicate default-Accept behavior without creating local truth.

### Unverified
- Birth B1–B7 final presentation choices.
- Sufficiency of current proposer-side Birth proposal snapshot for polished waiting/result states.
- Marriage and remaining gameplay surfaces #4–#12 in coverage matrix.
- Client implementation/visual fidelity for approved gameplay surfaces.
- Mandatory reading-duration gameplay dependency remains external to Chat 05.

### Handoff
- Chat 06: `H-20260907-052-06-SUPPORT-DESIGN-IMPLEMENTATION` — OPEN.
- Chat 06: existing approved Recovery/Market/Voluntary/Status/Mandatory implementation handoffs remain active.
- Chat 01: `H-20260907-047-01-MANDATORY-READING-DURATION` — external gameplay timing dependency.
- Chat 05: resolve Birth B1–B7, then continue Marriage.
- Parent `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` remains OPEN.

### Open Issues
- Birth direct design approval OPEN.
- Birth proposer-side contract sufficiency may need verification during implementation.
- Marriage/Residence/Queue/Government/event/Niên sử/end-report and remaining gameplay surface approvals OPEN.
- Implementation/visual verification for approved specs remains OPEN.
