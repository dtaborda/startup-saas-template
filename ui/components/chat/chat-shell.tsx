"use client";

import { selectUser, useAuthStore } from "@template/core";
import { Badge, Button, cn } from "@template/ui";
import { Menu, PanelLeftClose, Plus, X } from "lucide-react";
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
    <div className="relative flex h-full overflow-hidden rounded-lg border border-border/60 bg-card">
      {sidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 cursor-default bg-background/88 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(event) => event.key === "Escape" && setSidebarOpen(false)}
          aria-label="Close conversation rail"
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[280px] shrink-0 flex-col border-r border-border/60 bg-card transition-transform duration-300 ease-out lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <Logo variant="compact" />
            <span className="text-sm font-medium text-foreground">Chat</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="size-8 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close"
          >
            <X className="size-4" />
          </Button>
        </div>

        <SessionList
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSessionSelect={handleSessionSelect}
          onNewSession={handleNewSession}
          onDeleteSession={handleDeleteSession}
        />
      </aside>

      <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between gap-3 border-b border-border/50 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sessions"
            >
              <Menu className="size-4" />
            </Button>

            <h1 className="min-w-0 truncate text-sm font-medium text-foreground">
              {activeSession?.title ?? "New conversation"}
            </h1>

            {isStreaming ? (
              <Badge className="border-primary/18 bg-primary/10 px-2 py-0.5 text-xs text-primary">
                Live
              </Badge>
            ) : null}
          </div>

          <Button variant="outline" size="sm" onClick={handleNewSession} className="shrink-0">
            <Plus className="size-4" />
            New
          </Button>
        </header>

        {error ? (
          <div className="flex items-center justify-between gap-3 border-b border-destructive/30 bg-destructive/10 px-4 py-2">
            <p className="text-sm text-destructive">{error}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearError}
              className="shrink-0 text-destructive hover:text-destructive"
            >
              <PanelLeftClose className="size-4" />
              Dismiss
            </Button>
          </div>
        ) : null}

        <div className="min-h-0 flex-1 overflow-hidden">
          <MessageList
            messages={messages}
            isStreaming={isStreaming}
            streamingContent={streamingContent || undefined}
            userAvatar={user?.avatarUrl}
            userName={user?.name}
          />
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
