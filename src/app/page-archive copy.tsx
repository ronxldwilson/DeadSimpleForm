
import Link from 'next/link';
import Header from '@/components/Header';

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-black p-6 md:p-12">
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Dead Simple Form Backend
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Submit forms without writing any backend code. Just drop in an action URL.
          </p>
          <Link
            href="/dashboard"
            className="bg-black text-white px-6 py-3 rounded-xl text-lg hover:bg-gray-900 transition"
          >
            Get Started
          </Link>
        </section>

        {/* How It Works */}
        <section className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <ol className="space-y-4 text-gray-800 list-decimal list-inside">
            <li>
              <strong>Create a form</strong> – Log in and create a new form slug.
            </li>
            <li>
              <strong>Copy your endpoint</strong> – e.g. <code className="bg-gray-100 px-2 py-1 rounded">https://dead-simple-form.vercel.app/api/forms/submit/contact-form</code>
            </li>
            <li>
              <strong>Paste in your HTML</strong> – Add it directly to your site:
              <pre className="bg-gray-100 p-4 mt-2 rounded text-sm overflow-auto">
                {`<form action="https://dead-simple-form.vercel.app/api/forms/submit/contact-form" method="POST">
  <input name="email" type="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>`}
              </pre>
            </li>
          </ol>
        </section>

        {/* Live Demo */}
        <section className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-semibold mb-4">Try It Now</h2>
          <form
            action="/api/forms/submit/public-form-test"
            method="POST"
            className="space-y-4"
          >
            <input
              name="email"
              type="email"
              required
              placeholder="Your email"
              className="w-full p-3 border rounded-md"
            />
            <textarea
              name="message"
              required
              placeholder="Your message"
              className="w-full p-3 border rounded-md"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900"
            >
              Send Message
            </button>
          </form>
        </section>

        {/* Features */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">Why Use DeadSimpleForm?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-xl">
              <h3 className="font-bold">No Backend Required</h3>
              <p className="text-gray-700">Just use our endpoint and we’ll handle the storage.</p>
            </div>
            <div className="p-4 border rounded-xl">
              <h3 className="font-bold">Works with Any HTML</h3>
              <p className="text-gray-700">Fully frontend-compatible. Just drop and go.</p>
            </div>
            <div className="p-4 border rounded-xl">
              <h3 className="font-bold">Webhook Support</h3>
              <p className="text-gray-700">(Coming soon) Automatically send submissions to your app.</p>
            </div>
            <div className="p-4 border rounded-xl">
              <h3 className="font-bold">Simple JSON Dashboard</h3>
              <p className="text-gray-700">View and export your submissions at any time.</p>
            </div>
          </div>
        </section>

        {/* Docs Link */}
        <section className="text-center">
          <p className="text-gray-600">Looking for more advanced usage?</p>
          <Link
            href="/docs"
            className="text-blue-600 hover:underline"
          >
            Read the full API documentation →
          </Link>
        </section>
      </main>
    </>
  );
}
