## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## 2025-10-24 - Missing Content Security Policy
**Vulnerability:** The application lacked a Content-Security-Policy (CSP) header, which was explicitly noted in memory.
**Learning:** Without CSP, the application is more susceptible to Cross-Site Scripting (XSS) and data injection attacks. Given Next.js's default setup, CSP must be manually defined in `next.config.js` to enforce strict source lists.
**Prevention:** Always implement a `Content-Security-Policy` header in `next.config.js` with restrictive directives (e.g., `default-src 'self'`), explicitly allowing only necessary external resources like Supabase (`https://*.supabase.co`).
