handoff_id: H-20260907-062-06-END-REPORT-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Implement USER-APPROVED End Report V1

## Source

Primary implementation source:
- `docs/UI_END_REPORT_APPROVED_V1.md`

Supporting authoritative sources:
- `docs/RULE_LEDGER.md`
- `docs/UI_CHRONICLE_APPROVED_V1.md`
- current server `endingReason`, `rankings()` and PlayerHistory/score state.

## Required implementation

Implement the approved End Report V1 exactly at presentation/client level:

1. Dedicated full-screen post-game scene with final world softly visible/faded in background; no active gameplay HUD/actions.
2. Standard Round32 ending:
   - winner strongest;
   - Top 3 podium treatment;
   - complete Human ranking below;
   - ranking/order/value use authoritative server result.
3. Metric wording:
   - `ĐIỂM TÀI SẢN TRUNG BÌNH QUA CÁC KIẾP`;
   - clarify score is authoritative HHA/assets across active rounds/lives, not cash only.
4. `HÀNH TRÌNH CỦA BẠN` recap:
   - rank;
   - average score;
   - lives;
   - highest asset-score/status;
   - marriages;
   - children;
   - compact score trend where authoritative structured data supports it.
5. Humans with no life:
   - keep visible;
   - show `CHƯA CÓ KIẾP SỐNG` / `0 VÒNG HOẠT ĐỘNG`;
   - do not make them look like an actively played zero-score life.
6. Early true extinction:
   - `XÃ HỘI ĐÃ TUYỆT CHỦNG — THẤT BẠI CHUNG`;
   - no winner;
   - no podium;
   - any ranking/statistics are historical/postmortem only.
7. Replay:
   - Host gets enabled `CHƠI LẠI CÙNG PHÒNG`;
   - non-host sees `ĐANG CHỜ HOST`, no enabled replay action;
   - authoritative replay transition `BẮT ĐẦU MỘT XÃ HỘI MỚI` then fresh Lobby/pre-game flow in same room.
8. Post-game read-only actions:
   - `XEM NIÊN SỬ`;
   - `XEM THẾ GIỚI CUỐI CÙNG`;
   - leave/return navigation;
   - no gameplay actions remain.
9. Mobile uses dedicated vertical end-state layout preserving all result semantics.

## Hard guardrails

- Do **not** recalculate/sort rank/winner in client when authoritative ranking exists.
- Do **not** call winning metric cash/money-only.
- Do **not** show 100% married Household assets as a Human's authoritative score share.
- Do **not** show winner/podium for early extinction.
- Do **not** expose enabled replay control to non-hosts.
- Replay is a fresh engine/game in the same room, not continuation of ended state.
- Do **not** parse Chronicle strings to invent structured personal statistics or score truth.
- If required End Report fields are not exposed cleanly, create a narrow handoff to Chat 03 rather than inventing local truth.

## Acceptance

- End Report visually matches `docs/UI_END_REPORT_APPROVED_V1.md`.
- Standard completion and extinction produce visibly different correct result semantics.
- Authoritative ranking/replay state is respected.
- Post-game exploration is read-only.
- Desktop and mobile both preserve score/replay/extinction semantics.

## Handoff back

After implementation, update `reports/06_CURRENT.md` with:
- implemented scope;
- actual files changed;
- build/test verification;
- any missing server-contract fields;
- any visual/interaction items still unverified.
