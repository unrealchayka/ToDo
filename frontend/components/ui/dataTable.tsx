"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data: Payment[] = [
    {
      id: "m5gr84i9evroeajp",
      date: '21-05-2025',
      category: {title: 'Work', color: '#4dff00'},
      status: "high",
      title: "Complete project documentation"
    },
    {
      id: "3u1reuv4lklml",
      date: '18-05-2025',
      category: {title: 'Personal', color: '#0091ff'},
      status: "medium",
      title: "Review team progress"
    },
    {
      id: "derv1ws0vsdfsdt",
      date: '12-05-2025',
      category: {title: 'Shopping', color: '#ff8800'},
      status: "low",
      title: "Buy office supplies"
    },
    {
      id: "5kma53aecasrt",
      date: '09-05-2025',
      category: {title: 'Health', color: '#8c00ff'},
      status: "high",
      title: "Schedule doctor appointment"
    },
    {
      id: "bhqecj4pdf5",
      date: '28-04-2025',
      category: {title: 'Finance', color: 'red'},
      status: "medium",
      title: "Pay monthly bills"
    },
    {
      id: "derv1ws0asdsa",
      date: '25-04-2025',
      category: {title: 'Education', color: '#00ffd5'},
      status: "low",
      title: "Read new research paper"
    },
    {
      id: "5kma53aewersd",
      date: '22-04-2025',
      category: {title: 'Work', color: '#4dff00'},
      status: "high",
      title: "Prepare client presentation"
    },
    {
      id: "bhqecj4pvmghd",
      date: '19-04-2025',
      category: {title: 'Personal', color: '#0091ff'},
      status: "medium",
      title: "Organize personal files"
    },
    {
      id: "derv1ws0qwe",
      date: '15-04-2025',
      category: {title: 'Shopping', color: '#ff8800'},
      status: "low",
      title: "Order new laptop"
    },
    {
      id: "5kma53aegdsf",
      date: '11-04-2025',
      category: {title: 'Health', color: '#8c00ff'},
      status: "high",
      title: "Renew gym membership"
    },
    {
      id: "bhqecj4p123",
      date: '08-04-2025',
      category: {title: 'Finance', color: '#ff0033'},
      status: "medium",
      title: "Review investment portfolio"
    },
    {
      id: "m5gr84i9evroeajq",
      date: '05-04-2025',
      category: {title: 'Education', color: '#00ffd5'},
      status: "low",
      title: "Learn new framework"
    },
    {
      id: "3u1reuv4lklmm",
      date: '02-04-2025',
      category: {title: 'Work', color: '#4dff00'},
      status: "high",
      title: "Write technical documentation"
    },
    {
      id: "derv1ws0vsdfsdu",
      date: '30-03-2025',
      category: {title: 'Personal', color: '#0091ff'},
      status: "medium",
      title: "Plan weekend activities"
    },
    {
      id: "5kma53aecasru",
      date: '27-03-2025',
      category: {title: 'Shopping', color: '#ff8800'},
      status: "low",
      title: "Purchase new headphones"
    },
    {
      id: "bhqecj4pdf6",
      date: '24-03-2025',
      category: {title: 'Health', color: '#8c00ff'},
      status: "high",
      title: "Start new fitness routine"
    },
    {
      id: "derv1ws0asdsb",
      date: '21-03-2025',
      category: {title: 'Finance', color: '#ff0033'},
      status: "medium",
      title: "File tax returns"
    },
    {
      id: "5kma53aewerse",
      date: '18-03-2025',
      category: {title: 'Education', color: '#00ffd5'},
      status: "low",
      title: "Complete online course"
    },
    {
      id: "bhqecj4pvmghf",
      date: '15-03-2025',
      category: {title: 'Work', color: '#4dff00'},
      status: "high",
      title: "Debug production issue"
    },
    {
      id: "derv1ws0qwf",
      date: '12-03-2025',
      category: {title: 'Personal', color: '#0091ff'},
      status: "medium",
      title: "Organize family gathering"
    },
    {
      id: "5kma53aegdsg",
      date: '09-03-2025',
      category: {title: 'Shopping', color: '#ff8800'},
      status: "low",
      title: "Buy birthday gift"
    },
    {
      id: "bhqecj4p124",
      date: '06-03-2025',
      category: {title: 'Health', color: '#8c00ff'},
      status: "high",
      title: "Schedule dental checkup"
    },
    {
      id: "m5gr84i9evroeajr",
      date: '03-03-2025',
      category: {title: 'Finance', color: '#ff0033'},
      status: "medium",
      title: "Create monthly budget"
    },
    {
      id: "3u1reuv4lklmn",
      date: '28-02-2025',
      category: {title: 'Education', color: '#00ffd5'},
      status: "low",
      title: "Practice coding challenges"
    },
    {
      id: "derv1ws0vsfsdt",
      date: '25-02-2025',
      category: {title: 'Work', color: '#4dff00'},
      status: "high",
      title: "Deploy new feature"
    },
    {
      id: "5kma53aecasrv",
      date: '22-02-2025',
      category: {title: 'Personal', color: '#0091ff'},
      status: "medium",
      title: "Backup personal data"
    },
    {
      id: "bhqecj4pdf7",
      date: '19-02-2025',
      category: {title: 'Shopping', color: '#ff8800'},
      status: "low",
      title: "Order groceries online"
    },
    {
      id: "derv1ws0asdsc",
      date: '16-02-2025',
      category: {title: 'Health', color: '#8c00ff'},
      status: "high",
      title: "Research healthy recipes"
    },
    {
      id: "5kma53aewersf",
      date: '13-02-2025',
      category: {title: 'Finance', color: '#ff0033'},
      status: "medium",
      title: "Review bank statements"
    },
    {
      id: "bhqecj4pvmghg",
      date: '10-02-2025',
      category: {title: 'Education', color: '#00ffd5'},
      status: "low",
      title: "Read technical book"
    }
  ]

export type Payment = {
  id: string
  date: string
  category: {title: string, color: string}
  status: "low" | "medium" | "high"
  title: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="relative left-[50%] translate-x-[-50%]"
        >
          Task
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className=" relative left-[50%] translate-x-[-50%]">{row.getValue("title")}</div>,
  },

  {
    accessorKey: "date",
    header: () => <div className="text-right">execution day</div>,
    cell: ({ row }) => {

      return <div
         className='text-right font-medium' 
         style={{fontFamily: 'var(--font-raleway)'}}
    >{row.getValue("date")}</div>
    },
  },
  {
    accessorKey: "category",
    header: () => <div className="text-right">category</div>,
    cell: ({ row }) => {
        const category = row.getValue("category") as { title: string; color: string }; 

      return <div className='text-right font-medium' style={{color: category.color}}>{category.title}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
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

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter titles..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
