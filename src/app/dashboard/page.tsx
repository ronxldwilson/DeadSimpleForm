import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import CreateForm from "./CreateForm";
import FormList from "./FormList";
import Link from "next/link";


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
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-4 py-10 sm:px-6 md:px-8">
      <div className="max-w-lg mx-auto flex flex-col gap-10">
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Your Forms</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Easily create and manage your form.
          </p>
        </header>

        <CreateForm />
        <FormList userId={user.id}/>

      </div>
    </div>
  );
}
