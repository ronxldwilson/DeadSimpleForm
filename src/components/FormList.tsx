"use client";

import { useEffect, useState, useRef } from "react";
import createSupabaseBrowserClient from "@/lib/supabase-browser";
import CopyButton from "@/components/CopyButton";
import Link from "next/link";
import { RefreshCcw, Pencil, Trash2, Save, X } from "lucide-react";

export default function FormList({ userId }: { userId: string }) {
    const [forms, setForms] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingFormId, setEditingFormId] = useState<string | null>(null);
    const [editedName, setEditedName] = useState<string>("");
    const lastFetchedAt = useRef<number | null>(null);

    const supabase = createSupabaseBrowserClient();

    const fetchForms = async () => {
        const now = Date.now();
        if (lastFetchedAt.current && now - lastFetchedAt.current < 5000) {
            console.warn("Too many refreshes. Please wait a moment.");
            return;
        }
        lastFetchedAt.current = now;
        setLoading(true);

        const { data, error } = await supabase
            .from("forms")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (!error) setForms(data || []);
        setLoading(false);
    };

    const handleEdit = (form: any) => {
        setEditingFormId(form.id);
        setEditedName(form.name);
    };

    const handleSave = async (formId: string) => {
        const { error } = await supabase
            .from("forms")
            .update({ name: editedName })
            .eq("id", formId);

        if (!error) {
            setEditingFormId(null);
            fetchForms();
        }
    };

    const handleDelete = async (formId: string) => {
        const confirmed = confirm("Are you sure you want to delete this form and all associated data?");
        if (!confirmed) return;

        // Delete associated entries first (assumes entries table exists)
        await supabase.from("entries").delete().eq("form_id", formId);
        const { error } = await supabase.from("forms").delete().eq("id", formId);

        if (!error) fetchForms();
    };

    useEffect(() => {
        fetchForms();
    }, []);

    return (
        <section className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-6 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">My Forms</h2>
                <button
                    className="text-sm text-blue-500 hover:text-blue-700 disabled:opacity-50"
                    onClick={fetchForms}
                    disabled={loading}
                    title="Refresh"
                >
                    <RefreshCcw className={`w-5 h-5 transition-transform ${loading ? "animate-spin" : ""}`} />
                </button>
            </div>

            {forms && forms.length > 0 ? (
                <ul className="space-y-4">
                    {forms.map((form: any) => (
                        <li key={form.id}>
                            <div className="flex items-center justify-between gap-4 border border-gray-200 dark:border-zinc-700 rounded-lg px-4 py-3 bg-white dark:bg-zinc-800">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 w-full">
                                    {editingFormId === form.id ? (
                                        <input
                                            type="text"
                                            value={editedName}
                                            onChange={(e) => setEditedName(e.target.value)}
                                            className="text-base font-medium text-black dark:text-white bg-transparent border-b border-gray-400 dark:border-gray-600 outline-none"
                                        />
                                    ) : (
                                        <span className="text-base font-medium text-black dark:text-white">
                                            {form.name}
                                        </span>
                                    )}

                                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="hidden sm:inline">/</span>
                                        <Link
                                            href={`/dashboard/forms/${form.slug}`}
                                            className="hover:underline truncate"
                                        >
                                            {form.slug}
                                        </Link>
                                        <CopyButton value={form.slug} />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {editingFormId === form.id ? (
                                        <>
                                            <button
                                                title="Save"
                                                onClick={() => handleSave(form.id)}
                                                className="text-green-600 hover:text-green-800"
                                            >
                                                <Save className="w-5 h-5" />
                                            </button>
                                            <button
                                                title="Cancel"
                                                onClick={() => setEditingFormId(null)}
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            title="Edit Name"
                                            onClick={() => handleEdit(form)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <Pencil className="w-5 h-5" />
                                        </button>
                                    )}

                                    <button
                                        title="Delete Form"
                                        onClick={() => handleDelete(form.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    You haven’t created any forms yet.
                </p>
            )}
        </section>
    );
}
