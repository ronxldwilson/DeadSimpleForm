// app/components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm text-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
          <Image src="/image.png" width={100} height={50} alt="Logo" />
        

        {/* Nav */}
        <nav className="space-x-6 hidden md:flex">
          <Link href="/#features" className=" hover:text-black">
            Features
          </Link>
          <Link href="/docs" className=" hover:text-black">
            Docs
          </Link>
          <Link href="/pricing" className=" hover:text-black">
            Pricing
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="space-x-4 hidden md:flex">
          <Link
            href="/login"
            className="text-sm px-4 py-2  hover:text-black"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="text-sm px-4 py-2 rounded-md bg-black text-white hover:bg-zinc-800"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile menu (optional for now) */}
      </div>
    </header>
  );
}
