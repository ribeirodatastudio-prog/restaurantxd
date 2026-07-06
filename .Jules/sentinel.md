## 2024-07-05 - Missing explicit error handling on Supabase API queries
**Vulnerability:** Found multiple missing error checks in `.insert()` and `.delete()` calls to the Supabase API where the `{ error }` response object is ignored.
**Learning:** Supabase API doesn't throw exceptions automatically on failures; without explicitly checking for the `error` property and throwing it, errors fail silently and user state goes out of sync with backend data without feedback.
**Prevention:** For every supabase call in this codebase, explicitly retrieve the `{ error }` object and `throw` it to an appropriate `try-catch` wrapper. Add safe number parsing for db variables and string truncation explicitly via `substring`.
