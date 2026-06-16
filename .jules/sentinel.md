## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## 2024-05-18 - [Supabase Error Handling]
**Vulnerability:** Silent failure on database errors
**Learning:** Supabase API interactions (`.insert()`, `.update()`) return `{ data, error }` instead of throwing exceptions. If not explicitly checked and thrown, functions will silently ignore errors and proceed (e.g., clearing form data even if the insert failed).
**Prevention:** Always check for `error` after a Supabase operation and throw it explicitly (`if (error) throw error`) within a `try/catch` block to ensure robust error handling and maintain data integrity.
