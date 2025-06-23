import { createSupabaseServerClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function POST(req: Request, { params }: { params: { form_id: string } }) {
  const { form_id } = params
  const body = await req.json()
  const supabase = createSupabaseServerClient()

  // Allow submission by either UUID or slug
  const { data: form, error } = await supabase
    .from('forms')
    .select('id')
    .or(`id.eq.${form_id},slug.eq.${form_id}`)
    .single()

  if (error || !form) {
    return NextResponse.json({ error: 'Form not found' }, { status: 404 })
  }

  const submission = {
    form_id: form.id,
    data: body,
    ip_address: req.headers.get('x-forwarded-for') || null,
    user_agent: req.headers.get('user-agent') || null,
  }

  const { error: insertError } = await supabase.from('submissions').insert([submission])
  if (insertError) return NextResponse.json({ error: insertError.message }, { status: 400 })

  return NextResponse.json({ success: true })
}
