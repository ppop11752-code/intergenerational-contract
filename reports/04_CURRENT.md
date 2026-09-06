# 04 — DEPLOYMENT & DEVOPS — CURRENT REPORT

### Status
Hoàn thành H-20260906-016-04-OI004-E2E-RUNNER; network-capable browser E2E runner đã chạy PASS và bàn giao bằng chứng cho Chat 07.

### Changed
- Added repository-controlled Playwright runner `qa/live-client-e2e.mjs`.
- Added GitHub Actions workflow `.github/workflows/live-client-e2e.yml` running on GitHub-hosted Ubuntu with Chromium and network access.
- Corrected an initial runner-only defect that tried to inspect Birth UI before an active game phase; no product/runtime semantics were changed.
- Final runner commit: `8facc98a38b654a30cad24aaf13667c78a529705`.

### Source
- Handoff `H-20260906-016-04-OI004-E2E-RUNNER`.
- `qa/live-client-e2e.mjs`.
- `.github/workflows/live-client-e2e.yml`.
- Live URL `https://intergenerational-contract.onrender.com`.
- Chat 07 blocked handoff `H-20260906-015-07-OI004-FINAL-E2E`.

### Impact
Chat 07 no longer depends on its local sandbox DNS. Browser/server evidence can be reproduced from GitHub Actions against the live Render service without changing gameplay, client semantics, or server protocol.

### Verified
- GitHub Actions workflow: `Live Client E2E`.
- Successful run ID: `34039901844` (run #2), head SHA `8facc98a38b654a30cad24aaf13667c78a529705`.
- Browser: Playwright Chromium on GitHub-hosted Ubuntu runner.
- Evidence artifact ID: `9991351341`, name `live-client-e2e-evidence`, digest `sha256:172d1160e32cf08e99109343c0eea66764a2d41e1e44c030b01243420e01cbf2`.
- Artifact contains `results.json` plus screenshots `tutorial-entry.png`, `help-recap.png`, `birth-gating.png`, `normal-room.png`.
- PASS: live page load.
- PASS: same-origin Socket.IO connection.
- PASS: Tutorial room entry with T0 visible.
- PASS: help recap is non-blocking; authoritative countdown observed `7s -> 6s` while recap open.
- PASS: authoritative Birth UI gating observed in live Tutorial game with `canInitiateBirth=false`; no Birth proposal button shown and authoritative unavailable message rendered.
- PASS: normal multiplayer room has no Tutorial coach overlay (`coach count=0`).

### Unverified
- The same E2E run did not deterministically force a `canInitiateBirth=true` live state; source/client regression coverage for false/true contract remains separate evidence for Chat 07.
- Full T0–T11 progression was not forced because doing so reliably would require gameplay-state manipulation beyond this DevOps runner. Chat 07 must combine this browser evidence with deterministic client/server tests and any manual progression it deems necessary before closing OI-004.

### Handoff
Chat 07 should consume GitHub Actions run `34039901844` and artifact `9991351341`, reconcile it with existing false/true Birth contract tests and T0–T11 coverage, then finalize independent OI-004 release QA.

### Open Issues
- No remaining Chat 04 DevOps blocker for OI-004 E2E execution infrastructure.
