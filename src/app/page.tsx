'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const { error } = await supabase.from('waitlist').insert({ email })

    if (error) {
      console.error(error)
      if (error.code === '23505') {
        // Unique constraint violation
        setStatus('duplicate')
      } else {
        setStatus('error')
      }
    } else {
      setStatus('success')
      setEmail('')
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-white to-slate-100 text-gray-900 font-sans">
      <div className="max-w-3xl text-center py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
          Dead Simple Form
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          Create forms without the headache of a backend. <br className="hidden md:block" />
          Join the early access waitlist today.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto flex flex-col sm:flex-row gap-3 sm:gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition disabled:opacity-50"
          >
            {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
          </button>
        </form>

        {status === 'success' && (
          <p className="mt-4 text-green-600">You&apos;re on the list! 🎉</p>
        )}
        {status === 'duplicate' && (
          <p className="mt-4 text-green-600">You&apos;re already on the waitlist ✅</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-600">Something went wrong. Try again.</p>
        )}

        {/* Quick How-It-Works section */}
        <div className="mt-12 text-left space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">How it works</h2>
          <ul className="space-y-2 text-gray-700 text-base">
            <li>✅ Make a form on your website, just like you normally would</li>
            <li>🔗 Copy a special link from us and paste it into your form</li>
            <li>📬 When someone fills it out, we save the response for you</li>
            <li>📊 View submissions, download them, or get notified — your choice</li>

          </ul>

          <h2 className="text-2xl font-semibold mt-8 text-gray-800">Why it matters</h2>
          <ul className="space-y-2 text-gray-700 text-base">
            <li>⏱ No time wasted setting up servers or writing backend code</li>
            <li>🛠 Works with plain HTML — no frameworks or JavaScript needed</li>
            <li>🧪 Great for contact forms, landing pages, or quick projects</li>
            <li>🧘 You just build the frontend — we&apos;ll handle the boring stuff</li>
          </ul>
        </div>

      </div>
    </main>
  )
}
