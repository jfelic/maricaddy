'use client'

import { useState, useEffect } from 'react'
import type { CONTRACTORS } from '@/generated/prisma/client'
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table"

const columns: ColumnDef<CONTRACTORS>[] = [
    {
        accessorKey: "contractor_id",
        header: "ID"
    },
    {
        id: "fullName",
        accessorFn: (row) => `${row.first || ""} ${row.last || ""}`.trim(),
        header: () => null,
        cell: ({ getValue }) => getValue(),
        enableHiding: true,
    },
    {
        accessorKey: "first",
        header: "First Name"
    },
    {
        accessorKey: "last",
        header: "Last Name"
    },
    {
        accessorKey: "bus_name",
        header: "Business Name",
        cell: ({ row }) => {
            const value = row.getValue("bus_name") as string | null
            return value || "-"
        }
    },
    {
        accessorKey: "default_rate",
        header: "Daily Rate",
        cell: ({ row }) => {
            const amount = row.getValue("default_rate") as number | null
            return amount ? `$${amount}` : "-"
        }
    },
    {
        accessorKey: "hourly_rate",
        header: "Hourly Rate",
        cell: ({ row }) => {
            const amount = row.getValue("hourly_rate") as number | null
            return amount ? `$${amount}` : "-"
        }
    },
    {
        accessorKey: "city",
        header: "City",
        cell: ({ row }) => {
            const value = row.getValue("city") as string | null
            return value || "-"
        }
    },
    {
        accessorKey: "state",
        header: "State",
        cell: ({ row }) => {
            const value = row.getValue("state") as string | null
            return value || "-"
        }
    },
    {
        accessorKey: "zip",
        header: "Zip",
        cell: ({ row }) => {
            const value = row.getValue("zip") as string | null
            return value || "-"
        }
    }
]

export default function ContractorPage() {
    const [contractors, setContractors] = useState<CONTRACTORS[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Fetch contractors on load
    useEffect(() => {
        async function fetchContractors() {
            try {
                const res = await fetch('/api/contractors')
                if (!res.ok) {
                    throw new Error('Failed to fetch contractors')
                }
                const data = await res.json()
                setContractors(data)
                setLoading(false)
            } catch (err) {
                if (err !== null && typeof err === 'object' && 'message' in err) {
                    setError(err.message as string)
                } else {
                    setError('An unknown error occurred')
                }
                setLoading(false)
            }
        }

        fetchContractors()
    }, [])

    if (loading) return <div className="p-6">Loading...</div>
    if (error) return <div className="p-6">Error: {error}</div>

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Contractors</h1>
            <div className="w-full">
                <DataTable
                    columns={columns}
                    data={contractors}
                    filterColumn="fullName"
                    filterPlaceholder="Search by first or last name..."
                />
            </div>
        </div>
    );
}
