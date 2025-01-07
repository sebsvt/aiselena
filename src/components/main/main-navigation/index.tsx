import { Bell, HelpCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MerchantSwitcher } from "../merchant-switcher";
import { UserAvatar } from "@/components/site/user-button-navigation";

interface TopNavProps {
  merchants: {
    name: string;
    merchant_id: string;
  }[];
  user: {
    user_id: string;
    image_url: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export function MainNavigation({ merchants, user }: TopNavProps) {
  return (
    <header className="bg-background">
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <MerchantSwitcher merchants={merchants} />
            </div>
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-sm">
              <HelpCircleIcon />
            </Button>
          </nav>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-600" />
          </Button>
          <UserAvatar
            fullName={`${user.first_name} ${user.last_name}`}
            email={user.email}
            avatarUrl={user.image_url}
          />
        </div>
      </div>
    </header>
  );
}
