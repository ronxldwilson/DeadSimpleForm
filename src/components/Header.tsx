"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white backdrop-blur-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg group-hover:scale-105 transition-transform">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              DeadSimpleForm
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/docs" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Documentation
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Pricing
            </Link>
            <Link href="/examples" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Examples
            </Link>
            <Link 
              href="/dashboard" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-black hover:bg-black transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-3">
              <Link href="/docs" className="text-gray-700 hover:text-purple-600 transition-colors font-medium px-2 py-1">
                Documentation
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-purple-600 transition-colors font-medium px-2 py-1">
                Pricing
              </Link>
              <Link href="/examples" className="text-gray-700 hover:text-purple-600 transition-colors font-medium px-2 py-1">
                Examples
              </Link>
              <Link 
                href="/dashboard" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all font-medium text-center mt-2"
              >
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}