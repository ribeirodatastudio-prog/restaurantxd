## 2026-04-26 - [Supabase `length` Optimization in Next.js]
**Learning:** Fetching `*` just to calculate `.length` from a Supabase response causes N data payload to be sent and loaded into memory unnecessarily.
**Action:** Use Supabase's `count: 'exact', head: true` option inside the `select` method when only the item count is required from the database to improve payload and latency significantly.
