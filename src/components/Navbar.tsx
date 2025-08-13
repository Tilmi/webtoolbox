"use client";

import {
  Bell,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
  Check,
  X,
  Clock,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { SidebarTrigger } from "./ui/sidebar";
import SearchForm from "./SearchForm";

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: "urgent" | "normal";
  isRead: boolean;
}

const Navbar = () => {
  const { setTheme } = useTheme();

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Review Pull Request",
      description: "PR #123 needs your review for the authentication feature",
      time: "2 hours ago",
      type: "urgent",
      isRead: false,
    },
    {
      id: 2,
      title: "Update Documentation",
      description: "API documentation for user management needs to be updated",
      time: "5 hours ago",
      type: "normal",
      isRead: false,
    },
    {
      id: 3,
      title: "Deploy to Production",
      description: "Ready to deploy version 2.1.0 to production environment",
      time: "1 day ago",
      type: "urgent",
      isRead: true,
    },
    {
      id: 4,
      title: "Client Meeting",
      description: "Preparation needed for tomorrow's client presentation",
      time: "2 days ago",
      type: "normal",
      isRead: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsDone = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const getTypeIcon = (type: "urgent" | "normal") => {
    return type === "urgent" ? (
      <AlertCircle className="w-4 h-4 text-red-500" />
    ) : (
      <Clock className="w-4 h-4 text-blue-500" />
    );
  };

  return (
    <nav className="py-3 px-2 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center justify-start">
        <SidebarTrigger />
        {/* Dashboard */}
      </div>
      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />

        {/* NOTIFICATION DROPDOWN */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-80 p-0">
            {/* Header */}
            <div className="px-4 py-3 border-b">
              <div className="flex items-center justify-between">
                <DropdownMenuLabel className="text-base font-semibold p-0">
                  Notifications
                </DropdownMenuLabel>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-blue-600 hover:text-blue-700 h-auto p-1"
                  >
                    Mark all as read
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {unreadCount} unread notifications
              </p>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 border-b hover:bg-accent/50 transition-colors ${
                      !notification.isRead
                        ? "bg-blue-50 dark:bg-blue-950/20 border-l-4 border-l-blue-500"
                        : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Type Icon */}
                      <div className="mt-1">
                        {getTypeIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h4
                              className={`text-sm font-medium ${
                                !notification.isRead
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {notification.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {notification.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.time}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-1 ml-2">
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsDone(notification.id);
                                }}
                                className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950/20"
                                title="Mark as done"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                              title="Remove notification"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-2 border-t">
                <Button
                  variant="ghost"
                  className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/20"
                >
                  View All Notifications
                </Button>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* THEME MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* THEME MENU */}
      </div>
    </nav>
  );
};

export default Navbar;
