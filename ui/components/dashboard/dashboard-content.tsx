"use client";

import { selectUser, useAuthStore } from "@template/core";
import { Card, Skeleton } from "@template/ui";
import { Activity, DollarSign, type LucideIcon, TrendingUp, Users } from "lucide-react";
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
    month: "long",
    day: "numeric",
  });
}

function KpiSkeleton() {
  return (
    <Card className="overflow-hidden p-0">
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="size-10 rounded-lg" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-28" />
        </div>
      </div>
    </Card>
  );
}

function ChartSkeleton() {
  return (
    <Card className="overflow-hidden p-0">
      <div className="flex flex-col gap-4 p-5">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-[260px] w-full rounded-lg" />
      </div>
    </Card>
  );
}

function ActivitySkeleton() {
  return (
    <Card className="overflow-hidden p-0">
      <div className="flex flex-col gap-4 p-5">
        <Skeleton className="h-5 w-40" />
        <div className="grid gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={`activity-skeleton-${index}`} className="h-12 w-full rounded-lg" />
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
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {getGreeting()}, {user?.name?.split(" ")[0] ?? "there"}
        </h1>
        <p className="text-sm text-muted-foreground">{formatDate()}</p>
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
