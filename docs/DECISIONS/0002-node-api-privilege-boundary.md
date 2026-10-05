# ADR 0002: Workers use node API, not database administrator credentials

Status: Accepted

Long-running workers authenticate through the Commerce OS node API. Supabase service-role credentials remain in the Edge Function environment.

This keeps database administration authority off worker hosts, centralizes authorization/auditing, and lets API contracts evolve without distributing broader credentials.
