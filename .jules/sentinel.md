## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## 2026-07-12 - Content Security Policy Addition
**Vulnerability:** The application lacked a Content-Security-Policy header in next.config.js, increasing exposure to XSS attacks.
**Learning:** Implementing CSP provides defense-in-depth by restricting where scripts, styles, and other resources can be loaded from.
**Prevention:** Always include a strict Content-Security-Policy in next.config.js headers array.
