'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import createSupabaseBrowserClient from '@/lib/supabase-browser'
// import * XLSX from 'xlsx'

export default function FormDetailPage() {
    const supabase = createSupabaseBrowserClient()
    const params = useParams()
    const router = useRouter()

    const [form, setForm] = useState<any>(null)
    const [submissions, setSubmissions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadData() {
            const {
                data: { user },
                error: userError
            } = await supabase.auth.getUser()

            if (!user || userError) {
                router.push('/login')
                return
            }

            const { data: formData, error: formError } = await supabase
                .from('forms')
                .select('*')
                .eq('slug', params.slug)
                .eq('user_id', user.id)
                .single()

            if (!formData || formError) {
                router.push('/dashboard')
                return
            }

            setForm(formData)

            const { data: submissionData } = await supabase
                .from('submissions')
                .select('*')
                .eq('form_id', formData.id)
                .order('submitted_at', { ascending: false })

            setSubmissions(submissionData || [])
            setLoading(false)
        }

        loadData()
    }, [params.slug])

    function downloadJSON() {
        const blob = new Blob([JSON.stringify(submissions, null, 2)], {
            type: 'application/json'
        })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${form.slug}-submissions.json`
        a.click()
        URL.revokeObjectURL(url)
    }

    function downloadCSV() {
        const flat = submissions.map((s) => ({
            submitted_at: s.submitted_at,
            // ip_address: s.ip_address,
            // user_agent: s.user_agent,
            ...s.data
        }))
        const header = Object.keys(flat[0] || {})
        const rows = flat.map((row) =>
            header.map((field) => `"${(row[field] ?? '').toString().replace(/"/g, '""')}"`).join(',')
        )
        const csv = [header.join(','), ...rows].join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${form.slug}-submissions.csv`
        a.click()
        URL.revokeObjectURL(url)
    }

    // function downloadExcel() {
    //     const flat = submissions.map((s) => ({
    //         submitted_at: s.submitted_at,
    //         // ip_address: s.ip_address,
    //         // user_agent: s.user_agent,
    //         ...s.data
    //     }))
    //     const worksheet = XLSX.utils.json_to_sheet(flat)
    //     const workbook = XLSX.utils.book_new()
    //     XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions')
    //     XLSX.writeFile(workbook, `${form.slug}-submissions.xlsx`)
    // }

    if (loading) {
        return <div className="p-6 text-gray-600">Loading...</div>
    }

    const headers = submissions?.[0]?.data ? Object.keys(submissions[0].data) : []

    return (
        <div className="min-h-screen text-black bg-white px-4 py-6 sm:px-6 md:px-8">
            <div className="max-w-5xl mx-auto space-y-8">
                <header>
                    <h1 className="text-2xl font-bold text-black">{form.name}</h1>
                    <p className="text-gray-600 text-sm">
                        Submissions for <code className="bg-gray-100 px-1 py-0.5 rounded">{form.slug}</code>
                    </p>
                </header>

                <div className="flex gap-3">
                    <button onClick={downloadJSON} className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm font-medium">
                        Download JSON
                    </button>
                    <button onClick={downloadCSV} className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm font-medium">
                        Download CSV
                    </button>
                    {/* <button onClick={downloadExcel} className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm font-medium">
                        Download Excel
                    </button> */}
                </div>

                {submissions.length > 0 ? (
                    <div className="overflow-auto border rounded-lg">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-gray-100 border-b">
                                <tr>
                                    {/* <th className="px-4 py-2">IP Address</th> */}
                                    {/* <th className="px-4 py-2">User Agent</th> */}
                                    {headers.map((key) => (
                                        <th key={key} className="px-4 py-2 capitalize">{key}</th>
                                    ))}
                                    <th className="px-4 py-2">Submitted At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.map((sub) => (
                                    <tr key={sub.id} className="border-b hover:bg-gray-50">
                                        {/* <td className="px-4 py-2">{sub.ip_address}</td> */}
                                        {/* <td className="px-4 py-2 truncate max-w-[200px]">{sub.user_agent}</td> */}
                                        {headers.map((key) => (
                                            <td key={key} className="px-4 py-2 whitespace-pre-wrap break-words">
                                                {String(sub.data[key])}
                                            </td>
                                        ))}
                                        <td className="px-4 py-2">{new Date(sub.submitted_at).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm">No submissions yet.</p>
                )}
            </div>
        </div>
    )
}
