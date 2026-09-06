# 04 — DEPLOYMENT & DEVOPS — CURRENT REPORT

### Status
Bị chặn ở OI-006 sau khi xác minh trực tiếp Render và áp dụng fix DevOps ở repo root.

### Changed
- Xác minh service Render `intergenerational-contract` dùng repo `ppop11752-code/intergenerational-contract`, branch `main`, auto-deploy bật.
- Phát hiện Render đang dùng `rootDir: ""`, Docker context `.`, Dockerfile `./Dockerfile`.
- Build cũ tại commit `25d02e994f005e8f1453883dd7461a7c3c4c32da` fail vì không thấy `/src` và `/server/src`.
- Thêm Dockerfile ở repo root để ánh xạ đúng canonical backend `server/backend/` mà không đổi gameplay/server logic.

### Source
- Render service/deploy/build logs trực tiếp.
- `server/backend/Dockerfile`
- `server/backend/server/package.json`
- `server/backend/server/src/`
- Root `Dockerfile` commit `026172ae4739e82b129a1cdd982b7bf5d1afdb18`.

### Impact
Fix mới tương thích với cấu hình Render hiện tại đang build từ repo root. Không cần thay Root Directory trên Render để resolve COPY path mismatch.

### Verified
- Service ban đầu: `srv-daeeo90u01pc73e6mf10`, URL `https://intergenerational-contract.onrender.com`, region Singapore, Docker runtime, branch `main`, autoDeploy `yes`.
- Deploy cũ `dep-daeeo9ou01pc73e6mgrg` status `build_failed`.
- Build log lỗi tại `COPY src ./src` và `COPY server/src ./server/src` do repo-root context không chứa các path cũ.
- Root Dockerfile mới giữ layout build nội bộ `/app` nhưng COPY từ `server/backend/...`.

### Unverified
- Sau commit root Dockerfile, Render API bắt đầu trả 404 cho service ID đã đọc trước đó và `list_services` trả `null`; vì vậy chưa xác minh được auto-deploy mới.
- Fresh build success, process start, `/health`, env runtime, Socket.IO smoke vẫn chưa xác minh.

### Handoff
Chat 04 tiếp tục OI-006 khi Render service truy xuất lại được. Sau khi live runtime sạch, handoff Chat 03/07 cho integration/release validation.

### Open Issues
- OI-006 — dependency-backed live server runtime verification — BLOCKED bởi khả năng truy xuất service Render sau commit fix.
