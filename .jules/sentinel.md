## 2025-10-24 - Missing Security Headers Mitigation
**Vulnerability:** The application was missing standard HTTP security headers globally (such as HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
**Learning:** Next.js uses an empty `next.config.js` by default without enforcing strict security headers out of the box. Leaving these headers absent exposes the application to common baseline web vulnerabilities like MIME sniffing, Clickjacking, non-HTTPS downgrades, and overly permissive referrer leaks.
**Prevention:** Always configure an `async headers()` method in `next.config.js` to define fundamental defense-in-depth security headers like `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## 2025-05-15 - Unvalidated Input and Integer Parsing
**Vulnerability:** User inputs for creating wishlist restaurants were directly passed into Supabase insertions without sanitization or length limits (e.g., name, address, notes), and integer fields (e.g., price_range) were passed without validation.
**Learning:** Next.js client components interacting directly with Supabase via anon keys must perform rigorous client-side input validation and sanitization. Lacking this, malicious users can attempt DoS via huge text payloads, or trigger database runtime errors by sending malformed or excessively long strings and invalid integer representations.
**Prevention:** Always implement explicit client-side length checks (e.g., `< 100`) and `.trim()` strings before database insertion. For numbers, verify the value is valid using `!isNaN()` after parsing and ensure it falls within expected ranges to prevent database constraint violations.
