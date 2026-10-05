# Source of truth

The repository becomes authoritative component-by-component only after the exact production baseline has been imported and the repository version has been validated/deployed.

For `research-node-api`, the pre-SIA production baseline was retrieved from Supabase and imported on branch `sia-control-plane-v0.1`; the baseline commit is recorded in the function directory. Until the proposed SIA version is deployed and validated, production remains authoritative for the running Edge Function.

For the existing DigitalOcean eBay research worker, the server remains authoritative until its exact files are separately imported and hash-verified.
