## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.
## 2024-07-26 - Content-Security-Policy Implementation
**Vulnerability:** Missing Content-Security-Policy (CSP) header, which could allow Cross-Site Scripting (XSS) or data injection attacks.
**Learning:** Next.js applications require specific CSP directives (`script-src 'unsafe-eval' 'unsafe-inline'`) for the development environment to function properly, alongside external domains like `https://*.supabase.co` for backend communication.
**Prevention:** Always implement a comprehensive CSP in `next.config.js` for Next.js applications, ensuring necessary development scripts and external APIs are explicitly permitted.
