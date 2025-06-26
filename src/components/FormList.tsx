"use client";

import { useEffect, useState, useRef } from "react";
import createSupabaseBrowserClient from "@/lib/supabase-browser";
import CopyButton from "@/components/CopyButton";
import Link from "next/link";
import { RefreshCcw } from "lucide-react";

export default function FormList({ userId }: { userId: string }) {
    const [forms, setForms] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const lastFetchedAt = useRef<number | null>(null);

    const supabase = createSupabaseBrowserClient();

    const fetchForms = async () => {
        const now = Date.now();

        // Rate limiter: only allow one request every 5 seconds
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
                    <RefreshCcw
                        className={`w-5 h-5 transition-transform ${loading ? "animate-spin" : ""
                            }`}
                    />
                </button>
            </div>

            {forms && forms.length > 0 ? (
                <ul className="space-y-4">
                    {forms.map((form: any) => (
                        <li key={form.id}>
                            <div className="flex items-center justify-between gap-4 border border-gray-200 dark:border-zinc-700 rounded-lg px-4 py-3 bg-white dark:bg-zinc-800">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                                    <span className="text-base font-medium text-black dark:text-white">
                                        {form.name}
                                    </span>
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
