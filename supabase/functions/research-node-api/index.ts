import { createClient } from "npm:@supabase/supabase-js@2";

const db = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

async function sha256(value: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return [...new Uint8Array(digest)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

const CORPUS = "moa_v0_8_7_adjudicated_repro_v1";
const accessory = /(fuel|oil|water)\s+pump|control\s+board|motherboard|glow\s+plug|service\s+kit|repair\s+kit|removal\s+tool|remote\s+only|controller\s+only|replacement\s+(part|parts)|spare\s+(part|parts)/i;

function adjudicate(r: any) {
  const title = String(r.marketplace_title ?? r.title ?? "").trim();
  const legacy = r.legacy_relevant === true ||
    String(r.legacy_relevant).toLowerCase() === "true" ||
    String(r.relevant).toLowerCase() === "true";
  const contradictions = String(
    r.legacy_contradictions ?? r.contradictions ?? "",
  ).trim();

  if (legacy && title && !contradictions) {
    return {
      c: "CONFIRMED_COMPARABLE",
      reason: "LEGACY_RELEVANT_WITH_VISIBLE_TITLE_AND_NO_RECORDED_CONTRADICTION",
    };
  }
  if (title && accessory.test(title)) {
    return {
      c: "CONFIRMED_NONCOMPARABLE",
      reason: "VISIBLE_COMPONENT_OR_ACCESSORY_TITLE",
    };
  }
  return { c: "AMBIGUOUS", reason: "INSUFFICIENT_INDEPENDENT_EVIDENCE" };
}

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") return json({ error: "POST only" }, 405);

    const auth = req.headers.get("authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (!token) return json({ error: "unauthorized" }, 401);

    const tokenHash = await sha256(token);
    const { data: keyrow, error: keyerr } = await db
      .from("research_node_api_keys")
      .select("node_id,enabled")
      .eq("token_hash", tokenHash)
      .eq("enabled", true)
      .maybeSingle();
    if (keyerr || !keyrow) return json({ error: "unauthorized" }, 401);

    const body = await req.json();
    const node = String(keyrow.node_id);
    if (body.node_id && String(body.node_id) !== node) {
      return json({ error: "node mismatch" }, 403);
    }

    const action = String(body.action || "");

    if (action === "heartbeat") {
      const { error } = await db.rpc("research_node_heartbeat", {
        p_node_id: node,
        p_node_name: body.node_name || node,
        p_version: body.version || "unknown",
        p_capabilities: body.capabilities || {},
        p_metrics: body.metrics || {},
      });
      if (error) throw error;
      return json({ ok: true, node_id: node });
    }

    if (action === "lease") {
      const { data, error } = await db.rpc("research_node_lease", {
        p_node_id: node,
        p_lease_seconds: body.lease_seconds || 180,
      });
      if (error) throw error;
      return json({ job: data?.[0] || null });
    }

    if (action === "submit") {
      const { data, error } = await db.rpc("research_node_submit", {
        p_node_id: node,
        p_job_id: body.job_id,
        p_actual_day_range: body.actual_day_range,
        p_result_mode: body.result_mode,
        p_currency_code: body.currency_code || null,
        p_rows: body.rows || [],
        p_metadata: body.metadata || {},
      });
      if (error) throw error;
      return json(data);
    }

    if (action === "calibration_ingest") {
      const rows = Array.isArray(body.rows) ? body.rows : [];
      if (rows.length < 1 || rows.length > 100) {
        return json({ error: "rows must contain 1..100 records" }, 400);
      }

      const out = rows.map((r: any) => {
        const a = adjudicate(r);
        return {
          corpus_name: CORPUS,
          source_row: Number(r.source_row),
          supplier_product_key: r.supplier_product_key ?? r.supplier_product_id ?? null,
          supplier_title: r.supplier_title ?? null,
          marketplace_title: r.marketplace_title ?? r.title ?? null,
          legacy_relevant: r.legacy_relevant ?? r.relevant ?? null,
          legacy_contradictions: r.legacy_contradictions ?? r.contradictions ?? null,
          adjudicated_class: a.c,
          adjudication_reason: a.reason,
          source_payload: r,
        };
      });

      if (out.some((r: any) => !Number.isInteger(r.source_row) || r.source_row < 1)) {
        return json({ error: "every row requires positive integer source_row" }, 400);
      }

      const { error } = await db.from("identity_calibration_examples").upsert(
        out,
        { onConflict: "corpus_name,source_row" },
      );
      if (error) throw error;

      const counts = out.reduce((acc: Record<string, number>, r: any) => {
        acc[r.adjudicated_class] = (acc[r.adjudicated_class] || 0) + 1;
        return acc;
      }, {});
      return json({
        ok: true,
        node_id: node,
        corpus_name: CORPUS,
        accepted: out.length,
        counts,
      });
    }

    return json({ error: "unknown action" }, 400);
  } catch (e) {
    return json({ error: String((e as Error)?.message || e) }, 400);
  }
});
