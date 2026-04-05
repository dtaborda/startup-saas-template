"use client";

import { Card, cn } from "@template/ui";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

interface KpiCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export function KpiCard({ icon: Icon, label, value, change, changeLabel }: KpiCardProps) {
  const isPositive = change >= 0;

  return (
    <Card className="group p-0 transition-colors hover:border-primary/30">
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg border border-border/70 bg-background text-primary">
            <Icon className="size-4" />
          </div>

          <div
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs",
              isPositive
                ? "border-primary/25 bg-primary/10 text-primary"
                : "border-secondary/25 bg-secondary/10 text-secondary",
            )}
          >
            {isPositive ? (
              <ArrowUpRight className="size-3" />
            ) : (
              <ArrowDownRight className="size-3" />
            )}
            {isPositive ? "+" : ""}
            {change}%
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">{label}</span>
          <p className="text-2xl font-semibold tracking-tight text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{changeLabel}</p>
        </div>
      </div>
    </Card>
  );
}
