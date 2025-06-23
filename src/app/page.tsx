
// app/page.tsx
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen px-6 py-20 bg-white text-black">
      <section className="text-center max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">Dead Simple Form</h1>
        <p className="text-xl text-gray-600 mb-8">
          Form endpoints without the backend headache.
        </p>
        <Link href="/login">
          <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
            Get Started
          </button>
        </Link>
      </section>

      <section className="mt-16 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">Why use DeadSimpleForm?</h2>
        <ul className="space-y-2 text-gray-700">
          <li>✅ No backend required</li>
          <li>✅ Store submissions instantly</li>
          <li>✅ Add webhooks for automation</li>
          <li>✅ Built with Supabase. Fast & secure.</li>
        </ul>
      </section>

      <section className="mt-16 bg-gray-100 p-6 rounded-lg max-w-2xl mx-auto text-sm font-mono">
        <pre>
{`curl -X POST https://yourdomain.com/api/forms/submit/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "email": "alice@example.com"}'`}
        </pre>
      </section>

      <footer className="mt-20 text-center text-gray-400 text-sm">
        Made by <a href="https://github.com/yourname" className="underline">DeadSimpleCompany</a>
      </footer>
    </main>
  );
}
