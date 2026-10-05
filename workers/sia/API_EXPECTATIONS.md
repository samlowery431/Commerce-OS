# API expectations

The worker fails closed if the control plane does not advertise `sia_node_v0_1`. It never falls back to direct database writes. API errors remain operational errors and are logged without secrets. New control-plane versions should preserve explicit capability discovery so workers can reject incompatible contracts safely.
