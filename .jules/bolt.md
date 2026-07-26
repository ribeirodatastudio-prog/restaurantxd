## 2024-05-24 - Replace O(N log N) sort mutation with O(N) loop
**Learning:** Using `.sort()[0]` to find the maximum or minimum element in an array is an O(N log N) operation and introduces unintended in-place mutation of the data.
**Action:** Always use a single O(N) loop to calculate the maximum or minimum element.
## 2026-07-26 - Avoid fetching data to count and select specific fields
**Learning:** Using `select('*')` fetches unnecessary fields, and fetching full arrays just to count them adds unnecessary memory overhead.
**Action:** Use Supabase's `{ count: 'exact', head: true }` to fetch just the count from the database, and only select the needed fields.
