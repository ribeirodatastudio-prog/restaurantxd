## 2024-05-24 - Replace O(N log N) sort mutation with O(N) loop
**Learning:** Using `.sort()[0]` to find the maximum or minimum element in an array is an O(N log N) operation and introduces unintended in-place mutation of the data.
**Action:** Always use a single O(N) loop to calculate the maximum or minimum element.
## 2024-05-25 - Replace chained array iterations with a single loop
**Learning:** Using chained array methods like `.filter()`, `.reduce()`, and `.map()` on the same array creates multiple intermediate arrays, increasing GC (Garbage Collection) pressure and redundant iterations, especially when combined with the spread operator `[...arr]`.
**Action:** When performing multiple aggregations or transformations on an array (like filtering, summing, and collecting items), replace the chain with a single pass using a standard `for` loop to minimize allocations and improve performance.
