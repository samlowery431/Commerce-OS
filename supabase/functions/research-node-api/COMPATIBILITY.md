# Backward compatibility

SIA V0.1 is additive to the existing node API. The deployed eBay research worker depends on the existing `heartbeat`, `lease`, and `submit` contracts; calibration tooling depends on `calibration_ingest`.

A SIA deployment is invalid if any of those existing actions change incompatibly. Post-deployment validation therefore includes both the new `sia_capabilities` response and observation that the existing research worker continues its normal lease/submit loop.
