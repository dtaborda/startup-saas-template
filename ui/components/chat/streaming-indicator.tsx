"use client";

import { Bot, Sparkles } from "lucide-react";

interface StreamingIndicatorProps {
  content?: string;
}

export function StreamingIndicator({ content }: StreamingIndicatorProps) {
  return (
    <output className="flex w-full justify-start" aria-label="Assistant is responding">
      <div className="glass-strong flex w-full max-w-[92%] gap-3 rounded-[1.5rem] rounded-bl-[0.6rem] border border-primary/16 px-4 py-4 md:max-w-[82%]">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
          <Bot className="size-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[0.66rem] font-semibold tracking-[0.2em] text-primary uppercase">
              Growth AI live
            </span>
            <span className="font-mono text-[0.66rem] text-muted-foreground uppercase">
              streaming
            </span>
          </div>

          {content ? (
            <div className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-foreground/92">
              {content}
              <span className="ml-1 inline-flex items-center text-primary">
                <Sparkles className="size-3.5 animate-pulse" />
              </span>
            </div>
          ) : (
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <ThinkingDots />
              <span>Drafting the next response...</span>
            </div>
          )}
        </div>
      </div>
    </output>
  );
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1 py-1 text-primary">
      <span
        className="size-2 animate-bounce rounded-full bg-current"
        style={{ animationDelay: "0ms" }}
      />
      <span
        className="size-2 animate-bounce rounded-full bg-current"
        style={{ animationDelay: "150ms" }}
      />
      <span
        className="size-2 animate-bounce rounded-full bg-current"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  );
}
