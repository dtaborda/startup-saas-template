"use client";

import { selectSidebarCollapsed, selectSidebarMobileOpen, useUiStore } from "@template/core";
import { cn, SidebarProvider } from "@template/ui";
import { useEffect } from "react";
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

  // Close mobile sidebar on window resize past md breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarMobileOpen]);

  // Close mobile sidebar on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarMobileOpen) {
        setSidebarMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sidebarMobileOpen, setSidebarMobileOpen]);

  // Keyboard shortcut: Ctrl+B / Cmd+B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        // Skip if user is typing in an input, textarea, or contenteditable
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
        <div className="relative flex h-screen overflow-hidden bg-background text-foreground">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,oklch(0.88_0.156_204.5_/_0.12),transparent_32%),radial-gradient(circle_at_top_right,oklch(0.673_0.246_14.4_/_0.1),transparent_28%),linear-gradient(180deg,oklch(0.179_0.008_286.4),oklch(0.118_0.004_286))]" />
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(oklch(0.954_0.01_286.2_/_0.035)_1px,transparent_1px),linear-gradient(90deg,oklch(0.954_0.01_286.2_/_0.035)_1px,transparent_1px)] [background-position:center] [background-size:4.5rem_4.5rem]" />

          <div className="relative z-10 hidden h-full p-3 md:flex md:pb-4">
            <AppSidebar />
          </div>

          <button
            type="button"
            className={cn(
              "fixed inset-0 z-40 bg-background/88 backdrop-blur-sm transition-opacity duration-300 md:hidden",
              sidebarMobileOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none",
            )}
            onClick={() => setSidebarMobileOpen(false)}
            aria-label="Close navigation menu"
            tabIndex={sidebarMobileOpen ? 0 : -1}
          />

          <div
            className={cn(
              "fixed inset-y-0 left-0 z-50 w-[280px] p-3 transition-transform duration-300 ease-in-out md:hidden",
              sidebarMobileOpen ? "translate-x-0" : "-translate-x-full",
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <AppSidebar />
          </div>

          <div className="relative z-10 flex min-w-0 flex-1 flex-col overflow-hidden">
            <TopBar />
            <main className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-0 md:px-6 md:pb-6">
              <div className="framed-section min-h-full rounded-[2rem] px-4 py-5 md:px-6 md:py-6">
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}
