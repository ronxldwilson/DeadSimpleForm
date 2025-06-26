"use client";

import { useState } from "react";

export default function CreateForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successSlug, setSuccessSlug] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessSlug("");

    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const result = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(result.error || "Failed to create form");
      } else {
        setSuccessSlug(result.form.slug);
        setName("");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Failed to create form");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-md flex flex-col gap-5"
    >
      <h2 className="text-lg font-semibold">Create New Form</h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Form Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto bg-black text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-900 disabled:opacity-50 transition"
      >
        {loading ? "Creating..." : "Create Form"}
      </button>

      {successSlug && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 border border-green-300 dark:border-green-700 text-sm rounded-lg text-green-800 dark:text-green-200">
          ✅ Form created successfully!<br />
          📄 <span className="font-mono">Form ID: {successSlug}</span>
        </div>
      )}
    </form>
  );
}
