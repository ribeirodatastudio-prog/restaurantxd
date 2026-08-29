## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## 2025-10-24 - Missing Content-Security-Policy Header
**Vulnerability:** The application was missing the `Content-Security-Policy` header in `next.config.js`, despite having other security headers.
**Learning:** Even when security headers are globally configured, omitting the CSP header leaves the application exposed to XSS and data injection attacks.
**Prevention:** Always verify that all necessary security headers, particularly a strict `Content-Security-Policy`, are explicitly defined in the `headers` array of `next.config.js`.
