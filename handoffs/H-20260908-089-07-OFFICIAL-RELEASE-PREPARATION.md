handoff_id: H-20260908-089-07-OFFICIAL-RELEASE-PREPARATION
from: 00
to: 07
status: DONE
title: Prepare and verify official release after maintenance cleanup

## Result
**PASS — OFFICIAL RELEASE CANDIDATE VERIFIED.**

Exact commit safe to tag:
- `e959cdd25a05e2f61345295b505ef6ee5c8e3dc2`

Final workflow:
- `Final Project Release Assessment`
- run `34160089361`
- job `101859847687`
- conclusion: **SUCCESS**
- artifact `10032335865`
- digest `sha256:b93b3e7c5f2143844455979c466486dcaa73b3dbbdf2482f33ec11206eee846d`

Render production:
- deploy `dep-dafi0rfavr4c73c63d5g`
- exact commit `e959cdd25a05e2f61345295b505ef6ee5c8e3dc2`
- status `live` before final browser/runtime acceptance completed.

## Verified release checklist
- [x] Backend `npm run release:check` PASS.
- [x] Maintained legacy Vitest is included in backend `release:check`; H087 previously verified 10 files / 30 tests PASS and current release check remains green.
- [x] Clean Client build/test PASS.
- [x] Production Render exact assessed SHA live.
- [x] Production health PASS.
- [x] Critical two-Human create/join/start/get-state PASS.
- [x] Disconnect/reconnect authoritative continuity PASS.
- [x] Approved UI V1 live desktop/mobile critical paths PASS.
- [x] Mandatory 5-second presentation/no visible countdown semantics PASS.
- [x] Residence navigation / HUD / Turn Track / QR PASS.
- [x] Maintained H088 Approved UI V1 authoritative fixture PASS.
- [x] H080 retained World Event direct banner + exact Chronicle focus + Marriage visible-disabled + mobile acceptance PASS.
- [x] OI-001 through OI-007 remain CLOSED / VERIFIED; no release regression reopens them.

## Release notes
Release candidate includes the fully verified Intergenerational Contract gameplay/runtime and Approved UI V1 integration in current agreed scope, including:
- authoritative multiplayer room/start/state/reconnect flow;
- finalized marriage lifecycle, combined scarcity inflation, Tutorial, Residence identity/lifecycle and server/runtime contracts;
- Mandatory 5-second server-authoritative presentation;
- Approved UI V1 desktop/mobile navigation, Residence/Family, Queue, HUD/Turn Track, QR, Chronicle and End Report surfaces;
- current World Event direct-banner impact presentation with exact Chronicle linkage;
- current Marriage profile visible-but-disabled affordance;
- maintained legacy Vitest coverage and updated Approved UI V1 QA fixture.

No gameplay rule, UI design or protocol was changed by H089. The only H089 code change was strengthening the final QA workflow to include the maintained H088 authoritative fixture.

## Version/tag decision
No canonical release version/tag name is locked in current project docs, and the repository currently has no GitHub Release. Chat 07 therefore did **not** invent a version and did **not** create a tag/release.

Chat 00/user must choose the official version/tag name. After that decision, tag the verified SHA exactly, not a later documentation-only commit.

Suggested command pattern once `<TAG>` is decided:
```bash
git fetch origin
git tag -a <TAG> e959cdd25a05e2f61345295b505ef6ee5c8e3dc2 -m "Intergenerational Contract <TAG>"
git push origin <TAG>
```
Then create the GitHub Release from that exact tag and use the release notes above.

## Handoff
Return to Chat 00/user for the official version/tag-name decision and release publication.
