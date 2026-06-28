
## 2024-06-28 - Missing Input Validation and Silent Database Errors
**Vulnerability:** User inputs were sent directly to the Supabase database without being length-validated or properly error-checked (missing `try...catch` and error throwing on `.insert()` and `.delete()`). In addition, number inputs were parsed unsafely, and potential DoS via long strings existed.
**Learning:** Supabase API calls like `supabase.from().insert()` do not throw JavaScript exceptions by default on failure; they return `{ error }` objects which must be explicitly checked to handle failures safely without leaking internals to the user or failing silently.
**Prevention:** Always wrap database writes in `try...catch`, enforce `substring()` bounds on string inputs, use safe parsing for numbers (e.g., `parseInt(val || '')`), and explicitly throw on `{ error }` to trigger the fallback logic.
