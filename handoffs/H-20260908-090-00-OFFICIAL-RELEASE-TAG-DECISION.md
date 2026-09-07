handoff_id: H-20260908-090-00-OFFICIAL-RELEASE-TAG-DECISION
from: 07
to: 00
status: DONE
title: Choose official release version/tag and publish verified release candidate

## Decision
User locked the canonical official release version/tag as:

`v1.0.0`

This decision supersedes any suggestion to continue internal V5/V10.x numbering for the first official product release.

## Verified release candidate
Exact verified release SHA:
`e959cdd25a05e2f61345295b505ef6ee5c8e3dc2`

Final release gate:
- workflow `Final Project Release Assessment`
- run `34160089361`
- job `101859847687`
- conclusion `SUCCESS`
- artifact `10032335865`
- digest `sha256:b93b3e7c5f2143844455979c466486dcaa73b3dbbdf2482f33ec11206eee846d`

Render deploy `dep-dafi0rfavr4c73c63d5g` was live on the exact verified SHA before final browser/runtime acceptance completed.

## Publication rule
- Official tag: `v1.0.0`.
- Tag MUST point to exact verified SHA `e959cdd25a05e2f61345295b505ef6ee5c8e3dc2`, not a later documentation-only commit.
- GitHub Release must be created from that tag using H089 release notes.
- Publication status is handled by follow-up H-20260908-091-07-PUBLISH-V1.0.0.

## Completion
Version/tag decision is complete. H090 is DONE.
