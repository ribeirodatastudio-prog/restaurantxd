## 2024-06-25 - Supabase select optimizations
**Learning:** Selecting all fields (`select('*')`) and fetching rows only to count them fetches unnecessary payloads from the database.
**Action:** When working with Supabase, only fetch necessary fields by explicitly specifying them (e.g., `select('id, name')`). When only needing the count of a query, use `{ count: 'exact', head: true }` and read the `count` returned from Supabase, avoiding querying large arrays of data.
