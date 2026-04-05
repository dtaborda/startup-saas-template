"use client";

import type { ChatMessage, ChatSession, RagSource } from "@template/contracts/chat";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================================================
// Status Constants
// ============================================================================

const CHAT_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  STREAMING: "streaming",
  ERROR: "error",
} as const;

type ChatStatus = (typeof CHAT_STATUS)[keyof typeof CHAT_STATUS];

// ============================================================================
// State & Actions
// ============================================================================

interface ChatState {
  sessions: ChatSession[];
  activeSessionId: string | null;
  messages: Record<string, ChatMessage[]>;
  status: ChatStatus;
  streamingContent: string;
  streamingSources: RagSource[];
  error: string | null;
}

interface ChatActions {
  createSession: () => string;
  selectSession: (id: string) => void;
  deleteSession: (id: string) => void;
  addMessage: (sessionId: string, msg: Partial<ChatMessage>) => void;
  startStreaming: (sessionId: string) => void;
  appendStreamingContent: (delta: string) => void;
  setSources: (sources: RagSource[]) => void;
  finalizeStreaming: (sessionId: string) => void;
  setStatus: (status: ChatStatus) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

type ChatStore = ChatState & ChatActions;

// ============================================================================
// Helpers
// ============================================================================

function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function now(): string {
  return new Date().toISOString();
}

// ============================================================================
// Store
// ============================================================================

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      // Initial state
      sessions: [],
      activeSessionId: null,
      messages: {},
      status: CHAT_STATUS.IDLE,
      streamingContent: "",
      streamingSources: [],
      error: null,

      // --- Session actions ---

      createSession: () => {
        const id = generateId();
        const session: ChatSession = {
          id,
          title: "New conversation",
          createdAt: now(),
          updatedAt: now(),
          messageCount: 0,
        };

        set((state) => ({
          sessions: [session, ...state.sessions],
          activeSessionId: id,
          error: null,
        }));

        return id;
      },

      selectSession: (sessionId) => {
        const session = get().sessions.find((s) => s.id === sessionId);
        if (session) {
          set({
            activeSessionId: sessionId,
            error: null,
            streamingContent: "",
            streamingSources: [],
          });
        }
      },

      deleteSession: (sessionId) => {
        set((state) => {
          const newSessions = state.sessions.filter((s) => s.id !== sessionId);
          const { [sessionId]: _, ...remainingMessages } = state.messages;

          const newActiveId =
            state.activeSessionId === sessionId
              ? (newSessions[0]?.id ?? null)
              : state.activeSessionId;

          return {
            sessions: newSessions,
            activeSessionId: newActiveId,
            messages: remainingMessages,
          };
        });
      },

      // --- Message actions ---

      addMessage: (sessionId, msg) => {
        const message: ChatMessage = {
          id: msg.id ?? generateId(),
          sessionId,
          role: msg.role ?? "user",
          content: msg.content ?? "",
          createdAt: msg.createdAt ?? now(),
          sources: msg.sources,
        };

        set((state) => {
          const sessionMessages = state.messages[sessionId] ?? [];

          // Update session title from first user message + message count
          const updatedSessions = state.sessions.map((s) => {
            if (s.id !== sessionId) return s;
            return {
              ...s,
              messageCount: s.messageCount + 1,
              updatedAt: now(),
              title:
                s.messageCount === 0 && message.role === "user"
                  ? message.content.slice(0, 50)
                  : s.title,
            };
          });

          return {
            messages: {
              ...state.messages,
              [sessionId]: [...sessionMessages, message],
            },
            sessions: updatedSessions,
          };
        });
      },

      // --- Streaming actions ---

      startStreaming: (_sessionId) => {
        set({
          streamingContent: "",
          streamingSources: [],
          status: CHAT_STATUS.STREAMING,
        });
      },

      appendStreamingContent: (delta) => {
        set((state) => ({
          streamingContent: state.streamingContent + delta,
          status: CHAT_STATUS.STREAMING,
        }));
      },

      setSources: (sources) => {
        set({ streamingSources: sources });
      },

      finalizeStreaming: (sessionId) => {
        const { streamingContent, streamingSources } = get();

        if (streamingContent) {
          get().addMessage(sessionId, {
            role: "assistant",
            content: streamingContent,
            sources: streamingSources.length > 0 ? streamingSources : undefined,
          });
        }

        set({
          streamingContent: "",
          streamingSources: [],
          status: CHAT_STATUS.IDLE,
        });
      },

      // --- Status actions ---

      setStatus: (status) => set({ status }),

      setError: (error) =>
        set({
          error,
          status: error ? CHAT_STATUS.ERROR : CHAT_STATUS.IDLE,
        }),

      clearError: () => set({ error: null, status: CHAT_STATUS.IDLE }),

      reset: () =>
        set({
          sessions: [],
          activeSessionId: null,
          messages: {},
          status: CHAT_STATUS.IDLE,
          streamingContent: "",
          streamingSources: [],
          error: null,
        }),
    }),
    {
      name: "saas-chat-storage",
      partialize: (state) => ({
        sessions: state.sessions,
        activeSessionId: state.activeSessionId,
        messages: state.messages,
      }),
    },
  ),
);

// ============================================================================
// Selectors
// ============================================================================

export const selectActiveSession = (state: ChatStore) =>
  state.sessions.find((s) => s.id === state.activeSessionId);

export const selectActiveMessages = (state: ChatStore) =>
  state.activeSessionId ? (state.messages[state.activeSessionId] ?? []) : [];

export const selectIsLoading = (state: ChatStore) =>
  state.status === CHAT_STATUS.LOADING || state.status === CHAT_STATUS.STREAMING;

export const selectIsStreaming = (state: ChatStore) => state.status === CHAT_STATUS.STREAMING;

export type { ChatStore };
export { CHAT_STATUS };
