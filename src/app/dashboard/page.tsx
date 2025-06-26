import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import CreateForm from "@/components/CreateForm"
import FormList from "@/components/FormList";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
// import Header from "@/components/Header";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: forms } = await supabase
    .from("forms")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <>
      {/* <Header /> */}
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center px-4 py-10 sm:px-6 md:px-8">
          <header className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight">Your Forms</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Easily create and manage your form.
            </p>
          </header>
          <div className="w-full max-w-2xl flex flex-col gap-10">
            <CreateForm />
            <FormList userId={user.id} />
          </div>
        </main>
      </div>
    </>
  );
}
