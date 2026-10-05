# Retry semantics

Infrastructure failure and negative business evidence are different states. A timeout, temporary block, parser failure, or unavailable source should be retried/backed off and recorded as an acquisition failure. It must not be converted into supplier incompatibility. Business rejection requires actual evidence under the relevant policy layer.
