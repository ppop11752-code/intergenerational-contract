# UI RECOVERY — SOURCE VALIDATION V1

Status: CLOSED — USER VERIFIED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Detailed `PHỤC HỒI` action surface inside the approved Voluntary shell.

## CURRENT / AUTHORITATIVE BEHAVIOR — DO NOT RE-ASK

- Recovery exists only inside Voluntary and uses the same shared 60s total timer.
- Recovery applies to Renewable resources only.
- Player chooses one Renewable grade: Low / Mid / High, plus units to recover.
- Player does not need to own that resource to invest in recovery.
- Cost, capacity, pending recovery and event multipliers are authoritative server values.
- Accepted Recovery applies next round, not immediately.
- Recovery spending counts toward authoritative voluntary spending/quota and cash remains a hard constraint.
- Server private Recovery quotes expose `currentPool`, `carryingCapacity`, `pendingNextRound`, `capacityRemaining`, `costPerUnit`.
- Client must not independently recompute Recovery economics or eligibility.

## USER-VERIFIED DECISIONS

- RC1 A: large centered desktop panel with three horizontal Low/Mid/High cards.
- RC2 A: every card always shows Pool/Capacity, Pending next round, Capacity Remaining and Cost/unit.
- RC3 A: each card includes a compact `Pool / Capacity` gauge plus Pending/Remaining text values.
- RC4 A: each card has `− / editable numeric quantity / + / MAX / PHỤC HỒI` controls.
- RC5 A: footer shows authoritative `TIỀN KHẢ DỤNG` and `HẠN MỨC CHI CÒN LẠI` where applicable.
- RC6 A: active `ĐẦU TƯ CÔNG` effect is shown as a compact badge adjacent to the authoritative affected cost.
- RC7 A: successful Recovery keeps panel open, refreshes authoritative values and shows inline `ĐÃ ĐẦU TƯ PHỤC HỒI +X — HIỆU LỰC VÒNG SAU`.

## Gate result

CLOSED. Final implementation source is `docs/UI_RECOVERY_APPROVED_V1.md`.
