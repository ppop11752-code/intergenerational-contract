# UI BIRTH — APPROVED V1

Status: USER-APPROVED DESIGN
Date: 2026-09-07
Owner: 05 — UI/UX & ART

## Scope

Production UX for `SINH CON` inside the approved Voluntary shell.

## Layout

- Large centered panel over the persistent World Map.
- Separate proposal cards `CON #1`, `CON #2`; `CON #3` appears only when authoritative `Khuyến sinh` max=3.
- Approved Voluntary right-edge dock remains visible; approved HUD owns the shared 60s timer.

## Proposer view

- Each available proposal slot has its own `ĐỀ XUẤT SINH CON` control.
- After authoritative success, that slot becomes `ĐÃ ĐỀ XUẤT — CHỜ PHẢN HỒI`.
- Do not combine multiple child proposals into one quantity action.

## Responder view

- Each incoming proposal is a separate card.
- Each card has `ĐỒNG Ý` and `TỪ CHỐI`.
- When authoritative Voluntary time falls below 10 seconds, show a clear warning that no response by Voluntary end means **default Accept**.
- Do not show this warning persistently before the final 10 seconds.

## Khuyến sinh

- Third proposal slot appears only when authoritative max=3.
- Show compact `KHUYẾN SINH` badge explaining the extra slot.

## Unavailable state

- `SINH CON` remains visible in the Voluntary dock but dim/locked.
- Hover/tap/click reveals authoritative reason, e.g. marriage/stage/representative/proposal-limit eligibility.
- Client must not infer eligibility itself.

## Proposal result states

- Accepted/default-accepted: `ĐÃ ĐỒNG Ý — SINH CON CUỐI VÒNG`.
- Rejected: `ĐÃ TỪ CHỐI`.
- Invalidated: explicitly explain that the proposal will not execute.
- No newborn Character/card appears before authoritative end-round execution.

## Data / implementation contract

- Use authoritative `canInitiateBirth`, proposal state and results.
- If proposer-side outgoing proposal state is not cleanly exposed to the client, Chat 06 must open a narrow Chat 03 handoff rather than create local truth.
- Do not change timer, default-Accept, eligibility, proposal cap or execution timing.