
// lib/supabase-server.ts

import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import { type Database } from './types' // optional: generated types

export function createSupabaseServerClient() {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
}
