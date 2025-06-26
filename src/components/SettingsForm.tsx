"use client";

import { useState } from "react";

export default function SettingsForm({ user }: { user: any }) {
  const [name, setName] = useState(user?.user_metadata?.name || "");
  const [webhookUrl, setWebhookUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Send update to backend
    console.log("Saving settings...", { name, webhookUrl });

    // TODO: Add success/failure toast or message
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1 font-medium text-sm text-gray-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="webhookUrl"
          className="mb-1 font-medium text-sm text-gray-700"
        >
          Default Webhook URL
        </label>
        <input
          id="webhookUrl"
          type="url"
          placeholder="https://example.com/webhook"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="bg-black text-white rounded-md px-4 py-2 font-semibold hover:bg-gray-900 transition"
      >
        Save Settings
      </button>
    </form>
  );
}
