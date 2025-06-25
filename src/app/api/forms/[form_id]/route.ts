// app/api/forms/[form_id]/route.ts

// This API route handles form submissions from public users.
// It accepts a JSON payload and attempts to find a matching form using either its UUID or slug.
// If the form exists, the submission is recorded in the 'submissions' table,
// along with metadata such as IP address and user agent.
// No authentication is required to submit a form.

import { createSupabaseServerClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest, { params }: { params: Promise<{ form_id: string }> }) {
  const { form_id } = await params
  const body = await req.json()
  const supabase = await createSupabaseServerClient()
  
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