## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## 2025-05-27 - Unhandled Supabase DB Exceptions & Missing Input Constraints
**Vulnerability:** Silent database errors during insert/update operations due to lack of explicit error checking in Supabase calls, coupled with missing length limits for user input fields.
**Learning:** Supabase JavaScript client does not automatically throw standard exceptions when database operations fail; it returns `{ data, error }`. Failing to explicitly check and throw `if (error)` swallows errors. Additionally, missing `substring(0, MAX_LENGTH)` on inputs risks payload overload and potential database denial of service or truncation issues.
**Prevention:** Always check and explicitly throw the `error` returned by Supabase queries, wrapping the logic in `try...catch` for secure user messaging (`alert()`) and detailed developer logging (`console.error()`). Always limit raw user input lengths (e.g., `substring(0, 100)`) before inserting into the database.
