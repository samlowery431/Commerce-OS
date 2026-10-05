# SIA worker

This directory will contain the autonomous Supplier Intelligence & Acquisition worker.

## Runtime contract

- Node.js 22+.
- Uses native `fetch`; no additional HTTP dependency is required.
- Authenticates through `COMMERCE_OS_NODE_API`, `COMMERCE_OS_NODE_TOKEN`, and `COMMERCE_OS_NODE_ID`.
- Does not contain Supabase service-role credentials.
- Runs as a service separate from the existing eBay research worker.
- Discovery and evidence collection must be auditable and provenance-preserving.
- Unknown evidence remains unknown.
- No paid enrollment or commercial commitment is performed by the discovery worker.

## Deployment rule

Do not enable the worker until the production `research-node-api` advertises the SIA v0.1 actions through `sia_capabilities` and end-to-end authentication/readiness tests pass.
