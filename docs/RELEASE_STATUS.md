# RELEASE STATUS — CURRENT

## Overall

**Not release-ready at the current full player-facing UI scope.** OI-001 through OI-006 remain closed/verified, and the newer Support/form-state regression has now been fixed and independently reverified by Chat 07. However `H-20260906-019-06-FULL-UIUX-IMPLEMENTATION` remains OPEN with Wave 2–4/final UI work still incomplete.

The resolved client regression did not change gameplay rules or reopen OI-001–OI-006.

## Closed / verified foundations

- OI-001 marriage proposal lifecycle: CLOSED / independently verified.
- OI-002 inflation scarcity combined formula: CLOSED / independently verified.
- OI-003 protocol helper drift (`game:replay`): CLOSED / verified.
- OI-004 dedicated Tutorial guidance: CLOSED / release QA verified.
- OI-005 deployment source-tree mismatch: CLOSED / source-tree verified.
- OI-006 dependency-backed live server runtime: CLOSED / release QA verified.
- Canonical backend source migration into GitHub: COMPLETE / verified against audited artifact.
- Prior Tutorial/live integration evidence remains valid for the scope it covered.
- Support authoritative selector/action integration: PASS after form-state fix.

Canonical backend path: `server/backend/`

Canonical client path: `client/`

Live same-origin service: `https://intergenerational-contract.onrender.com`

## Resolved Support/form-state regression

Chat 07 originally reproduced Support amount `5` being sent as default `1`. Chat 06 fixed the shared form payload-capture mechanism in `H-20260906-024-06-CLIENT-FORM-STATE-LOSS`.

Final rerun evidence:
- workflow: `Support Flow E2E`
- run ID: `34047655175`
- head SHA: `8426be71465ad0dbcd64b9a8a50d62142f2217d6`
- artifact ID: `9993594608`
- digest: `sha256:7146dce30b7b9277745feb527f36e657f7fdce2bb1dc44a07dd9be157c04eb4d`
- result: 13/13 browser-authoritative checks PASS.

PASS evidence includes:
- selector exactly mirrors authoritative parent/child targets;
- raw Character IDs are not shown in player-facing labels;
- non-default second target (`child`) remains selected through submit;
- amount `5` is preserved and authoritative mutation is exactly actor `100 -> 95`, child `0 -> 5`;
- invalid amount and spending-cap errors are surfaced from the server without client reinterpretation;
- Support interactions do not reset `phaseDeadlineAt` and countdown continues (`60s -> 59s`);
- empty target list produces the no-target state with no selector/action control.

Chat 06 deterministic regression additionally covers the shared payload-capture fix for Market units `7`, Recovery units `9`, Support target/amount `5`, and Marriage candidate selection; client suite PASS 13/13.

`H-20260906-023-07-SUPPORT-FLOW-QA`: CLOSED / PASS.
`H-20260906-024-06-CLIENT-FORM-STATE-LOSS`: DONE.

## Remaining UI work

`H-20260906-019-06-FULL-UIUX-IMPLEMENTATION` remains OPEN. Wave 2–4/final art and other UI/UX work are not made complete by Wave 1 or Support QA.

## Release claim rule

Do not call the full current player-facing UI release-ready until the remaining H019 implementation scope is completed and the corresponding QA gates pass. Any subsequent runtime-affecting change must continue to pass build, regression, deployment and integration gates.
