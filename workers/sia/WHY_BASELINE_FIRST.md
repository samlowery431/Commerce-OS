# Why import production baseline first?

Changing a reconstructed version of a live component creates uncertainty about whether regressions came from the intended feature or from reconstruction drift. Importing the deployed baseline first gives SIA a precise change boundary and a known rollback point.
