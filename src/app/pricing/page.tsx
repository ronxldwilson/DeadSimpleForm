// app/pricing/page.tsx
import Header from "@/components/Header";
import Link from "next/link";
export default function PricingPage() {
    return (
        <>
            <Header />
            <div className="text-black bg-white min-h-screen">
                <main className="max-w-6xl mx-auto px-4 py-16">
                    <h1 className="text-4xl font-bold text-center mb-6">Pricing</h1>
                    <p className="text-center text-gray-600 mb-12">
                        Flexible plans designed for developers, startups, and teams of all sizes.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Free Plan */}
                        <div className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                            <h2 className="text-xl font-semibold mb-2">Free</h2>
                            <p className="text-gray-600 mb-4">Basic features for personal or hobby projects.</p>
                            <div className="text-3xl font-bold mb-4">
                                $0<span className="text-base font-normal text-gray-500">/month</span>
                            </div>
                            <ul className="text-sm text-gray-700 space-y-2 mb-6">
                                <li>1 active form</li>
                                <li>50 submissions/month</li>
                                <li>Email notifications</li>
                                <li>Form analytics (basic)</li>
                            </ul>
                            <button className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition">
                                Get Started
                            </button>
                        </div>


                        {/* Pro Plan */}
                        <div className="border border-blue-500 rounded-xl p-6 shadow-md hover:shadow-lg transition bg-blue-50">
                            <h2 className="text-xl font-semibold mb-2">Pro</h2>
                            <p className="text-gray-600 mb-4">Ideal for indie developers and small businesses.</p>
                            <div className="text-3xl font-bold mb-4">
                                $12<span className="text-base font-normal text-gray-500">/month</span>
                            </div>
                            <ul className="text-sm text-gray-700 space-y-2 mb-6">
                                <li>10 active forms</li>
                                <li>Unlimited submissions</li>
                                <li>Email notifications</li>
                                <li>Webhooks</li>
                                <li>Submission export (CSV)</li>
                                <li>Custom branding</li>
                            </ul>
                            <Link href="/checkout?plan=pro">
                                <button className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition">
                                    Start Pro Trial
                                </button>
                            </Link>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                            <h2 className="text-xl font-semibold mb-2">Enterprise</h2>
                            <p className="text-gray-600 mb-4">Advanced capabilities for teams and organizations.</p>
                            <div className="text-3xl font-bold mb-4">Custom</div>
                            <ul className="text-sm text-gray-700 space-y-2 mb-6">
                                <li>Unlimited forms</li>
                                <li>Unlimited submissions</li>
                                <li>Priority support</li>
                                <li>Audit logs and role-based access</li>
                                <li>Dedicated infrastructure</li>
                                <li>SLA & custom contracts</li>
                            </ul>
                            <button className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
