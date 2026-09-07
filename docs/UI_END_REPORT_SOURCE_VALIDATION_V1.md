# UI END REPORT — SOURCE VALIDATION V1

Status: USER VERIFICATION REQUIRED
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

## CURRENT / AUTHORITATIVE BEHAVIOR — DO NOT RE-ASK

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

## CURRENT DATA

Current authoritative room/public state exposes:
- `game.ended`;
- `game.endingReason`;
- `game.rankings()` result through public snapshot;
- room `hostPlayerId` / Human roster;
- per-Human history/score snapshots through private/history state;
- current history statistics including lives, highest assets/status, marriages and children.

## UX RISKS

1. End Report must not call raw cash the winning score.
2. Married Humans must not be credited with 100% of Household assets in scoring presentation.
3. Early extinction must never show a winner/podium even if rankings can technically be computed.
4. Ranking must come from authoritative server order, not client-side sorting/recalculation.
5. Replay must clearly mean a fresh game in the same room, not continuation of the ended world.
6. Non-host players must not see a usable replay control that implies they can start it.

## USER VERIFICATION QUESTIONS

### ER1 — Normal Round32 ending composition

A. Use a dedicated **full-screen End Report scene** with the final world softly visible/faded in the background, strong result hierarchy and no active gameplay HUD/actions.
B. Keep normal World Map shell and open one large centered results panel.
C. Use a minimal toast and remain in the normal room UI.

Recommendation: **A** — game completion is a true terminal state and deserves stronger visual closure than an ordinary information panel.

### ER2 — Winner and ranking presentation

A. Show winner prominently at top, then Top 3 podium-style treatment and a complete ordered Human ranking below using authoritative `AverageLifeAssetScore`.
B. Show only the winner and local player rank.
C. Show a plain full ranking table with no winner emphasis.

Recommendation: **A** — celebratory but still transparent about the full competition.

### ER3 — Score explanation

A. Label the metric clearly as `ĐIỂM TÀI SẢN TRUNG BÌNH QUA CÁC KIẾP` and show one short explanation that it uses authoritative HHA/tài sản across active rounds/lives, not cash alone; detailed formula stays in Rules/Niên sử.
B. Show the number only.
C. Show the full scoring formula beside every ranking row.

Recommendation: **A** — enough to prevent the most important scoring misunderstanding without turning the end screen into documentation.

### ER4 — Personal lifetime recap

A. Give every Human a `HÀNH TRÌNH CỦA BẠN` section with final rank, average score, lives, highest asset score/status, marriages, children and a compact score trend; no raw internal IDs.
B. Show only final rank and score.
C. Show the full Niên sử timeline again inside End Report.

Recommendation: **A** — useful closure without duplicating the whole Chronicle.

### ER5 — Human who never received a Character/life

A. Keep them visible in the complete room result list but label `CHƯA CÓ KIẾP SỐNG` / `0 VÒNG HOẠT ĐỘNG` rather than visually presenting them like a normal scored life; preserve authoritative ranking value/order where supplied.
B. Remove them entirely from End Report.
C. Display them identically to a Human with an active 0 score from gameplay.

Recommendation: **A** — transparent without falsely implying they actively earned a zero through gameplay.

### ER6 — Early extinction ending

A. Replace winner/podium with a strong shared result `XÃ HỘI ĐÃ TUYỆT CHỦNG — THẤT BẠI CHUNG`; show final society summary and personal recap/rank statistics only as historical context, explicitly **no winner**.
B. Still show the highest-ranked Human as `người thắng` despite extinction.
C. Show only the failure sentence and no report data.

Recommendation: **A** — matches authoritative ending semantics while preserving useful postmortem information.

### ER7 — Replay controls

A. Host sees primary `CHƠI LẠI CÙNG PHÒNG`; non-hosts see `ĐANG CHỜ HOST` status plus ordinary leave/return navigation, never an enabled replay button.
B. Everyone sees the replay button; server rejects non-host clicks.
C. Hide replay entirely and require creating a new room.

Recommendation: **A** — accurately reflects Host-only authority before interaction.

### ER8 — Replay transition

A. On Host replay, use a short transition `BẮT ĐẦU MỘT XÃ HỘI MỚI`, then return the connected room to the fresh pre-game/Lobby flow; no old scores/Characters/world state remain active.
B. Restart directly into Round1 without returning through the room/lobby context.
C. Visually keep the old world and reset only numbers.

Recommendation: **A** — clearly communicates a fresh engine/game while preserving the same room connections.

### ER9 — End Report navigation

A. Keep compact actions for `XEM NIÊN SỬ` and `XEM THẾ GIỚI CUỐI CÙNG` as read-only post-game exploration, plus return/leave room navigation; no gameplay actions remain.
B. Only show replay/leave controls.
C. Leave all normal gameplay panels active after end.

Recommendation: **A** — lets players inspect what happened without confusing the ended game with an active session.

## Gate

Do not create final End Report spec or Chat 06 implementation handoff until ER1–ER9 are directly approved by the user.
