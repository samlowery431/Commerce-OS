# Commerce OS

Commerce OS is an automation-first commerce research, supplier intelligence, opportunity evaluation, and execution system.

## Repository layout

- `supabase/functions/research-node-api/` — authenticated worker control-plane API.
- `supabase/migrations/` — versioned database schema and policy migrations.
- `workers/ebay-research/` — eBay Product Research collection worker.
- `workers/sia/` — Supplier Intelligence & Acquisition (SIA) autonomous worker.
- `classifiers/identity/` — marketplace/supplier product identity classifiers.
- `schemas/` — machine-readable contracts shared by workers and control plane.
- `docs/` — architecture and operating contracts.

## Current production state

The running research node remains the production source of truth for the existing eBay worker until its exact deployed files are imported and verified by hash. Do not deploy repository placeholders over production.

SIA policy `sia_v0_3` uses marketplace-agnostic supplier viability. Supplier capabilities, catalog admission, possible uses, economics, ranking, and activation are separate downstream layers.

## Security

No production tokens, service-role keys, browser profiles, cookies, or environment files belong in this repository.
