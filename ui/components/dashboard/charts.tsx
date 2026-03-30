"use client";

import type { ChartConfig } from "@template/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@template/ui";
import type { ReactNode } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { REVENUE_DATA, USER_GROWTH_DATA } from "./mock-data";

const CHART_STYLES = {
  grid: "oklch(0.88 0.156 204.5 / 0.12)",
  tick: "oklch(0.651 0.046 291.8)",
  revenue: "oklch(0.88 0.156 204.5)",
  revenueFillStart: "oklch(0.88 0.156 204.5 / 0.36)",
  revenueFillEnd: "oklch(0.88 0.156 204.5 / 0.02)",
  users: "oklch(0.673 0.246 14.4)",
  usersAccent: "oklch(0.88 0.156 204.5)",
} as const;

const revenueConfig = {
  revenue: {
    label: "Revenue",
    color: CHART_STYLES.revenue,
  },
} satisfies ChartConfig;

const userGrowthConfig = {
  users: {
    label: "Users",
    color: CHART_STYLES.users,
  },
} satisfies ChartConfig;

function ChartFrame({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Card variant="glass" className="overflow-hidden rounded-[1.75rem] border-border/70 p-0">
      <CardHeader className="flex flex-col gap-3 border-b border-border/50 px-5 py-5 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col gap-2">
            <span className="editorial-eyebrow">{eyebrow}</span>
            <CardTitle className="text-xl font-semibold tracking-[-0.04em] text-foreground">
              {title}
            </CardTitle>
          </div>

          <div className="rounded-full border border-border/60 bg-background/65 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
            live trend
          </div>
        </div>
        <CardDescription className="max-w-xl text-sm leading-6 text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-5 py-5 sm:px-6 sm:py-6">{children}</CardContent>
    </Card>
  );
}

export function RevenueChart() {
  return (
    <ChartFrame
      eyebrow="revenue pressure"
      title="Pipeline revenue keeps a steady cyan climb"
      description="Same revenue dataset, rebuilt with a denser dark presentation and brighter Growth AI signal contrast."
    >
      <ChartContainer config={revenueConfig} className="h-[300px] w-full">
        <AreaChart data={REVENUE_DATA} margin={{ top: 12, right: 8, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="fillRevenueGrowthAi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_STYLES.revenueFillStart} />
              <stop offset="100%" stopColor={CHART_STYLES.revenueFillEnd} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={CHART_STYLES.grid} strokeDasharray="3 6" vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tick={{ fill: CHART_STYLES.tick, fontSize: 12 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tick={{ fill: CHART_STYLES.tick, fontSize: 12 }}
            tickFormatter={(value: number) => `$${(value / 1000).toFixed(0)}k`}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                indicator="line"
                nameKey="revenue"
                className="border-primary/25 bg-background/95 shadow-[var(--glow-primary-sm)]"
              />
            }
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke={CHART_STYLES.revenue}
            strokeWidth={2.5}
            fill="url(#fillRevenueGrowthAi)"
            activeDot={{ r: 5, fill: CHART_STYLES.revenue, stroke: "oklch(0.145 0.004 286.2)" }}
          />
        </AreaChart>
      </ChartContainer>
    </ChartFrame>
  );
}

export function UserGrowthChart() {
  return (
    <ChartFrame
      eyebrow="adoption cadence"
      title="User growth leans hot-pink with cyan support"
      description="Current monthly user mapping stays intact while the bars pick up the branded editorial palette and panel rhythm."
    >
      <ChartContainer config={userGrowthConfig} className="h-[300px] w-full">
        <BarChart data={USER_GROWTH_DATA} margin={{ top: 12, right: 8, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="fillUsersGrowthAi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART_STYLES.usersAccent} />
              <stop offset="100%" stopColor={CHART_STYLES.users} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={CHART_STYLES.grid} strokeDasharray="3 6" vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tick={{ fill: CHART_STYLES.tick, fontSize: 12 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tick={{ fill: CHART_STYLES.tick, fontSize: 12 }}
            tickFormatter={(value: number) => `${(value / 1000).toFixed(0)}k`}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                indicator="dot"
                nameKey="users"
                className="border-secondary/25 bg-background/95 shadow-[var(--glow-secondary-sm)]"
              />
            }
          />
          <Bar
            dataKey="users"
            fill="url(#fillUsersGrowthAi)"
            radius={[12, 12, 0, 0]}
            maxBarSize={44}
          />
        </BarChart>
      </ChartContainer>
    </ChartFrame>
  );
}
