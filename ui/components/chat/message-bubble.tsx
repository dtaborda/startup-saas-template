"use client";

import type { ChatMessage, RagSource } from "@template/contracts/chat";
import { MESSAGE_ROLE } from "@template/contracts/chat";
import { Avatar, AvatarFallback, AvatarImage, Button, cn } from "@template/ui";
import { Bot, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Fragment, useState } from "react";

interface MessageBubbleProps {
  message: ChatMessage;
  userAvatar?: string;
  userName?: string;
}

export function MessageBubble({ message, userAvatar, userName }: MessageBubbleProps) {
  const isUser = message.role === MESSAGE_ROLE.USER;
  const hasSources = message.sources && message.sources.length > 0;

  const initials = userName
    ? userName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "OP";

  return (
    <li
      className={cn(
        "flex w-full list-none gap-3 md:gap-4",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      <article
        className={cn(
          "flex max-w-[92%] gap-3 md:max-w-[82%]",
          isUser ? "flex-row-reverse" : "flex-row",
        )}
      >
        <div className="mt-1 shrink-0">
          {isUser ? (
            <Avatar className="size-10 border border-secondary/18 bg-secondary/12">
              {userAvatar ? <AvatarImage src={userAvatar} alt={userName} /> : null}
              <AvatarFallback className="bg-secondary/14 font-mono text-xs text-secondary">
                {initials}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex size-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-[0_0_1.25rem_oklch(0.88_0.156_204.5_/_0.16)]">
              <Bot className="size-4" />
            </div>
          )}
        </div>

        <div
          className={cn(
            "min-w-0 flex-1 rounded-[1.5rem] border px-4 py-4 md:px-5",
            isUser
              ? "border-secondary/20 bg-[linear-gradient(135deg,oklch(0.673_0.246_14.4_/_0.18),oklch(0.255_0.03_241.5_/_0.9))] text-foreground shadow-[0_1rem_2rem_oklch(0.673_0.246_14.4_/_0.14)]"
              : "glass-strong rounded-bl-[0.55rem] border-primary/14 bg-[linear-gradient(180deg,oklch(0.954_0.01_286.2_/_0.04),transparent_20%),oklch(0.2_0.012_286.8_/_0.82)] text-foreground",
          )}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "font-mono text-[0.66rem] font-semibold tracking-[0.2em] uppercase",
                isUser ? "text-secondary-foreground/72" : "text-primary/88",
              )}
            >
              {isUser ? "Operator" : "Growth AI"}
            </span>
            <span className="font-mono text-[0.66rem] text-muted-foreground">
              {formatTime(message.createdAt)}
            </span>
          </div>

          <div className="mt-3 text-sm leading-7 text-foreground/92">
            <FormattedContent content={message.content} isUser={isUser} />
          </div>

          {!isUser && hasSources ? (
            <SourcesSection sources={message.sources as RagSource[]} />
          ) : null}
        </div>
      </article>
    </li>
  );
}

interface FormattedContentProps {
  content: string;
  isUser: boolean;
}

function FormattedContent({ content, isUser }: FormattedContentProps) {
  const blocks = content.split(/(```[\s\S]*?```)/g).filter(Boolean);

  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, index) => {
        if (block.startsWith("```") && block.endsWith("```")) {
          const raw = block.slice(3, -3);
          const trimmed = raw.replace(/^\n/, "");
          const firstLineBreak = trimmed.indexOf("\n");
          const language =
            firstLineBreak === -1 ? "text" : trimmed.slice(0, firstLineBreak).trim() || "text";
          const code = firstLineBreak === -1 ? trimmed : trimmed.slice(firstLineBreak + 1);

          return (
            <div
              key={`${language}-${index}`}
              className="overflow-hidden rounded-2xl border border-white/10 bg-background/70"
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/8 px-4 py-2">
                <span className="font-mono text-[0.66rem] font-semibold tracking-[0.2em] text-primary uppercase">
                  {language}
                </span>
                <span className="font-mono text-[0.66rem] text-muted-foreground uppercase">
                  code block
                </span>
              </div>
              <pre className="overflow-x-auto px-4 py-4 font-mono text-[0.82rem] leading-6 text-foreground/92">
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        return (
          <div key={`text-${index}`} className="whitespace-pre-wrap break-words">
            {renderInlineContent(block, isUser)}
          </div>
        );
      })}
    </div>
  );
}

function renderInlineContent(content: string, isUser: boolean) {
  const parts = content.split(/(\*\*.*?\*\*|`[^`]+`|\[.*?\]\(.*?\))/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`bold-${index}`} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={`code-${index}`}
          className={cn(
            "rounded-md border px-1.5 py-0.5 font-mono text-[0.8rem]",
            isUser
              ? "border-white/12 bg-black/18 text-white"
              : "border-primary/12 bg-background/58 text-primary",
          )}
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
    if (linkMatch) {
      return (
        <a
          key={`link-${index}`}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
        >
          {linkMatch[1]}
        </a>
      );
    }

    return <Fragment key={`text-${index}`}>{part}</Fragment>;
  });
}

function SourcesSection({ sources }: { sources: RagSource[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4 border-t border-white/8 pt-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(!open)}
        className="h-auto gap-2 rounded-full border border-white/8 bg-background/24 px-3 py-1.5 font-mono text-[0.68rem] tracking-[0.18em] text-muted-foreground uppercase hover:bg-background/42 hover:text-foreground"
      >
        {open ? <ChevronUp data-icon="inline-start" /> : <ChevronDown data-icon="inline-start" />}
        {sources.length} source{sources.length === 1 ? "" : "s"}
      </Button>

      {open ? (
        <ul className="mt-3 flex flex-col gap-3">
          {sources.map((source, index) => (
            <li
              key={`${source.title}-${index}`}
              className="rounded-2xl border border-white/8 bg-background/40 px-4 py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{source.title}</p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{source.snippet}</p>
                </div>

                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-primary/18 bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/16"
                    aria-label={`Open source ${source.title}`}
                  >
                    <ExternalLink className="size-3.5" />
                  </a>
                ) : null}
              </div>

              {source.relevance != null ? (
                <p className="mt-3 font-mono text-[0.68rem] tracking-[0.18em] text-primary uppercase">
                  Relevance {Math.round(source.relevance * 100)}%
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function formatTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}
