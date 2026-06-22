## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.
## 2024-05-23 - [Input Validation and Defensive Errors]
**Vulnerability:** The Wishlist application directly passed unsanitized user inputs to the database and lacked try/catch handling for database inserts/updates.
**Learning:** This exposes the application to potential database insertion errors (due to length violations) and unhandled promise rejections that can leak error stack traces to the console or silently break the application state.
**Prevention:** Always trim inputs, strictly validate string lengths against database column limits, validate parsed numerical constraints, and wrap external API/database calls in try/catch blocks that surface generic user-friendly alerts.
