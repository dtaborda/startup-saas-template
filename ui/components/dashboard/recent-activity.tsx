"use client";

import { Badge, Card, CardContent, CardHeader, CardTitle, cn } from "@template/ui";
import { Activity, LoaderCircle, type LucideIcon, ShieldAlert } from "lucide-react";
import { type ActivityStatus, RECENT_ACTIVITY } from "./mock-data";

const STATUS_META = {
  success: {
    label: "Success",
    variant: "success",
    icon: Activity,
    tone: "border-primary/20 bg-primary/10 text-primary",
  },
  pending: {
    label: "Pending",
    variant: "warning",
    icon: LoaderCircle,
    tone: "border-warning/25 bg-warning/10 text-warning",
  },
  failed: {
    label: "Failed",
    variant: "destructive",
    icon: ShieldAlert,
    tone: "border-secondary/20 bg-secondary/10 text-secondary",
  },
} as const satisfies Record<
  ActivityStatus,
  {
    label: string;
    variant: "success" | "warning" | "destructive";
    icon: LucideIcon;
    tone: string;
  }
>;

export function RecentActivity() {
  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-border/50 px-5 py-4">
        <CardTitle className="text-sm font-medium text-foreground">Recent activity</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-border/40">
          {RECENT_ACTIVITY.map((activity) => {
            const meta = STATUS_META[activity.status];
            const StatusIcon = meta.icon;

            return (
              <div
                key={`${activity.user}-${activity.date}`}
                className="flex items-center justify-between gap-4 px-5 py-3"
              >
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <p className="min-w-0 truncate text-sm font-medium text-foreground">
                    {activity.user}
                  </p>
                  <p className="hidden min-w-0 flex-1 truncate text-sm text-muted-foreground md:block">
                    {activity.action}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="hidden text-xs text-muted-foreground sm:block">
                    {activity.date}
                  </span>
                  <Badge
                    variant={meta.variant}
                    className={cn("gap-1 rounded-full border px-2 py-0.5 text-xs", meta.tone)}
                  >
                    <StatusIcon className="size-3" />
                    {meta.label}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
