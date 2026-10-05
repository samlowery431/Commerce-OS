# Current assumptions

- The existing node API credential remains the authentication mechanism for the first SIA worker.
- Node.js 22 native fetch is available on the DigitalOcean worker.
- SIA persistence tables/policy exist in Supabase.
- Existing eBay research operation remains independent and must not regress.
- New discovery sources will be added behind provider interfaces rather than hard-coded into supplier qualification logic.
