// API route: /api/files/download
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { Octokit } from '@octokit/rest'

export async function GET(request: Request) {
  try {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const githubUrl = searchParams.get('url')
    const filename = searchParams.get('name')

    if (!githubUrl || !filename) {
      return new Response('Missing parameters', { status: 400 })
    }

    // Extract GitHub path from the URL
    // URL format: https://github.com/owner/repo/blob/branch/path/to/file
    const urlMatch = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/(.+)/)
    if (!urlMatch) {
      return new Response('Invalid GitHub URL', { status: 400 })
    }

    const [, owner, repo, branch, path] = urlMatch

    // Verify user has access to this file by checking if it's in their submissions
    const { data: submissions } = await supabase
      .from('submissions')
      .select(`
        *,
        forms!inner(user_id)
      `)
      .eq('forms.user_id', user.id)
      .contains('uploaded_files', [{ githubUrl }])

    if (!submissions || submissions.length === 0) {
      return new Response('Forbidden', { status: 403 })
    }

    // Get file from GitHub using your GitHub token
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    })

    const { data: githubFile } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
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
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': buffer.length.toString()
      }
    })

  } catch (error) {
    console.error('File download error:', error)
    return new Response('Internal server error', { status: 500 })
  }
} 