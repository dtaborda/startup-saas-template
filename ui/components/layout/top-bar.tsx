"use client";

import { selectSidebarMobileOpen, useUiStore } from "@template/core";
import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@template/ui";
import { Bell, Menu } from "lucide-react";
import { useState } from "react";
import { NotificationList } from "../notifications";
import { Breadcrumbs } from "./breadcrumbs";

export function TopBar() {
  const sidebarMobileOpen = useUiStore(selectSidebarMobileOpen);
  const setSidebarMobileOpen = useUiStore((s) => s.setSidebarMobileOpen);
  const [hasUnread, setHasUnread] = useState(true);

  return (
    <header className="flex h-12 items-center gap-3 border-b border-border/60 bg-background/70 px-3 backdrop-blur-xl">
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 md:hidden"
        onClick={() => setSidebarMobileOpen(!sidebarMobileOpen)}
        aria-label="Toggle navigation"
      >
        <Menu className="h-4 w-4" />
      </Button>

      <div className="min-w-0 flex-1">
        <Breadcrumbs />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative shrink-0"
            aria-label="Open notifications"
          >
            <Bell className="h-4 w-4" />
            {hasUnread ? (
              <span className="absolute right-1.5 top-1.5 inline-flex size-2 rounded-full bg-primary" />
            ) : null}
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="glass-strong flex w-full flex-col gap-0 border-l border-border/60 p-0 sm:max-w-md"
        >
          <SheetHeader className="border-b border-border/50 px-6 py-6 text-left">
            <SheetTitle className="text-xl font-semibold tracking-tight text-foreground">
              Notifications
            </SheetTitle>
            <SheetDescription>
              Track unread events, system updates, and assistant activity.
            </SheetDescription>
          </SheetHeader>
          <div className="min-h-0 flex-1 px-6 py-5">
            <NotificationList onUnreadCountChange={setHasUnread} />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
