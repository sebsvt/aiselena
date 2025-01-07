"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Settings,
  Bell,
  LogOut,
  ChevronDown,
  GalleryVerticalEndIcon,
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

interface UserAvatarMenuProps {
  fullName: string;
  email: string;
  avatarUrl?: string;
  merchant_ids?: string[]; // Change from single ID to array
}

export function UserAvatar({
  fullName,
  email,
  avatarUrl,
  merchant_ids,
}: UserAvatarMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const initials = fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-1 px-2 py-1 hover:bg-accent hover:text-accent-foreground"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={fullName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm hidden sm:inline">
            {fullName}
          </span>
          <ChevronDown className="hidden md:block h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            className="flex items-center"
            href={
              merchant_ids?.length
                ? `/dashboard/${merchant_ids[0]}`
                : "/merchant/setup"
            }
          >
            <GalleryVerticalEndIcon className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="flex items-center" href="/accounts/edit">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="flex items-center" href={"/notifications"}>
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
