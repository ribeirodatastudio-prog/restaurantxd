
## 2026-06-21 - Optimizing Array Aggregations
**Learning:** Chaining array methods like .reduce(), .filter(), and .sort() for calculating aggregates (like averages and maximums) on related datasets causes O(N log N) overhead and redundant iterations.
**Action:** Replace chained array methods with a single O(N) standard for-loop to compute aggregations like average rating and most recent visit in one pass.
