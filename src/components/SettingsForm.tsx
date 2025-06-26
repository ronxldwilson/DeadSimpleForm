"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import createSupabaseBrowserClient from "@/lib/supabase-browser";

export default function SettingsForm({ user }: { user: any }) {
  const [name, setName] = useState(user?.user_metadata?.name || "");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving settings...", { name, webhookUrl });

    // Optional: update user metadata or webhook default
    await supabase.auth.updateUser({
      data: { name },
    });

    // Optional: persist webhookUrl to a user_settings table
  };

  const handleDeleteAccount = async () => {
    if (confirmText !== "delete account and data") {
      alert("Please type 'delete account and data' to confirm.");
      return;
    }

    const confirmed = window.confirm(
      "Are you absolutely sure you want to delete your account and all data?"
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      // 1. Delete all user's forms and submissions
      const { data: forms, error: formErr } = await supabase
        .from("forms")
        .select("id")
        .eq("user_id", user.id);

      if (formErr) throw formErr;

      const formIds = forms.map((f: any) => f.id);

      if (formIds.length > 0) {
        const { error: deleteSubsErr } = await supabase
          .from("submissions")
          .delete()
          .in("form_id", formIds);
        if (deleteSubsErr) throw deleteSubsErr;

        const { error: deleteFormsErr } = await supabase
          .from("forms")
          .delete()
          .in("id", formIds);
        if (deleteFormsErr) throw deleteFormsErr;
      }

      // 2. Delete the user (must be done from server function or use `admin` API)
      const { error: deleteErr } = await supabase.auth.signOut(); // sign them out before deletion

      // Optional: call a server action to delete user via Admin API if needed

      alert("Your account and all data have been deleted.");
      router.push("/");
    } catch (err: any) {
      console.error(err);
      alert("Something went wrong while deleting your account.");
    } finally {
      setIsDeleting(false);
    }
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

      <hr className="my-8" />

      <div className="space-y-3">
        <p className="text-sm text-red-600 font-medium">
          Danger Zone – Delete Your Account
        </p>
        <p className="text-sm text-gray-600">
          This action is permanent and will delete all your forms, submissions,
          and user account.
        </p>
        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder='Type "delete account and data"'
          className="w-full border border-red-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="button"
          onClick={handleDeleteAccount}
          disabled={isDeleting}
          className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete Account and Data"}
        </button>
      </div>
    </form>
  );
}
