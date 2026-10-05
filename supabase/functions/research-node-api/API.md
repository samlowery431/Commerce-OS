# SIA node API V0.1

All requests are POST JSON and use the existing node bearer token. `node_id` is bound to the authenticated token.

## sia_capabilities

Request: `{ "action": "sia_capabilities", "node_id": "..." }`

## sia_discovery_run_start

Adds optional `config` object. Creates an OPEN DISCOVERY run under `sia_v0_3`.

## sia_candidate_upsert

Requires `discovery_run_id`, `canonical_domain`, and `discovery_url`. Optional fields: `discovered_name`, `discovery_method`, `country_code`, `evidence`, `evidence_sha256`. Canonical-domain duplicates return the existing candidate rather than creating another supplier record.

## sia_candidate_list

Optional `limit`, bounded to 1..200.

## sia_discovery_run_complete

Requires `run_id`; optional `metrics` object.

These actions do not decide marketplace/channel compatibility. That remains a downstream possible-use concern.
