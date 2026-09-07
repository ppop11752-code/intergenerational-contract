# UI BIRTH — SOURCE VALIDATION V1

Status: CLOSED — USER VERIFIED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Detailed `SINH CON` voluntary action surface for birth proposal creation, spouse response, default-accept communication and end-round execution state.

## AUTHORITATIVE BEHAVIOR

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

## USER-APPROVED PRESENTATION — 2026-09-07

- **B1 A:** large centered `SINH CON` panel with separate proposal cards/slots `CON #1`, `CON #2`, and `CON #3` only when authoritative max=3.
- **B2 A:** each available proposer card has its own `ĐỀ XUẤT SINH CON`; after proposing, that card becomes `ĐÃ ĐỀ XUẤT — CHỜ PHẢN HỒI`.
- **B3 A:** later spouse sees each incoming proposal as a separate card with `ĐỒNG Ý` / `TỪ CHỐI` controls.
- **B4 B:** the default-Accept warning appears only when the authoritative HUD Voluntary timer falls below **10 seconds**. It must clearly say that no response before Voluntary ends means default Accept.
- **B5 A:** `CON #3` appears only when authoritative max=3, with a compact `KHUYẾN SINH` badge.
- **B6 A:** unavailable Birth remains visible in the Voluntary dock but dim/locked; hover/tap/click reveals the authoritative reason.
- **B7 A:** accepted/default-accepted state reads `ĐÃ ĐỒNG Ý — SINH CON CUỐI VÒNG`; rejected reads `ĐÃ TỪ CHỐI`; invalidated state explains non-execution. No newborn preview is shown before end-round execution.

## Data dependency

Current private state exposes `canInitiateBirth` and `incomingBirthProposals`. If outgoing proposal state needed for proposer-side cards is not exposed cleanly, Chat 06 must request a narrow server contract addition rather than infer proposal truth locally.

## Gate result

CLOSED. Birth V1 may be implemented only from the approved spec; no gameplay semantics were changed.