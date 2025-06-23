import { createSupabaseServerClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'

interface Props {
  params: { slug: string }
}

export default async function FormDetailPage({ params }: Props) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    notFound()
  }

  // Fetch form by slug and validate ownership
  const { data: form } = await supabase
    .from('forms')
    .select('*')
    .eq('slug', params.slug)
    .eq('user_id', user.id)
    .single()

  if (!form) {
    notFound()
  }

  // Fetch submissions for this form
  const { data: submissions } = await supabase
    .from('submissions')
    .select('*')
    .eq('form_id', form.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-white dark:bg-black px-4 py-6 sm:px-6 md:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <header>
          <h1 className="text-2xl font-bold text-black dark:text-white">
            {form.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Submissions for <code className="bg-gray-100 dark:bg-zinc-800 px-1 py-0.5 rounded">{form.slug}</code>
          </p>
        </header>

        {submissions && submissions.length > 0 ? (
          <ul className="space-y-4">
            {submissions.map((submission: any) => (
              <li
                key={submission.id}
                className="border border-gray-200 dark:border-zinc-800 rounded-lg p-4 bg-gray-50 dark:bg-zinc-900 text-sm"
              >
                <div className="text-xs text-gray-500 mb-2">
                  {new Date(submission.created_at).toLocaleString()}
                </div>
                <pre className="whitespace-pre-wrap break-words text-black dark:text-white">
                  {JSON.stringify(submission.data, null, 2)}
                </pre>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No submissions yet.
          </p>
        )}
      </div>
    </div>
  )
}
