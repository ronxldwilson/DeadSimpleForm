'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import createSupabaseBrowserClient from '@/lib/supabase-browser'
import Sidebar from '@/components/Sidebar'
// import * XLSX from 'xlsx'

export default function FormDetailPage() {
    const supabase = createSupabaseBrowserClient()
    const params = useParams()
    const router = useRouter()

    const [form, setForm] = useState<any>(null)
    const [submissions, setSubmissions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const PAGE_SIZE = 10;

    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    function toggleSelected(id: string) {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }

    async function deleteSelected() {
        if (
            selectedIds.length &&
            confirm(`Delete ${selectedIds.length} submission(s)?`)
        ) {
            const { error } = await supabase.from("submissions").delete().in("id", selectedIds);
            if (!error) {
                setSubmissions((prev) => prev.filter((s) => !selectedIds.includes(s.id)));
                setSelectedIds([]);
            }
        }
    }

    const loadData = useCallback(async (reset = false) => {
        setLoading(true);

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (!user || userError) {
            router.push("/login");
            return;
        }

        // Only fetch form data if we don't have it yet
        if (!form) {
            const { data: formData, error: formError } = await supabase
                .from("forms")
                .select("*")
                .eq("slug", params.slug)
                .eq("user_id", user.id)
                .single();

            if (!formData || formError) {
                router.push("/dashboard");
                return;
            }

            setForm(formData);
        }

        const formId = form?.id;
        if (!formId) {
            setLoading(false);
            return;
        }

        const currentPage = reset ? 0 : page;

        try {
            const res = await fetch(`/api/forms/${formId}/submissions`);
            if (!res.ok) throw new Error('Failed to fetch decrypted submissions');
            const decrypted = await res.json();

            // client-side search
            const filtered = searchTerm.trim()
                ? decrypted.filter((s: any) =>
                    JSON.stringify(s.data).toLowerCase().includes(searchTerm.toLowerCase())
                )
                : decrypted;

            if (reset) {
                setSubmissions(filtered);
                setPage(0);
            } else {
                setSubmissions((prev) => [...prev, ...filtered]);
            }

            setHasMore(filtered.length === PAGE_SIZE);
        } catch (err) {
            console.error('Submissions load error:', err);
        } finally {
            setLoading(false);
        }
    }, [supabase, router, params.slug, form, page, searchTerm, PAGE_SIZE]);

    // Initial load
    useEffect(() => {
        if (params.slug) {
            loadData(true);
        }
    }, [params.slug]);

    // Reload when sort order or search term changes
    useEffect(() => {
        if (form) {
            loadData(true);
        }
    }, [sortOrder, searchTerm, form]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPage(0);
        setHasMore(true);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(e.target.value as "asc" | "desc");
        setPage(0);
        setHasMore(true);
    };

    const loadMore = () => {
        setPage((p) => p + 1);
        setTimeout(() => loadData(false), 0);
    };

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
        if (submissions.length === 0) return;

        const flat = submissions.map((s) => ({
            submitted_at: s.submitted_at,
            // ip_address: s.ip_address,
            // user_agent: s.user_agent,
            ...s.data,
            // Include file URLs in CSV
            uploaded_files: s.uploaded_files ? 
                s.uploaded_files.map((f: any) => f.githubUrl).join('; ') : ''
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

    // Component to render uploaded files
    function FilesList({ files }: { files: any[] | null }) {
        if (!files || files.length === 0) {
            return <span className="text-gray-400 text-xs">No files</span>;
        }

        return (
            <div className="space-y-1">
                {files.map((file, index) => {
                    // Extract original filename from the stored filename
                    const originalFilename = file.filename.replace(/^[a-f0-9-]+-/, '');
                    
                    return (
                        <div key={index} className="flex items-center gap-2">
                            <a
                                href={file.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline text-xs truncate max-w-[150px]"
                                title={originalFilename}
                            >
                                {originalFilename}
                            </a>
                            <button
                                onClick={() => {
                                    // Copy URL to clipboard
                                    navigator.clipboard.writeText(file.githubUrl);
                                    // You could show a toast notification here
                                }}
                                className="text-gray-400 hover:text-gray-600 text-xs"
                                title="Copy URL"
                            >
                                📋
                            </button>
                        </div>
                    );
                })}
            </div>
        );
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

    if (loading && !form) {
        return <div className="p-6 text-gray-600">Loading...</div>
    }

    if (!form) {
        return <div className="p-6 text-gray-600">Form not found.</div>
    }

    const headers = submissions?.[0]?.data ? Object.keys(submissions[0].data) : []
    const hasFiles = submissions.some(s => s.uploaded_files && s.uploaded_files.length > 0)

    return (
        <div className="min-h-screen text-black bg-white px-4 py-20 sm:px-6 md:px-8">
            <Sidebar />
            <div className="max-w-7xl mx-auto space-y-8">
                <header>
                    <h1 className="text-2xl font-bold text-black">{form.name}</h1>
                    <p className="text-gray-600 text-sm">
                        Submissions for <code className="bg-gray-100 px-1 py-0.5 rounded">{form.slug}</code>
                    </p>
                </header>

                <div className="flex gap-3">
                    <button
                        onClick={downloadJSON}
                        className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm font-medium"
                        disabled={submissions.length === 0}
                    >
                        Download JSON
                    </button>
                    <button
                        onClick={downloadCSV}
                        className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm font-medium"
                        disabled={submissions.length === 0}
                    >
                        Download CSV
                    </button>
                    {/* <button onClick={downloadExcel} className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm font-medium">
                        Download Excel
                    </button> */}
                </div>

                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search submissions..."
                        className="border px-2 py-1 rounded text-sm"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />

                    <select
                        value={sortOrder}
                        onChange={handleSortChange}
                        className="border px-2 py-1 rounded text-sm"
                    >
                        <option value="desc">Newest First</option>
                        <option value="asc">Oldest First</option>
                    </select>

                    {selectedIds.length > 0 && (
                        <button
                            onClick={deleteSelected}
                            className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
                        >
                            Delete Selected ({selectedIds.length})
                        </button>
                    )}
                </div>

                {submissions.length > 0 ? (
                    <div className="overflow-auto border rounded-lg">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-gray-100 border-b">
                                <tr>
                                    <th className="px-4 py-2">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedIds(submissions.map((s) => s.id));
                                                } else {
                                                    setSelectedIds([]);
                                                }
                                            }}
                                            checked={selectedIds.length === submissions.length && submissions.length > 0}
                                        />
                                    </th>

                                    {/* <th className="px-4 py-2">IP Address</th> */}
                                    {/* <th className="px-4 py-2">User Agent</th> */}
                                    {headers.map((key) => (
                                        <th key={key} className="px-4 py-2 capitalize">{key}</th>
                                    ))}
                                    {hasFiles && (
                                        <th className="px-4 py-2">Uploaded Files</th>
                                    )}
                                    <th className="px-4 py-2">Submitted At</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.map((sub) => (
                                    <tr key={sub.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(sub.id)}
                                                onChange={() => toggleSelected(sub.id)}
                                            />
                                        </td>

                                        {/* <td className="px-4 py-2">{sub.ip_address}</td> */}
                                        {/* <td className="px-4 py-2 truncate max-w-[200px]">{sub.user_agent}</td> */}
                                        {headers.map((key) => (
                                            <td key={key} className="px-4 py-2 whitespace-pre-wrap break-words">
                                                {String(sub.data[key] || '')}
                                            </td>
                                        ))}
                                        {hasFiles && (
                                            <td className="px-4 py-2">
                                                <FilesList files={sub.uploaded_files} />
                                            </td>
                                        )}
                                        <td className="px-4 py-2">{new Date(sub.submitted_at).toLocaleString()}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={async () => {
                                                    if (!confirm("Delete this submission?")) return;
                                                    const { error } = await supabase.from("submissions").delete().eq("id", sub.id);
                                                    if (!error) {
                                                        setSubmissions((prev) => prev.filter((s) => s.id !== sub.id));
                                                    }
                                                }}
                                                className="text-red-600 text-xs hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {hasMore && (
                            <div className="text-center mt-4 p-4">
                                <button
                                    onClick={loadMore}
                                    className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                                    disabled={loading}
                                >
                                    {loading ? 'Loading...' : 'Load More'}
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500 text-sm">
                            {loading ? 'Loading submissions...' : 'No submissions yet.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}