// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white text-gray-800">
      <div className="text-6xl mb-2">🚫</div>
      <h1 className="text-4xl font-bold mb-2">404 – Not Found</h1>
      <p className="text-gray-500 mb-6 max-w-md">
        This page doesn’t exist. It might have been deleted, moved, or never created.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-900 transition"
        >
          Go to Homepage
        </Link>
        <Link
          href="/dashboard"
          className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
        >
          Open Dashboard
        </Link>
      </div>
    </main>
  )
}
