## 2024-05-24 - Replace O(N log N) sort mutation with O(N) loop
**Learning:** Using `.sort()[0]` to find the maximum or minimum element in an array is an O(N log N) operation and introduces unintended in-place mutation of the data.
**Action:** Always use a single O(N) loop to calculate the maximum or minimum element.

## 2024-07-19 - Explicit field selection for in-memory analytics
**Learning:** The /stats page aggregates entire tables in memory, meaning over-fetching with select('*') scales linearly and balloons server memory.
**Action:** Always explicitly project only the required fields and use { count: 'exact', head: true } when only the row count is needed.
