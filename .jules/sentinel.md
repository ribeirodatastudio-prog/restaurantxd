## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.
## 2025-10-24 - Avoid Information Disclosure in Error Handlers
**Vulnerability:** Raw error objects (such as `err` in catch blocks) were being explicitly logged to the client console (`console.error(err)`), and UI alerts were potentially hinting at console logs for debugging.
**Learning:** In a client-side context (like Next.js React components marked with `'use client'`), exposing raw error objects to the browser console can leak sensitive internals, API configurations, or stack traces to an attacker examining the developer tools.
**Prevention:** Catch blocks in client components should fail securely by omitting raw console logs and using generic, non-informative error messages for any user-facing prompts.
