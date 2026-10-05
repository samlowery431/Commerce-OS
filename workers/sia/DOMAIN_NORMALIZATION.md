# Domain normalization

V0.1 lowercases the supplied domain, removes an HTTP(S) scheme, removes the path, and strips a leading `www.`. This is intentionally conservative. Later entity resolution should use a public-suffix-aware parser and explicit alias relationships rather than over-aggressive string merging.
