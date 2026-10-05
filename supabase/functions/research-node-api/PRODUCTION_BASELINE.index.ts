// Frozen pre-SIA production baseline snapshot, retrieved from the deployed
// Supabase research-node-api Edge Function on 2026-10-05.
//
// The canonical imported baseline is commit 9f00209a8d106bf7aa5e6d4cd109f065d49cbf85
// at supabase/functions/research-node-api/index.ts. This marker exists so the
// pre-extension boundary remains explicit after index.ts evolves.
//
// Baseline authenticated actions:
//   heartbeat
//   lease
//   submit
//   calibration_ingest
//
// Baseline probe:
//   action=sia_capabilities -> HTTP 400 {"error":"unknown action"}
