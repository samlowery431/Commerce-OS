# Fail-closed behavior

The SIA worker must not invent supplier records when discovery or evidence acquisition fails. API failures, unavailable sources, ambiguous evidence, and unsupported control-plane versions remain explicit failures/unknowns. Existing supplier records are retained; absence of new evidence is not evidence of incompatibility.
