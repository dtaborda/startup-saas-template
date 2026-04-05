"use client";

import { useUiStore } from "@template/core";
import {
  Button,
  cn,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  useSidebar,
} from "@template/ui";
import {
  BriefcaseBusiness,
  ChevronsLeft,
  ChevronsRight,
  LayoutDashboard,
  MessageSquare,
  UserCircle,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const MAIN_NAV = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Portfolio", href: "/portfolio", icon: BriefcaseBusiness },
  { label: "Chat", href: "/chat", icon: MessageSquare },
] as const;

const FOOTER_NAV = { label: "Profile", href: "/profile", icon: UserCircle } as const;

interface AppSidebarProps {
  /** Called when the sidebar should close (mobile drawer mode). */
  onClose?: () => void;
}

export function AppSidebar({ onClose }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { collapsed } = useSidebar();
  const setSidebarCollapsed = useUiStore((s) => s.setSidebarCollapsed);

  const isMobile = Boolean(onClose);

  const handleToggle = () => {
    if (isMobile) {
      onClose?.();
    } else {
      setSidebarCollapsed(!collapsed);
    }
  };

  const handleNavigate = (href: string) => {
    router.push(href);
    // Always close the drawer on mobile after navigating
    onClose?.();
  };

  return (
    <Sidebar className="border-r border-border/60 bg-card">
      <SidebarHeader className="flex-row items-center justify-between gap-2 px-3 py-3">
        {!collapsed && (
          <span className="font-mono text-sm font-bold tracking-tight text-foreground">
            <span className="text-primary">growth</span>
            <span className="text-muted-foreground">-ai</span>
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="size-7 shrink-0 text-muted-foreground hover:text-foreground"
          onClick={handleToggle}
          aria-label={isMobile ? "Close menu" : collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isMobile ? (
            <X className="size-4" />
          ) : collapsed ? (
            <ChevronsRight className="size-4" />
          ) : (
            <ChevronsLeft className="size-4" />
          )}
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        <SidebarGroup className="py-0">
          <div className="flex flex-col gap-0.5">
            {MAIN_NAV.map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <SidebarItem
                  key={item.href}
                  variant="default"
                  icon={<item.icon className="size-4" />}
                  label={item.label}
                  className={cn(
                    "rounded-md border border-transparent py-2 text-sm text-muted-foreground",
                    isActive && "border-border/60 bg-background text-foreground",
                    !isActive && "hover:bg-background/60 hover:text-foreground",
                  )}
                  onClick={() => handleNavigate(item.href)}
                />
              );
            })}
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 px-2 py-2">
        <SidebarItem
          variant="default"
          icon={<FOOTER_NAV.icon className="size-4" />}
          label={FOOTER_NAV.label}
          className={cn(
            "rounded-md border border-transparent py-2 text-sm text-muted-foreground",
            pathname.startsWith(FOOTER_NAV.href) &&
              "border-border/60 bg-background text-foreground",
            !pathname.startsWith(FOOTER_NAV.href) && "hover:bg-background/60 hover:text-foreground",
          )}
          onClick={() => handleNavigate(FOOTER_NAV.href)}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
