# Observability

Each autonomous stage should expose run identity, start/completion state, input/output counts, deduplication counts, failures, policy/version identifiers, and evidence provenance. Operational logs must not print bearer tokens or database credentials. Metrics should distinguish no-result, unknown, rejected, and infrastructure-failure states.
