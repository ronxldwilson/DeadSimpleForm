import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { cookies } from 'next/headers'
import CreateForm from './CreateForm'

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch forms for this user
  const { data: forms, error } = await supabase
    .from('forms')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8 gap-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}!</h1>
      <CreateForm />
      <div className="w-full max-w-xl mt-8">
        <h2 className="text-xl font-semibold mb-2">My Forms</h2>
        {forms && forms.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {forms.map((form: any) => (
              <li key={form.id} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <span className="font-medium">{form.name}</span>
                <span className="text-gray-500 text-sm">/{form.slug}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No forms yet.</p>
        )}
      </div>
    </div>
  )
} 