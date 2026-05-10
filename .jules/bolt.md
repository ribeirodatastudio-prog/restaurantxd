
## 2024-05-18 - [Defensive Supabase Relationship Typing]
**Learning:** Supabase relationship queries (like `restaurant:restaurants(name, cuisine_type)`) can resolve as either an array or a single object depending on the generated types. If they are an array unexpectedly, accessing properties like `x.restaurant.cuisine_type` will cause TypeScript build errors.
**Action:** Defensively handle relationship return values by using `Array.isArray(x.restaurant) ? x.restaurant[0] : x.restaurant` before accessing object properties to ensure type safety and prevent build failures.
