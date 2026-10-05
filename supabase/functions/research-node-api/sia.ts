export const SIA_API_VERSION = "sia_node_v0_1";
export const SIA_ACTIONS = [
  "sia_capabilities",
  "sia_discovery_run_start",
  "sia_candidate_upsert",
  "sia_candidate_list",
  "sia_discovery_run_complete",
] as const;

type Json = Record<string, unknown>;
type Db = any;

function canonicalDomain(input: unknown): string {
  let value = String(input ?? "").trim().toLowerCase();
  if (!value) return "";
  value = value.replace(/^https?:\/\//, "").split("/")[0].replace(/^www\./, "");
  return value;
}

export async function handleSiaAction(
  db: Db,
  node: string,
  action: string,
  body: Json,
): Promise<Json | null> {
  if (action === "sia_capabilities") {
    return { ok: true, node_id: node, api_version: SIA_API_VERSION, actions: SIA_ACTIONS };
  }

  if (action === "sia_discovery_run_start") {
    const { data, error } = await db.from("sia_runs").insert({
      run_type: "DISCOVERY",
      status: "OPEN",
      policy_version: "sia_v0_3",
      config: body.config ?? {},
      metrics: {},
      notes: `node:${node}`,
    }).select("id,started_at,policy_version,status").single();
    if (error) throw error;
    return { ok: true, run: data };
  }

  if (action === "sia_candidate_upsert") {
    const discoveryRunId = String(body.discovery_run_id ?? "").trim();
    const domain = canonicalDomain(body.canonical_domain);
    const discoveryUrl = String(body.discovery_url ?? "").trim();
    const method = String(body.discovery_method ?? "AUTONOMOUS_WEB_DISCOVERY").trim();
    if (!discoveryRunId || !domain || !discoveryUrl) {
      throw new Error("discovery_run_id, canonical_domain, discovery_url required");
    }

    const { data: existing, error: findError } = await db
      .from("sia_supplier_candidates")
      .select("id,canonical_domain,state,discovered_at")
      .eq("canonical_domain", domain)
      .order("discovered_at", { ascending: true })
      .limit(1);
    if (findError) throw findError;
    if (existing?.length) return { ok: true, created: false, candidate: existing[0] };

    const { data, error } = await db.from("sia_supplier_candidates").insert({
      discovery_run_id: discoveryRunId,
      canonical_domain: domain,
      discovered_name: body.discovered_name ?? null,
      discovery_url: discoveryUrl,
      discovery_method: method,
      country_code: body.country_code ?? null,
      evidence: body.evidence ?? {},
      evidence_sha256: body.evidence_sha256 ?? null,
      state: "DISCOVERED",
    }).select("id,canonical_domain,state,discovered_at").single();
    if (error) throw error;
    return { ok: true, created: true, candidate: data };
  }

  if (action === "sia_candidate_list") {
    const rawLimit = Number(body.limit ?? 50);
    const limit = Math.min(Math.max(Number.isFinite(rawLimit) ? Math.trunc(rawLimit) : 50, 1), 200);
    const { data, error } = await db.from("sia_supplier_candidates")
      .select("id,canonical_domain,discovered_name,discovery_url,discovery_method,country_code,state,discovered_at,evidence")
      .order("discovered_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return { ok: true, candidates: data ?? [] };
  }

  if (action === "sia_discovery_run_complete") {
    const runId = String(body.run_id ?? "").trim();
    if (!runId) throw new Error("run_id required");
    const { data, error } = await db.from("sia_runs").update({
      status: "COMPLETE",
      completed_at: new Date().toISOString(),
      metrics: body.metrics ?? {},
    }).eq("id", runId).eq("run_type", "DISCOVERY")
      .select("id,status,completed_at,metrics").maybeSingle();
    if (error) throw error;
    if (!data) throw new Error("discovery run not found");
    return { ok: true, run: data };
  }

  return null;
}
