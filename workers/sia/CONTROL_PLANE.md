# Control plane

The Supabase Edge Function authenticates node workers and exposes bounded state transitions. It is responsible for enforcing node identity, validating request shape, and mediating persistent SIA state. It is not responsible for crawling supplier sites itself; acquisition workers/providers perform that work and submit structured evidence through the control plane.
