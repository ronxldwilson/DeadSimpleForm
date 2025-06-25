// app/docs/page.tsx

import Header from "@/components/Header";

export default function DocsPage() {
    return (
        <>
            <Header />
            <div className="bg-white text-black">

                <main className="max-w-4xl mx-auto px-4 py-12 ">
                    <h1 className="text-3xl font-bold mb-4">Dead Simple Form Documentation</h1>
                    <p className="text-gray-700 mb-8">
                        This guide explains how to use Dead Simple Form to collect submissions from public HTML forms, manage them securely, and access them using our backend powered by Supabase.
                    </p>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-2">1. Creating a Form</h2>
                        <p className="text-gray-700 mb-2">
                            To create a new form, send a <code className="bg-gray-100 px-1">POST</code> request to:
                        </p>
                        <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                            POST /api/forms
                        </pre>
                        <p className="text-gray-700 mb-2">Body:</p>
                        <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                            {`{
  "name": "Contact Form",
  "webhook_url": "https://example.com/webhook" // optional
}`}
                        </pre>
                        <p className="text-gray-700">
                            This will return a form object with a unique slug, which can be used in public HTML forms.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-2">2. Submitting a Form (Public HTML)</h2>
                        <p className="text-gray-700 mb-2">You can embed a form in any HTML page like this:</p>
                        <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                            {`<form action="https://deadsimpleform.com/api/forms/submit/[slug]" method="POST">
  <label for="email">Email</label>
  <input type="email" name="email" id="email" required />
  
  <label for="message">Message</label>
  <textarea name="message" id="message" required></textarea>

  <button type="submit">Send</button>
</form>`}
                        </pre>
                        <p className="text-gray-700 mt-2">
                            Replace <code>[slug]</code> with the slug of your form.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-2">3. Viewing Submissions</h2>
                        <p className="text-gray-700 mb-2">
                            To fetch all submissions for a form (server-side), make an authenticated request to:
                        </p>
                        <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                            GET /api/forms/[form_id]/submissions
                        </pre>
                        <p className="text-gray-700">
                            The response includes all submissions associated with the form, ordered by most recent.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-2">4. Webhook Integration</h2>
                        <p className="text-gray-700 mb-2">
                            If you provided a <code>webhook_url</code> when creating the form, every successful submission will trigger a POST request to that URL.
                        </p>
                        <p className="text-gray-700">
                            The webhook will receive the raw submission body as JSON. You can use this to trigger automations in tools like Zapier, Slack, Notion, or your backend.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-2">5. Security & Access</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>Creating/viewing forms and submissions requires user authentication via Supabase Auth.</li>
                            <li>Public form submissions do not require authentication (open by design).</li>
                            <li>Each form is owned by a user; submissions are stored with form ID and metadata (IP, user agent).</li>
                            <li>Spam prevention methods like honeypot fields or rate limiting can be added later.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-2">6. API Summary</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li><code>POST /api/forms</code> – Create a new form (auth required)</li>
                            <li><code>GET /api/forms</code> – List all forms (auth required)</li>
                            <li><code>POST /api/forms/submit/[slug]</code> – Submit to form publicly</li>
                            <li><code>GET /api/forms/[form_id]/submissions</code> – View submissions (auth required)</li>
                            <li><code>GET /api/form-detail/[id]</code> – Get form detail (auth required)</li>
                        </ul>
                    </section>
                </main >
            </div>
        </>
    );
}
