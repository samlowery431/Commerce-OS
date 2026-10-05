# Database boundary

Workers never issue arbitrary SQL. The control plane exposes narrow actions backed by known tables/functions. Schema migrations remain versioned separately from worker code, and API compatibility shields workers from unnecessary database implementation details.
