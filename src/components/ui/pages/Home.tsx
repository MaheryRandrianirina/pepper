"use client"

import { useEffect, useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Newsletter } from "@/types/newsletter"
import { LoadingSpinner } from "../atoms/Spinner"


export const columns: ColumnDef<Newsletter>[] = [
    {
        accessorKey: "title",
        header: "Titre",
        cell: ({ row }) => <div className="capitalize">{row.getValue("title")}</div>,
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <div className="capitalize">{row.getValue("type")}</div>,
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Auteur
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "published_date",
        header: "Date de publication",
        cell: ({ row }) => {
            const date = new Date(row.getValue("published_date"))
            const formattedDate = date.toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
            return <div>{formattedDate}</div>
        },
    }
]

export function Home() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [newsletters, setNewsletters] = useState<Newsletter[]>([])

  const table = useReactTable({
    data: newsletters,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  useEffect(()=>{
    // fetch newsletters data
    fetch("https://mocki.io/v1/134d4787-15e1-4c36-8126-d6f491b10ea6").then(response => response.json())
      .then(jsonRes => setNewsletters(jsonRes))
      .catch(err => console.error('Error fetching books:', err))
  }, [])

  const isLoading = newsletters.length === 0
  if(isLoading){
    return <div className="flex items-center justify-center h-screen">
      <LoadingSpinner/>
    </div>
  }
  
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto text-blue-500">
              Types <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filtrer par Type</DropdownMenuLabel>
            {Array.from(new Set(newsletters.map((newsletter) => newsletter.type))).map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                className="capitalize"
                checked={columnFilters.some(
                  (filter) => filter.id === "type" && filter.value === type
                )}
                onCheckedChange={(value) => {
                  setColumnFilters((prev) => {
                    if (value) {
                      return [{ id: "type", value: type }]
                    } else {
                      return prev.filter(
                        (filter) => !(filter.id === "type" && filter.value === type)
                      )
                    }
                  })
                }}
              >
                {type}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        {
            <Table>
            <TableHeader className="bg-gray-100 text-gray-700">
                {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                    return (
                        <TableHead key={header.id} className="w-[150px] font-bold">
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </TableHead>
                    )
                    })}
                </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                         className="hover:bg-gray-50"
                        >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                            )}
                            </TableCell>
                        ))}
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                        >
                        aucun resultats.
                        </TableCell>
                    </TableRow>
                    )}
            </TableBody>
            </Table>}
      </div>
    </div>
  )
}
