# HANDOFFS

Mỗi file trong thư mục này là một yêu cầu bàn giao giữa các Chat chuyên môn.

Tên khuyến nghị:

`H-YYYYMMDD-NNN-TO-ISSUE.md`

Ví dụ:

`H-20260906-001-03-OI003.md`

Trường bắt buộc ở đầu file:

```text
handoff_id: H-20260906-001-03-OI003
from: 00
to: 03
status: OPEN
title: Xử lý OI-003 game:replay
```

`status` dùng một trong:

- `OPEN`
- `BLOCKED`
- `DONE`
- `CLOSED`

GitHub Action sẽ tự tạo Issue khi một handoff mới `OPEN` được thêm và tự đóng Issue khi handoff chuyển sang `DONE`/`CLOSED`.

Nguồn sự thật vẫn là file handoff + source/docs/report trong repo, không phải nội dung Issue.
