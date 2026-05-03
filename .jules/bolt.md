## 2024-05-24 - Optimizing Dashboard Metric Queries in Supabase
**Learning:** For dashboard statistics like the ones in `/stats/page.tsx`, fetching whole lists using `select('*')` to just retrieve `.length` or single attributes fetches enormous amounts of unused data as tables grow.
**Action:** Always use `{ count: 'exact', head: true }` in Supabase when only a record count is needed. For aggregations or partial calculations, explicitly select only the fields necessary (e.g. `select('would_order_again')` instead of `select('*')`).
