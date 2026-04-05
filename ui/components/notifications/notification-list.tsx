"use client";

import type { Notification } from "@template/contracts";
import { Badge, Button, ScrollArea } from "@template/ui";
import { BellOff, CheckCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { NotificationItem } from "./notification-item";

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Portfolio updated",
    message: "Your portfolio has been successfully updated with the latest project data.",
    createdAt: "2026-03-26T12:00:00Z",
    read: false,
    type: "success",
  },
  {
    id: "2",
    title: "New message from AI assistant",
    message: "Your analysis request has been completed. Check the chat for details.",
    createdAt: "2026-03-26T11:45:00Z",
    read: false,
    type: "info",
  },
  {
    id: "3",
    title: "System maintenance scheduled",
    message:
      "Planned maintenance window on Sunday 2:00 AM - 4:00 AM UTC. Services may be briefly unavailable.",
    createdAt: "2026-03-26T11:00:00Z",
    read: false,
    type: "warning",
  },
  {
    id: "4",
    title: "Dashboard metrics refreshed",
    message: "Weekly KPI metrics have been recalculated and are now available on your dashboard.",
    createdAt: "2026-03-26T09:00:00Z",
    read: true,
    type: "info",
  },
  {
    id: "5",
    title: "Export completed",
    message: "Your portfolio data export is ready for download. The file will expire in 24 hours.",
    createdAt: "2026-03-25T12:00:00Z",
    read: true,
    type: "success",
  },
  {
    id: "6",
    title: "Rate limit warning",
    message:
      "You are approaching the API rate limit for chat requests. Consider upgrading your plan.",
    createdAt: "2026-03-24T12:00:00Z",
    read: true,
    type: "alert",
  },
];

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

interface NotificationListProps {
  initialNotifications?: Notification[];
  onUnreadCountChange?: (hasUnread: boolean) => void;
}

export function NotificationList({
  initialNotifications = MOCK_NOTIFICATIONS,
  onUnreadCountChange,
}: NotificationListProps) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    onUnreadCountChange?.(unreadCount > 0);
  }, [onUnreadCountChange, unreadCount]);

  function markAsRead(id: string) {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      const newUnreadCount = updated.filter((n) => !n.read).length;
      onUnreadCountChange?.(newUnreadCount > 0);
      return updated;
    });
    toast.success("Notification marked as read");
  }

  function markAllAsRead() {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      onUnreadCountChange?.(false);
      return updated;
    });
    toast.success("All notifications marked as read");
  }

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <BellOff className="size-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">No notifications yet</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-col gap-3">
      {unreadCount > 0 ? (
        <div className="flex items-center justify-between">
          <Badge className="border-primary/25 bg-primary/10 px-2 py-0.5 text-xs text-primary">
            {unreadCount} unread
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-muted-foreground hover:text-primary"
            onClick={markAllAsRead}
          >
            <CheckCheck className="size-3.5" />
            Mark all read
          </Button>
        </div>
      ) : null}

      <ScrollArea className="h-[calc(100vh-12rem)] pr-1">
        <div className="flex flex-col gap-2 pr-2">
          {notifications.map((notification, index) => (
            <NotificationItem
              key={notification.id}
              title={notification.title}
              message={notification.message}
              timestamp={formatRelativeTime(notification.createdAt)}
              read={notification.read}
              type={notification.type}
              index={index}
              onMarkAsRead={notification.read ? undefined : () => markAsRead(notification.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
