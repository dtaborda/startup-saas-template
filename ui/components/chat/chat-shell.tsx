"use client";

import { selectUser, useAuthStore } from "@template/core";
import { Badge, Button, cn } from "@template/ui";
import { Bot, Menu, PanelLeftClose, Plus, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { Logo } from "@/components/shared/logo";
import { useChatStream } from "@/hooks/use-chat-stream";
import {
  selectActiveMessages,
  selectIsLoading,
  selectIsStreaming,
  useChatStore,
} from "@/stores/chat-store";
import { ChatComposer } from "./chat-composer";
import { MessageList } from "./message-list";
import { SessionList } from "./session-list";

export function ChatShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useAuthStore(selectUser);

  const {
    sessions,
    activeSessionId,
    streamingContent,
    error,
    createSession,
    selectSession,
    deleteSession,
    clearError,
  } = useChatStore(
    useShallow((state) => ({
      sessions: state.sessions,
      activeSessionId: state.activeSessionId,
      streamingContent: state.streamingContent,
      error: state.error,
      createSession: state.createSession,
      selectSession: state.selectSession,
      deleteSession: state.deleteSession,
      clearError: state.clearError,
    })),
  );

  const messages = useChatStore(useShallow(selectActiveMessages));
  const isLoading = useChatStore(selectIsLoading);
  const isStreaming = useChatStore(selectIsStreaming);

  const { sendMessage, stopStreaming } = useChatStream();

  const activeSession = sessions.find((session) => session.id === activeSessionId) ?? null;
  const hasMessages = messages.length > 0;

  const handleNewSession = () => {
    createSession();
    setSidebarOpen(false);
  };

  const handleSessionSelect = (sessionId: string) => {
    selectSession(sessionId);
    setSidebarOpen(false);
  };

  const handleDeleteSession = (sessionId: string) => {
    deleteSession(sessionId);
  };

  const handleSend = async (content: string) => {
    let sessionId = activeSessionId;
    if (!sessionId) {
      sessionId = createSession();
    }

    await sendMessage(sessionId, content);
  };

  return (
    <div className="relative flex h-full overflow-hidden rounded-[1.75rem] border border-primary/12 bg-[linear-gradient(180deg,oklch(0.954_0.01_286.2_/_0.03),transparent_20%),oklch(0.135_0.004_286.2_/_0.86)] shadow-[0_1.75rem_4rem_oklch(0.05_0.004_286_/_0.48)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,oklch(0.88_0.156_204.5_/_0.16),transparent_24%),radial-gradient(circle_at_bottom_right,oklch(0.673_0.246_14.4_/_0.12),transparent_20%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(oklch(0.954_0.01_286.2_/_0.03)_1px,transparent_1px),linear-gradient(90deg,oklch(0.954_0.01_286.2_/_0.03)_1px,transparent_1px)] [background-size:3.25rem_3.25rem]" />

      {sidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 cursor-default bg-background/86 backdrop-blur-md lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(event) => event.key === "Escape" && setSidebarOpen(false)}
          aria-label="Close conversation rail"
        />
      ) : null}

      <aside
        className={cn(
          "glass-strong fixed inset-y-0 left-0 z-50 flex w-[320px] shrink-0 flex-col border-r border-primary/10 transition-transform duration-300 ease-out lg:relative lg:translate-x-0 lg:rounded-none lg:border-r",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-white/6 px-4 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <Logo variant="compact" />
            <div className="min-w-0">
              <p className="editorial-eyebrow">chat workspace</p>
              <p className="truncate font-mono text-sm font-semibold tracking-[0.2em] text-foreground/92 uppercase">
                Session rail
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close conversation rail"
          >
            <X data-icon="inline-end" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2 border-b border-white/6 px-4 py-4">
          <div className="rounded-2xl border border-white/8 bg-background/40 px-3 py-3">
            <p className="font-mono text-[0.7rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
              Threads
            </p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{sessions.length}</p>
          </div>
          <div className="rounded-2xl border border-primary/12 bg-primary/6 px-3 py-3">
            <p className="font-mono text-[0.7rem] font-semibold tracking-[0.22em] text-primary/72 uppercase">
              Status
            </p>
            <p className="mt-2 text-sm font-semibold text-foreground">
              {isStreaming ? "Generating" : hasMessages ? "Active" : "Ready"}
            </p>
          </div>
        </div>

        <SessionList
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSessionSelect={handleSessionSelect}
          onNewSession={handleNewSession}
          onDeleteSession={handleDeleteSession}
        />
      </aside>

      <div className="relative z-10 flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="border-b border-white/6 px-4 py-4 md:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3 md:items-center">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open conversation rail"
              >
                <Menu data-icon="inline-start" />
              </Button>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="editorial-eyebrow">growth ai command center</p>
                  <Badge className="border-primary/18 bg-primary/10 font-mono text-[0.68rem] tracking-[0.2em] text-primary uppercase">
                    {isStreaming ? "Live" : "Idle"}
                  </Badge>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <h1 className="text-xl font-semibold tracking-[-0.03em] text-foreground md:text-2xl">
                    {activeSession?.title ?? "Start a new growth sprint"}
                  </h1>
                  <span className="font-mono text-xs text-muted-foreground">
                    {hasMessages
                      ? `${messages.length} logged message${messages.length === 1 ? "" : "s"}`
                      : "No transcript yet"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="hidden rounded-full border border-white/8 bg-background/35 px-3 py-2 font-mono text-xs text-muted-foreground md:flex md:items-center md:gap-2">
                <Bot className="size-4 text-primary" />
                {isStreaming ? "Assistant streaming" : "Assistant standing by"}
              </div>
              <div className="hidden rounded-full border border-white/8 bg-background/35 px-3 py-2 font-mono text-xs text-muted-foreground md:block">
                {user?.name ?? "Operator"}
              </div>
              <Button
                variant="outline"
                onClick={handleNewSession}
                className="border-primary/16 bg-background/40 text-foreground hover:border-primary/36 hover:bg-primary/10"
              >
                <Plus data-icon="inline-start" />
                New session
              </Button>
            </div>
          </div>
        </header>

        {error ? (
          <div className="border-b border-destructive/30 bg-destructive/10 px-4 py-3 md:px-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-mono text-[0.68rem] font-semibold tracking-[0.22em] text-destructive uppercase">
                  Signal fault
                </p>
                <p className="mt-1 text-sm text-destructive">{error}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearError}
                className="self-start text-destructive hover:text-destructive"
              >
                <PanelLeftClose data-icon="inline-start" />
                Dismiss alert
              </Button>
            </div>
          </div>
        ) : null}

        <div className="min-h-0 flex-1 px-4 py-4 md:px-6 md:py-5">
          <div className="glass relative flex h-full min-h-0 flex-col overflow-hidden rounded-[1.5rem] border border-white/8 bg-background/24">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent" />
            <div className="flex items-center justify-between gap-4 border-b border-white/6 px-4 py-3">
              <div>
                <p className="font-mono text-[0.68rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
                  Transcript canvas
                </p>
                <p className="mt-1 text-sm text-foreground/88">
                  Strategy prompts, portfolio analysis, and live execution notes.
                </p>
              </div>
              <div className="hidden items-center gap-2 md:flex">
                <Sparkles className="size-4 text-secondary" />
                <span className="font-mono text-xs text-muted-foreground">
                  {isStreaming ? "Signal incoming" : "Ready for next command"}
                </span>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden">
              <MessageList
                messages={messages}
                isStreaming={isStreaming}
                streamingContent={streamingContent || undefined}
                userAvatar={user?.avatarUrl}
                userName={user?.name}
              />
            </div>
          </div>
        </div>

        <ChatComposer
          onSend={handleSend}
          onStop={isStreaming ? stopStreaming : undefined}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
