## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## 2026-05-20 - Missing Input Validation and Error Masking on Supabase Inserts
**Vulnerability:** User inputs were directly passed into Supabase insert queries without sanitization (trimming), length validation, type verification, or proper error catching.
**Learning:** This could lead to runtime errors on malformed inputs, exceeding database limits, and potentially leaking database schema details or stack traces to the client if the insert fails.
**Prevention:** Always sanitize, validate length and type bounds of all user input before interacting with the database. Wrap database calls in a try-catch block that masks the specific error from the user while logging the full error to the developer console.
