# HUD B-r04 — bản chuẩn bị chỉnh sửa

Status: DRAFT / NOT USER-APPROVED / NOT APPLIED IN FIGMA
Owner: Chat 05
Date: 2026-09-29
Scope: H094, chỉnh desktop B-r03 và hoàn thiện hai trạng thái mobile đã có.
Đây là đề xuất chi tiết để dựng và review, không phải approved source hay lệnh triển khai cho Chat 06.

## Nguồn và đích

- docs/UI_HUD_APPROVED_V1.md: K1, K3, K5, K6.
- docs/UI_ROOM_APPROVED_V1.md: Turn Track, minimap, pixel/rendering.
- Báo cáo review screenshot desktop của người dùng: reports/05_CURRENT.md.
- Master qfSWFHfHAsuYut2fl2sZb6; page 0:1.
- Desktop 5:2 (1440×810); mobile 10:2 / 10:43 (390×844).
- Giữ nguyên hướng B — Ngọc sáng được chọn. Chưa có approval cho màn hình thực tế.

## Desktop: các thay đổi đề xuất

| Surface | Vấn đề và mức độ | Thay đổi cụ thể | Điều kiện kiểm tra |
|---|---|---|---|
| Turn Track | P1: khó phân biệt lượt hiện tại với người chơi cục bộ | Giữ token 54 px. Người chơi cục bộ có viền xanh kèm huy hiệu nhà nhỏ; lượt hiện tại có tam giác chỉ vào token từ bên phải, nền tối và lõi sáng. Hai tín hiệu độc lập, có thể cùng xuất hiện. Government giữ đỏ + biểu tượng tòa nhà. | Khi current khác local, cả hai vẫn xác định được; ở ảnh thang xám vẫn thấy dấu current/local/Government. |
| Settings | P2: hình hiện tại dễ đọc thành tâm ngắm | Gear 8 răng, lỗ tròn giữa, trong vùng icon 24×24; nét 2 px, căn tọa độ nguyên; giữ vùng nút hiện hành. | Nhận ra bánh răng ở kích thước hiển thị thực, không cần nhãn. |
| Niên sử | P2: thiếu icon dẫn | Icon sách mở 16 px + khoảng cách 6 px + nhãn hiện tại. Giữ khoảng cách với minimap; nếu không đủ chỗ, mở rộng nút về trái sau khi kiểm tra va chạm. | Không cắt chữ tiếng Việt, không đè society cluster/minimap. |
| Minimap | P2: chi tiết cảnh quá dày | Dựng lớp overview riêng: mảng đất/nước, đường chính, khối công trình; bỏ cây lẻ/hoa/bóng nhỏ. Government và Home dùng icon khác nhau. Viewport có viền tối ngoài, sáng trong, tổng khoảng 3 px. | Nhìn rõ đường, hai marker và viewport ở 200×140; không hiểu sai overview thành nút. |

Không dịch chuyển các cụm thông tin đã đúng chỉ để thêm trang trí. Chỉ đổi tên revision sang B-r04 sau khi sửa thực sự được lưu.

## Mobile: hoàn thiện trên frame đã có

- Giữ hàng chính Round/Year, Phase/Timer, Population.
- Frame 10:2 thu gọn; 10:43 mở lớp Inflation và Debt/Ceiling.
- Áp dụng portrait đã nhập vào token, dùng cùng quy ước current/local/Government với desktop. Tối thiểu vùng chạm 44×44 cho điều khiển.
- Dùng overview giản lược cho minimap 120×84; giữ marker rõ và viewport. Không thay bằng icon bản đồ.
- Nền thế giới: điều chỉnh crop cho từng frame, ưu tiên còn nhận ra Government và quảng trường. Đây là crop minh họa; không đặt luật camera hay vị trí nhà thực tế.
- Kiểm tra nền sau khi mở lớp phụ: thông tin chính vẫn thấy, rail không đè minimap, nút zoom không chạm mép dưới.
- Không coi thao tác chuyển giữa hai frame là prototype tương tác đã hoạt động.

## Ownership và trạng thái cần dựng

Một bộ component dùng chung cho plaque, utility button, avatar token và minimap marker; mobile thay bố cục chứ không tạo bộ chrome khác.

Các trục trạng thái avatar độc lập:
- identity: Character / Government;
- local: yes / no;
- current: yes / no;
- interaction: default / hover / keyboard focus.

Phase: local turn / waiting; nội dung và thời gian minh họa không được dùng làm logic.
Settings và Niên sử: default / hover / focus / pressed.
Minimap: overview / focused marker; hành vi camera phải dùng trạng thái thực khi triển khai.

## Art và giới hạn

World và portrait đã nhập, không yêu cầu người dùng nhập lại. Giữ nguyên source rectangles 12:3 và 12:4.

ART-BLOCKED đối với bộ asset production: cảnh raster tổng thể chưa thay thế bộ địa hình/công trình/nhân vật có thể ghép theo trạng thái game. Cần native pixel grid nhất quán, biến thể công trình theo semantics đã duyệt và kiểm tra rendering ở tỉ lệ mục tiêu. Không dùng bộ lọc pixel hóa toàn cảnh để tuyên bố đã đạt pixel-art production.

Không suy ra Status, Residence identity, eligibility, thứ tự lượt hoặc gameplay từ tranh minh họa.

## Trình tự tiếp tục

1. Khi có bằng chứng hạn mức Figma đã thay đổi, đọc mục tiêu cần sửa rồi cập nhật trực tiếp các frame hiện có; không tạo master mới.
2. Review desktop và hai mobile ở kích thước đọc được; kiểm tra các trường hợp current/local tách nhau.
3. Cho người dùng xem actual Figma screenshots để chốt. Recommendation trong tài liệu này không phải approval.
4. Sau approval và hoàn thiện các anchor H094: xuất bundle có revision, node ID, state, asset và screenshot rồi mới handoff Chat 06.

Hiện chưa thực hiện bước 1 do Starter MCP call limit; không có client implementation hoặc QA/production signoff mới.
