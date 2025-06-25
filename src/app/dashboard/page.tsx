import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import CreateForm from "./CreateForm";
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
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Your Forms</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Easily create and manage your form.
          </p>
        </header>

        <CreateForm />

        <section className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-6 border border-gray-200 dark:border-zinc-800 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">My Forms</h2>
          {forms && forms.length > 0 ? (
            <ul className="space-y-4">
              {forms.map((form: any) => (
                <li key={form.id}>
                  <Link
                    href={`/dashboard/forms/${form.slug}`}
                    className="block transition hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg border border-gray-200 dark:border-zinc-700 px-4 py-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-base font-medium">{form.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        /{form.slug}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You haven’t created any forms yet.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
