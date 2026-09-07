# 05 — UI/UX & ART — CURRENT REPORT

## AI SPECIALIST REPORT

### Status
Đang làm — Parent handoff `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` remains OPEN. Landing/Lobby/Room/HUD, Mandatory, Status Purchase and the shared Voluntary shell now have direct user-approved V1 specs. Chat 05 is currently running Source Validation for Market.

### Changed
- User approved Voluntary shell V1–V6, all option A.
- Desktop Voluntary launcher = compact vertical four-action dock on right edge, below/clear of upper-right minimap.
- All four actions remain visible throughout Voluntary; active action highlighted while its surface is open.
- Approved HUD owns the single 60s TOTAL timer; no independent action-panel timers.
- Unavailable actions remain visible but dim/locked with authoritative reason on hover/tap/focus.
- Secondary `KẾT THÚC LƯỢT` sits at bottom of dock and ends turn with one click, no confirmation.
- Mobile Voluntary = compact bottom action rail + bottom/full-height sheets.
- `docs/UI_VOLUNTARY_SOURCE_VALIDATION_V1.md` CLOSED — USER VERIFIED.
- Created `docs/UI_VOLUNTARY_APPROVED_V1.md`.
- Created handoff `H-20260907-049-06-VOLUNTARY-SHELL-DESIGN-IMPLEMENTATION` → OPEN for Chat 06.
- Updated `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`: Voluntary shell = USER-APPROVED V1; Market = SOURCE VALIDATION ACTIVE.
- Created `docs/UI_MARKET_SOURCE_VALIDATION_V1.md` for six-card Market UX.
- No gameplay, Rule Ledger, protocol, timers, market formulas, eligibility, pricing or authoritative calculations changed.

### Source
- Latest direct user decisions in Chat 05.
- `docs/UI_VOLUNTARY_APPROVED_V1.md`.
- `docs/UI_VOLUNTARY_SOURCE_VALIDATION_V1.md`.
- `docs/UI_MARKET_SOURCE_VALIDATION_V1.md`.
- `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`.
- `docs/RULE_LEDGER.md`.
- Approved Room/HUD shell specs.
- `handoffs/H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE.md`.

### Impact
- Chat 06 may implement the shared Voluntary launcher/navigation shell but must not invent final Market/Recovery/Support/Birth detail layouts before their approved specs exist.
- Voluntary actions must all share the same authoritative 60s timer; switching surfaces is navigation only.
- Market design now becomes the active direct-approval gate.
- Full-game UX coverage remains incomplete.

### Verified
- Voluntary V1–V6 are direct user decisions.
- Voluntary shell does not add timer reset/pause, eligibility logic or extra confirmation semantics.
- Market authoritative constraints cross-checked: six abstract resource cards, current-Status access, visible locked cards, realtime pool, out-of-supply visibility, successful purchase keeps panel open, child may buy/hold, production timing remains next-round/eligibility driven.

### Unverified
- Market MK1–MK9 final presentation choices.
- Recovery/Support/Birth direct UX approval.
- Remaining gameplay surfaces #4–#12 in coverage matrix.
- Client implementation/visual fidelity for approved gameplay surfaces.
- Mandatory exact reading duration remains external gameplay dependency under Chat 01.

### Handoff
- Chat 06: `H-20260907-049-06-VOLUNTARY-SHELL-DESIGN-IMPLEMENTATION` — OPEN.
- Chat 06: `H-20260907-048-06-STATUS-DESIGN-IMPLEMENTATION` — OPEN.
- Chat 06: `H-20260907-046-06-MANDATORY-DESIGN-IMPLEMENTATION` — OPEN.
- Chat 01: `H-20260907-047-01-MANDATORY-READING-DURATION` — OPEN.
- Chat 05: resolve Market MK1–MK9, then continue Recovery → Support → Birth.
- Parent `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` remains OPEN.

### Open Issues
- Mandatory exact reading duration gameplay decision OPEN.
- Market direct design approval OPEN.
- Recovery/Support/Birth direct design approval OPEN.
- Marriage/Residence/Queue/Government/event/Niên sử/end-report and remaining gameplay surface approvals OPEN.
- Implementation/visual verification for approved specs remains OPEN.
