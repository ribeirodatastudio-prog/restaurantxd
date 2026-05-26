## 2024-05-18 - Optimize Supabase count payloads
**Learning:** Fetching an entire table's records in Supabase just to check its `length` is a massive anti-pattern. Supabase supports `{ count: 'exact', head: true }` which completely bypasses the data payload and significantly speeds up API calls.
**Action:** Always check if a data fetch operation is strictly meant to measure totals. If so, replace standard selects with head counts to reduce bandwidth and DB overhead.
