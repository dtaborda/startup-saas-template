"use client";

import type { Notification } from "@template/contracts";
import { Badge, Button, Card, ScrollArea } from "@template/ui";
import { BellOff, CheckCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { NotificationItem } from "./notification-item";

const NOTIFICATION_GROUPS = ["alert", "warning", "success", "info"] as const;

const NOTIFICATION_GROUP_LABELS = {
  alert: "Alerts",
  warning: "Warnings",
  success: "Success",
  info: "Info",
} as const;

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
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
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

  const groupedNotifications = NOTIFICATION_GROUPS.map((type) => ({
    type,
    label: NOTIFICATION_GROUP_LABELS[type],
    items: notifications.filter((notification) => notification.type === type),
  })).filter((group) => group.items.length > 0);

  if (notifications.length === 0) {
    return (
      <div className="framed-section flex flex-col items-center justify-center gap-4 rounded-[1.75rem] px-6 py-12 text-center text-muted-foreground">
        <div className="flex size-16 items-center justify-center rounded-full border border-border/70 bg-background/70">
          <BellOff className="size-8 opacity-60" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-foreground">No notifications yet</p>
          <p className="text-xs leading-5 text-muted-foreground">
            New system signals and assistant updates will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-col gap-4">
      <Card variant="glass" className="rounded-[1.75rem] border-border/70 p-5">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="editorial-eyebrow">grouped signal feed</span>
              <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                Review critical alerts first, then clear resolved updates from the queue.
              </p>
            </div>

            {unreadCount > 0 ? (
              <Badge className="border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[0.64rem] uppercase tracking-[0.24em] text-primary shadow-[var(--glow-primary-sm)]">
                {unreadCount} unread
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="border-border/70 bg-background/60 px-3 py-1 font-mono text-[0.64rem] uppercase tracking-[0.24em] text-muted-foreground"
              >
                all read
              </Badge>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.25rem] border border-border/60 bg-background/55 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                    queue health
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {unreadCount > 0
                      ? `${unreadCount} item${unreadCount === 1 ? "" : "s"} need attention`
                      : "All caught up"}
                  </span>
                </div>
                <Sparkles className="size-4 text-primary" />
              </div>
            </div>

            <div className="rounded-[1.25rem] border border-border/60 bg-background/55 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                    grouped views
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {groupedNotifications.length} signal lane
                    {groupedNotifications.length === 1 ? "" : "s"}
                  </span>
                </div>

                {unreadCount > 0 ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 border border-border/60 bg-background/70 px-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground hover:border-primary/30 hover:text-primary"
                    onClick={markAllAsRead}
                  >
                    <CheckCheck data-icon="inline-start" />
                    Mark all as read
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <ScrollArea className="h-[calc(100vh-18rem)] pr-1">
        <div className="flex flex-col gap-5 pr-3">
          {groupedNotifications.map((group, groupIndex) => {
            const groupUnreadCount = group.items.filter(
              (notification) => !notification.read,
            ).length;

            return (
              <section
                key={group.type}
                className="framed-section rounded-[1.75rem] px-4 py-4 sm:px-5"
              >
                <div className="relative flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-3 border-b border-border/50 pb-3">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                        {group.type} lane
                      </span>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                        {group.label}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="border-border/70 bg-background/65 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        {group.items.length} total
                      </Badge>
                      {groupUnreadCount > 0 ? (
                        <Badge className="border-primary/25 bg-primary/10 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-primary">
                          {groupUnreadCount} unread
                        </Badge>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {group.items.map((notification, itemIndex) => (
                      <NotificationItem
                        key={notification.id}
                        title={notification.title}
                        message={notification.message}
                        timestamp={formatRelativeTime(notification.createdAt)}
                        read={notification.read}
                        type={notification.type}
                        index={groupIndex * 3 + itemIndex}
                        onMarkAsRead={
                          notification.read ? undefined : () => markAsRead(notification.id)
                        }
                      />
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
