'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate empty email
    if (!email.trim()) {
      setStatus('error')
      return
    }

    setStatus('loading')

    const { error } = await supabase.from('waitlist').insert({ email: email.trim() })

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
      <div className="max-w-3xl w-full text-center py-8 md:py-20">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
          Dead Simple Form
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 md:mb-10 px-2">
          Create forms without the headache of a backend. <br className="hidden sm:block" />
          Join the early access waitlist today.
        </p>

        <div className="w-full max-w-lg mx-auto flex flex-col sm:flex-row gap-3 sm:gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          />
          <button
            onClick={handleSubmit}
            disabled={status === 'loading'}
            className="px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition disabled:opacity-50"
          >
            {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
          </button>
        </div>

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
        {/* Quick How-It-Works section */}
        <div className="mt-8 md:mt-12 flex flex-col items-center space-y-6">
          <div className="max-w-2xl text-left">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">How it works</h2>
            <ul className="space-y-2 text-gray-700 text-sm sm:text-base mt-3">
              <li>✅ Make a form on your website, just like you normally would</li>
              <li>🔗 Copy a special link from us and paste it into your form</li>
              <li>📬 When someone fills it out, we save the response for you</li>
              <li>📊 View submissions, download them, or get notified - your choice</li>
            </ul>
          </div>

          <div className="max-w-2xl text-left">
            <h2 className="text-xl sm:text-2xl font-semibold mt-6 md:mt-8 text-gray-800">Why it matters</h2>
            <ul className="space-y-2 text-gray-700 text-sm sm:text-base mt-3">
              <li>⏱ No time wasted managing servers or writing backend code</li>
              <li>🛠 Works with plain HTML - no frameworks or JavaScript needed</li>
              <li>🧪 Great for contact forms, landing pages, or quick projects</li>
              <li>🧘 You just build the frontend - we&apos;ll handle the boring stuff</li>
            </ul>
          </div>

          <div className="mt-8 md:mt-16 text-left w-full md:max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Example Usage</h2>
            <div className="bg-gray-900 rounded-xl p-3 sm:p-4 shadow-lg w-full font-mono text-white">
              <div className="overflow-x-auto">
                <pre className="text-xs sm:text-sm leading-relaxed min-w-max">
                  <code>
                    <span className="text-pink-400">&lt;form</span>{' '}
                    <span className="text-yellow-300">action</span>=<span className="text-green-400">"https://deadsimpleform.com/api/forms/[form_id]"</span>{' '}
                    <span className="text-yellow-300">method</span>=<span className="text-green-400">"POST"</span><span className="text-pink-400">&gt;</span>{'\n  '}
                    <span className="text-pink-400">&lt;label</span>{' '}
                    <span className="text-yellow-300">for</span>=<span className="text-green-400">"email"</span><span className="text-pink-400">&gt;</span>Your Email<span className="text-pink-400">&lt;/label&gt;</span>{'\n  '}
                    <span className="text-pink-400">&lt;input</span>{' '}
                    <span className="text-yellow-300">type</span>=<span className="text-green-400">"email"</span>{' '}
                    <span className="text-yellow-300">name</span>=<span className="text-green-400">"email"</span>{' '}
                    <span className="text-yellow-300">id</span>=<span className="text-green-400">"email"</span>{' '}
                    <span className="text-yellow-300">required</span>{' '}
                    <span className="text-pink-400">/&gt;</span>{'\n  '}
                    <span className="text-pink-400">&lt;button</span>{' '}
                    <span className="text-yellow-300">type</span>=<span className="text-green-400">"submit"</span><span className="text-pink-400">&gt;</span>Submit<span className="text-pink-400">&lt;/button&gt;</span>{'\n'}
                    <span className="text-pink-400">&lt;/form&gt;</span>
                  </code>
                </pre>
              </div>
            </div>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Just replace <code className="bg-gray-200 px-1 rounded text-xs sm:text-sm">[form_id]</code> with your actual form ID.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
