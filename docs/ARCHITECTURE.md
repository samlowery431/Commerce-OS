# Commerce OS architecture

## Control plane

Supabase is the authoritative control plane. Remote workers authenticate to a narrow Edge Function using node credentials. Service-role database credentials must not be distributed to workers.

## Research plane

The existing DigitalOcean research node runs the authenticated eBay Product Research worker. Until its deployed source is imported and hash-verified, production must not be overwritten from this repository.

## Supplier Intelligence & Acquisition (SIA)

SIA v0.3 follows this pipeline:

1. Broad supplier discovery.
2. Deduplication and provenance capture.
3. Marketplace-agnostic supplier viability evaluation.
4. Supplier capability profiling.
5. Catalog discovery/acquisition.
6. Catalog/category/brand/product admission.
7. Possible-use generation across channels, business models, and fulfillment models.
8. Channel/use-specific constraints and economics.
9. Competitive ranking among feasible opportunities.
10. Controlled activation.
11. Continuous refresh and re-evaluation.

### Supplier viability

Mandatory viability evidence is intentionally independent of any single marketplace:

- business identity verified;
- reseller relationship permitted;
- at least some lawful usable catalog;
- acceptable IP/counterfeit risk.

Missing mandatory evidence means `UNVERIFIED`; it is not silently scored as positive or negative. A known mandatory failure means `INCOMPATIBLE`. Passing all mandatory requirements means `VIABLE`.

### Capabilities

Capabilities describe what a supplier can support without deciding where it should be used: direct-to-customer fulfillment, bulk wholesale, stable product identity, price/inventory access, catalog interface, ordering, tracking, and returns.

### Possible uses

Marketplace/channel restrictions are evaluated downstream as supplier × channel × business-model × fulfillment-model possibilities. A supplier can therefore be unsuitable for one P2P marketplace while remaining valuable for another marketplace, a direct store, bulk acquisition, or a future channel.

### Activation boundary

Discovery, viability, feasibility, ranking, and activation are separate. SIA may research and rank an opportunity without enrolling in paid programs, accepting commercial commitments, or activating integrations without the appropriate approval policy.
