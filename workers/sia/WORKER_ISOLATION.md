# Worker isolation

SIA runs in its own service/process. It may share the node API credential and host with the research worker, but it must not mutate the research worker's files, browser profile, systemd unit, or job state. Shared infrastructure should be treated as a dependency with explicit interfaces, not as an invitation to couple process internals.
