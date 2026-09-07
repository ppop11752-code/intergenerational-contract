# UI STATUS PURCHASE — APPROVED V1

Status: USER-APPROVED DESIGN
Date: 2026-09-07
Owner: 05 — UI/UX & ART

## Scope

Production UX for the Status Purchase phase between Mandatory and Voluntary.

## Authoritative gameplay semantics

- Only the Household representative receives this Status phase.
- Server deadline is 15 seconds.
- Selection/payment happens now; Status takes effect next round.
- Current-round Status continues to govern current Market access and turn order.
- Married fees are authoritative household fees; do not client-calculate them.
- Timeout fallback, Noble cap/priority/refund and marriage reconciliation are server-authoritative.

## Desktop composition

- Present a large centered chooser over the persistent World Map.
- Use three comparable tier cards arranged side-by-side: Bình dân / Trung lưu / Quý tộc.
- Preserve the approved fantasy/pixel UI language: readable dark-fantasy card chrome over a bright world, with no dashboard-style full-width container.
- Status chooser must coexist with the existing Room/HUD shell; HUD remains visible above it.

## Timer

- Do **not** repeat the countdown inside the Status panel.
- The authoritative 15-second countdown is shown only by the approved HUD phase/timer cluster.
- The Status panel headline communicates `CHỌN ĐỊA VỊ CHO VÒNG SAU`.
- When remaining authoritative time drops below 5 seconds, show the timeout fallback rule inside the panel as a concise warning.

## Tier cards

Every card always exposes the information the server quote authoritatively provides for that tier:
- localized tier name;
- payable authoritative fee;
- affordability/eligibility state;
- main access/unlocks relevant to Status;
- explicit `HIỆU LỰC VÒNG SAU` label.

Locked/unaffordable cards remain readable and explain why the action is unavailable using authoritative server state/error copy. Never hide the tier entirely.

### Married household

- Header/context reads `CHỌN CHO HỘ GIA ĐÌNH`.
- Card fee is the actual authoritative household fee.
- Do not foreground single-person base fee or split the UI by spouse.

## Noble selection

Initial Noble card may align visually with the other two cards and should not front-load the full cap explanation.

Immediately after the player selects Noble:
- confirmation explains that the choice is subject to end-round Noble competition/cap resolution;
- show a state equivalent to `ĐANG CHỜ XẾP HẠNG CUỐI VÒNG` where relevant;
- never state or visually imply that Noble is guaranteed before authoritative resolution.

If later resolution fails:
- communicate authoritative fallback to Middle;
- communicate the authoritative refund difference supplied by server state/result;
- do not client-calculate the refund.

## Timeout fallback warning

Only when the HUD timer drops below 5 seconds, show concise explanatory copy in the chooser:

`HẾT GIỜ: hệ thống sẽ ưu tiên giữ địa vị hiện tại nếu hợp lệ; nếu không sẽ tự hạ bậc.`

This is explanation only; fallback is executed by the server.

## Successful selection

- After any valid selection, transform the chooser briefly into a confirmation state.
- Primary message: `ĐÃ CHỌN — HIỆU LỰC VÒNG SAU`.
- If Noble was selected, append the competition-resolution warning.
- No second confirmation button.
- Continue automatically into Voluntary when the authoritative phase advances.

## Responsive/mobile

- Preserve the same semantics and information density.
- On narrow screens, the three cards may become horizontally paged/stacked within a focused sheet, but all three tiers must remain discoverable within the 15-second decision window.
- The HUD authoritative timer remains visible; no duplicate timer is introduced inside the sheet.

## Prohibited interpretations

- Do not apply selected Status immediately to current-round Market access or Residence architecture.
- Do not present Noble selection as final before end-round resolution.
- Do not client-calculate fees, affordability, fallback, Noble rank, slots or refund.
- Do not add a second confirmation action.
- Do not create a separate Status phase for the later spouse.
