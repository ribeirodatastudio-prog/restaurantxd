## 2026-06-28 - Array Loop Optimizations
**Learning:** Chained array methods (.filter, .reduce, .forEach) and O(N log N) mutative sorts (.sort()) on large datasets in Next.js create unnecessary intermediate memory allocations and CPU overhead.
**Action:** Replace chained array functions with a single O(N) standard `for` loop and track max/min values (e.g. latest date) manually with null checks.
