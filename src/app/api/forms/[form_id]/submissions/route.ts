// app/api/forms/[form_id]/submissions/route.ts
import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { NextRequest } from 'next/server'

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

  return NextResponse.json(data)
}