"use client";

import type { ChatSession } from "@template/contracts/chat";
import { Button, cn, ScrollArea } from "@template/ui";
import { MessageSquare, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PAGE_SIZE = 10;

interface SessionListProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSessionSelect: (id: string) => void;
  onNewSession: () => void;
  onDeleteSession: (id: string) => void;
}

export function SessionList({
  sessions,
  activeSessionId,
  onSessionSelect,
  onNewSession,
  onDeleteSession,
}: SessionListProps) {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const timeoutRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  const handleDelete = (sessionId: string) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    if (confirmDelete === sessionId) {
      onDeleteSession(sessionId);
      setConfirmDelete(null);
      timeoutRef.current = null;
      return;
    }

    setConfirmDelete(sessionId);
    timeoutRef.current = window.setTimeout(() => {
      setConfirmDelete(null);
      timeoutRef.current = null;
    }, 3000);
  };

  const visibleSessions = sessions.slice(0, visibleCount);
  const hasMore = sessions.length > visibleCount;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 py-4">
      <Button
        variant="outline"
        onClick={onNewSession}
        className="h-12 justify-start gap-3 rounded-xl border-primary/16 bg-background text-foreground hover:border-primary/34 hover:bg-primary/10"
      >
        <Plus data-icon="inline-start" />
        <span className="font-medium">Open new workspace</span>
      </Button>

      <div className="flex items-center justify-between px-1">
        <p className="font-mono text-[0.68rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          Recent sessions
        </p>
        <span className="font-mono text-xs text-muted-foreground">{sessions.length}</span>
      </div>

      <ScrollArea className="max-h-[calc(100vh-16rem)]">
        <div className="flex flex-col gap-2 pr-1">
          {visibleSessions.map((session) => {
            const isActive = session.id === activeSessionId;
            const isConfirming = confirmDelete === session.id;

            return (
              <div
                key={session.id}
                className={cn(
                  "group relative overflow-hidden rounded-xl border px-3 py-3 transition-all duration-200",
                  isActive
                    ? "border-primary/30 bg-primary/10"
                    : "border-border/40 bg-background hover:border-border/70",
                )}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute inset-y-3 left-0 w-px rounded-full",
                    isActive ? "bg-primary" : "bg-transparent",
                  )}
                />

                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => onSessionSelect(session.id)}
                    className="flex min-w-0 flex-1 items-start gap-3 text-left"
                  >
                    <div
                      className={cn(
                        "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border",
                        isActive
                          ? "border-primary/26 bg-primary/12 text-primary"
                          : "border-border/60 bg-background text-muted-foreground",
                      )}
                    >
                      <MessageSquare className="size-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {session.title}
                        </p>
                        {isActive ? (
                          <span className="rounded-full border border-primary/18 bg-primary/10 px-2 py-0.5 font-mono text-[0.62rem] font-semibold tracking-[0.18em] text-primary uppercase">
                            Live
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 font-mono text-[0.68rem] tracking-[0.18em] text-muted-foreground uppercase">
                        {session.messageCount} message{session.messageCount === 1 ? "" : "s"}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Updated {formatRelativeTime(session.updatedAt)}
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDelete(session.id);
                    }}
                    className={cn(
                      "rounded-xl border p-2 text-muted-foreground transition-all duration-200",
                      isConfirming
                        ? "border-destructive/30 bg-destructive/12 text-destructive opacity-100"
                        : "border-transparent bg-transparent opacity-0 group-hover:opacity-100 hover:border-destructive/20 hover:bg-destructive/10 hover:text-destructive focus-visible:opacity-100",
                    )}
                    aria-label={isConfirming ? "Confirm delete" : "Delete session"}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                {isConfirming ? (
                  <p className="mt-3 font-mono text-[0.68rem] tracking-[0.18em] text-destructive uppercase">
                    Tap delete again to confirm
                  </p>
                ) : null}
              </div>
            );
          })}

          {hasMore && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-muted-foreground hover:text-foreground"
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            >
              Load more ({sessions.length - visibleCount} remaining)
            </Button>
          )}

          {sessions.length === 0 ? (
            <div className="flex flex-col gap-3 rounded-xl border border-dashed border-border/60 bg-background px-4 py-6 text-center">
              <p className="font-mono text-[0.68rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                Empty rail
              </p>
              <p className="text-sm text-foreground">No conversations yet.</p>
              <p className="text-xs text-muted-foreground">
                Start a fresh workspace to capture prompts, ideas, and execution notes.
              </p>
            </div>
          ) : null}
        </div>
      </ScrollArea>
    </div>
  );
}

function formatRelativeTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    const now = Date.now();
    const diffMs = now - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);

    if (diffMin < 1) return "just now";
    if (diffMin < 60) return `${diffMin}m ago`;

    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}
