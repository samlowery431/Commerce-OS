# Deployment model

GitHub is the intended source of truth for Commerce OS code. Production systems are not overwritten from reconstructed snippets.

- Supabase hosts the authenticated control-plane Edge Function and persistent SIA/research state.
- DigitalOcean hosts long-running workers and the authenticated browser environment.
- Workers authenticate to the control plane with node-scoped bearer credentials.
- Database administrator credentials remain server-side in Supabase.
- Production changes are developed on branches, tested, reviewed, then deployed with post-deployment compatibility checks.
