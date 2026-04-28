## 2025-04-28 - [Exposed Supabase API Key and Missing RLS allow client-side manipulation]
**Vulnerability:** The `NEXT_PUBLIC_SUPABASE_ANON_KEY` is exposed to the client-side code, and the Supabase database schema lacks Row Level Security (RLS) policies.
**Learning:** This combination allows any user (or malicious actor) to read, write, and delete arbitrary data directly from the client without any authentication or authorization, completely bypassing application logic.
**Prevention:** Always implement robust Row Level Security (RLS) policies in Supabase to restrict data access and modification based on user authentication status and authorization rules before exposing the anon key to the client.
