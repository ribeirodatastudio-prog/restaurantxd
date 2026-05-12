## 2024-05-12 - Supabase Generic Typing with Array Returns
**Learning:** When using Next.js with Supabase, explicitly extracting an array relationship (e.g. `x.restaurant = x.restaurant[0]`) can fail TypeScript compilation if the generic infers an exact struct layout rather than an array.
**Action:** Use `(x.restaurant as any)[0]` as a safe escape hatch for data normalization in server components to avoid `Property is missing from type '[]'` Next.js build errors.
