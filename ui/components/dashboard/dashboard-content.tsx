"use client";

import { selectUser, useAuthStore } from "@template/core";
import { Card, Skeleton } from "@template/ui";
import { Activity, ArrowRight, DollarSign, type LucideIcon, TrendingUp, Users } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { RevenueChart, UserGrowthChart } from "./charts";
import { KpiCard } from "./kpi-card";
import { KPI_DATA } from "./mock-data";
import { RecentActivity } from "./recent-activity";

const ICON_MAP: Record<string, LucideIcon | undefined> = {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
};

interface FadeInUpProps {
  children: ReactNode;
  delay?: number;
}

function FadeInUp({ children, delay = 0 }: FadeInUpProps) {
  return (
    <div
      className="animate-fade-in-up"
      style={delay > 0 ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function KpiSkeleton() {
  return (
    <Card variant="glass" className="overflow-hidden rounded-[1.75rem] border-border/70 p-0">
      <div className="flex flex-col gap-5 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="size-11 rounded-2xl" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
    </Card>
  );
}

function ChartSkeleton() {
  return (
    <Card variant="glass" className="overflow-hidden rounded-[1.75rem] border-border/70 p-0">
      <div className="flex flex-col gap-5 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-7 w-40" />
          </div>
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>
        <Skeleton className="h-[280px] w-full rounded-[1.25rem]" />
      </div>
    </Card>
  );
}

function ActivitySkeleton() {
  return (
    <Card variant="glass" className="overflow-hidden rounded-[1.75rem] border-border/70 p-0">
      <div className="flex flex-col gap-5 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 border-b border-border/50 pb-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-7 w-44" />
          </div>
          <Skeleton className="h-9 w-24 rounded-full" />
        </div>

        <div className="grid gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={`activity-skeleton-${index}`}
              className="grid gap-3 rounded-[1.25rem] border border-border/50 bg-background/45 p-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto_auto] md:items-center"
            >
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-full max-w-sm" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-7 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export function DashboardContent() {
  const user = useAuthStore(selectUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <section className="framed-section rounded-[2rem] px-5 py-6 sm:px-7 sm:py-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,240,255,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,51,102,0.16),transparent_30%)]" />
        <div className="relative flex flex-col gap-6">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(20rem,0.8fr)] xl:items-end">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="editorial-eyebrow">performance command overview</span>
                <div className="flex flex-col gap-3">
                  <h1 className="max-w-3xl text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
                    {getGreeting()}, {user?.name?.split(" ")[0] ?? "there"}
                  </h1>
                  <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                    {formatDate()} · Track acquisition velocity, revenue momentum, and operator
                    activity from one branded analytics deck.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <Card
                  variant="glass"
                  className="rounded-[1.5rem] border-primary/20 bg-background/60 px-4 py-4 shadow-[var(--glow-primary-sm)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                        live operators
                      </span>
                      <span className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                        573
                      </span>
                    </div>
                    <Activity className="size-5 text-primary" />
                  </div>
                </Card>

                <Card
                  variant="glass"
                  className="rounded-[1.5rem] border-secondary/20 bg-background/60 px-4 py-4 shadow-[var(--glow-secondary-sm)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                        revenue runway
                      </span>
                      <span className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                        +18.2%
                      </span>
                    </div>
                    <TrendingUp className="size-5 text-secondary" />
                  </div>
                </Card>

                <Card
                  variant="glass"
                  className="rounded-[1.5rem] border-border/70 bg-background/60 px-4 py-4 sm:col-span-2 xl:col-span-1"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                        pulse window
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        Growth AI stack updated 6 minutes ago
                      </span>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </div>
                </Card>
              </div>
            </div>

            <Card variant="glass" className="rounded-[1.75rem] border-border/70 p-0">
              <div className="border-b border-border/50 px-5 py-4">
                <span className="editorial-eyebrow">mission brief</span>
              </div>
              <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 xl:grid-cols-1">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                    top priority
                  </span>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Paid growth is outpacing user conversion. Shift focus toward onboarding
                    activation during the next optimization window.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                    next review
                  </span>
                  <p className="text-sm leading-6 text-muted-foreground">
                    KPI deltas and recent operator actions refresh automatically from the current
                    dashboard data sources.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => <KpiSkeleton key={`kpi-${index}`} />)
              : KPI_DATA.map((kpi, index) => (
                  <FadeInUp key={kpi.label} delay={index * 90}>
                    <KpiCard
                      icon={ICON_MAP[kpi.icon] ?? Activity}
                      label={kpi.label}
                      value={kpi.value}
                      change={kpi.change}
                      changeLabel={kpi.changeLabel}
                    />
                  </FadeInUp>
                ))}
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        {isLoading ? (
          <>
            <ChartSkeleton />
            <ChartSkeleton />
          </>
        ) : (
          <>
            <FadeInUp delay={200}>
              <RevenueChart />
            </FadeInUp>
            <FadeInUp delay={300}>
              <UserGrowthChart />
            </FadeInUp>
          </>
        )}
      </div>

      {isLoading ? (
        <ActivitySkeleton />
      ) : (
        <FadeInUp delay={400}>
          <RecentActivity />
        </FadeInUp>
      )}
    </div>
  );
}
