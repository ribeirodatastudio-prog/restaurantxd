## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## 2026-05-24 - Unbounded Input Length Validation
**Vulnerability:** User inputs (e.g., restaurant name, address, notes, occasion) lack sufficient character length restrictions when constructing insertion payloads for Supabase.
**Learning:** Next.js Server Components and server-side logic in App Router that process UI forms natively can be vulnerable to passing arbitrary or overly long inputs to the database backend. Even without explicit APIs, this could cause resource consumption anomalies or malformed query rejections that crash processes.
**Prevention:** Always implement explicit sanitization and string constraints via `.trim()` and `.substring()` bounded to schema limitations for inputs before submitting payloads to the database. Additionally apply input validation functions such as `isNaN` for numerical fields.
