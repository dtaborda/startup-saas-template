"use client";

import { selectSidebarMobileOpen, useUiStore } from "@template/core";
import { Button, cn } from "@template/ui";
import { Bell, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NotificationList } from "../notifications";
import { Breadcrumbs } from "./breadcrumbs";

export function TopBar() {
  const sidebarMobileOpen = useUiStore(selectSidebarMobileOpen);
  const setSidebarMobileOpen = useUiStore((s) => s.setSidebarMobileOpen);
  const [hasUnread, setHasUnread] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // Determine if we have route depth (more than 1 segment → show nav buttons)
  const segments = pathname.split("/").filter(Boolean);
  const hasDepth = segments.length > 1;

  // Close on Escape
  useEffect(() => {
    if (!notificationsOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setNotificationsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [notificationsOpen]);

  function closeNotifications() {
    setNotificationsOpen(false);
  }

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border/60 px-4 md:px-6">
        {/* Mobile sidebar toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="size-8 shrink-0 md:hidden"
          onClick={() => setSidebarMobileOpen(!sidebarMobileOpen)}
          aria-label="Toggle navigation"
        >
          <Menu className="size-4" />
        </Button>

        {/* Back / Forward nav — only shown when route has depth */}
        {hasDepth && (
          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => router.back()}
              aria-label="Go back"
            >
              <ChevronLeft className="size-4" />
            </Button>
            {/* Forward button hidden on mobile — back-only UX */}
            <Button
              variant="ghost"
              size="icon"
              className="size-8 hidden md:inline-flex"
              onClick={() => router.forward()}
              aria-label="Go forward"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        )}

        {/* Breadcrumbs — takes available space */}
        <div className="min-w-0 flex-1">
          <Breadcrumbs />
        </div>

        {/* Notifications trigger */}
        <Button
          variant="ghost"
          size="icon"
          className="relative size-8 shrink-0"
          aria-label="Open notifications"
          onClick={() => setNotificationsOpen(true)}
        >
          <Bell className="size-4" />
          {hasUnread ? (
            <span className="absolute right-1 top-1 size-2 rounded-full bg-primary" />
          ) : null}
        </Button>
      </header>

      {/* Notifications overlay */}
      <button
        type="button"
        className={cn(
          "fixed inset-0 z-40 bg-background/80 transition-opacity duration-200",
          notificationsOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={closeNotifications}
        aria-label="Close notifications"
        tabIndex={notificationsOpen ? 0 : -1}
      />

      {/* Notifications drawer — slides from right */}
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-80 flex-col border-l border-border/60 bg-card transition-transform duration-300 ease-in-out",
          notificationsOpen ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Notifications panel"
      >
        <div className="flex items-center justify-between border-b border-border/50 px-4 py-4">
          <h2 className="text-sm font-semibold text-foreground">Notifications</h2>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-muted-foreground hover:text-foreground"
            onClick={closeNotifications}
            aria-label="Close notifications"
          >
            <X className="size-4" />
          </Button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          <NotificationList onUnreadCountChange={setHasUnread} />
        </div>
      </aside>
    </>
  );
}
