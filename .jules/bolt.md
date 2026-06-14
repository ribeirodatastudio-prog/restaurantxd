## 2024-06-14 - Optimizing data aggregation with O(N) passes
**Learning:** Using chained array methods like `.filter().reduce()` or `.sort()[0]` for finding minimum/maximum elements causes unnecessary intermediate allocations, multiple array passes, and in-place array mutations which can be costly on large datasets or inside frequent mapping functions.
**Action:** Replace these chained array operations with a single O(N) standard `for` loop to compute averages, max/min values, and other aggregations efficiently in one pass.
