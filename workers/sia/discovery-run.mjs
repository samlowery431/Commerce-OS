import { readFile } from "node:fs/promises";
import { CommerceNodeApi } from "./api-client.mjs";
import { assertMarketplaceAgnostic, normalizeCandidate } from "./discovery-contract.mjs";

const input = process.argv[2];
if (!input) throw new Error("USAGE: node discovery-run.mjs candidates.json");
const parsed = JSON.parse(await readFile(input, "utf8"));
if (!Array.isArray(parsed)) throw new Error("INPUT_MUST_BE_JSON_ARRAY");

const api = new CommerceNodeApi();
const started = await api.call("sia_discovery_run_start", {
  config: { source: input, candidate_count: parsed.length, worker_version: "0.1.0" },
});
const runId = started.run.id;
let created = 0;
let deduplicated = 0;

try {
  for (const raw of parsed) {
    assertMarketplaceAgnostic(raw);
    const candidate = normalizeCandidate(raw);
    const result = await api.call("sia_candidate_upsert", {
      discovery_run_id: runId,
      ...candidate,
    });
    if (result.created) created += 1;
    else deduplicated += 1;
  }
  await api.call("sia_discovery_run_complete", {
    run_id: runId,
    metrics: { input: parsed.length, created, deduplicated, failed: 0 },
  });
  console.log(JSON.stringify({ ok: true, run_id: runId, input: parsed.length, created, deduplicated }));
} catch (error) {
  console.error("SIA_DISCOVERY_RUN_FAILED", runId, error?.stack || error?.message || error);
  process.exitCode = 1;
}
