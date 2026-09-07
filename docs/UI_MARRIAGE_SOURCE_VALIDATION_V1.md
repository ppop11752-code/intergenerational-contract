# UI MARRIAGE — SOURCE VALIDATION V1

Status: USER VERIFICATION REQUIRED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Marriage proposal discovery, send/receive/respond/cancel states, accepted binding state, invalidation/execution communication and lightweight map/notification treatment.

## CURRENT / AUTHORITATIVE BEHAVIOR — DO NOT RE-ASK

- Marriage proposal lifecycle is authoritative A1+B1+C1.
- A Character may have at most **one outgoing `pending`** proposal at a time.
- A Character may receive **multiple incoming `pending`** proposals.
- Pending proposals do **not timeout** and may persist across rounds while eligibility remains valid.
- Sender may Cancel only while proposal remains `pending`.
- Recipient may Accept/Reject a `pending` proposal, including during their own turn.
- Sending a new invitation is allowed only **outside the sender's own economic turn**. During own turn the target may still be inspected, but Send must be locked.
- The first valid Accept processed by authoritative server order wins when proposals compete.
- Accepted proposal is **binding**: no Reject/Cancel after acceptance.
- Accepted settlement executes at end of `acceptedRound`; `createdRound` is history only.
- Pending/accepted proposal invalidates immediately if eligibility is lost before settlement.
- Disconnect/permanent NPC takeover does not itself invalidate a proposal if the Character remains eligible.
- Successful settlement changes proposal to `executed`, removes it from active set and keeps it in history.
- Lifecycle: `pending → accepted → executed`; other terminal paths include rejected/cancelled/invalidated.
- Marriage notifications do not pause/reset Voluntary's shared 60s timer.
- Client must never infer proposal eligibility, race ordering, invalidation or settlement locally.

## CURRENT CLIENT / HISTORICAL GAP

Current functional client already wires basic candidate selection, incoming Accept/Reject and outgoing Cancel, but previous UI audit identified production gaps:
- raw proposal/Character IDs are too visible;
- weak discovery/profile context;
- no persistent compact proposal notices;
- weak distinction between pending/accepted/executed/invalidated;
- no binding accepted-round treatment;
- no production-quality residence/social presentation.

Historical prototypes explored `ĐẾN NHÀ`, collapsed proposal notices and a dotted-heart relation treatment after acceptance. These are historical/prototype references, not authoritative until directly approved.

## Cross-surface constraints

- World Map remains the primary surface.
- Approved HUD must not gain a dense permanent Marriage module.
- Residence/Family detail has not yet received final UX approval, so Marriage V1 may define only the minimum profile/Residence interaction needed for proposal discovery; detailed Residence layout remains a later gate.
- Marriage notices may be opened during Voluntary but must never pause/reset the Voluntary timer.
- Accepted state must never expose Reject/Cancel.
- Proposal age/`createdRound` must never be presented as an expiry countdown.
- Disconnect warning/reconnect UI must not imply that NPC takeover invalidates marriage proposals.

## USER VERIFICATION QUESTIONS

### MR1 — Candidate discovery / send entry point

A. No permanent global Marriage button. Player explores the World Map/Residence/Character profile; an eligible target profile exposes `CẦU HÔN`. Incoming/outgoing proposal notices provide direct shortcuts back to the relevant Character.
B. Dedicated centered `HÔN NHÂN` hub listing all eligible candidates and proposals.
C. Both a global Marriage hub and Residence/profile actions.

Recommendation: **A** — strongest fit with the approved world-first Room and avoids another dashboard surface.

### MR2 — Send control during own turn

A. Keep `CẦU HÔN` visible but disabled during the sender's own economic turn, with explanation `CÓ THỂ GỬI NGOÀI LƯỢT CỦA BẠN`.
B. Hide the button entirely during own turn.
C. Allow click and show server error afterwards.

Recommendation: **A** — discoverable and semantically clear.

### MR3 — Incoming proposal notices

A. Use compact persistent/collapsible proposal notices over the world shell; opening one reveals a focused card with proposer portrait/name/context and `ĐỒNG Ý / TỪ CHỐI`.
B. Every incoming proposal immediately opens a centered modal.
C. Only show an unread count; player must find the proposer manually on the map.

Recommendation: **A** — multiple incoming proposals remain manageable without interrupting gameplay.

### MR4 — Multiple incoming pending proposals

A. Expanded proposal view shows all current incoming pending proposals as separate cards, each independently Accept/Reject-able; no expiry countdown is shown.
B. Show only one incoming proposal at a time.
C. Sort into a candidate table with small row actions.

Recommendation: **A** — directly mirrors authoritative multiple-incoming semantics.

### MR5 — Outgoing pending proposal

A. Keep one compact outgoing pending card showing target identity and `HỦY ĐỀ XUẤT`; `createdRound` may appear only as neutral history/context, never as expiry.
B. Only show a small `ĐÃ GỬI` badge on the target profile; cancellation lives in an overflow menu.
C. Hide outgoing proposal after send until it is accepted/rejected.

Recommendation: **A** — makes the one-outgoing constraint and Cancel path understandable.

### MR6 — Accepted binding presentation

A. Accepted card becomes locked `ĐÃ ĐỒNG Ý — KẾT HÔN CUỐI VÒNG NÀY`; remove Reject/Cancel. Add a subtle temporary dotted-heart/relationship line between the two Residences on the World Map until settlement, without blocking camera interaction.
B. Accepted card becomes locked but no map relation line.
C. Close the card immediately and only show a toast.

Recommendation: **A** — clearly distinguishes binding acceptance from completed marriage while using the world surface.

### MR7 — Invalidated/rejected/cancelled result communication

A. Show a short explicit result state with reason/status, then move the proposal into history; do not silently disappear it.
B. Immediately remove it from active UI with a toast only.
C. Keep all terminal proposals permanently mixed with active proposals.

Recommendation: **A** — preserves explainability without cluttering active interaction.

### MR8 — Executed marriage communication

A. At authoritative end-round settlement, show a short non-blocking `ĐÃ KẾT HÔN` transition/notice and then let Residence/Family surfaces reflect the new Household/Residence state. Do not add a separate full-screen marriage scene.
B. Use a full-screen wedding animation before returning to the map.
C. Only update Residence silently and rely on Niên sử.

Recommendation: **A** — enough emotional/causal feedback without delaying round flow.

## Gate

Do not create final Marriage spec or Chat 06 Marriage implementation handoff until MR1–MR8 are directly approved by the user.
