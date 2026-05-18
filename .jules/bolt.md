
## 2024-05-18 - Optimize Statistics Data Fetching and Aggregation
**Learning:** Supabase allows `count: 'exact', head: true` for pure counts to avoid transferring the entire dataset when only the length is needed. Also, chained javascript arrays `.filter()`, `.reduce()`, `.forEach()` can be consolidated into single-pass `for` loops to minimize intermediate allocations.
**Action:** Use `count: 'exact', head: true` when doing count queries, and replace chained aggregations with single-pass standard `for` loops in statistics or reporting calculations.
