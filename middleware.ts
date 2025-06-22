
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // This automatically handles the `?code=` and `?access_token=` exchange
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