## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## 2025-10-25 - Supabase Error Handling
**Vulnerability:** Supabase API interactions like `.insert()` or `.update()` do not automatically throw exceptions on database errors, leading to silent failures.
**Learning:** The application was missing explicit error checking for database inserts and updates, allowing potential data inconsistencies and lack of user feedback on failure.
**Prevention:** Always check the `error` object returned by Supabase operations and explicitly `throw error` to trigger `try...catch` blocks.
