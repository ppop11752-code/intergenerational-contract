# 04 — DEPLOYMENT & DEVOPS — CURRENT REPORT

### Status
Hoàn thành OI-005; chuyển sang OI-006.

### Changed
- Re-verified canonical deployment tree.
- OI-005 Render/GitHub missing `server/src` mismatch is resolved at source-tree/config-path level.
- Canonical deploy root must be `server/backend/` for the existing Dockerfile.

### Source
- `docs/PROJECT_BASELINE.md`
- `docs/OPEN_ISSUES.md`
- `server/backend/Dockerfile`
- `server/backend/server/package.json`
- `server/backend/server/src/`
- Handoff `H-20260906-002-04-OI005`

### Impact
Render must build from `server/backend/` (or equivalent Docker build context). Repo-root Docker context would not match current Dockerfile COPY paths. Live cloud deployment/runtime still requires verification under OI-006.

### Verified
- `server/backend/server/src/index.ts` exists.
- `server/backend/server/src/game-room.ts` exists.
- `server/backend/server/src/contracts.ts` exists.
- Dockerfile COPY paths are internally consistent when build context/root is `server/backend/`.
- Server start target is `node dist/server/src/index.js` via both Dockerfile CMD and `server/package.json`.

### Unverified
- Current Render service Root Directory / Dockerfile settings cannot be read from the GitHub repo.
- Fresh Render build success, `/health`, dependency-backed runtime, and Socket smoke test are not yet verified.

### Handoff
Continue with Chat 04 under OI-006 for live dependency-backed deployment/runtime verification; then Chat 03/07 for integration/release validation.

### Open Issues
- OI-006 — dependency-backed live server runtime verification.
