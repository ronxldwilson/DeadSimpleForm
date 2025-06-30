import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import type { NextRequest } from 'next/server'
import { encryptJSON } from '@/lib/crypto'
import supabaseAdmin from '@/lib/supabase-admin'

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  console.log("[📥] Form submission received")

  const { slug } = await context.params
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

  // 🔎 Lookup form
  const { data: form, error: formError } = await supabase
    .from('forms')
    .select('id, name, webhook_url, user_id')
    .eq('slug', slug)
    .single()

  if (formError || !form) {
    return NextResponse.json({ error: 'Form not found' }, { status: 404 })
  }

  // 🔐 Encrypt
  let encryptedData: string
  try {
    encryptedData = await encryptJSON(body)
  } catch (err) {
    return NextResponse.json({ error: 'Encryption failed' }, { status: 500 })
  }

  // 💾 Store
  const { error: insertError } = await supabase
    .from('submissions')
    .insert([{ form_id: form.id, data: encryptedData }])

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 400 })
  }

  // 🔔 Webhook
  if (form.webhook_url) {
    try {
      await fetch(form.webhook_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } catch (err) {
      console.warn('[⚠️] Webhook failed:', err)
    }
  }

  // 📧 Email
  try {
    console.log(`[📧] Fetching user email with service role: ${form.user_id}`)
    const { data: userInfo, error: userError } = await supabaseAdmin.auth.admin.getUserById(form.user_id)

    if (userError || !userInfo?.user?.email) {
      console.warn('[⚠️] Could not fetch user email:', userError)
    } else {
      const email = userInfo.user.email
      console.log(`[📬] Sending email to ${email}`)
      const { sendSubmissionEmail } = await import('@/lib/email')
      await sendSubmissionEmail({
        to: email,
        formName: form.name,
        submissionData: body,
      })
      console.log("[✅] Email sent")
    }
  } catch (err) {
    console.error("[❌] Email logic failed:", err)
  }


  return NextResponse.json({ success: true })
}
