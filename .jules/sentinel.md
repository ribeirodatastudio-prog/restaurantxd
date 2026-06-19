## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## 2025-10-24 - Input Sanitization and Secure Error Handling
**Vulnerability:** The application was not strictly validating or sanitizing the size of strings (e.g. name, notes) or the type/boundaries of numerical inputs (e.g. price range) before making database insertions.
**Learning:** Allowing user input to pass straight to backend insert functions can cause unhandled application crashes or leak underlying database schemas/error trace details when constraints are violated, and open the path for minor Denial of Service via excessively large text blobs.
**Prevention:** Always implement strict defensive input validation on the client side (trimming, enforcing slice length limits, validating numbers with `isNaN()` and exact ranges) prior to database submission, and wrap backend operations in `try/catch` blocks. The catch block should `console.error` the raw error for developer logs while presenting only generic, non-exposing messages to the end user.
