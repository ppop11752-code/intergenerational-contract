# Intergenerational Contract v5.0 — Authoritative Socket.io Server

Mỗi room giữ đúng một `GameEngine` authoritative. Client chỉ gửi intent; không được tự sửa state kinh tế/xã hội.

## Flow hiện tại
1. `room:create` / `room:join`.
2. Host có thể `game:start` từ 1 Human; dưới 10 Human thì server tự bù NPC founder, trên 10 Human thì server rút bài founder và đưa phần dư vào Hàng chờ tái sinh.
3. Đầu vòng: engine xử lý recovery/pension/event/immigration, rút Turn Card, production, snapshots và prefund family obligations.
4. Human turn: **Mandatory presentation -> Status (15s) -> Voluntary (60s)**. Spouse đi sau bỏ qua Household Mandatory + Status.
5. NPC turns chạy authoritative tự động.
6. Marriage là social action ngoài lượt; Accept/Reject có thể xảy ra trong own turn nhưng merge chỉ ở cuối vòng.
7. Cuối vòng xử lý birth, marriage, fiscal close, elderly medical/mortality, inheritance, aging, Noble allocation, Status activation và history snapshot.

## Reconnect
- Disconnect: Character hiện tại chuyển vĩnh viễn sang NPC takeover.
- Reconnect: Human vào cuối Hàng chờ tái sinh, không reclaim Character cũ.
- Late join sau khi game bắt đầu: vào cuối Hàng chờ.

## Timers
- `MANDATORY_PRESENTATION_MS` mặc định 5000; đây chỉ là thời gian trình bày
  server-authoritative, tự chuyển phase và không có manual skip.
- `STATUS_TIMEOUT_MS` mặc định 15000.
- `VOLUNTARY_TIMEOUT_MS` mặc định 60000.

## State
- `room:state`: public snapshot của room/game.
- `player:state`: private controller snapshot (current Character, household economics, quota, incoming proposals, queue position).

## Security / authority
Server xác minh room/player binding, phase, turn ownership, proposal target, quantity/range và toàn bộ hard-rule kinh tế thông qua `GameEngine`.
