export function normalizeCandidate(candidate) {
  if (!candidate || typeof candidate !== "object") throw new Error("CANDIDATE_OBJECT_REQUIRED");
  let domain = String(candidate.canonical_domain ?? "").trim().toLowerCase();
  domain = domain.replace(/^https?:\/\//, "").split("/")[0].replace(/^www\./, "");
  const discoveryUrl = String(candidate.discovery_url ?? "").trim();
  if (!domain || !discoveryUrl) throw new Error("CANDIDATE_DOMAIN_AND_URL_REQUIRED");
  return {
    canonical_domain: domain,
    discovered_name: candidate.discovered_name ?? null,
    discovery_url: discoveryUrl,
    discovery_method: candidate.discovery_method ?? "AUTONOMOUS_WEB_DISCOVERY",
    country_code: candidate.country_code ?? null,
    evidence: candidate.evidence ?? {},
    evidence_sha256: candidate.evidence_sha256 ?? null,
  };
}

export function assertMarketplaceAgnostic(candidate) {
  const forbidden = ["target_marketplace_allowed", "ebay_allowed", "amazon_allowed", "walmart_allowed"];
  for (const key of forbidden) {
    if (Object.prototype.hasOwnProperty.call(candidate, key)) {
      throw new Error(`DISCOVERY_MUST_BE_MARKETPLACE_AGNOSTIC:${key}`);
    }
  }
}
