## 2026-04-29 - Missing RLS Policies on Supabase Database
**Vulnerability:** The database lacks Row Level Security (RLS) policies, allowing anyone with the exposed `NEXT_PUBLIC_SUPABASE_ANON_KEY` to read, modify, and delete any data from the client side without authorization.
**Learning:** Using Supabase without enabling RLS and writing explicit policies exposes the entire database when the anon key is public in a frontend application like Next.js.
**Prevention:** Always enable RLS on all Supabase tables immediately after creation and write explicit policies defining who can select, insert, update, or delete data (e.g., matching a user's ID).
