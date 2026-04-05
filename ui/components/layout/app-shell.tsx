"use client";

import { selectSidebarCollapsed, selectSidebarMobileOpen, useUiStore } from "@template/core";
import { cn, SidebarProvider } from "@template/ui";
import { useCallback, useEffect } from "react";
import { AuthGuard } from "@/components/auth";
import { AppSidebar } from "./app-sidebar";
import { TopBar } from "./top-bar";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const sidebarCollapsed = useUiStore(selectSidebarCollapsed);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const sidebarMobileOpen = useUiStore(selectSidebarMobileOpen);
  const setSidebarMobileOpen = useUiStore((s) => s.setSidebarMobileOpen);

  const closeMobileSidebar = useCallback(() => {
    setSidebarMobileOpen(false);
  }, [setSidebarMobileOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarMobileOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarMobileOpen) {
        setSidebarMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sidebarMobileOpen, setSidebarMobileOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        const target = e.target as HTMLElement;
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        ) {
          return;
        }
        e.preventDefault();
        useUiStore.getState().toggleSidebar();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AuthGuard>
      <SidebarProvider collapsed={sidebarCollapsed} onCollapsedChange={toggleSidebar}>
        <div className="flex h-screen overflow-hidden bg-background text-foreground">
          {/* Desktop sidebar — width transitions with collapse */}
          <div
            className={cn(
              "hidden shrink-0 transition-[width] duration-300 md:flex",
              sidebarCollapsed ? "w-14" : "w-64",
            )}
          >
            <AppSidebar />
          </div>

          {/* Mobile overlay */}
          <button
            type="button"
            className={cn(
              "fixed inset-0 z-40 bg-background/80 transition-opacity duration-200 md:hidden",
              sidebarMobileOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none",
            )}
            onClick={closeMobileSidebar}
            aria-label="Close navigation menu"
            tabIndex={sidebarMobileOpen ? 0 : -1}
          />

          {/* Mobile sidebar drawer — onClose closes the drawer */}
          <div
            className={cn(
              "fixed inset-y-0 left-0 z-50 w-[280px] transition-transform duration-300 ease-in-out md:hidden",
              sidebarMobileOpen ? "translate-x-0" : "-translate-x-full",
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <AppSidebar onClose={closeMobileSidebar} />
          </div>

          {/* Main content area */}
          <div className="flex min-w-0 flex-1 flex-col">
            <TopBar />
            <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}
