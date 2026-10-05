# Why idempotency matters

Autonomous cloud workers inevitably retry after timeouts, crashes, and lease expiry. If retries create duplicate suppliers or duplicate real-world actions, reliability mechanisms become a source of corruption. Stable identities and idempotent state transitions make retries safe.
