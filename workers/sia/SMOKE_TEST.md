# Smoke test

With node credentials injected at runtime, `node smoke-probe.mjs` should return HTTP 200 and a JSON object whose `api_version` is `sia_node_v0_1`. Before deployment the same action is expected to return the legacy `unknown action` response, so the probe cleanly distinguishes the production boundary.
