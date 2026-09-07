# 04 — DEPLOYMENT & DEVOPS — CURRENT REPORT

### Status
Hoàn thành `H-20260908-075-04-APPROVED-UI-V1-CSS-PACKAGING`; production Docker hiện đóng gói và phục vụ đầy đủ CSS mà Approved UI V1 tham chiếu. Không còn blocker Deployment cho CSS stack. Một lỗi hit-area riêng của Mandatory panel đã được bàn giao cho Chat 06 qua H076.

### Changed
- Root `Dockerfile` đổi từ copy riêng `client/styles.css` sang `COPY client/*.css /app/client/`, bảo đảm toàn bộ stylesheet root được đóng gói vào production image.
- Production CSS smoke được tăng cường để kiểm tra 5 stylesheet tham chiếu bởi `client/index.html` phải trả response thành công, `Content-Type: text/css`, và không phải HTML fallback.
- Không thay gameplay, protocol, timer, authoritative values, Residence coordinates hoặc Approved UI semantics.

### Source
- Handoff `H-20260908-075-04-APPROVED-UI-V1-CSS-PACKAGING`.
- `client/index.html`.
- root `Dockerfile`.
- `qa/approved-ui-v1-live-smoke.mjs`.
- Render service `srv-daem578u01pc73f35dbg`.
- Upstream H074 Client source fix in `client/residence-pointer-fix.css`.

### Impact
Source/clean tests và production image nay dùng cùng Approved UI V1 CSS stack. H074 pointer correction thực sự được serve trên production; lỗi packaging làm production bỏ sót stylesheet đã được loại bỏ. Remaining live pointer failure is a separate Client/UI interaction issue, not a deployment/static asset issue.

### Verified
- Docker packaging commit: `fcc858e4ea58002f0814df4565f487011d56e406`.
- Render deploy `dep-daffl23bc2fs73d7kad0` reached `live`.
- Production verification commit: `ddaa117e76725a92b22b789aad647493aac454fd`.
- Workflow `Approved UI V1 E2E` run `34149752398` passed backend release regressions and clean client suite **67/67**.
- Run `34149752398` advanced past explicit CSS preflight, confirming successful non-HTML `text/css` responses for:
  - `styles.css`
  - `approved-ui-v1.css`
  - `residence-pointer-fix.css`
  - `residence-ui-v1.css`
  - `resolved-ui-contracts.css`
- After packaging, the old `.approved-turn-track` / `.hud-cluster` pointer interception is no longer the observed live blocker.
- Run `34149561408` artifact `10028892877`, digest `sha256:91eedbe161bc90f354bf9396e9f4e1c44942fea09412dbe8bac7e5c925607d76`.
- Run `34149752398` artifact `10028961500`, digest `sha256:906dbf8b00e8f84d1755163e718f1ab5d33c2f0644b3b1866fd99f8740acb310`.

### Unverified
- Full Approved UI V1 live browser acceptance remains blocked because `.approved-mandatory` currently intercepts pointer events over a visible/enabled Residence marker.
- Desktop/mobile Residence navigation and downstream H067 acceptance should be rerun after H076 Client fix.

### Handoff
- Chat 06: `H-20260908-076-06-APPROVED-UI-V1-MANDATORY-POINTER-INTERCEPTION` — fix Mandatory presentation hit-area without changing Mandatory 5-second authority or gameplay/protocol semantics.
- Chat 07: H067 remains Release/QA-owned; resume final live acceptance after H076 is fixed and deployed.

### Open Issues
- No remaining Chat 04 deployment/static packaging blocker for Approved UI V1.
- H076 is OPEN to Chat 06 for the separate Mandatory pointer-interception defect.
