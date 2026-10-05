# Threat model

Primary boundaries:

- bearer tokens authenticate worker nodes;
- token hashes, not raw tokens, are persisted in the node-key table;
- authenticated node identity overrides/validates request-supplied node IDs;
- service-role database authority remains inside Supabase;
- workers receive bounded API operations rather than arbitrary SQL access;
- discovery input is untrusted and must be normalized before persistence;
- supplier evidence is data, never executable code.

The SIA API must remain narrower than direct database access as additional stages are added.
