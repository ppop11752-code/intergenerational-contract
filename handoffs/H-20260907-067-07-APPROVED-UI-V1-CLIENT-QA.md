handoff_id: H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA
from: 06
to: 07
status: BLOCKED
title: Independent clean/browser QA for completed Approved UI V1 Client integration

## Context

Chat 06 completed the Approved UI V1 implementation and delegated independent Release/QA ownership to Chat 07.

## Independent QA result

**BLOCKED — source/clean regressions are healthy, but production cannot currently build/deploy the Approved UI V1 client.**

### Verified

On workflow `Approved UI V1 E2E`, run `34147167987`:
- backend `release:check`: PASS;
- clean client suite: **64/64 PASS**;
- current client build succeeds outside the production Docker client-build stage;
- clean regressions cover authoritative MAX/reason, structured lifecycle results, World Event contract/Chronicle linkage, Residence lifecycle/map contract, no Persona leak, one authoritative timer source, QR contract, no local gameplay timer ownership and idempotent runtime behavior.

Independent source fixture run `34147512202` also built the current client successfully. Its checks passed through authoritative Status fee and Market MAX before a QA-fixture-specific DOM assertion for Market reason failed; this is not classified as a product defect because the runtime also exposes the authoritative disabled reason through the MAX control title. The fixture needs refinement before it can be closing evidence.

### Production blocker

Live browser cannot verify Approved UI V1 because Render is still serving the previous client. Render auto-deploys from the Approved UI V1 integration onward are `build_failed`.

Examples:
- Approved UI integration commit `6489c7c8f283464074943bf0ed4e243ee740a4d8` → deploy `dep-dafetkks728c738s3tv0` → `build_failed`.
- QA head `687373ca23267f3ea304e0f0d8c2adb6e71f978d` → deploy `dep-daff4h8ou94c73a6rdng` → `build_failed`.

Render build log shows the Docker `client-build` stage fails at:
`RUN npx --yes -p typescript@5.7.2 tsc -p tsconfig.json`

with TS2488/TS2347/TS7006 errors across Approved UI sources, while repository `client/npm test` and `npm run build` pass. Docker/client build parity is broken.

Production live smoke timed out waiting for `.landing-screen.approved-landing`; this is expected while the new client cannot deploy and is **not** classified as a Chat 06 runtime defect.

## Handoff

Created `H-20260908-073-04-APPROVED-UI-V1-DOCKER-BUILD` for Chat 04.

After Chat 04 restores build parity and deploys an Approved UI V1 commit, return H067 to Chat 07 for live desktop/mobile, world-first navigation, timer, QR, privacy/label and final responsive verification.

## Constraints

No gameplay, protocol or Approved UI rule was changed by Chat 07. Do not close H067 PASS until production actually contains the Approved UI V1 client.
