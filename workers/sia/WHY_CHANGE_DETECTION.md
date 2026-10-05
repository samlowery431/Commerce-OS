# Why targeted change detection?

Re-running the entire supplier pipeline whenever one fact changes wastes resources and can create unnecessary churn. Dependency-aware change detection can invalidate/recompute only affected downstream decisions, which is important as supplier and marketplace coverage grows.
