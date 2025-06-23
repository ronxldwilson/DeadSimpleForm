import { createClient } from '@supabase/supabase-js'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// NOTE: Do NOT use this client for any authenticated/session-based requests.
// Use only for public data or static usage. For auth/session, use the helpers from @supabase/auth-helpers-nextjs.
