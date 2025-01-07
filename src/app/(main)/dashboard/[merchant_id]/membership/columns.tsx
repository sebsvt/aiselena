"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type TeamMember = {
  id: string;
  fullname: string;
  email: string;
  role: string;
};

export const columns: ColumnDef<TeamMember>[] = [
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
    accessorKey: "fullname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const fullname = row.getValue("fullname") as string;
      const email = row.getValue("email") as string;
      return (
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={``} alt={fullname} />
            <AvatarFallback>
              {fullname
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{fullname}</div>
            <div className="text-sm text-muted-foreground">{email}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    enableHiding: true,
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(member.id)}
            >
              Copy member ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View member details</DropdownMenuItem>
            <DropdownMenuItem>Change role</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Remove from team
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
