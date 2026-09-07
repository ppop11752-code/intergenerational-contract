handoff_id: H-20260907-044-08-UI-RULE-LEDGER-AUDIT
from: 00
to: 08
status: OPEN
title: Kiểm toán UX/UI hiện tại so với Rule Ledger

## Context

Người dùng yêu cầu kiểm tra độc lập UX/UI hiện tại xem có mâu thuẫn, thiếu tính năng, sai semantics hoặc bỏ sót gameplay nào khi đối chiếu với Rule Ledger hay không.

Chat 05 hiện báo direct user approval mới hoàn tất cho cụm chính `Landing → Lobby → Room → HUD` qua:
- `docs/UI_LANDING_APPROVED_V1.md`
- `docs/UI_LOBBY_APPROVED_V1.md`
- `docs/UI_ROOM_APPROVED_V1.md`
- `docs/UI_HUD_APPROVED_V1.md`

GitHub `docs/RULE_LEDGER.md` chỉ là migration overlay và tự ghi rõ full ledger vẫn là Rule Ledger/Migration Pack v3. Khi kiểm toán phải ưu tiên latest user decisions + full Rule Ledger/Migration Pack v3, rồi mới tới overlay/current implementation.

## Required audit

1. Đối chiếu toàn bộ 4 approved UI specs với Rule Ledger/Migration Pack v3 và latest locked user decisions.
2. Phân loại rõ:
   - CONTRADICTION: UI nói/cho phép điều trái rule;
   - MISSING COVERAGE: gameplay feature có trong Rule Ledger nhưng chưa có approved UX/UI surface hoặc chưa rõ cách người chơi truy cập/nhận biết;
   - AMBIGUITY: UI wording/layout có thể khiến người chơi hiểu sai rule;
   - OK: đã khớp rule.
3. Kiểm tối thiểu các nhóm rule: room/founder/queue/reconnect/tutorial; turn order/phases/timers; household/residence; Mandatory/bankruptcy/liquidation; marriage lifecycle; Status/Noble cap; Market/Recovery/Support/Birth; ASXH/pension/support fund; Government/debt; World Events; elderly/mortality/grief; inheritance; immigration/NPC; scoring/end-game/replay.
4. Đặc biệt xác minh xem cụm approved hiện tại có bị coi nhầm là "full UX/UI complete" trong khi các gameplay surfaces khác chưa có direct user-approved spec hay không.
5. Không sửa design, code hay gameplay. Chỉ DETECT → VERIFY → CLASSIFY → REPORT.
6. Cập nhật `reports/08_CURRENT.md` với kết luận và handoff cụ thể về Chat 05/06/03/01 nếu cần.

## Preliminary points from Chat 00 to falsify/confirm

- `reports/05_CURRENT.md` chỉ tuyên bố direct user approval cho Landing/Lobby/Room/HUD, nên có khả năng còn thiếu approved UX cho Mandatory, Status, Market, Recovery, Support, Birth, Marriage, Residence/Family/Profile, Government, Niên sử detail, Waiting Queue/reconnect detail, End Report/scoring.
- HUD quy định phase/timer luôn visible; cần xác minh wording có làm sai nghĩa Mandatory (presentation duration, không phải gameplay decision timer) hay không.
- Room spec cho child click/focus về parents' Residence cần đối chiếu residence rules Stage1–2 và orphan transition.
- Lobby Founder reveal/Waiting Queue phải khớp 1–10/>10 Humans và reconnect/late-join semantics.

## Expected output

Một bảng phát hiện ngắn, ưu tiên theo severity, chỉ rõ source và Chat chịu trách nhiệm xử lý. Không tuyên bố UI release-ready nếu coverage chưa đầy đủ.