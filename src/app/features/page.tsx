// app/features/page.tsx
import Header from "@/components/Header";

export default function FeaturesPage() {
    return (
        <>
            <Header />
            <div className="bg-white text-black">
                <main className="max-w-3xl mx-auto px-4 py-12">
                    <h1 className="text-3xl font-bold mb-6">Features</h1>
                    <p className="text-gray-700 mb-8">
                        Dead Simple Form is the easiest way to collect submissions from static HTML forms without building a backend.
                        Below are the core features that make it powerful yet dead simple.
                    </p>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-xl font-semibold mb-2">🔗 Public Form Endpoints</h2>
                            <p className="text-gray-700">
                                Every form you create gets a unique endpoint (via slug) that accepts direct POST submissions from any HTML page.
                                No JavaScript or authentication required for the submitter.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-2">📥 Submission Storage</h2>
                            <p className="text-gray-700">
                                Submissions are stored securely in your Supabase database and can be accessed via the dashboard or API.
                                Includes metadata like IP address and user agent.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-2">📡 Webhooks</h2>
                            <p className="text-gray-700">
                                Configure a webhook URL when creating a form and Dead Simple Form will automatically forward submission data
                                to your backend or automation tool (e.g., Zapier, Make, Notion).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-2">🔐 Authenticated Dashboard</h2>
                            <p className="text-gray-700">
                                Log in to view, manage, and export form submissions. Access is protected via Supabase Auth and tied to your user ID.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-2">⚡ Fast and Serverless</h2>
                            <p className="text-gray-700">
                                Built with Next.js App Router and Supabase, this platform is fast, scalable, and can be deployed on Vercel in minutes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-2">📄 REST API Access</h2>
                            <p className="text-gray-700">
                                All form and submission data can be accessed programmatically through clean and authenticated REST API endpoints.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-2">💡 Designed for Developers</h2>
                            <p className="text-gray-700">
                                Dead Simple Form is ideal for developers building quick static sites, portfolios, landing pages, or no-JS tools.
                            </p>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
}
