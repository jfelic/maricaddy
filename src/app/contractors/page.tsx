'use client'

import { useState, useEffect } from 'react'
import type { CONTRACTORS } from '@/generated/prisma/client'

export default function ContractorPage() {
    const [contractors, setContractors] = useState<CONTRACTORS[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Fetch contractors on load
    useEffect(() => {
        fetch('/api/contractors')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch contractors')
                return res.json()
            })
            .then(data => {
                setContractors(data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    if (loading) return <div className="p-6">Loading...</div>
    if (error) return <div className="p-6">Error: {error}</div>

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Contractors</h1>
            <ul className="space-y-2">
                {contractors.map((contractor) => (
                    <li key={contractor.contractor_id} className="p-2 border rounded">
                        {contractor.first} {contractor.last}
                    </li>
                ))}
            </ul>
        </div>
    );
}
