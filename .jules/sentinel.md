## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## 2025-10-24 - Missing Input Sanitization on Client-Side Inserts
**Vulnerability:** The application was missing input validation and length limits on data points provided by the user before performing client-side `supabase.from().insert()` calls.
**Learning:** Bypassing standard backend APIs means the client communicates directly with Supabase. Without rigorous input sanitization, trimming, type checking, and explicit substring constraints matching database schema limits, malformed or oversized payloads will cause uncaught Postgres exceptions leading to runtime application crashes or invalid data injection.
**Prevention:** Always implement defensive programming for client-side queries by explicitly validating numbers (e.g., `!isNaN()`), applying `.trim()`, and using `.substring(0, MAX_LENGTH)` before all database inserts to match underlying constraints.
