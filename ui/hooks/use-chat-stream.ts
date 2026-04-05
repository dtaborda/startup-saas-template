"use client";

import { useCallback, useRef } from "react";
import { useChatStore } from "@/stores/chat-store";

/**
 * Custom SSE streaming hook for the chat system.
 * Handles fetch → ReadableStream → SSE event parsing → store updates.
 */
export function useChatStream() {
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (sessionId: string, message: string) => {
    const store = useChatStore.getState();
    store.setStatus("streaming");
    store.addMessage(sessionId, { role: "user", content: message });

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error("Chat request failed");
      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      store.startStreaming(sessionId);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") break;

          try {
            const event = JSON.parse(data);
            if (event.type === "text-delta") {
              useChatStore.getState().appendStreamingContent(event.delta);
            } else if (event.type === "sources") {
              useChatStore.getState().setSources(event.sources);
            }
          } catch {
            /* skip malformed SSE data */
          }
        }
      }

      useChatStore.getState().finalizeStreaming(sessionId);
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        useChatStore.getState().setStatus("error");
        useChatStore.getState().setError((error as Error).message);
      }
    } finally {
      abortControllerRef.current = null;
    }
  }, []);

  const stopStreaming = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    const store = useChatStore.getState();
    // Guard: only finalize if there is an active session to avoid orphan messages under key ""
    if (store.activeSessionId) {
      store.finalizeStreaming(store.activeSessionId);
    } else {
      store.setStatus("idle");
    }
  }, []);

  return { sendMessage, stopStreaming };
}
