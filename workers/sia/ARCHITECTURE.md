# SIA worker stage boundaries

V0.1 establishes authenticated ingestion and lifecycle primitives. It intentionally separates discovery from later judgment.

1. Discovery provider finds supplier candidates and captures source evidence.
2. Discovery runner normalizes and submits candidates without marketplace filtering.
3. Control plane deduplicates persistent supplier identities.
4. Viability worker later resolves the mandatory marketplace-agnostic viability contract.
5. Capability/catalog workers profile usable supply.
6. Possible-use workers evaluate channel/business-model/fulfillment combinations.
7. Economics/ranking selects worthwhile opportunities.
8. Activation remains a separate controlled action.

A supplier that is unsuitable for one marketplace is therefore retained for other present or future uses unless it fails supplier-level viability itself.
