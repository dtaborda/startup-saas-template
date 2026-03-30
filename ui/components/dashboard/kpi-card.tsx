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
    <Card
      variant="glass"
      className="group relative overflow-hidden rounded-[1.75rem] border-border/70 p-0 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,240,255,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,51,102,0.1),transparent_30%)] opacity-80" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-transparent transition-all duration-300 group-hover:ring-primary/30 group-hover:shadow-[var(--glow-primary-md)]" />

      <div className="relative flex flex-col gap-6 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex size-12 items-center justify-center rounded-[1.1rem] border border-border/70 bg-background/65 text-primary transition-colors duration-300 group-hover:border-primary/35 group-hover:bg-primary/10">
            <Icon className="size-5" />
          </div>

          <div
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-mono text-[0.64rem] uppercase tracking-[0.22em]",
              isPositive
                ? "border-primary/25 bg-primary/10 text-primary"
                : "border-secondary/25 bg-secondary/10 text-secondary",
            )}
          >
            {isPositive ? (
              <ArrowUpRight className="size-3.5" />
            ) : (
              <ArrowDownRight className="size-3.5" />
            )}
            {isPositive ? "+" : ""}
            {change}%
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.26em] text-muted-foreground">
            {label}
          </span>
          <div className="flex items-end justify-between gap-3">
            <p className="text-3xl font-semibold tracking-[-0.05em] text-foreground">{value}</p>
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              live metric
            </span>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            {changeLabel} ·{" "}
            <span className="text-foreground">Signal stays readable on dark mode.</span>
          </p>
        </div>
      </div>
    </Card>
  );
}
