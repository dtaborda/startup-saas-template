"use client";

import { useUiStore } from "@template/core";
import {
  Button,
  cn,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  useSidebar,
} from "@template/ui";
import {
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  MessageSquare,
  UserCircle,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { LOGO_VARIANTS, Logo } from "../shared/logo";

const NAV_ITEMS = [
  { label: "Chat", href: "/chat", icon: MessageSquare },
  { label: "Portfolio", href: "/portfolio", icon: BriefcaseBusiness },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/profile", icon: UserCircle },
] as const;

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { collapsed } = useSidebar();
  const setSidebarCollapsed = useUiStore((s) => s.setSidebarCollapsed);

  const handleToggle = () => {
    setSidebarCollapsed(!collapsed);
  };

  return (
    <Sidebar className="border-r border-border/60 bg-background/75">
      <SidebarHeader className="flex-row items-center justify-between gap-2 px-3 py-3">
        {!collapsed && (
          <Logo variant={LOGO_VARIANTS.FULL} showEyebrow={false} className="min-w-0 flex-1" />
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
          onClick={handleToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </SidebarHeader>

      <Separator className="opacity-50" />

      <SidebarContent className="px-2 py-3">
        <SidebarGroup className="py-0">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <SidebarItem
                  key={item.href}
                  variant="default"
                  icon={<item.icon className="h-4 w-4" />}
                  label={item.label}
                  className={cn(
                    "rounded-lg border border-transparent bg-transparent py-2 text-muted-foreground",
                    isActive &&
                      "border-primary/25 bg-primary/12 text-primary shadow-[var(--glow-primary-sm)]",
                    !isActive &&
                      "hover:border-border/70 hover:bg-background/80 hover:text-foreground",
                  )}
                  onClick={() => router.push(item.href)}
                />
              );
            })}
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
