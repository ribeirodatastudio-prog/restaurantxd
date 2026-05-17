## 2024-05-24 - Supabase Payload Optimization
**Learning:** In Supabase queries (`select()`), pulling full datasets `select('*')` just to count the array length or extract one column leads to excessive memory use and large network payloads, creating performance bottlenecks especially in pages doing aggregations.
**Action:** When a query's payload is purely for counting, always use `select('*', { count: 'exact', head: true })`. For aggregations on specific columns, explicitly declare only the columns needed (e.g., `select('id, would_order_again')`) instead of `*`.
