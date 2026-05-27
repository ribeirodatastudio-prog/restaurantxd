
## 2024-05-27 - Supabase and Array Iteration Optimization
**Learning:** Selecting all fields `select('*')` on joined tables or for simple row counts causes large, unnecessary network payloads and memory consumption. Also, chaining array methods (`filter`, `reduce`, `forEach`, `sort`) creates multiple intermediate allocations which degrades performance during data aggregation.
**Action:** Use `{ count: 'exact', head: true }` when only a count is needed from Supabase. Explicitly specify only the required fields in `.select()`. Replace chained array iterations with a single-pass standard `for` loop to minimize intermediate allocations.
