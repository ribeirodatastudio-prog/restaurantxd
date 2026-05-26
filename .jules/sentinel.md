## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## 2025-10-24 - Unhandled Supabase Errors & Missing Input Truncation
**Vulnerability:** Supabase API calls like `supabase.from(...).insert()` returned `{ error }` objects without explicitly triggering an exception. Additionally, user inputs like names and notes were completely unrestricted, allowing arbitrary length payloads (DoS/resource exhaustion risk).
**Learning:** Supabase JavaScript client does not natively throw exceptions on database errors, so they silently fail without `if (error) throw error`. Also, standard web input elements allow overly long text which should be proactively validated server-side or right before external database queries.
**Prevention:** Always assert and `throw error` explicitly when receiving responses from Supabase mutations. Pre-emptively slice unbounded string inputs (`substring(0, 100)`) on the client/middle-tier before sending to database boundaries.
