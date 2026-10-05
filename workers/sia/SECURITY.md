# Security boundary

The SIA worker is a node client, not a database administrator.

It receives only the existing Commerce OS node API endpoint, node ID, and bearer token. The Supabase service-role key remains confined to the Edge Function environment. The control plane binds bearer-token hashes to node identities and rejects a supplied node ID that does not match the authenticated key.

Supplier discovery must not collect credentials, payment data, or other unnecessary sensitive information. Evidence should be limited to information needed to establish supplier identity, capabilities, catalog provenance, and later business-use evaluation.
