export const runtime = "nodejs";

import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { encryptJSON } from '@/lib/crypto';
import supabaseAdmin from '@/lib/supabase-admin';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to handle file uploads using Next.js FormData
async function processFormFiles(formData: FormData) {
  const uploadedFiles: { filename: string; githubUrl: string }[] = [];
  
  for (const [key, value] of formData.entries()) {
    if (value instanceof File && value.size > 0) {
      console.log(`[📁] Processing file: ${key} - ${value.name} (${value.size} bytes)`);
      
      try {
        // Convert file directly to base64 without temp file
        const buffer = Buffer.from(await value.arrayBuffer());
        const base64Content = buffer.toString('base64');
        
        // Sanitize filename to avoid path issues
        const sanitizedName = value.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const uniqueName = `${uuidv4()}-${sanitizedName}`;
        
        // Upload directly to GitHub
        const githubUrl = await uploadToGitHubDirect(uniqueName, base64Content);
        console.log(`[🚀] File uploaded to GitHub: ${githubUrl}`);
        
        uploadedFiles.push({ filename: uniqueName, githubUrl });
      } catch (error) {
        console.error(`[❌] Error processing file ${value.name}:`, error);
        // Continue processing other files instead of failing completely
      }
    }
  }
  
  return uploadedFiles;
}

async function uploadToGitHubDirect(filename: string, base64Content: string) {
  const githubUrl = `https://api.github.com/repos/${process.env.GITHUB_REPO_OWNER}/${process.env.GITHUB_REPO_NAME}/contents/uploads/${filename}`;
  const res = await fetch(githubUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Upload ${filename}`,
      content: base64Content,
      branch: process.env.GITHUB_REPO_BRANCH,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GitHub upload failed: ${res.status} - ${errText}`);
  }

  const json = await res.json();
  return json.content.html_url;
}

async function uploadToGitHub(filename: string, filepath: string) {
  const { readFile } = await import('fs/promises');
  const content = await readFile(filepath, { encoding: 'base64' });

  const githubUrl = `https://api.github.com/repos/${process.env.GITHUB_REPO_OWNER}/${process.env.GITHUB_REPO_NAME}/contents/uploads/${filename}`;
  const res = await fetch(githubUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Upload ${filename}`,
      content,
      branch: process.env.GITHUB_REPO_BRANCH,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GitHub upload failed: ${res.status} - ${errText}`);
  }

  const json = await res.json();
  return json.content.html_url;
}

export async function POST(req: Request, context: { params: Promise<{ slug: string }> }) {
  console.log('[📥] Form submission received');

  const { slug } = await context.params;
  const supabase = await createSupabaseServerClient();

  const contentType = req.headers.get('content-type') || '';
  let body: Record<string, any> = {};
  let uploadedFiles: { filename: string; githubUrl: string }[] = [];

  if (contentType.includes('application/json')) {
    body = await req.json();
  } else if (contentType.includes('application/x-www-form-urlencoded')) {
    const formData = await req.formData();
    formData.forEach((value, key) => {
      if (!(value instanceof File)) {
        body[key] = value;
      }
    });
  } else if (contentType.includes('multipart/form-data')) {
    try {
      const formData = await req.formData();
      
      // Extract non-file fields
      formData.forEach((value, key) => {
        if (!(value instanceof File)) {
          body[key] = value;
        }
      });
      
      // Process file uploads
      uploadedFiles = await processFormFiles(formData);
      console.log(`[🧾] Processed ${uploadedFiles.length} files`);
    } catch (error) {
      console.error('[❌] Error processing multipart form:', error);
      return NextResponse.json({ error: 'Failed to process form data' }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 });
  }

  // 🔎 Lookup form
  const { data: form, error: formError } = await supabase
    .from('forms')
    .select('id, name, webhook_url, user_id')
    .eq('slug', slug)
    .single();

  if (formError || !form) {
    return NextResponse.json({ error: 'Form not found' }, { status: 404 });
  }

  // 🔐 Encrypt
  let encryptedData: string;
  try {
    encryptedData = await encryptJSON(body);
  } catch (err) {
    return NextResponse.json({ error: 'Encryption failed' }, { status: 500 });
  }

  // 💾 Store
  const { error: insertError } = await supabase.from('submissions').insert([
    {
      form_id: form.id,
      data: encryptedData,
      uploaded_files: uploadedFiles,
    },
  ]);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 400 });
  }

  // 🔔 Webhook
  if (form.webhook_url) {
    try {
      await fetch(form.webhook_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, uploadedFiles }),
      });
    } catch (err) {
      console.warn('[⚠️] Webhook failed:', err);
    }
  }

  // 📧 Email
  try {
    const { data: userInfo, error: userError } =
      await supabaseAdmin.auth.admin.getUserById(form.user_id);

    if (userError || !userInfo?.user?.email) {
      console.warn('[⚠️] Could not fetch user email:', userError);
    } else {
      const email = userInfo.user.email;
      const { sendSubmissionEmail } = await import('@/lib/email');
      await sendSubmissionEmail({
        to: email,
        formName: form.name,
        submissionData: body,
      });
    }
  } catch (err) {
    console.error('[❌] Email logic failed:', err);
  }

  return NextResponse.json({
    success: true,
    uploadedFiles,
  });
}