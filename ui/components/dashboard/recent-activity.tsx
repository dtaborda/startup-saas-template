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
    <Card variant="glass" className="overflow-hidden rounded-[1.75rem] border-border/70 p-0">
      <CardHeader className="flex flex-col gap-4 border-b border-border/50 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <span className="editorial-eyebrow">recent operator activity</span>
            <CardTitle className="text-xl font-semibold tracking-[-0.04em] text-foreground">
              Live actions stay scannable across the command deck
            </CardTitle>
          </div>

          <div className="rounded-full border border-border/60 bg-background/65 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
            {RECENT_ACTIVITY.length} tracked events
          </div>
        </div>

        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          User actions, payment events, and support activity remain tied to the same dashboard data,
          now framed as an editorial signal feed.
        </p>
      </CardHeader>

      <CardContent className="px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-col gap-3">
          {RECENT_ACTIVITY.map((activity) => {
            const meta = STATUS_META[activity.status];
            const StatusIcon = meta.icon;

            return (
              <div
                key={`${activity.user}-${activity.date}`}
                className="grid gap-4 rounded-[1.35rem] border border-border/60 bg-background/45 p-4 transition-colors hover:border-primary/20 hover:bg-background/60 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto_auto] md:items-center"
              >
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                    user
                  </span>
                  <p className="truncate text-sm font-semibold text-foreground">{activity.user}</p>
                </div>

                <div className="flex min-w-0 flex-col gap-1">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                    action
                  </span>
                  <p className="text-sm leading-6 text-muted-foreground">{activity.action}</p>
                </div>

                <div className="flex flex-col gap-1 md:items-end">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                    timestamp
                  </span>
                  <p className="text-sm text-foreground">{activity.date}</p>
                </div>

                <div className="flex md:justify-end">
                  <Badge
                    variant={meta.variant}
                    className={cn(
                      "gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.2em]",
                      meta.tone,
                    )}
                  >
                    <StatusIcon className="size-3.5" />
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
