// API route: /api/files/[fileId]/download
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { Octokit } from '@octokit/rest'

export async function GET(
  request: Request,
  { params }: { params: { fileId: string } }
) {
  try {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return new Response('Unauthorized', { status: 401 })
    }

    // Get file info from database
    const { data: fileData, error } = await supabase
      .from('uploaded_files')
      .select('*')
      .eq('id', params.fileId)
      .single()

    if (error || !fileData) {
      return new Response('File not found', { status: 404 })
    }

    // Verify user has access to this file (through form ownership)
    const { data: submission } = await supabase
      .from('submissions')
      .select(`
        *,
        forms!inner(user_id)
      `)
      .eq('id', fileData.submission_id)
      .single()

    if (!submission || submission.forms.user_id !== user.id) {
      return new Response('Forbidden', { status: 403 })
    }

    // Get file from GitHub using your GitHub token
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN // Your GitHub personal access token
    })

    const { data: githubFile } = await octokit.rest.repos.getContent({
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
      path: fileData.github_path,
      headers: {
        'Accept': 'application/vnd.github.raw'
      }
    })

    // Handle the GitHub API response properly
    if (Array.isArray(githubFile) || githubFile.type !== 'file' || !githubFile.content) {
      return new Response('File not found on GitHub', { status: 404 })
    }

    // Return the file with appropriate headers
    const buffer = Buffer.from(githubFile.content, 'base64')
    
    return new Response(buffer, {
      headers: {
        'Content-Type': fileData.mime_type || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileData.filename}"`,
        'Content-Length': buffer.length.toString()
      }
    })

  } catch (error) {
    console.error('File download error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}