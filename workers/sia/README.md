# SIA worker

Autonomous Supplier Intelligence & Acquisition worker components.

## Runtime contract

- Node.js 22+ and native `fetch`.
- Authenticates through `COMMERCE_OS_NODE_API`, `COMMERCE_OS_NODE_TOKEN`, and `COMMERCE_OS_NODE_ID`.
- Never receives Supabase service-role credentials.
- Runs separately from the existing eBay research worker.
- Discovery/evidence must be auditable and provenance-preserving.
- Unknown evidence remains unknown.
- Discovery is marketplace-agnostic.
- No paid enrollment or commercial commitment is performed by this worker.

## Current V0.1 components

- `api-client.mjs` — authenticated control-plane client.
- `discovery-contract.mjs` — candidate normalization and marketplace-agnostic invariant.
- `discovery-run.mjs` — starts a discovery run, ingests a JSON candidate array, deduplicates through the control plane, and completes the run with metrics.
- `smoke-probe.mjs` — production readiness probe for `sia_capabilities`.
- `test.mjs` — local contract tests.

## Commands

```sh
npm test
npm run smoke
node discovery-run.mjs candidates.json
```

`candidates.json` is an array of discovered supplier candidates. Each item requires `canonical_domain` and `discovery_url`; optional evidence/name/country fields are preserved.

## Deployment rule

Do not enable an autonomous service until production `research-node-api` advertises SIA V0.1 through `sia_capabilities` and post-deployment compatibility checks confirm the existing research worker remains healthy.
