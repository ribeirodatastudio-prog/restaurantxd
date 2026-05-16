## 2024-03-24 - Supabase Count Query Performance
**Learning:** To avoid fetching full arrays of objects just to check lengths (like `restaurants?.length`), Supabase supports `{ count: 'exact', head: true }` inside `.select('id', ...)`, offloading the counting to Postgres and preventing massive O(N) network payloads.
**Action:** Always prefer `head: true` count queries in Supabase when only checking the quantity of records for stats or pagination to prevent overfetching.
