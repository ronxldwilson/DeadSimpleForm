'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function LoginPage() {
  const supabase = createClientComponentClient()

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md p-6 bg-gray-900 rounded-2xl shadow-xl border border-gray-800">
        <h1 className="text-2xl font-semibold text-white text-center mb-2">Welcome back</h1>
        <p className="text-sm text-white text-center mb-6">
          Sign in to manage your forms and submissions
        </p>

        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="light"
          providers={[]}
          magicLink={false}
        />

        <p className="text-xs text-white text-center mt-6">
          Don’t have an account? Just sign up — it's free.
        </p>
      </div>
    </div>
  )
}
