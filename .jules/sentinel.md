## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## 2025-10-24 - Information Disclosure in Client-Side Error Handling
**Vulnerability:** The application was logging raw error objects to the console (`console.error(err)`) and explicitly directing users to check the console via an `alert` within the catch block of a form submission (`app/new-visit/NewVisitForm.tsx`).
**Learning:** Exposing raw error objects, especially those originating from database interactions or third-party APIs (like Supabase), can inadvertently leak sensitive application details, internal architecture, database schema names, or stack traces to malicious actors viewing the client console. This violates the principle of failing securely.
**Prevention:** Always use generic, non-informative error messages for user-facing alerts and client-side logging (e.g., `console.error('An error occurred while saving the visit.')`). Do not expose raw exception objects to the client unless strictly necessary for development debugging, and ensure they are removed or obfuscated before production deployment.
