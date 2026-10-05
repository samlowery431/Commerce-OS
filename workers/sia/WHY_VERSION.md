# Why version interfaces and policies?

Autonomous components evolve independently. Explicit API, worker, and policy versions let a worker reject incompatible control planes, let historical assessments remain interpretable, and let migrations/re-evaluations happen deliberately rather than silently changing the meaning of stored state.
