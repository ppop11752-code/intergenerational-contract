# UI Art v1 runtime root

This directory is the canonical runtime root defined by `docs/UI_ART_ASSET_CONTRACT_V1.md`.

All required Wave 4 raster batches A–D are now present on `main` as real PNG binaries generated from the locked pixel-art contract. Chat 05 visually reviewed the four batches before handoff back to Client Implementation.

Current status:
- Batch A — world shell: APPROVED;
- Batch B — UI chrome + icons: APPROVED;
- Batch C — portraits: APPROVED;
- Batch D — ambience + transitions: APPROVED.

The files are presentation-only and must not change gameplay semantics. Client integration may still retain graceful missing-asset fallback for development, but production presentation should prefer these real binaries.

Wave 4 must not be called fully art-complete at project level until Chat 06 integrates the assets into the live client and Chat 07 passes final visual/runtime QA against the integrated build.
