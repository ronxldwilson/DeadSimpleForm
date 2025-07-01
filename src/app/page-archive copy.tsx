"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FeatureCard from '@/components/FeatureCard';
import {
  Code2,
  Zap,
  Shield,
  Webhook,
  BarChart3,
  Globe,
  CheckCircle,
  ArrowRight,
  Copy,
  ExternalLink,
  Laptop,
  Smartphone,
  Monitor,
  Users,
  Building,
  Briefcase
} from 'lucide-react';

export default function LandingPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const codeExample = `<form action="https://deadsimpleform.com/api/forms/submit/contact-form" method="POST">
  <input name="email" type="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDemoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <>
      <Header />
      <main className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />

        {/* Hero Section */}
        <section className="relative pt-20 px-6 md:px-12 py-16">
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-fade-in-up">
              {/* <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full text-sm font-medium text-purple-700 mb-8">
                <Zap className="h-4 w-4 mr-2" />
                Zero backend setup required
              </div> */}

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Dead Simple Form
                </span>
                <br />
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
                Create forms without the headache of a backend.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Link
                  href="/dashboard"
                  className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 flex items-center"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/docs"
                  className="group bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-2xl text-lg font-semibold border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 flex items-center"
                >
                  View Documentation
                  {/* <ExternalLink className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" /> */}
                </Link>
              </div>

              {/* Trusted By Developers */}
              <div className="max-w-4xl mx-auto mb-4 mt-16">
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                  Designed for developers who ship
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="group bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl group-hover:from-purple-200 group-hover:to-blue-200 transition-all">
                        <Laptop className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-center">Portfolio Sites</h3>
                    <p className="text-sm text-gray-600 text-center mt-1">Contact forms for personal websites</p>
                  </div>

                  <div className="group bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl group-hover:from-purple-200 group-hover:to-blue-200 transition-all">
                        <Building className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-center">Landing Pages</h3>
                    <p className="text-sm text-gray-600 text-center mt-1">Lead capture for marketing campaigns</p>
                  </div>

                  <div className="group bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl group-hover:from-purple-200 group-hover:to-blue-200 transition-all">
                        <Smartphone className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-center">Mobile Apps</h3>
                    <p className="text-sm text-gray-600 text-center mt-1">Feedback forms for app users</p>
                  </div>

                  <div className="group bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl group-hover:from-purple-200 group-hover:to-blue-200 transition-all">
                        <Monitor className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-center">SaaS Products</h3>
                    <p className="text-sm text-gray-600 text-center mt-1">Support and feature requests</p>
                  </div>

                  <div className="group bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl group-hover:from-purple-200 group-hover:to-blue-200 transition-all">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-center">Event Sites</h3>
                    <p className="text-sm text-gray-600 text-center mt-1">Registration and RSVP forms</p>
                  </div>

                  <div className="group bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl group-hover:from-purple-200 group-hover:to-blue-200 transition-all">
                        <Briefcase className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-center">Business Sites</h3>
                    <p className="text-sm text-gray-600 text-center mt-1">Client inquiries and quotes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="relative px-6 md:px-12 ">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Three simple steps to get your forms up and running in minutes
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  step: "01",
                  title: "Create Your Form",
                  description: "Sign up and create a new form endpoint with a custom slug name."
                },
                {
                  step: "02",
                  title: "Copy Your Endpoint",
                  description: "Get your unique form submission URL and paste it into your HTML form action."
                },
                {
                  step: "03",
                  title: "Start Collecting",
                  description: "Your form is live! View submissions in your dashboard or via webhooks."
                }
              ].map((item, index) => (
                <div key={index} className="relative group">
                  <div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                    <div className="text-6xl font-bold text-purple-600 mb-4 group-hover:text-purple-500 transition-colors">
                      {item.step}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="h-8 w-8 text-purple-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Code Example */}
            <div className="bg-gray-900 rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-gray-400 text-sm ml-4">index.html</span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-sm transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-gray-300 text-sm md:text-base overflow-x-auto">
                <code>{codeExample}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Live Demo */}
        <section className="relative py-24 px-6 md:px-12 bg-gradient-to-br from-purple-50/50 to-blue-50/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Try It Live
              </h2>
              <p className="text-xl text-gray-600">
                Test our form backend with this working demo
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-xl">
              <form onSubmit={handleDemoSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us what you think about DeadSimpleForm..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all bg-white/50 backdrop-blur-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl hover:shadow-purple-500/25 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {formStatus === 'submitting' ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Sending...
                    </div>
                  ) : formStatus === 'success' ? (
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Message Sent!
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>

              {formStatus === 'success' && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">
                      Success! Your message has been received and stored securely.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="relative py-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Why Choose DeadSimpleForm?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built for developers who want to focus on the frontend without the backend complexity
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={Code2}
                title="No Backend Required"
                description="Skip the server setup entirely. Just use our endpoint and we'll handle all the storage and processing for you."
                delay={0}
              />
              <FeatureCard
                icon={Globe}
                title="Works with Any HTML"
                description="Drop our endpoint into any HTML form. Compatible with React, Vue, vanilla HTML, and any frontend framework."
                delay={100}
              />
              <FeatureCard
                icon={Webhook}
                title="Webhook Integration"
                description="Automatically forward submissions to your apps via webhooks. Perfect for triggering email notifications or custom workflows."
                delay={200}
              />
              <FeatureCard
                icon={BarChart3}
                title="Beautiful Dashboard"
                description="View, filter, and export your submissions with our intuitive dashboard. Export to CSV or JSON with one click."
                delay={300}
              />
              <FeatureCard
                icon={Shield}
                title="Secure & Reliable"
                description="Enterprise-grade security with spam protection, rate limiting, and 99.9% uptime guarantee for your peace of mind."
                delay={400}
              />
              <FeatureCard
                icon={Zap}
                title="Lightning Fast"
                description="Sub-100ms response times globally with our edge network. Your forms will never slow down your site."
                delay={500}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 px-6 md:px-12 bg-gradient-to-br from-purple-600 to-blue-600">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Simplify Your Forms?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of developers who have already simplified their form handling with DeadSimpleForm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="bg-white text-purple-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl hover:shadow-white/10 hover:scale-105 transition-all duration-300"
              >
                Start Building Now
              </Link>
              <Link
                href="/docs"
                className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Read Documentation
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-12 px-6 md:px-12 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
                  <Zap className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold">DeadSimpleForm</span>
              </div>
              <div className="flex space-x-6 text-gray-400">
                <Link href="/docs" className="hover:text-white transition-colors">
                  Documentation
                </Link>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
                <Link href="/support" className="hover:text-white transition-colors">
                  Support
                </Link>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>&copy; 2025 DeadSimpleForm. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}