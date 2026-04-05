import { cn } from "@template/ui/lib/utils";
import type { HTMLAttributes } from "react";

const LOGO_VARIANTS = {
  COMPACT: "compact",
  FULL: "full",
} as const;

type LogoVariant = (typeof LOGO_VARIANTS)[keyof typeof LOGO_VARIANTS];

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  variant?: LogoVariant;
  showEyebrow?: boolean;
}

export function Logo({
  className,
  variant = LOGO_VARIANTS.FULL,
  showEyebrow = false,
  ...props
}: LogoProps) {
  const isCompact = variant === LOGO_VARIANTS.COMPACT;

  return (
    <div className={cn("inline-flex items-center gap-2", className)} {...props}>
      <span
        aria-hidden="true"
        className="flex size-8 items-center justify-center rounded-lg border border-primary/25 bg-card text-primary"
      >
        <span className="font-mono text-sm font-bold tracking-[-0.14em]">
          <span>g</span>
          <span className="text-foreground">/</span>
          <span className="text-secondary">a</span>
        </span>
      </span>

      {!isCompact ? (
        <span className="flex flex-col">
          {showEyebrow ? (
            <span className="text-[0.6rem] uppercase tracking-wider text-muted-foreground">
              signal stack
            </span>
          ) : null}
          <span className="font-mono text-sm font-bold tracking-tight text-foreground">
            <span className="text-primary">growth</span>
            <span className="text-foreground">-ai</span>
          </span>
        </span>
      ) : null}
    </div>
  );
}

export { LOGO_VARIANTS };
