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
  const markStyle = {
    boxShadow: "var(--glow-primary-sm)",
  };

  return (
    <div className={cn("inline-flex items-center gap-3", className)} {...props}>
      <span
        aria-hidden="true"
        className="relative flex size-11 items-center justify-center overflow-hidden rounded-2xl border border-primary/25 bg-card text-primary"
        style={markStyle}
      >
        <span className="absolute inset-[1px] rounded-[calc(1rem-2px)] bg-linear-to-br from-primary/18 via-transparent to-secondary/18" />
        <span className="absolute inset-x-2 top-2 h-px bg-linear-to-r from-transparent via-primary/80 to-transparent" />
        <span className="relative font-mono text-lg font-bold tracking-[-0.14em]">
          <span>g</span>
          <span className="-ml-0.5 text-foreground">/</span>
          <span className="-ml-0.5 text-secondary">a</span>
        </span>
      </span>

      {!isCompact ? (
        <span className="flex flex-col gap-1">
          {showEyebrow ? <span className="editorial-eyebrow">signal stack</span> : null}
          <span className="font-mono text-lg font-bold tracking-[-0.06em] text-foreground sm:text-xl">
            <span className="text-primary">growth</span>
            <span className="text-foreground">-ai</span>
          </span>
        </span>
      ) : null}
    </div>
  );
}

export { LOGO_VARIANTS };
