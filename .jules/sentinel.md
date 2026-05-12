## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## 2024-05-24 - Missing Input Validation Limits on Database Inserts
**Vulnerability:** Client-side components like `WishlistActions` and `PeopleManager` were inserting data directly into Supabase without sanitizing inputs or validating length bounds.
**Learning:** Due to the direct-to-database insertion architecture with Supabase from client components, any lack of constraints locally exposes the system to inserting excessively large payloads or invalid types (e.g. `NaN` for `price_range`), increasing DoS risk and potential application crashes on malformed data.
**Prevention:** Always sanitize inputs with `trim()`, validate integer conversions with `isNaN()`, and enforce maximum length string limits (`slice()`) before making bulk database inserts.
