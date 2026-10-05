# Concurrency

Concurrency should be bounded per acquisition provider and stage. Entity/candidate writes must remain idempotent under parallel discovery. Later work leasing should prevent duplicate expensive research while allowing safe retries after lease expiry or worker failure.
