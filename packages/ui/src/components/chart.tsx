"use client";

import { type ComponentProps, forwardRef } from "react";
import {
  Legend as RechartsLegend,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "../lib/utils";

/* -------------------------------------------------------------------------- */
/*  Chart Config                                                              */
/* -------------------------------------------------------------------------- */

export interface ChartConfig {
  [key: string]: {
    label?: string;
    icon?: React.ComponentType;
    color?: string;
    theme?: {
      light: string;
      dark: string;
    };
  };
}

/* -------------------------------------------------------------------------- */
/*  ChartContainer                                                            */
/* -------------------------------------------------------------------------- */

interface ChartContainerProps extends ComponentProps<"div"> {
  config: ChartConfig;
  children: ComponentProps<typeof ResponsiveContainer>["children"];
}

const ChartContainer = forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ id, className, children, config, ...props }, ref) => {
    const chartId = id ?? "chart";

    return (
      <div
        ref={ref}
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    );
  },
);
ChartContainer.displayName = "ChartContainer";

/* -------------------------------------------------------------------------- */
/*  ChartStyle (CSS custom properties for chart colors)                       */
/* -------------------------------------------------------------------------- */

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(([, cfg]) => cfg.color ?? cfg.theme);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
[data-chart=${id}] {
${colorConfig
  .map(([key, cfg]) => {
    const color = cfg.color ?? cfg.theme?.dark;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .filter(Boolean)
  .join("\n")}
}
`,
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  ChartTooltip & ChartTooltipContent                                        */
/* -------------------------------------------------------------------------- */

const ChartTooltip = RechartsTooltip;

interface ChartTooltipContentProps extends ComponentProps<typeof RechartsTooltip> {
  className?: string;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "line" | "dot" | "dashed";
  nameKey?: string;
  labelKey?: string;
}

const ChartTooltipContent = forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelKey,
      nameKey,
    },
    ref,
  ) => {
    if (!active || !payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-card px-2.5 py-1.5 text-xs shadow-xl",
          className,
        )}
      >
        {!hideLabel && label && <div className="font-medium">{labelKey ?? label}</div>}
        <div className="grid gap-1.5">
          {payload.map((item) => {
            const key = `${nameKey ?? item.dataKey ?? item.name ?? "value"}`;
            const indicatorColor = item.color ?? item.payload?.fill;

            return (
              <div
                key={item.dataKey}
                className="flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground"
              >
                {!hideIndicator && (
                  <div
                    className={cn(
                      "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                      indicator === "dot" && "h-2.5 w-2.5",
                      indicator === "line" && "w-1",
                      indicator === "dashed" && "w-0 border-[1.5px] border-dashed bg-transparent",
                    )}
                    style={
                      {
                        "--color-bg": indicatorColor,
                        "--color-border": indicatorColor,
                      } as React.CSSProperties
                    }
                  />
                )}
                <div className="flex flex-1 justify-between leading-none">
                  <div className="grid gap-1.5">
                    <span className="text-muted-foreground">{key}</span>
                  </div>
                  {item.value !== undefined && (
                    <span className="font-mono font-medium tabular-nums text-foreground">
                      {item.value.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
ChartTooltipContent.displayName = "ChartTooltipContent";

/* -------------------------------------------------------------------------- */
/*  ChartLegend & ChartLegendContent                                          */
/* -------------------------------------------------------------------------- */

const ChartLegend = RechartsLegend;

interface ChartLegendContentProps extends ComponentProps<"div"> {
  payload?: Array<{
    value: string;
    type?: string;
    color?: string;
    dataKey?: string;
  }>;
  nameKey?: string;
  hideIcon?: boolean;
}

const ChartLegendContent = forwardRef<HTMLDivElement, ChartLegendContentProps>(
  ({ className, hideIcon = false, payload, nameKey }, ref) => {
    if (!payload?.length) {
      return null;
    }

    return (
      <div ref={ref} className={cn("flex items-center justify-center gap-4", className)}>
        {payload.map((item) => (
          <div
            key={item.value}
            className="flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
          >
            {!hideIcon && item.color && (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{ backgroundColor: item.color }}
              />
            )}
            <span className="text-muted-foreground">
              {nameKey ? ((item as Record<string, unknown>)[nameKey] as string) : item.value}
            </span>
          </div>
        ))}
      </div>
    );
  },
);
ChartLegendContent.displayName = "ChartLegendContent";

export {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
};
