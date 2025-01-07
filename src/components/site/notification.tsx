"use client";

import { useState } from "react";
import { Bell, Check, Info, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

type NotificationType = "info" | "success" | "warning";

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "info",
    title: "New Feature",
    message: "Check out our latest update!",
    timestamp: "2 min ago",
    read: false,
  },
  {
    id: 2,
    type: "success",
    title: "Task Completed",
    message: "Your report has been generated successfully.",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "warning",
    title: "Storage Limit",
    message: "You're approaching your storage limit.",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: 4,
    type: "info",
    title: "Scheduled Maintenance",
    message: "Our servers will be down for maintenance tonight.",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: 5,
    type: "info",
    title: "Scheduled Maintenance",
    message: "Our servers will be down for maintenance tonight.",
    timestamp: "1 day ago",
    read: true,
  },
];

export function NavigationNotifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "success":
        return <Check className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 px-1 min-w-[1.25rem] h-5"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 md:w-96" align="end">
        <div className="flex items-center justify-between p-2">
          <h2 className="text-sm font-semibold">Notifications</h2>
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        </div>
        <ScrollArea className="h-[300px] md:h-[400px]">
          {notifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No notifications
            </p>
          ) : (
            <ul className="divide-y ">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`p-3 transition-colors duration-150 ease-in-out`}
                >
                  {/* // notification.read ? "bg-" : "bg-blue-50"  and make hover with it*/}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="text-sm font-medium truncate">
                        {notification.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs">{notification.timestamp}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                      className="flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
