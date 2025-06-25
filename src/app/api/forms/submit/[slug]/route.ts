// app/api/forms/submit/[slug]/route.ts

// This API route accepts public form submissions to a specific form identified by its slug.
// It supports both JSON (`application/json`) and URL-encoded (`application/x-www-form-urlencoded`) content types.
// The request body is parsed and saved in the 'submissions' table with a reference to the form's ID.
// If the form has a `webhook_url` configured, the submitted data is also forwarded to that URL via POST request.
// Returns a success response if the submission is stored (and webhook optionally fired), or an error otherwise.

import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const supabase = await createSupabaseServerClient()
  
  let body: Record<string, any> = {}

  const contentType = req.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    body = await req.json()
  } else if (contentType.includes('application/x-www-form-urlencoded')) {
    const formData = await req.formData()
    formData.forEach((value, key) => {
      body[key] = value
    })
  } else {
    return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 })
  }

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

  // Fire webhook (optional)
  if (form.webhook_url) {
    try {
      await fetch(form.webhook_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
    } catch (err) {
      console.warn('Webhook failed:', err)
    }
  }

  return NextResponse.json({ success: true })
}