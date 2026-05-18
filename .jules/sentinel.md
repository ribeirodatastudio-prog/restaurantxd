## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## 2026-05-18 - Input Validation and Bounding
**Vulnerability:** Input data to Supabase (names, notes, arrays, and numeric parsers like price) were being inserted directly without trimming, bounds constraints, or strict NaN defensive checks, introducing DoS risks and causing runtime errors.
**Learning:** Inserting strings of unbound length directly from user input wastes database storage, creates Denial of Service (DoS) risks due to overly large payloads, and parsing `parseInt(empty_or_invalid)` outputs `NaN` which throws Postgres runtime errors during inserts.
**Prevention:** Always sanitize inputs with `.trim()`, enforce explicit string lengths using `.substring(0, MAX_LENGTH)` based on schema limits (e.g., 100 for names, 1000 for notes), and validate parsed numbers using `!isNaN(num) && valid_bounds ? num : null` before database insertion.
