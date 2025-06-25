// app/components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="Home">
          <Image src="/image.png" width={100} height={40} alt="Dead Simple Form Logo" />
        </Link>

        {/* Desktop Nav */}
        <nav className="space-x-6 hidden md:flex">
          <Link href="/features" className="text-gray-700 hover:text-blue-600 transition-colors">
            Features
          </Link>
          <Link href="/docs" className="text-gray-700 hover:text-blue-600 transition-colors">
            Docs
          </Link>
          <Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
            Pricing
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="space-x-4 hidden md:flex">
          <Link
            href="/login"
            className="text-sm px-4 py-2 rounded-md text-white bg-black transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/signup"
            className="text-sm px-4 py-2 rounded-md bg-black text-white hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4">
          <nav className="space-y-2">
            <Link
              href="/features"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/docs"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Docs
            </Link>
            <Link
              href="/pricing"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>
            <hr className="my-2 border-gray-200" />
            <Link
              href="/login"
              className="block text-sm px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Link>
            <Link
              href="/signup"
              className="block text-sm px-4 py-2 rounded-md bg-black text-white hover:bg-blue-700 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Sign Up
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
