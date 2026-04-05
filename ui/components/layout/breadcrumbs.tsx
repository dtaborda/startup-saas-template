"use client";

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

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0] ? `/${segments[0]}` : "";
  const label = ROUTE_LABELS[pathname] ?? ROUTE_LABELS[firstSegment];

  if (!label) return null;

  return <h1 className="text-sm font-medium text-foreground">{label}</h1>;
}
