# Worker compatibility

V0.1 targets the observed production node runtime: Node.js v22 and the existing Commerce OS node environment names. It has no runtime npm dependencies. It expects `sia_node_v0_1` and refuses to treat an older control plane as ready.
