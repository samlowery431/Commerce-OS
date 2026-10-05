# ADR 0003: SIA and marketplace research run as separate services

Status: Accepted

The known-good eBay Product Research worker and SIA worker have separate process/service lifecycles. SIA failures must not terminate or overwrite the research worker. Shared authentication is permitted through the node API, but runtime responsibility remains isolated.
