# UI BIRTH — SOURCE VALIDATION V1

Status: USER VERIFICATION REQUIRED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Detailed `SINH CON` voluntary action surface for birth proposal creation, spouse response, default-accept communication and end-round execution state.

## CURRENT / AUTHORITATIVE BEHAVIOR — DO NOT RE-ASK

- Birth exists inside Voluntary and shares the one authoritative 60s total timer.
- Both spouses must be Stage3–6 for the Household to initiate birth proposals.
- Household representative / earlier spouse creates the proposals in their own Voluntary.
- Normally max **2** child proposals per eligible married Household per round.
- `Khuyến sinh` increases the authoritative max to **3**.
- Each child is a separate proposal `#1/#2/#3`.
- Later spouse responds to each proposal in their own Voluntary with Accept or Reject.
- If the later spouse does not respond by the end of the relevant Voluntary window, the authoritative fallback is **default ACCEPT**.
- Accepted birth executes at **end round**, not immediately when proposed/accepted.
- Household bankruptcy before execution invalidates the birth proposal.
- Newborn current Status starts as Bình dân.
- Human/NPC response behavior remains authoritative server/NPC behavior.
- UI must not create a birth instantly, bypass spouse response, or calculate birth subsidy/eligibility client-side.

## CURRENT CLIENT / CONTRACT GAP

Current prototype has only a basic initiate-birth control and sparse incoming-response handling. Production UX needs:
- separate proposal slots/cards;
- proposer waiting/result states;
- later-spouse Accept/Reject controls;
- explicit default-Accept semantics;
- next/end-round execution wording;
- clear eligibility/unavailable reasons;
- authoritative event-based third slot.

Current private state exposes `canInitiateBirth` and `incomingBirthProposals`; if outgoing proposal state needed for the approved proposer UI is not exposed cleanly, Chat 06 must request a narrow server contract addition rather than invent local proposal truth.

## Cross-surface constraints

- Approved Voluntary dock remains visible and `SINH CON` is highlighted while the surface is open.
- HUD owns the one shared 60s timer.
- Switching surfaces does not reset/pause time.
- Birth proposal cards are not newborn Character cards; execution is end-round authoritative.
- No client-side assumption about whether a proposal remains valid after economic/family state changes.

## USER VERIFICATION QUESTIONS

### B1 — Desktop layout

A. Large centered `SINH CON` panel with separate proposal cards/slots `CON #1`, `CON #2`, and `CON #3` only when authoritative max=3.
B. Middle-right compact panel with one proposal button and a proposal history list.
C. One card at a time in a step-by-step flow.

Recommendation: **A** — each child is a separate authoritative proposal and parallel cards make the current round limit obvious.

### B2 — Earlier-spouse / proposer interaction

A. Each available proposal card has its own `ĐỀ XUẤT SINH CON`; after proposing, that card becomes a non-clickable state such as `ĐÃ ĐỀ XUẤT — CHỜ PHẢN HỒI`.
B. One global `ĐỀ XUẤT` button increments the proposal count without separate cards.
C. Ask quantity 1–3 in a single control and create multiple proposals at once.

Recommendation: **A** — preserves one action per authoritative child proposal and prevents a quantity control from implying one combined proposal.

### B3 — Later-spouse response layout

A. Show every incoming birth proposal as a separate card with `ĐỒNG Ý` and `TỪ CHỐI` directly on that card.
B. One combined question asks whether to accept all current proposals.
C. Cycle through proposals one at a time in a modal.

Recommendation: **A** — each proposal is independently accepted/rejected.

### B4 — Default-Accept explanation

A. Always show a compact warning on responder view: `NẾU KHÔNG PHẢN HỒI TRƯỚC KHI LƯỢT TỰ NGUYỆN KẾT THÚC, ĐỀ XUẤT SẼ MẶC ĐỊNH ĐỒNG Ý.`
B. Show this only when HUD timer falls below 10s.
C. Explain it only after timeout occurs.

Recommendation: **A** — this fallback can create a child, so it should be visible before the deadline.

### B5 — Khuyến sinh / third proposal

A. Render `CON #3` only when authoritative max=3 and add a compact `KHUYẾN SINH` badge explaining why the extra slot exists.
B. Always show the third slot locked outside Khuyến sinh.
C. Never show event explanation; simply add a third slot when active.

Recommendation: **A**.

### B6 — Birth unavailable state

A. Keep `SINH CON` visible in the Voluntary dock but locked/dimmed; hover/tap/click reveals the authoritative reason such as not married, spouse stage ineligible, not representative, or proposal limit reached.
B. Allow opening the panel in every case and explain the unavailable reason inside.
C. Hide `SINH CON` whenever unavailable.

Recommendation: **A** — follows the approved Voluntary discoverable-unavailable pattern.

### B7 — Proposal result / execution wording

A. Accepted/default-accepted proposal card becomes `ĐÃ ĐỒNG Ý — SINH CON CUỐI VÒNG`; rejected becomes `ĐÃ TỪ CHỐI`; invalidated state explains that the proposal will not execute. No newborn appears before authoritative end-round execution.
B. Accepted proposal immediately changes to a newborn preview card.
C. Close Birth after each response and only communicate results in Niên sử.

Recommendation: **A** — clearly separates consent from actual birth execution.

## Gate

Do not create final Birth spec or Chat 06 Birth implementation handoff until B1–B7 are directly approved by the user.
