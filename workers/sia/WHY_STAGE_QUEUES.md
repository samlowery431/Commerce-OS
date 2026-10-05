# Why separate work queues by stage?

Different stages have different costs, freshness needs, dependencies, and providers. Separate queues let the scheduler spend resources where the next fact has the highest decision value instead of forcing every supplier through an expensive fixed sequence.
