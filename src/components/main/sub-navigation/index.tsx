"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface SubNavProps {
  items: {
    href: string;
    label: string;
  }[];
}

export function SubNavigation({ items }: SubNavProps) {
  const pathname = usePathname();

  return (
    <nav className="border-b border-border/40 bg-background">
      <div className="relative">
        {/* Add fade effects for scroll indicators */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-12 w-8 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-12 w-8 bg-gradient-to-l from-background to-transparent" />

        {/* Make the container scrollable */}
        <div className="flex h-12 items-center space-x-4 overflow-x-auto px-4 scrollbar-none">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-full min-w-fit items-center border-b-2 border-transparent px-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === item.href && "border-primary text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
