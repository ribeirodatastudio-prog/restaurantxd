## 2025-05-18 - [Security Headers]
**Vulnerability:** Missing standard HTTP security headers (e.g., X-Frame-Options, X-Content-Type-Options).
**Learning:** Next.js applications by default do not emit security headers; they must be explicitly configured in next.config.js to mitigate risks like clickjacking and MIME sniffing.
**Prevention:** Always define an async headers() function returning standard security headers in next.config.js for Next.js applications.
