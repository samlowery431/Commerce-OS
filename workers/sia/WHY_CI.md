# Why CI before deployment?

The control plane is shared by an already-running research worker. Automated contract tests and credential-pattern checks catch deterministic mistakes before a shared production API is changed. Production smoke tests remain necessary because CI cannot reproduce live database/auth/browser state.
