# Why use the node API?

A narrow authenticated control plane avoids distributing database administrator credentials to worker hosts, centralizes validation/auditing, and creates a versioned contract between cloud workers and persistent state. Workers can be replaced/scaled without granting arbitrary SQL authority.
