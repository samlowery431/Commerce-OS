# Research failure handling

A failed acquisition attempt records method/source/error/timestamp and retry eligibility. Repeated failure can lower scheduling priority or switch acquisition methods, but it cannot by itself establish that the supplier or possible use is incompatible. Decision evidence and acquisition health remain separate.
