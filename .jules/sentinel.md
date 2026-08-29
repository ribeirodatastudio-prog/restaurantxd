## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.
## 2025-10-24 - Error Message Information Leakage
**Vulnerability:** User-facing generic error messages instructing the user to check the console for error details, combined with direct 'console.error(err)' calls, increasing the risk of leaking internal error objects and stack traces to end users.
**Learning:** Directly logging raw errors to the client console and pointing non-technical users to inspect it can expose sensitive application internals, database details, or framework mechanics.
**Prevention:** Always catch exceptions securely on the frontend by displaying non-descriptive, user-friendly error messages (e.g., 'An error occurred. Please try again later.') while maintaining detailed but scoped logging for developers.
