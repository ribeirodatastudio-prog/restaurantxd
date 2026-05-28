## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## 2025-10-24 - Supabase Error Handling and Unvalidated Input
**Vulnerability:** Inserting data directly into Supabase without explicit checking for `{ error }` and validating input constraints could result in silent failures. Since the app is relying entirely on the anon key, long strings could crash the Next.js process or get dropped by the database silently without error handling.
**Learning:** Supabase interactions do not inherently throw JavaScript Exceptions; they return an `error` object. In addition, raw user input mapping directly to database fields should be truncated to expected boundaries to prevent payload size issues.
**Prevention:** Wrap all database mutations in a `try...catch` and explicitly check `if (error) throw error`. Always validate or constrain external string inputs with `substring(0, max_len)` and properly sanitize inputs like integers with `isNaN()`.
