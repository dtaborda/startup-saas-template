"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { PanelLeft } from "lucide-react";
import { createContext, forwardRef, type ReactNode, useContext, useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

/* -------------------------------------------------------------------------- */
/*  Context                                                                   */
/* -------------------------------------------------------------------------- */

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

/* -------------------------------------------------------------------------- */
/*  Provider                                                                  */
/* -------------------------------------------------------------------------- */

interface SidebarProviderProps {
  children: ReactNode;
  /** Controlled mode: sidebar collapsed state managed externally (e.g. Zustand). */
  collapsed?: boolean;
  /** Uncontrolled mode: initial collapsed state (used when `collapsed` prop is not provided). */
  defaultCollapsed?: boolean;
  /** Called whenever the collapsed state changes. Use to sync external state. */
  onCollapsedChange?: (collapsed: boolean) => void;
}

function SidebarProvider({
  children,
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onCollapsedChange,
}: SidebarProviderProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);

  // Controlled mode: use external prop; uncontrolled mode: use internal state
  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const toggle = () => {
    const next = !collapsed;
    if (controlledCollapsed === undefined) {
      setInternalCollapsed(next);
    }
    onCollapsedChange?.(next);
  };

  const setCollapsed = (value: boolean) => {
    if (controlledCollapsed === undefined) {
      setInternalCollapsed(value);
    }
    onCollapsedChange?.(value);
  };

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, toggle }}>
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </SidebarContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sidebar Root                                                              */
/* -------------------------------------------------------------------------- */

const Sidebar = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    const { collapsed } = useSidebar();

    return (
      <aside
        ref={ref}
        data-collapsed={collapsed}
        className={cn(
          "group flex h-full w-full flex-col overflow-hidden transition-[width] duration-300",
          collapsed && "!w-14",
          className,
        )}
        {...props}
      />
    );
  },
);
Sidebar.displayName = "Sidebar";

/* -------------------------------------------------------------------------- */
/*  SidebarHeader / Content / Footer                                          */
/* -------------------------------------------------------------------------- */

const SidebarHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-2 px-4 py-3", className)} {...props} />
  ),
);
SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 overflow-y-auto px-2 py-2", className)} {...props} />
  ),
);
SidebarContent.displayName = "SidebarContent";

const SidebarFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mt-auto px-4 py-3", className)} {...props} />
  ),
);
SidebarFooter.displayName = "SidebarFooter";

/* -------------------------------------------------------------------------- */
/*  SidebarToggle                                                             */
/* -------------------------------------------------------------------------- */

const SidebarToggle = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { toggle } = useSidebar();

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn("h-8 w-8", className)}
        onClick={toggle}
        {...props}
      >
        <PanelLeft className="h-4 w-4" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
    );
  },
);
SidebarToggle.displayName = "SidebarToggle";

/* -------------------------------------------------------------------------- */
/*  SidebarItem                                                               */
/* -------------------------------------------------------------------------- */

const sidebarItemVariants = cva(
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        active: "bg-accent text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface SidebarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarItemVariants> {
  icon?: React.ReactNode;
  label?: string;
}

const SidebarItem = forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, variant, icon, label, children, ...props }, ref) => {
    const { collapsed } = useSidebar();

    if (collapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              ref={ref}
              className={cn(sidebarItemVariants({ variant }), "justify-center px-2", className)}
              {...props}
            >
              {icon}
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">{label ?? children}</TooltipContent>
        </Tooltip>
      );
    }

    return (
      <button ref={ref} className={cn(sidebarItemVariants({ variant }), className)} {...props}>
        {icon}
        <span className="truncate">{label ?? children}</span>
      </button>
    );
  },
);
SidebarItem.displayName = "SidebarItem";

/* -------------------------------------------------------------------------- */
/*  SidebarGroup                                                              */
/* -------------------------------------------------------------------------- */

interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, label, children, ...props }, ref) => {
    const { collapsed } = useSidebar();

    return (
      <div ref={ref} className={cn("py-2", className)} {...props}>
        {label && !collapsed && (
          <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {label}
          </div>
        )}
        <div className="flex flex-col gap-0.5">{children}</div>
      </div>
    );
  },
);
SidebarGroup.displayName = "SidebarGroup";

export {
  Sidebar,
  SidebarContent,
  SidebarContext,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarProvider,
  SidebarToggle,
  sidebarItemVariants,
  useSidebar,
};
