"use client";

import type { NotificationType } from "@template/contracts";
import { cn } from "@template/ui";
import { AlertCircle, AlertTriangle, Check, CheckCircle, Info } from "lucide-react";

interface NotificationItemProps {
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: NotificationType;
  onMarkAsRead?: () => void;
  index?: number;
}

const typeIcons: Record<NotificationType, typeof Info> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  alert: AlertCircle,
};

const typeColors: Record<NotificationType, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  alert: "text-destructive",
};

export function NotificationItem({
  title,
  message,
  timestamp,
  read,
  type,
  onMarkAsRead,
  index = 0,
}: NotificationItemProps) {
  const Icon = typeIcons[type];

  return (
    <div
      className={cn(
        "animate-in fade-in-0 slide-in-from-right-2 fill-mode-both",
        "group flex gap-3 rounded-lg border border-border/40 p-3 transition-colors hover:border-border",
        !read && "border-primary/25 bg-primary/5",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="mt-0.5 shrink-0">
        <Icon className={cn("size-4", typeColors[type])} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p
            className={cn(
              "text-sm leading-5",
              read ? "text-foreground/70" : "font-medium text-foreground",
            )}
          >
            {title}
          </p>
          <span className="shrink-0 text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{message}</p>

        {!read && onMarkAsRead && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMarkAsRead();
            }}
            className="mt-1.5 inline-flex items-center text-xs text-muted-foreground transition-colors hover:text-primary"
            aria-label={`Mark "${title}" as read`}
          >
            <Check className="mr-1 size-3" />
            Mark read
          </button>
        )}
      </div>
    </div>
  );
}
