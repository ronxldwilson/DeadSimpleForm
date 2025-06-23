import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params
  const body = await req.json()

  const supabase = createSupabaseServerClient()

  // Look up the form by slug
  const { data: form, error: formError } = await supabase
    .from('forms')
    .select('id, webhook_url')
    .eq('slug', slug)
    .single()

  if (formError || !form) {
    return NextResponse.json({ error: 'Form not found' }, { status: 404 })
  }

  // Insert submission into DB
  const { error: insertError } = await supabase
    .from('submissions')
    .insert([{ form_id: form.id, data: body }])

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 400 })
  }

  // (Optional) Fire webhook if set
  if (form.webhook_url) {
    try {
      await fetch(form.webhook_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
    } catch (err) {
      console.warn('Webhook failed:', err)
      // you can queue a retry later if needed
    }
  }

  return NextResponse.json({ success: true })
}
