// lib/supabase-server.ts

import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

// import { type Database } from './types' // optional: generated types

export async function createSupabaseServerClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignore if called from a Server Component
          }
        },
      },
    }
  )
}
