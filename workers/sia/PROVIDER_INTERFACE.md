# Discovery provider interface

A discovery provider emits zero or more candidate objects with canonical-domain hypothesis, discovered name when known, source URL, method identifier, country when evidenced, and structured source evidence. Providers do not write directly to Supabase and do not decide supplier viability. The ingestion layer validates/normalizes provider output and submits it through the node API.
