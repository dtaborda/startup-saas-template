"use client";

import type { ChartConfig } from "@template/ui";
import {
  Card,
  CardContent,
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

function ChartFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-border/50 px-5 py-4">
        <CardTitle className="text-sm font-medium text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-5">{children}</CardContent>
    </Card>
  );
}

export function RevenueChart() {
  return (
    <ChartFrame title="Revenue">
      <ChartContainer config={revenueConfig} className="h-[260px] w-full">
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
                className="border-border bg-card"
              />
            }
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke={CHART_STYLES.revenue}
            strokeWidth={2}
            fill="url(#fillRevenueGrowthAi)"
            activeDot={{ r: 4, fill: CHART_STYLES.revenue, stroke: "oklch(0.145 0.004 286.2)" }}
          />
        </AreaChart>
      </ChartContainer>
    </ChartFrame>
  );
}

export function UserGrowthChart() {
  return (
    <ChartFrame title="User growth">
      <ChartContainer config={userGrowthConfig} className="h-[260px] w-full">
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
                className="border-border bg-card"
              />
            }
          />
          <Bar
            dataKey="users"
            fill="url(#fillUsersGrowthAi)"
            radius={[6, 6, 0, 0]}
            maxBarSize={44}
          />
        </BarChart>
      </ChartContainer>
    </ChartFrame>
  );
}
