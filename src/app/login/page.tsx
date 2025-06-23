'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function LoginPage() {
  const supabase = createClientComponentClient()

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-2xl shadow-xl border border-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back 👋</h1>
          <p className="text-md text-gray-300">
            Log in to create and manage forms dead simply.
          </p>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="light"
          providers={[]}
          magicLink={false}
        />

        <p className="text-xs text-gray-400 text-center mt-6">
          Don’t have an account yet? Sign up — it’s completely free.
        </p>
      </div>
    </div>
  )
}
