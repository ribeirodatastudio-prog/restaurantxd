
## 2024-05-18 - Optimized data aggregation in Next.js backend routes
**Learning:** Chained array methods (`filter`, `reduce`, `forEach`) cause unnecessary overhead and memory allocation during data aggregation on Node.js backend routes. Also, using Supabase `.select('*')` and fetching all data simply to count rows is highly inefficient and creates large network payloads compared to `{ count: 'exact', head: true }`.
**Action:** When aggregating large datasets on the server, consolidate array operations into a single-pass `for` loop to avoid intermediate arrays, and explicitly specify required fields or use the `count` modifier for Supabase queries to minimize data transfer size.
