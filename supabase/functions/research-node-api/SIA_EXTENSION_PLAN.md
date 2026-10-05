# SIA node API V0.1 extension plan

The SIA extension is additive. It must not alter the authentication semantics or the existing research actions.

## Actions

1. `sia_capabilities`
   - Returns API version and supported SIA actions.
   - No database mutation.

2. `sia_discovery_run_start`
   - Creates an OPEN `DISCOVERY` run under policy `sia_v0_3`.

3. `sia_candidate_upsert`
   - Accepts discovered supplier identity/evidence.
   - Deduplicates by canonical domain before insertion.
   - Initial candidate state is `DISCOVERED`.
   - Does not perform channel-specific rejection.

4. `sia_candidate_list`
   - Returns a bounded candidate work list for downstream viability/capability processing.

5. `sia_discovery_run_complete`
   - Marks a discovery run COMPLETE and records run metrics.

## Security invariants

- Reuse `research_node_api_keys` bearer-token hashing and node binding.
- Never send Supabase service-role credentials to a worker.
- Reject a request whose supplied `node_id` differs from the authenticated key's node.
- Bound batch/list sizes.

## SIA V0.3 invariants

Supplier discovery and viability are marketplace-agnostic. Marketplace/channel compatibility belongs to the later possible-use layer. Discovery does not imply qualification or activation.
