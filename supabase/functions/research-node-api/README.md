# research-node-api

Authenticated control plane for Commerce OS research and SIA workers.

## Existing production actions

- `heartbeat`
- `lease`
- `submit`
- `calibration_ingest`

## Proposed SIA V0.1 actions

- `sia_capabilities`
- `sia_discovery_run_start`
- `sia_candidate_upsert`
- `sia_candidate_list`
- `sia_discovery_run_complete`

## Test

```sh
deno task test
```

## Deployment gate

Do not deploy merely because this branch exists. Before production deployment:

1. CI must pass.
2. Review the diff against the imported production baseline.
3. Preserve existing node-token authentication and all four research actions.
4. Deploy the Edge Function with JWT verification disabled at the platform layer because this function performs its own bearer-token authentication against `research_node_api_keys`.
5. Immediately run the authenticated `workers/sia/smoke-probe.mjs` probe.
6. Verify the existing `commerce-os-research.service` continues leasing/submitting normally.

No worker receives a Supabase service-role key.
