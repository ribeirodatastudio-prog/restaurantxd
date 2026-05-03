## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## 2025-10-24 - Information Disclosure in Client Console
**Vulnerability:** Raw error objects (e.g., from Supabase operations) were being directly logged to the client console (`console.error(err)`), exposing underlying database schemas, internal identifiers, or potential execution stack details.
**Learning:** Alerting the user to "check the console" and leaking complete error traces provides unnecessary insight to malicious actors about the application's backend architecture.
**Prevention:** Catch blocks should provide user-friendly, non-descriptive alerts and log generic messages without passing the raw error object to `console.error` in client-side code.
