# Hosted Backtesting Runner

This directory is reserved for public, non-sensitive backtesting infrastructure. Do not commit private strategy source, brokerage credentials, historical licensed datasets, or account identifiers.

The first runner is a GitHub Actions-based infrastructure smoke test using deterministic synthetic OHLCV data, not a claim of trading profitability. A completed Actions job and downloadable summary artifact are required before marking the runner operational. Subsequent adapters will accept immutable strategy specifications, data manifests, cost assumptions, and result schema.

Budget policy: use only standard GitHub-hosted runners covered by the public-repository free allowance; do not enable larger paid runners or other billable services without explicit approval.
