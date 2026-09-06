# 04 — DEPLOYMENT & DEVOPS — CURRENT REPORT

### Status
Hoàn thành H-20260907-039-04-DEPLOY-UI-ART-PUBLIC-ASSETS; production image đã chứa và serve canonical UI art public assets. Bàn giao lại final visual/runtime QA cho Chat 07.

### Changed
- Updated root `Dockerfile` runtime stage to copy `client/public` into `/app/client/public`.
- Added repository-controlled smoke workflow `.github/workflows/ui-art-public-assets-smoke.yml` to verify production manifest and a representative raster over HTTP.
- No gameplay, protocol, client asset semantics, or canonical asset paths were changed.

### Source
- Handoff `H-20260907-039-04-DEPLOY-UI-ART-PUBLIC-ASSETS`.
- `Dockerfile`.
- `client/public/assets/ui/v1/manifest.json`.
- Render service `srv-daem578u01pc73f35dbg`.
- Blocked QA handoff `H-20260907-038-07-UIUX-ART-FINAL-QA`.

### Impact
The previous production-only Wave 4 art fallback blocker is removed at deployment packaging level. Canonical paths under `/public/assets/ui/v1/` are now included in the Render runtime image and independently reachable over HTTP.

### Verified
- Packaging fix commit: `0c1eba3fe1c1df8f76a0ebf2987f9ce74933b106`.
- Render deploy: `dep-daeruch42hec73cll8eg`.
- Render deploy status: `live`.
- Build log explicitly shows `COPY client/public /app/client/public` -> DONE.
- Production smoke workflow commit: `caae3d39f5c79fa99c72c1f63b0710223818f867`.
- GitHub Actions workflow: `UI Art Public Assets Smoke`.
- Successful run: `34055138772`.
- PASS: `https://intergenerational-contract.onrender.com/public/assets/ui/v1/manifest.json` returned successfully and contained manifest version 1 plus canonical Government raster path.
- PASS: `https://intergenerational-contract.onrender.com/public/assets/ui/v1/landmarks/government.png` returned successfully, was non-empty, and validated as PNG image data.

### Unverified
- Final desktop/mobile composition and all raster readiness markers are still owned by Chat 07 final visual/runtime QA.
- H019/Wave 4 must not be called art-complete until Chat 07 reruns H038 and passes its acceptance gates.

### Handoff
Reopen `H-20260907-038-07-UIUX-ART-FINAL-QA` for Chat 07. Chat 07 should rerun its final desktop/mobile browser gate against the now-fixed live deployment and close/route any remaining defect by ownership.

### Open Issues
- No remaining Chat 04 deployment blocker for Wave 4 UI art public assets.
