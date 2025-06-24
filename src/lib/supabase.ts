import { createClient } from '@supabase/supabase-js'
// import { createSupabaseServerClient } from '@/lib/supabase-server'

// Use only for public data or static usage. For auth/session, use the server/client helpers from @supabase/ssr.

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
