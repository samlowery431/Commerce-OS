# Change control

1. Preserve an auditable production baseline before modifying a deployed component.
2. Make changes on a dedicated branch.
3. Keep credentials outside Git.
4. Test deterministic contracts in CI.
5. Treat database migrations and API changes as versioned interfaces.
6. Deploy only after reviewing the branch diff.
7. Run post-deployment smoke tests for both new and pre-existing behavior.
8. Keep new autonomous services separate from known-good workers until compatibility is demonstrated.
