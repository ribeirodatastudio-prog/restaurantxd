## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## 2025-10-24 - Missing Input Validation and Supabase Error Handling
**Vulnerability:** Unbounded input fields were directly inserted into Supabase tables, and Supabase client insertions did not automatically throw exceptions on failure, leaving the application state inconsistent when DB operations failed silently.
**Learning:** Supabase interactions returning `{ data, error }` fail silently unless `error` is explicitly checked and thrown. Additionally, lack of field validation (length limits like `.substring(0, 100)`) risks unhandled DB exceptions or Application Denial of Service (DoS).
**Prevention:** Always implement an explicit check like `if (error) throw error` after Supabase `.insert()`, `.update()`, or `.delete()` calls. Apply server-side style boundary checks on string inputs (e.g., `.trim().substring(0, N)`) prior to interacting with the database to maintain integrity and prevent silent failures.
