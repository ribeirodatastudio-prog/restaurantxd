## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## 2025-10-24 - Missing Content Security Policy (CSP) Mitigation
**Vulnerability:** The application was missing a `Content-Security-Policy` header in `next.config.js`. This is a critical security enhancement that mitigates Cross-Site Scripting (XSS), data injection, and other content-based attacks.
**Learning:** Next.js applications require explicit configuration of CSP, without it the browser allows loading scripts and styles from anywhere which can be extremely dangerous.
**Prevention:** Always configure `Content-Security-Policy` in `next.config.js` with a restrictive policy like `default-src 'self'` and gradually allow required domains.
