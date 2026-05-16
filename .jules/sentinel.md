## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## 2025-10-24 - Missing Input Validation
**Vulnerability:** The application was missing adequate server-side (and pre-request client-side) input validation. Inputs were not validated for maximum lengths or explicitly checked for valid types (like verifying integers), before directly constructing database requests on the client.
**Learning:** In a heavily client-side Next.js app interacting directly with Supabase via an anonymous key, lacking input validation implies malicious or malformed requests can easily cause Database runtime errors (e.g., trying to parse `NaN` as an integer or inserting strings that breach schema size limits) and lead to potential resource exhaustion (DoS) via excessively large payload inserts.
**Prevention:** Always implement strong pre-request validation. Trim string inputs and enforce max length boundaries (e.g. name <= 100, address <= 255, notes <= 1000). Ensure numerical fields check for `NaN` after parsing. Use generic alert messages to the user without exposing internal trace details.
