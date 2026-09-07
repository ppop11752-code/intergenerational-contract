# 04 — DEPLOYMENT & DEVOPS — CURRENT REPORT

### Status
Hoàn thành `H-20260908-073-04-APPROVED-UI-V1-DOCKER-BUILD`; production Docker build parity đã được khôi phục và Approved UI V1 hiện được serve trên Render. Bàn giao lại H067 cho Chat 07.

### Changed
- Added `DOM.Iterable` to `client/tsconfig.json`, matching Approved UI source use of iterable DOM collections without weakening strict TypeScript checks.
- Declared the client TypeScript toolchain explicitly as `typescript@5.7.2` in `client/package.json`.
- Changed Docker `client-build` to install the client package toolchain and run `npm run build` instead of invoking a detached `npx` compiler.
- Expanded `Approved UI V1 E2E` workflow triggers to include Docker/client build configuration changes so build/runtime parity is automatically checked in future.
- No gameplay, protocol, authoritative values, or Approved UI decisions were changed.

### Source
- Handoff `H-20260908-073-04-APPROVED-UI-V1-DOCKER-BUILD`.
- `client/tsconfig.json`.
- `client/package.json`.
- root `Dockerfile`.
- `.github/workflows/approved-ui-v1-e2e.yml`.
- Render service `srv-daem578u01pc73f35dbg`.

### Impact
Production can now compile and deploy the Approved UI V1 client using the same declared TypeScript configuration/toolchain as the clean client suite. The prior Render build blocker is removed. Full interaction/browser acceptance remains Release/QA ownership.

### Verified
- Root cause reproduced in Render logs: TS2488 on iterable `NodeListOf`, followed by cascading TS2347/TS7006 errors.
- `client/tsconfig.json` fix commit: `5326273bef78bb8022e327540556f1cce7396233`; Render deploy `dep-daff9qh5efls73aq43sg` reached LIVE, proving the compile blocker was removed.
- Declared toolchain commit: `85e153fd8b975be0b003cfb8ae87cd963c9cb59a`.
- Final Docker parity commit: `7f23347a1ba1b39ca5aa752e2926665894e31190`; Render deploy `dep-daff9roou94c73a6vogg` reached LIVE.
- Current CI-gate commit: `1ebeb2e3e6eee6c45d2c37177b2c8b030e4186d3`; Render deploy `dep-daffavrbc2fs73d77t5g` reached LIVE.
- Approved UI E2E run `34148123375`: backend `release:check` PASS and clean client suite PASS 64/64.
- Live browser smoke passed the H073 deployment acceptance required to prove Approved UI runtime is served: desktop `.landing-screen.approved-landing` appeared, landing controls existed, Tutorial entry succeeded, world map loaded, privacy/Persona checks passed, and Residence markers were present.
- Evidence artifact: `10028424942`, digest `sha256:6ad572e1e3194ca6afc7660d7daef55acf90980b2510a2b54d1efa9ba77440a2`.

### Unverified
- The broader Approved UI workflow did not finish PASS: after the deployment/runtime checks above, Playwright timed out clicking a Residence marker because Turn Track/HUD intercepted pointer events. This is a post-deploy UI interaction finding, not a Docker/build blocker.
- Mobile/deeper world-first navigation, responsive behavior, and final interaction acceptance remain for Chat 07 under H067; Chat 07 should classify/route the pointer-interception finding by ownership.

### Handoff
Reopen `H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA` for Chat 07. Production now contains Approved UI V1; QA should rerun/finalize its live browser checks and route any genuine UI/client interaction defect to Chat 06 (or UI design issue to Chat 05) as appropriate.

### Open Issues
- No remaining Chat 04 deployment/build blocker for Approved UI V1.
- Live Residence-marker pointer interception remains an independent QA finding pending Chat 07 classification.
