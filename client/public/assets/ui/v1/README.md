# UI Art v1 runtime root

This directory is the canonical runtime root defined by `docs/UI_ART_ASSET_CONTRACT_V1.md`.

`manifest.json` is integration-ready. Final raster binaries are intentionally not fabricated by Chat 06. Until the required PNG/WebP files are supplied by UI/UX & ART and pass visual/runtime QA, the client asset loader uses development fallback styling and the project remains NOT ART-COMPLETE.

Adding a binary at a manifest path must not change gameplay semantics. The loader probes assets asynchronously and only enables the corresponding presentation hook after that file loads successfully.
