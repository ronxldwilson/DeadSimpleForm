// middleware.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const cookieStore = await cookies()
  const supabase = createServerClient(
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
  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession()
  return res
}

// 👇 This tells Next.js which routes should use this middleware
export const config = {
  matcher: [
    '/',                   // Homepage
    '/login',              // Your login page
    '/dashboard',          // Your future dashboard
    '/api/forms/:path*'    // Protect all /api/forms/* routes
  ]
}