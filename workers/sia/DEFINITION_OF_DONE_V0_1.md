# Definition of done — SIA V0.1 control plane

V0.1 is complete when the versioned Edge Function passes CI, is deployed without breaking existing research actions, authenticated `sia_capabilities` succeeds, discovery-run lifecycle works, candidate ingestion is idempotent at the canonical-domain level, the separate worker passes readiness checks, and the repository contains no production credentials.

Autonomous supplier discovery itself is Stage 1, immediately after this control-plane gate.
