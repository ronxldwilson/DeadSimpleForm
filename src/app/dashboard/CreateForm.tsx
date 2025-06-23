"use client"
import { useState } from "react"

export default function CreateForm() {
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug, webhook_url: "" })
      })
      const result = await res.json()
      setLoading(false)
      if (!res.ok) {
        setError(result.error || "Failed to create form")
      } else {
        setName("")
        setSlug("")
        window.location.reload()
      }
    } catch (err: any) {
      setLoading(false)
      setError(err.message || "Failed to create form")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-4 flex flex-col gap-4 shadow">
      <h2 className="text-lg font-semibold">Create New Form</h2>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-medium">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="slug" className="font-medium">Slug</label>
        <input
          id="slug"
          type="text"
          value={slug}
          onChange={e => setSlug(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <span className="text-xs text-gray-500">URL: /api/forms/&lt;slug&gt;</span>
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        className="bg-black text-white rounded px-4 py-2 font-semibold disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Form"}
      </button>
    </form>
  )
} 