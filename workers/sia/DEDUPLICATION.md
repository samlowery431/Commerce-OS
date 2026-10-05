# Supplier deduplication

V0.1 uses canonical domain as the first persistent deduplication key because it is deterministic and available early. This is not the final entity-resolution model: later versions should reconcile alternate domains, parent/subsidiary relationships, supplier networks, brands versus legal entities, and regional storefronts while preserving all discovery provenance.
