# Rollback boundary

The imported pre-SIA control-plane baseline is pinned by `BASELINE_COMMIT.txt`. If a SIA deployment causes an incompatibility, restore the Edge Function to that known pre-SIA implementation before investigating further. Database SIA tables can remain in place because the API extension is additive and the existing research worker does not depend on them.
