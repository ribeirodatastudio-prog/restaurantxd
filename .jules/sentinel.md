## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.
## 2024-07-19 - Missing Content Security Policy in Next.js
**Vulnerability:** The application was missing a Content-Security-Policy (CSP) header, leaving it more susceptible to XSS and data injection attacks.
**Learning:** Next.js development server requires 'unsafe-eval' and 'unsafe-inline' for Fast Refresh, which often discourages developers from setting a CSP early on. Supabase client also needs explicit connect-src allowances.
**Prevention:** Always include a baseline CSP in next.config.js for new Next.js projects and adjust connect-src for external APIs like Supabase.
