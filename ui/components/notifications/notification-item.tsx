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

const typeSurfaceStyles: Record<NotificationType, string> = {
  info: "border-info/25 bg-info/8",
  success: "border-success/25 bg-success/8",
  warning: "border-warning/25 bg-warning/8",
  alert: "border-destructive/25 bg-destructive/8",
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
        "group relative flex gap-4 overflow-hidden rounded-[1.5rem] border border-border/60 bg-background/65 p-4 backdrop-blur-sm transition-colors hover:border-primary/30 hover:bg-background/78",
        !read && "border-primary/35 bg-primary/8 shadow-[var(--glow-primary-sm)]",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div
        className={cn(
          "mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-[1rem] border backdrop-blur",
          typeSurfaceStyles[type],
        )}
      >
        <Icon className={cn("size-4", typeColors[type])} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex flex-1 flex-col gap-2">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex size-2 shrink-0 rounded-full",
                  read ? "bg-border/70" : "bg-primary shadow-[var(--glow-primary-sm)]",
                )}
              />
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                {type}
              </span>
            </div>

            <p
              className={cn(
                "truncate text-sm leading-5",
                read ? "font-medium text-foreground/78" : "font-semibold text-foreground",
              )}
            >
              {title}
            </p>
            <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">{message}</p>
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-muted-foreground/80">
              {timestamp}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {!read && onMarkAsRead && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkAsRead();
                }}
                className="inline-flex items-center rounded-full border border-border/60 bg-background/75 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                aria-label={`Mark "${title}" as read`}
              >
                <Check className="mr-1 size-3" />
                mark read
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
