"use client";

import type { ChatMessage } from "@template/contracts/chat";
import { ScrollArea } from "@template/ui";
import { MessageCircle, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { MessageBubble } from "./message-bubble";
import { StreamingIndicator } from "./streaming-indicator";

interface MessageListProps {
  messages: ChatMessage[];
  isStreaming?: boolean;
  streamingContent?: string;
  userAvatar?: string;
  userName?: string;
}

export function MessageList({
  messages,
  isStreaming = false,
  streamingContent,
  userAvatar,
  userName,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const isEmpty = messages.length === 0 && !isStreaming;
  const isWarmup = messages.length === 0 && isStreaming;

  return (
    <ScrollArea className="h-full">
      <div
        className="flex min-h-full flex-col px-4 py-5 md:px-6 md:py-6"
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {isEmpty ? <EmptyState /> : null}

        {isWarmup ? (
          <div className="flex flex-1 flex-col justify-center">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-[1.75rem] border border-primary/16 bg-background/32 px-6 py-8 text-center shadow-[0_0_2rem_oklch(0.88_0.156_204.5_/_0.1)]">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-primary/24 bg-primary/10 text-primary">
                <Sparkles className="size-6" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-mono text-[0.72rem] font-semibold tracking-[0.24em] text-primary uppercase">
                  Generation warming up
                </p>
                <h2 className="text-xl font-semibold tracking-[-0.03em] text-foreground">
                  The Growth AI workspace is drafting your response.
                </h2>
                <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
                  Hold the rail, review the brief, or stop the stream if you want to pivot the ask.
                </p>
              </div>
              <div className="mx-auto w-full max-w-2xl">
                <StreamingIndicator content={streamingContent} />
              </div>
            </div>
          </div>
        ) : null}

        {!isEmpty && !isWarmup ? (
          <ul className="mx-auto flex w-full max-w-4xl flex-col gap-5">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                userAvatar={userAvatar}
                userName={userName}
              />
            ))}

            {isStreaming ? (
              <li className="list-none">
                <StreamingIndicator content={streamingContent} />
              </li>
            ) : null}
          </ul>
        ) : null}

        <div ref={bottomRef} aria-hidden="true" />
      </div>
    </ScrollArea>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,oklch(0.954_0.01_286.2_/_0.035),transparent_22%),oklch(0.179_0.008_286.4_/_0.74)] px-6 py-10 text-center shadow-[0_1.75rem_4rem_oklch(0.05_0.004_286_/_0.36)] md:px-10 md:py-14">
        <div className="mx-auto flex size-18 items-center justify-center rounded-[1.7rem] border border-primary/20 bg-primary/10 text-primary shadow-[0_0_2rem_oklch(0.88_0.156_204.5_/_0.18)]">
          <MessageCircle className="size-8" />
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-[0.72rem] font-semibold tracking-[0.24em] text-primary uppercase">
            Transcript empty
          </p>
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground md:text-3xl">
            Start a conversation that moves the next growth decision forward.
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
            Ask for campaign strategy, teardown a portfolio, generate experiments, or debug an idea
            in public. This workspace keeps every prompt, reply, and streamed insight in one command
            center.
          </p>
        </div>

        <div className="grid gap-3 text-left md:grid-cols-3">
          {[
            "Plan a launch narrative",
            "Audit a funnel drop-off",
            "Generate a content sprint brief",
          ].map((prompt) => (
            <div
              key={prompt}
              className="rounded-2xl border border-white/8 bg-background/34 px-4 py-4"
            >
              <p className="font-mono text-[0.66rem] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                Suggested prompt
              </p>
              <p className="mt-2 text-sm text-foreground">{prompt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
