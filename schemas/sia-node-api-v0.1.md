# SIA Node API v0.1

SIA workers use the existing Commerce OS node-authentication boundary. Workers must not receive a Supabase service-role key.

## Actions

### `sia_capabilities`
Returns API version and supported SIA actions. Used for deployment/readiness checks.

### `sia_discovery_run_start`
Starts an auditable SIA run with `run_type=DISCOVERY` and policy `sia_v0_3`.

Input: optional `config` object.

Output: run ID, start time, and policy version.

### `sia_candidate_upsert`
Idempotently records a discovered supplier candidate.

Required fields:
- `discovery_run_id`
- `canonical_domain`
- `discovery_url`

Optional fields include discovered name, discovery method, country code, and evidence/provenance.

Deduplication is by canonical supplier identity/domain at this stage; later identity work may merge aliases or corporate entities.

### `sia_candidate_list`
Returns bounded candidate records for worker qualification/profiling.

### `sia_discovery_run_complete`
Closes a discovery run and records metrics.

## Security contract

Every action authenticates the existing node bearer token and binds the request to the authenticated `node_id`. The Edge Function performs privileged database operations. Worker nodes never receive database service credentials.

## Non-goals for v0.1

The discovery API does not authorize paid enrollment, supplier-account creation, purchasing, marketplace listing, or other commercial commitments. Those belong behind later explicit activation policies.
