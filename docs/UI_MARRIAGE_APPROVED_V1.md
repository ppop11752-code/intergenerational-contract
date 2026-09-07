# UI MARRIAGE — APPROVED V1

Status: USER-APPROVED
Date: 2026-09-07
Owner: 05 — UI/UX & ART

## Core UX

Marriage is world-first, not a standalone global action hub.

### Discovery / send
- Player inspects Residence / Character profile from the World Map.
- If the target is authoritatively eligible, profile exposes `CẦU HÔN`.
- During the sender's own economic turn, the control remains visible but disabled with `CÓ THỂ GỬI NGOÀI LƯỢT CỦA BẠN`.
- When one outgoing proposal is already pending, UI reflects the authoritative one-outgoing constraint and does not offer a second send path until the existing pending proposal is cancelled/resolved.

### Incoming proposals
- Use a compact persistent/collapsible proposal notice over the world shell.
- Expanded view shows each incoming pending proposal as a separate card.
- Each card shows player-facing proposer identity/context and `ĐỒNG Ý / TỪ CHỐI`.
- Multiple incoming proposals remain visible independently.
- Never show expiry countdown because pending proposals do not timeout.

### Outgoing pending
- Show one compact outgoing pending card with target identity and `HỦY ĐỀ XUẤT`.
- `createdRound` may appear only as neutral history/context, never as expiry.

### Accepted binding state
- After authoritative Accept, proposal becomes locked:
  `ĐÃ ĐỒNG Ý — KẾT HÔN CUỐI VÒNG NÀY`.
- Remove Reject/Cancel controls.
- A subtle temporary dotted-heart/relationship line may connect the two Residences until settlement.
- This line is visual feedback only and must not affect camera/gameplay.

### Terminal states
- Rejected / Cancelled / Invalidated: show a short explicit result with reason where authoritative data provides one, then move it to history.
- Executed: at authoritative end-round settlement, show a short non-blocking `ĐÃ KẾT HÔN` transition/notice; then Residence/Family reflects the merged relationship/state.
- No full-screen wedding animation.

## Gameplay constraints

- One outgoing pending max; multiple incoming pending allowed.
- Pending has no timeout and may persist across rounds.
- Sender Cancel only while pending.
- Recipient Accept/Reject pending.
- Accepted is binding.
- First valid authoritative Accept wins competition.
- Settlement is end of `acceptedRound`; `createdRound` is history only.
- Loss of eligibility invalidates; disconnect/NPC takeover alone does not.
- UI never computes eligibility/race/settlement locally.
- Marriage notice access never pauses/resets Voluntary timer.

## Visual language

- Match approved pixel-art / fantasy chrome.
- Proposal notices remain compact and subordinate to the World Map.
- Use dedicated pixel icons; no emoji primary controls.
- Human/NPC identity treatment follows approved world/portrait conventions.

## Mobile

- Proposal notices collapse into compact badges/cards.
- Expanded proposal handling uses bottom/full-height sheet where needed.
- Same lifecycle and actions as desktop; no gameplay change.

## Implementation acceptance

1. No permanent global Marriage hub/button.
2. Eligible profile exposes `CẦU HÔN`; own-turn send is visibly disabled.
3. All incoming pending proposals are separately actionable.
4. Outgoing pending is visible and cancellable only while pending.
5. No pending expiry/countdown UI.
6. Accepted state removes Reject/Cancel and communicates end-round settlement.
7. Rejected/cancelled/invalidated do not silently disappear.
8. Executed marriage produces short non-blocking confirmation and Residence/Family update.
9. Internal IDs are not player-facing.
10. No gameplay/protocol/timer semantics are changed.
