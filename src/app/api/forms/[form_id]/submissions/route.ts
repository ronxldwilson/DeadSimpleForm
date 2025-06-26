// app/api/forms/[form_id]/submissions/route.ts

// This API route handles fetching all submissions for a given form.
// It authenticates the user using Supabase Auth and retrieves all submissions
// from the 'submissions' table that match the provided `form_id`, sorted by `submitted_at` in descending order.
// Only authenticated users are allowed to access this endpoint.

import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { decryptJSON } from '@/lib/crypto' 
import type { NextRequest } from 'next/server'

export async function GET(_: NextRequest, { params }: { params: Promise<{ form_id: string }> }) {
  const supabase = await createSupabaseServerClient()
  const { form_id } = await params

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .eq('form_id', form_id)
    .order('submitted_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // 🔐 Decrypt each submission before returning
  const decrypted = await Promise.all(
    (data || []).map(async (s) => ({
      ...s,
      data: await decryptJSON(s.data),
    }))
  )

  return NextResponse.json(decrypted)
}
