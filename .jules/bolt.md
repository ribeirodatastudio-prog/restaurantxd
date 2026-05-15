
## 2024-08-01 - [Supabase Query and Aggregation Optimization]
**Learning:** Avoid downloading an entire table when only its count is needed. Avoid implicit global selects that result in large network payloads. Multiple chained array iterations (`filter`, `reduce`, `forEach`) result in excessive CPU cycles and intermediate allocations when performing data aggregations on large lists.
**Action:** Always use `{ count: 'exact', head: true }` in Supabase when querying purely for count, explicit selecting required fields rather than `*` from related tables. Consolidate chained array methods into a single standard `for` loop pass during complex aggregation to minimize processing overhead.
