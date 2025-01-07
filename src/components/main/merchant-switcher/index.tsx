"use client";

import * as React from "react";
import { ChevronsUpDown, Plus, TentIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function MerchantSwitcher({
  merchants,
}: {
  merchants: {
    name: string;
    merchant_id: string;
  }[];
}) {
  const [activeMerchant, setActiveMerchant] = React.useState(merchants[0]);
  const router = useRouter();

  const handleMerchantChange = (merchant: {
    name: string;
    merchant_id: string;
  }) => {
    setActiveMerchant(merchant);
    router.push(`/dashboard/${merchant.merchant_id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          size="lg"
          className="px-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
            <TentIcon className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {activeMerchant.name}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="start"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Merchants
        </DropdownMenuLabel>
        {merchants.map((merchant, index) => (
          <DropdownMenuItem
            key={merchant.merchant_id}
            onClick={() => handleMerchantChange(merchant)} // Call the handler to change merchant
            className="gap-2 p-2"
          >
            <div className="flex size-6 items-center justify-center rounded-sm border">
              <TentIcon className="size-4 shrink-0" />
            </div>
            {merchant.name}
            <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 p-2">
          <div className="flex size-6 items-center justify-center rounded-md border bg-background">
            <Plus className="size-4" />
          </div>
          <div className="font-medium text-muted-foreground">
            <Link href={"/setup/new-merchant"}>Add Merchant</Link>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
