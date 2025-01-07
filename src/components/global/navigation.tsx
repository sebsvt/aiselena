"use client";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./mode-toggle";
import { NavigationNotifications } from "../site/notification";
import { UserAvatar } from "../site/user-button-navigation";
import { Button } from "../ui/button";

type UserProp = {
  user_id: string;
  image_url: string;
  first_name: string;
  last_name: string;
  email: string;
};

interface Props {
  title?: React.ReactNode | null;
  nav?:
    | {
        title: string;
        link: string;
      }[]
    | null;
  user: UserProp | null;
  merchant_ids?: string[];
}

export const Navigation: React.FC<Props> = ({
  title,
  nav,
  user,
  merchant_ids,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-8 flex h-14 max-w-full items-center">
        {/* Title and nav */}
        <div className="mr-4 md:flex">
          <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
            <span className="font-semibold">{title}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-4 text-sm lg:gap-6">
            {nav?.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        {/* Actions */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center gap-2">
            <ModeToggle />
            {user ? (
              <div className="flex items-center gap-2">
                <NavigationNotifications />
                <UserAvatar
                  fullName={`${user.first_name} ${user.last_name}`}
                  email={user.email}
                  avatarUrl={user.image_url}
                  merchant_ids={merchant_ids}
                />
              </div>
            ) : (
              <Button asChild>
                <Link href={"/sign-in"}>Sign in</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
