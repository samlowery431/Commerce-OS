# Worker rollback

The SIA service is independent of the eBay research service. If SIA causes operational problems, stop/disable only SIA and leave the research worker running. Because SIA uses additive tables/API actions, rollback should not require deleting accumulated supplier evidence; preserve it for diagnosis unless a specific test-data cleanup is required.
