# Test strategy

Deterministic normalization, policy invariants, and API handler behavior should have unit tests. Database contracts require migration/integration tests. Production deployment requires authenticated smoke tests plus backward-compatibility observation of existing workers. Discovery providers should be tested against recorded fixtures before live autonomous operation.
