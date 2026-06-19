## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## 2024-05-13 - Missing Input Sanitization and Type Validation
**Vulnerability:** The application was vulnerable to potential Denial of Service (DoS) and application errors by accepting unsanitized, arbitrarily long strings, and not validating numeric types prior to Supabase bulk inserts.
**Learning:** Bypassing input limits and explicit type conversions enables passing exceedingly large payloads to the database, exhausting server resources, while missing `isNaN` checks can lead to null values acting incorrectly or producing database-level type-casting errors.
**Prevention:** Always validate and sanitize user input before database insertion. For strings, apply `.trim()` and establish maximum length bounds (e.g., `.slice(0, 100)`). For numerics parsed from strings, confirm validity with `!isNaN(parsedValue)`.
