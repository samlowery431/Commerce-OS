# Changelog

## SIA node API V0.1 — proposed

- Imported the deployed pre-SIA `research-node-api` as the repository baseline.
- Preserved `heartbeat`, `lease`, `submit`, and `calibration_ingest` behavior.
- Added SIA handlers in a separate `sia.ts` module.
- Added capability discovery, discovery-run lifecycle, candidate deduplication/upsert, and bounded candidate listing.
- Kept supplier discovery marketplace-agnostic under policy `sia_v0_3`.
- Added contract tests, CI, smoke probe, deployment gate, and environment-name documentation.

No production deployment is represented by this changelog entry.
