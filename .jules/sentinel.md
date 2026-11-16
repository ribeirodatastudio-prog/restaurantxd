## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.
## 2024-07-05 - Missing explicit error handling on Supabase API queries
**Vulnerability:** Found multiple missing error checks in `.insert()` and `.delete()` calls to the Supabase API where the `{ error }` response object is ignored.
**Learning:** Supabase API doesn't throw exceptions automatically on failures; without explicitly checking for the `error` property and throwing it, errors fail silently and user state goes out of sync with backend data without feedback.
**Prevention:** For every supabase call in this codebase, explicitly retrieve the `{ error }` object and `throw` it to an appropriate `try-catch` wrapper. Add safe number parsing for db variables and string truncation explicitly via `substring`.
## 2026-11-14 - Public anon key with allow-all RLS
**Vulnerability:** The Supabase anon key shipped to the browser and every table had an `using (true)` policy, so anyone who opened the site could read or delete all data.
**Learning:** A "personal app" on a public URL is still public. Database credentials must never reach the client.
**Prevention:** All database access now runs on the server (`lib/db.ts` is `server-only`), and every route and server action requires the session cookie set by `/login`.
