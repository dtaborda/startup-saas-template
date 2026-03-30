"use client";

import { cn } from "@template/ui";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";

const ROUTE_LABELS: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/chat": "Chat",
  "/notifications": "Notifications",
  "/portfolio": "Portfolio",
  "/profile": "Profile",
};

export function Breadcrumbs() {
  const pathname = usePathname();

  // Match the full pathname or the first segment for nested routes
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0] ? `/${segments[0]}` : "";
  const label = ROUTE_LABELS[pathname] ?? ROUTE_LABELS[firstSegment];

  if (!label) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex min-w-0 flex-col gap-2">
      <span className="editorial-eyebrow">workspace context</span>
      <div className="flex min-w-0 items-center gap-2 text-sm">
        <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground">
          <Home className="h-3.5 w-3.5" />
        </span>
        <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground/60" />
        <span className={cn("truncate text-base font-semibold tracking-[-0.03em] text-foreground")}>
          {label}
        </span>
      </div>
    </nav>
  );
}
