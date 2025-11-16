"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function NMTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
  <Table>
    <TableHeader className="bg-gray-900">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className="border-gray-800 hover:bg-gray-900">
          {headerGroup.headers.map((header) => (
            <TableHead 
              key={header.id}
              className="text-white font-semibold text-sm uppercase tracking-wider py-4"
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
    <TableBody className="bg-white divide-y divide-gray-200">
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row, index) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            className={`
              transition-colors duration-150
              hover:bg-green-300
              ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
              ${row.getIsSelected() ? 'bg-blue-50' : ''}
            `}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell 
                key={cell.id}
                className="py-4 text-sm text-gray-700"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow className="hover:bg-white">
          <TableCell 
            colSpan={columns.length} 
            className="h-32 text-center text-gray-500"
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <svg 
                className="w-12 h-12 text-gray-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
                />
              </svg>
              <p className="font-medium">No results found</p>
              <p className="text-xs text-gray-400">Try adjusting your search or filters</p>
            </div>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</div>
  )
}