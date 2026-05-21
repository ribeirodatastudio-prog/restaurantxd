## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## 2025-10-24 - Missing Input Validation on Supabase Payloads
**Vulnerability:** The application was missing basic length limits and type validation (e.g., NaN checks for parsed integers) on fields like `name`, `notes`, and `price_range` before directly inserting them into Supabase via client-side code.
**Learning:** Due to the lack of RLS (Row Level Security) and completely exposed anonymous client keys, malicious actors or buggy clients could submit excessively large strings or malformed payload data types (like NaN values for price constraints). This can lead to unhandled DB exceptions, database pollution, or unexpected frontend rendering errors.
**Prevention:** Always sanitize inputs directly before insertion by using defensive strategies like `(value || '').trim().slice(0, MAX_LENGTH)` for strings, and safely verifying parsed numbers (`!isNaN(val)`) to prevent runtime crashes and restrict payload size.
