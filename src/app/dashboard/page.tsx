import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import CreateForm from "./CreateForm"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { data: forms } = await supabase
    .from("forms")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-white dark:bg-black px-4 py-6 sm:px-6 md:px-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <header className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
            Welcome, {user.email}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create and manage your forms easily.
          </p>
        </header>

        <CreateForm />

        <section className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-5 border border-gray-200 dark:border-zinc-800 shadow-sm">
          <h2 className="text-lg font-semibold text-black dark:text-white mb-3">
            My Forms
          </h2>
          {forms && forms.length > 0 ? (
            <ul className="space-y-4">
              {forms.map((form: any) => (
                <li key={form.id}>
                  <Link
                    href={`/dashboard/forms/${form.slug}`}
                    className="block transition hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg border border-gray-200 dark:border-zinc-700 px-4 py-3 shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-black dark:text-white">
                        {form.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        /{form.slug}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No forms yet.</p>
          )}
        </section>
      </div>
    </div>
  )
}
