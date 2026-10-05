# Idempotency

Autonomous retries must be safe. Candidate ingestion deduplicates on canonical domain in V0.1. Later stages should use stable supplier/scope identifiers and versioned evidence/assessment keys so a network retry does not create duplicate business entities or duplicate activation actions.
