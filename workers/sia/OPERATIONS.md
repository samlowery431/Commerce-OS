# SIA worker operations

The service definition is staged in `systemd/commerce-os-sia.service`. Repository creation does not activate it.

The first operational gate is API readiness: production must advertise `sia_node_v0_1`, worker contract tests must pass, and the existing eBay research worker must remain healthy. The initial service performs readiness checks only. Autonomous discovery is a later provider layer and must emit real provenance-preserving evidence rather than synthetic candidates.
