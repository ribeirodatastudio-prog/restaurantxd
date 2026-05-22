## 2026-05-22 - [Supabase Query Optimization]
**Learning:** Explicitly selecting only required columns and using head:true for counts avoids unnecessary data transfer overhead. Combining chained array methods into a single loop reduces allocations.
**Action:** Always explicitly select fields needed for rendering instead of '*'. Use count: 'exact', head: true for mere aggregations. Prefer standard for loops over chained array iterators for performance on larger datasets.
