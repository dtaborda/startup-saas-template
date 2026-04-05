import { cn } from "@template/ui";
import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  /**
   * When true, the container fills all available height (h-full)
   * and removes max-width constraint. Use for chat, canvas, or editor layouts.
   */
  fullHeight?: boolean;
}

/**
 * Standard page wrapper for all (app) pages.
 * Provides consistent padding and spacing.
 *
 * - Default mode: max-w-7xl centered, vertical gap between sections.
 * - fullHeight mode: fills available space, no max-width (for chat/canvas/editor).
 *
 * Convention: every new (app) page MUST use <PageContainer>.
 */
export function PageContainer({ children, className, fullHeight = false }: PageContainerProps) {
  return (
    <div
      className={cn(
        "flex flex-col p-4 md:p-6",
        fullHeight ? "h-full" : "mx-auto w-full max-w-7xl gap-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
