// app/api/forms/route.ts

// This API route handles form creation and retrieval for authenticated users.
//
// POST: Creates a new form with a unique slug (`form_<random_id>`), associating it with the logged-in user.
//        Accepts `name` (required) and optional `webhook_url` in the request body.
//        Ensures the generated slug is unique by checking against existing slugs in the database.
//        Returns the newly created form or an error if creation fails.
//
// GET: Fetches all forms belonging to the authenticated user, ordered by creation time (newest first).
//      Returns the list of forms or an error if the query fails.


import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { nanoid } from "nanoid";

// POST: Create a new form with unique slug
export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();

  // Get user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse request body
  const { name, webhook_url = "" } = await req.json();
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  // Generate a unique slug
  let slug = `form_${nanoid(8)}`;
  let isUnique = false;

  while (!isUnique) {
    const { data } = await supabase.from("forms").select("id").eq("slug", slug).single();
    if (!data) {
      isUnique = true;
    } else {
      slug = `form_${nanoid(8)}`;
    }
  }

  // Insert form
  const { data: form, error } = await supabase
    .from("forms")
    .insert([{ name, slug, webhook_url, user_id: user.id }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ form }, { status: 200 });
}

// GET: Return all forms for the logged-in user
export async function GET(req: NextRequest) {
  const supabase = await createSupabaseServerClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("forms")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}
