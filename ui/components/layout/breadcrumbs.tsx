"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MOCK_COURSES } from "@/components/portfolio/mock-data";

const ROUTE_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  chat: "Chat",
  notifications: "Notifications",
  portfolio: "Portfolio",
  profile: "Profile",
};

function resolveSegmentLabel(segment: string, index: number, segments: string[]): string {
  // If it's a known route segment, use its label
  if (ROUTE_LABELS[segment]) return ROUTE_LABELS[segment];

  // If it looks like a course ID (previous segment is "portfolio"), look it up
  if (index > 0 && segments[index - 1] === "portfolio") {
    const course = MOCK_COURSES.find((c) => c.id === segment);
    if (course) return course.title;
  }

  // Fallback: capitalize and de-slugify
  return segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  // Build breadcrumb items: always start from root (Dashboard implied by first segment)
  const crumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const label = resolveSegmentLabel(segment, index, segments);
    const isLast = index === segments.length - 1;

    return { href, label, isLast };
  });

  // Single segment — render as plain heading (no chevrons needed)
  if (crumbs.length === 1) {
    return <h1 className="text-sm font-medium text-foreground">{crumbs[0]?.label}</h1>;
  }

  // Multi-segment — render full breadcrumb trail
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1">
      {crumbs.map((crumb, index) => (
        <span key={crumb.href} className="flex items-center gap-1">
          {index > 0 && <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/50" />}
          {crumb.isLast ? (
            <span className="text-sm font-medium text-foreground line-clamp-1 max-w-[200px]">
              {crumb.label}
            </span>
          ) : (
            <Link
              href={crumb.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
