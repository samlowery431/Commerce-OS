# Validation checklist

## Pre-deploy

- [ ] `deno task test` passes.
- [ ] Branch diff contains no secrets.
- [ ] Existing actions remain present: heartbeat, lease, submit, calibration_ingest.
- [ ] SIA actions are additive.
- [ ] `sia_candidate_upsert` deduplicates canonical domains.
- [ ] No marketplace compatibility criterion is used for supplier discovery/viability.

## Post-deploy

- [ ] Authenticated `sia_capabilities` returns HTTP 200 and `api_version=sia_node_v0_1`.
- [ ] Invalid bearer token remains HTTP 401.
- [ ] Node mismatch remains HTTP 403.
- [ ] Existing research worker remains active.
- [ ] Existing research worker can still heartbeat/lease/submit.
- [ ] Start and complete an empty SIA discovery run.
- [ ] Insert one controlled test candidate, repeat it, and verify deduplication.
- [ ] Remove/retire controlled test data if it should not remain in the discovery corpus.
