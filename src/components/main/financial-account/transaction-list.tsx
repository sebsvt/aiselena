"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Revenue } from "@/queries/balance-account-service/model";

const columns: ColumnDef<Revenue>[] = [
  {
    accessorKey: "merchant",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Merchant
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const revenue = row.original;
      return (
        <div className="ml-4 flex flex-col">
          <p className="text-sm font-medium">{revenue.merchant}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "customer.fullname",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.original.customer;
      return (
        <div className="flex flex-col text-sm">
          <span>{customer.fullname}</span>
          <span className="text-muted-foreground">{customer.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "when",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        When
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.getValue("when") as string).getTime();
      const dateB = new Date(rowB.getValue("when") as string).getTime();
      return dateA - dateB;
    },
    cell: ({ row }) => {
      const when = new Date(row.getValue("when") as string);
      return (
        <div className="text-sm text-gray-400">
          {when.toLocaleDateString()} {when.toLocaleTimeString()}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount / 100); // Assuming amount is in cents
      return <div className="pl-3 font-medium">{formatted}</div>;
    },
  },
];

type Props = {
  revenues: Revenue[];
};

export function TransactionList({ revenues }: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data: revenues,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Revenues</h2>
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} entries
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
