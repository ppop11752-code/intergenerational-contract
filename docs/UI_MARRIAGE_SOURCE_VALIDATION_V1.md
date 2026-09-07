# UI MARRIAGE — SOURCE VALIDATION V1

Status: CLOSED — USER VERIFIED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Marriage proposal discovery, send/receive/respond/cancel states, accepted binding state, invalidation/execution communication and lightweight map/notification treatment.

## Authoritative gameplay preserved

- Lifecycle A1+B1+C1 remains authoritative.
- Max one outgoing `pending`; multiple incoming `pending` allowed.
- Pending has no timeout and may persist across rounds.
- Sender may Cancel only while pending; recipient may Accept/Reject pending.
- Send is allowed only outside sender's own economic turn.
- Accepted is binding; no Reject/Cancel after acceptance.
- Settlement executes at end of `acceptedRound`; `createdRound` is history only.
- Eligibility loss invalidates immediately; disconnect/NPC takeover alone does not.
- Successful settlement becomes `executed`, leaves active proposal set and remains in history.
- Client never decides eligibility, race ordering, invalidation or settlement.

## Direct user decisions

- MR1 A — no permanent global Marriage button. Discovery happens through World Map / Residence / Character profile; eligible profile exposes `CẦU HÔN`. Proposal notices shortcut back to the relevant Character.
- MR2 A — during sender's own turn, `CẦU HÔN` stays visible but disabled with `CÓ THỂ GỬI NGOÀI LƯỢT CỦA BẠN`.
- MR3 A — incoming proposal uses compact persistent/collapsible notice; expanded view shows proposer context + `ĐỒNG Ý / TỪ CHỐI`.
- MR4 A — multiple incoming proposals appear as separate cards with independent Accept/Reject controls and no expiry countdown.
- MR5 A — one outgoing pending card shows target + `HỦY ĐỀ XUẤT`; createdRound may be neutral history only.
- MR6 A — accepted card locks to `ĐÃ ĐỒNG Ý — KẾT HÔN CUỐI VÒNG NÀY`; Reject/Cancel disappear; a subtle temporary dotted-heart/relationship line may connect the two Residences until settlement.
- MR7 A — rejected/cancelled/invalidated states show short explicit result/reason, then move to history rather than silently disappearing.
- MR8 A — authoritative settlement shows a short non-blocking `ĐÃ KẾT HÔN` transition/notice, then Residence/Family reflects the new state; no full-screen wedding scene.

## Cross-surface constraints

- World Map remains primary.
- Marriage notices do not pause/reset Voluntary timer.
- No countdown is shown for pending proposals.
- Accepted state never exposes Reject/Cancel.
- Residence/Family detailed layout remains a separate approval gate.
- Internal IDs are never the player-facing identity.

## Gate result

CLOSED. Marriage V1 may be implemented from `docs/UI_MARRIAGE_APPROVED_V1.md`.
