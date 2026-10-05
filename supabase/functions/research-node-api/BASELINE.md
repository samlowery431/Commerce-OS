# research-node-api baseline provenance

This directory was initialized from the production `research-node-api` Edge Function source retrieved through the connected Supabase control plane on 2026-10-05.

The production worker droplet did not contain a local copy of the Edge Function source (`find /opt/commerce-os -path '*research-node-api*'` returned no output).

## Baseline behavior

Before SIA extensions, the deployed function exposed these authenticated actions:

- `heartbeat`
- `lease`
- `submit`
- `calibration_ingest`

An authenticated probe using `action: sia_capabilities` returned HTTP 400 with `{ "error": "unknown action" }`, confirming that no SIA node actions were present at the baseline boundary.

## Change rule

SIA changes must preserve the four baseline actions above. Production deployment should occur only after reviewing the branch diff and validating existing research-node behavior.
