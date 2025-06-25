// app/api/form-detail/[id]/route.ts  

// This API route retrieves detailed information about a single form owned by the authenticated user.
// It verifies the user's identity using Supabase Auth, then queries the 'forms' table
// for a form matching the provided `id` and belonging to the current user.
// Returns the form data if found, otherwise returns an error.


import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const supabase = await createSupabaseServerClient()
  
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser()
  
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const { id: formId } = await context.params
  
  const { data, error } = await supabase
    .from('forms')
    .select('*')
    .eq('id', formId)
    .eq('user_id', user.id)
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
  
  return NextResponse.json(data)
}