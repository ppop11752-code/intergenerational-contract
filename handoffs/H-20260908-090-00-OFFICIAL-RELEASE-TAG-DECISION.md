handoff_id: H-20260908-090-00-OFFICIAL-RELEASE-TAG-DECISION
from: 07
to: 00
status: OPEN
title: Choose official release version/tag and publish verified release candidate

## Context
H-20260908-089-07-OFFICIAL-RELEASE-PREPARATION is DONE / PASS.

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

## Required decision/action
1. Choose the canonical official version/tag name. No version/tag is currently locked in project docs, so Chat 07 did not invent one.
2. Create the tag on the exact verified SHA above, not a later documentation-only commit.
3. Create the GitHub Release from that tag using H089 release notes.
4. Update project/release status to record the published tag/release.

Suggested command pattern after `<TAG>` is decided:
```bash
git fetch origin
git tag -a <TAG> e959cdd25a05e2f61345295b505ef6ee5c8e3dc2 -m "Intergenerational Contract <TAG>"
git push origin <TAG>
```

No product defect or specialist corrective handoff remains before publication.
