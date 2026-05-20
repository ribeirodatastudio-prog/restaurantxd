## 2024-05-24 - Supabase Payload Reduction
**Learning:** For counting records without needing the data (like counting non-wishlist restaurants), fetching full records with `select('*')` is inefficient. Furthermore, fetching unused columns (like all columns from dishes or visits tables when only statistics are needed) unnecessarily inflates network payloads.
**Action:** Use `{ count: 'exact', head: true }` in Supabase queries when only a count is needed. Explicitly define required columns in `.select('col1, col2')` rather than using `select('*')` to reduce network transfer and memory usage.

## 2024-05-24 - JS Array Method Optimization
**Learning:** Chained array methods (e.g., `.filter().reduce()` or sequential `.forEach()`) create intermediate arrays and iterate over the data multiple times, which can become a bottleneck during data aggregation for statistics.
**Action:** Combine operations into a single-pass `for` loop to minimize intermediate allocations and redundant iterations, especially when processing datasets on the backend or in Next.js Server Components.
