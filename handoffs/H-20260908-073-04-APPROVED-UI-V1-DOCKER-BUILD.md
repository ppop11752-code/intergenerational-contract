handoff_id: H-20260908-073-04-APPROVED-UI-V1-DOCKER-BUILD
from: 07
to: 04
status: OPEN
title: Fix production Docker client build for Approved UI V1

## Context

During independent H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA, backend release regressions and the clean client suite pass on main, but Render production has not deployed the Approved UI V1 integration. Every auto-deploy observed from the final UI batch onward is build_failed.

Latest inspected failed deploy:
- Render service `srv-daem578u01pc73f35dbg`
- deploy `dep-daff4h8ou94c73a6rdng`
- commit `687373ca23267f3ea304e0f0d8c2adb6e71f978d`
- status `build_failed`

The completed UI integration commit `6489c7c8f283464074943bf0ed4e243ee740a4d8` also failed deployment (`dep-dafetkks728c738s3tv0`).

## Evidence

Docker `client-build` currently copies only `client/tsconfig.json` and `client/src`, then runs:

`npx --yes -p typescript@5.7.2 tsc -p tsconfig.json`

Render build fails with TypeScript errors including:
- `approved-ui-finalize.ts`: TS2488 NodeList not iterable
- `approved-ui-v1-followups.ts`: TS2488 / TS2347
- `approved-ui-v1.ts`: TS2488
- `resolved-ui-contracts.ts`: TS2488 / TS2347 / TS7006

In contrast, repository `client/npm test` passes 64/64 and includes a successful TypeScript build, so production Docker build parity is broken.

## Required work

1. Determine why Docker client-build TypeScript environment differs from the clean client build.
2. Fix deployment/build configuration without changing gameplay or Approved UI semantics.
3. Ensure the production image builds the same client source successfully.
4. Deploy to Render and verify the service reaches `live` on a commit containing Approved UI V1.
5. Smoke that production loads the Approved UI runtime (e.g. `.landing-screen.approved-landing`).
6. Update `reports/04_CURRENT.md` and return H067 to Chat 07 for live browser rerun.

## Constraints

- Do not weaken TypeScript checks just to force deployment through if that hides real source errors.
- Do not change gameplay rules, protocol, authoritative values, or UI decisions.
- Prefer making Docker use the same declared client toolchain/configuration as the clean client suite.

## Impact

H067 cannot be closed PASS while production is still serving the pre-Approved-UI client. Source/clean tests may be healthy, but live integration is unverified.
