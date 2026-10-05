import assert from "node:assert/strict";
import { assertMarketplaceAgnostic, normalizeCandidate } from "./discovery-contract.mjs";

assert.deepEqual(normalizeCandidate({ canonical_domain: "https://WWW.Example.com/path", discovery_url: "https://example.com/suppliers" }), {
  canonical_domain: "example.com",
  discovered_name: null,
  discovery_url: "https://example.com/suppliers",
  discovery_method: "AUTONOMOUS_WEB_DISCOVERY",
  country_code: null,
  evidence: {},
  evidence_sha256: null,
});
assert.doesNotThrow(() => assertMarketplaceAgnostic({ canonical_domain: "example.com" }));
assert.throws(() => assertMarketplaceAgnostic({ ebay_allowed: true }), /DISCOVERY_MUST_BE_MARKETPLACE_AGNOSTIC/);
console.log("SIA_WORKER_CONTRACT_TESTS_OK");
