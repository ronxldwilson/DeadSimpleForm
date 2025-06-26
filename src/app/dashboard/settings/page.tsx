import React from "react";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import SettingsForm from "@/components/SettingsForm";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default async function SettingsPage() {
    const supabase = await createSupabaseServerClient(); // <- Correct usage
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="bg-white min-h-screen text-black">
            <main className="max-w-3xl mx-auto px-16 py-16">
                <h1 className="text-3xl font-bold mb-6">Settings</h1>
                <Sidebar/>
                <SettingsForm user={session.user} />
            </main>
        </div>
    );
}
