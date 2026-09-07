# UI END REPORT — APPROVED V1

Status: USER-APPROVED / AUTHORITATIVE FOR IMPLEMENTATION
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

This is the authoritative End Report design source. It does not change scoring, end conditions, replay authority, multiplayer protocol or gameplay rules.

## 1. End-state shell

Normal Round32 completion uses a dedicated **full-screen End Report scene**.

- Final world remains softly visible/faded in the background as visual closure.
- Normal active HUD, phase/timer, Voluntary actions, Turn Track controls and other gameplay actions are absent/disabled.
- The scene is clearly terminal/post-game, not another gameplay panel.

## 2. Winner and rankings — standard Round32 completion only

For a standard full-duration ending:

1. winner is the strongest visual result at the top;
2. Top 3 use a celebratory podium-style treatment;
3. a complete ordered Human ranking follows underneath.

All order/value truth comes from authoritative server ranking state. Client does not sort/recompute winners.

## 3. Score wording

Use the primary metric label:

`ĐIỂM TÀI SẢN TRUNG BÌNH QUA CÁC KIẾP`

Include a short explanation equivalent to:

`Điểm được tính từ tài sản HHA được ghi nhận trong các vòng/kiếp sống hoạt động, không chỉ từ tiền mặt.`

Do not show the full scoring formula beside every player. Detailed mechanics remain in Rules/Niên sử.

Important semantics:
- funded ASXH belongs in authoritative asset score;
- resource score uses authoritative current spot value rules;
- married Character score share is authoritative and must not be presented as 100% Household assets;
- bankruptcy-round zeroes are server scoring truth.

## 4. Personal recap

Every Human gets a compact `HÀNH TRÌNH CỦA BẠN` section using authoritative history/result state, containing where available:

- final rank;
- AverageLifeAssetScore;
- number of lives;
- highest asset-score milestone;
- highest Status;
- marriages;
- children;
- compact score trend across active rounds/lives.

Do not duplicate the full Niên sử timeline inside End Report.

## 5. Human with no life/active round

A Human who never received a playable Character remains visible in the complete result list.

Show explicit state:
- `CHƯA CÓ KIẾP SỐNG`;
- `0 VÒNG HOẠT ĐỘNG`.

Preserve authoritative ranking value/order where supplied, but visually distinguish this from a Human who actively played and received a legitimate zero score.

## 6. Early extinction

If authoritative ending reason is true extinction before standard completion:

Primary result:

`XÃ HỘI ĐÃ TUYỆT CHỦNG`

Secondary result:

`THẤT BẠI CHUNG`

Rules:
- **no winner**;
- **no Top 3 podium**;
- ranking/personal statistics may remain available only as historical/postmortem context;
- never relabel the highest historical average as a standard winner.

## 7. Same-room replay

After ended state:

### Host

Primary action:

`CHƠI LẠI CÙNG PHÒNG`

### Non-host

Show status:

`ĐANG CHỜ HOST`

Do not render an enabled replay button for non-hosts.

When Host triggers authoritative replay:

1. short transition: `BẮT ĐẦU MỘT XÃ HỘI MỚI`;
2. return connected room to fresh pre-game/Lobby flow;
3. old Characters, scores, histories and world state must not appear active in the new game.

Replay preserves room/player connections only; it is not continuation of the ended engine.

## 8. Post-game exploration

Keep compact read-only actions:

- `XEM NIÊN SỬ`;
- `XEM THẾ GIỚI CUỐI CÙNG`;
- leave/return-room navigation as appropriate.

The final world can be inspected read-only. No Market, Recovery, Support, Birth, Status, Marriage send/respond, Government policy or other gameplay actions remain available.

## 9. Visual direction

- Continue approved pixel-art + fantasy/parchment/wood language.
- End Report can be more ceremonial than ordinary gameplay panels while staying readable.
- Winner emphasis should be celebratory without replacing the complete ranking.
- Extinction uses a solemn shared-failure treatment, clearly distinct from winner presentation.
- Final world backdrop should remain recognizable but subordinate to results.

## 10. Mobile

Mobile uses a dedicated full-screen/end-state layout with vertical flow:

1. ending state / winner or extinction result;
2. local personal recap;
3. Top 3 where applicable;
4. full ranking;
5. read-only exploration/replay controls.

Do not force desktop podium/table widths onto mobile. Preserve all authoritative result semantics.

## 11. Contract guardrails

- Consume authoritative `endingReason` and `rankings()` order/value.
- Do not recalculate score/rank/winner client-side.
- Do not derive personal recap values from raw Chronicle text if structured authoritative fields are absent.
- If a required structured personal statistic is missing, Chat 06 must request a narrow Chat 03 contract addition.

## 12. Approval record

User explicitly approved ER1–ER9 = option A on 2026-09-07.

End Report V1 is USER-APPROVED and ready for Client Implementation.
