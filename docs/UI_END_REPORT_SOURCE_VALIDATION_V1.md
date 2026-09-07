# UI END REPORT — SOURCE VALIDATION V1

Status: CLOSED — USER VERIFIED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Final-game result UX covering:
- normal Round32 completion and winner/rankings;
- Human personal lifetime recap;
- early true extinction/common-failure ending;
- Host-only same-room replay;
- post-game navigation without changing authoritative scoring/session rules.

## CURRENT / AUTHORITATIVE BEHAVIOR — VERIFIED

### End conditions

- Standard game ends after Round32.
- If society reaches zero living Characters before that point: game ends by true extinction.
- True extinction is `Tuyệt chủng — Thất bại chung` and has **no standard winner**.
- If society survives through Round32: standard winner is determined from authoritative ranking by `AverageLifeAssetScore`.

### Scoring

`AverageLifeAssetScore = cumulative authoritative score assets / active rounds`.

Current authoritative semantics include:
- score is based on HouseholdTotalAssets/HHA snapshots, not cash only;
- funded ASXH is included;
- resource scoring uses current spot value, not future return;
- single active Character uses 100% HouseholdTotalAssets snapshot;
- married Character uses 50% HouseholdTotalAssets snapshot regardless of Human/NPC spouse;
- bankruptcy round scores 0 for affected Human(s);
- player history spans multiple lives/reincarnations;
- server `rankings()` returns authoritative Human rankings sorted descending by average score.

Client must not calculate winner/ranking independently when authoritative rankings are available.

### Replay

- Same-room replay is available only after game end.
- Replay action is **Host-only**.
- Replay clears the finished engine/game state and starts a fresh game flow while keeping room/player connections.
- Old Characters, scores, histories and gameplay state must not visually look carried into the replay as active state.

## USER DECISIONS — 2026-09-07

User explicitly approved the recommendation for **ER1–ER9**, all option **A**.

- **ER1 A** — dedicated full-screen End Report scene with the final world softly visible/faded behind it; no active gameplay HUD/actions.
- **ER2 A** — winner prominently at top, Top 3 podium-style treatment, complete ordered Human ranking below, using authoritative ranking order.
- **ER3 A** — score label `ĐIỂM TÀI SẢN TRUNG BÌNH QUA CÁC KIẾP` plus short explanation that the score uses HHA/assets across active rounds/lives, not cash alone; detailed formula stays in Rules/Niên sử.
- **ER4 A** — every Human gets `HÀNH TRÌNH CỦA BẠN` with final rank, average score, lives, highest asset score/status, marriages, children and compact score trend.
- **ER5 A** — Human who never received a Character/life remains visible with `CHƯA CÓ KIẾP SỐNG` / `0 VÒNG HOẠT ĐỘNG`, preserving authoritative result order/value where supplied.
- **ER6 A** — early extinction replaces winner/podium with `XÃ HỘI ĐÃ TUYỆT CHỦNG — THẤT BẠI CHUNG`; statistics remain viewable only as historical/postmortem context; explicitly no winner.
- **ER7 A** — Host sees primary `CHƠI LẠI CÙNG PHÒNG`; non-host sees `ĐANG CHỜ HOST`, never an enabled replay button.
- **ER8 A** — Host replay uses short `BẮT ĐẦU MỘT XÃ HỘI MỚI` transition and returns connected room to fresh pre-game/Lobby flow; old game state does not remain active.
- **ER9 A** — read-only post-game actions include `XEM NIÊN SỬ` and `XEM THẾ GIỚI CUỐI CÙNG`, plus leave/return navigation; no gameplay actions remain.

## IMPLEMENTATION GUARDRAILS

1. Use server `endingReason` and authoritative `rankings()` result; do not recalculate/sort winner locally.
2. Never call AverageLifeAssetScore “cash”, “money” or equivalent cash-only wording.
3. Early extinction must never render a standard winner/podium, even if ranking data exists for historical context.
4. Married scoring must not display full Household assets as the Human's authoritative score share.
5. `CHƯA CÓ KIẾP SỐNG` is not the same semantic state as an active player who legitimately scored zero.
6. Same-room replay is fresh game state in the same room, not continuation/reset of the ended world.
7. Non-host replay authority must be communicated before click; do not expose an enabled fake control.
8. Post-game world/Chronicle views are read-only.
9. If a desired personal recap/stat field is not exposed cleanly, Chat 06 must request a narrow Chat 03 contract addition rather than infer it from raw logs or recalculate scoring.

## Result

Source validation gate is closed. Final implementation source is `docs/UI_END_REPORT_APPROVED_V1.md`.
