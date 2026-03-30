import { z } from "zod";

// ============================================================================
// Message Roles
// ============================================================================

export const MESSAGE_ROLE = {
  USER: "user",
  ASSISTANT: "assistant",
  SYSTEM: "system",
} as const;

export type MessageRole = (typeof MESSAGE_ROLE)[keyof typeof MESSAGE_ROLE];

// ============================================================================
// RAG Source
// ============================================================================

export const RagSourceSchema = z.object({
  title: z.string(),
  url: z.string().url().optional(),
  snippet: z.string(),
  relevance: z.number().min(0).max(1).optional(),
});

export type RagSource = z.infer<typeof RagSourceSchema>;

// ============================================================================
// Chat Message
// ============================================================================

export const ChatMessageSchema = z.object({
  id: z.string().uuid(),
  sessionId: z.string().uuid(),
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
  sources: z.array(RagSourceSchema).optional(),
  createdAt: z.string().datetime(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;

// ============================================================================
// Chat Send Request
// ============================================================================

export const ChatSendRequestSchema = z.object({
  sessionId: z.string().uuid(),
  message: z.string().min(1).max(10000),
});

export type ChatSendRequest = z.infer<typeof ChatSendRequestSchema>;

// ============================================================================
// Stream Events (SSE)
// ============================================================================

export const STREAM_EVENT_TYPE = {
  TEXT_DELTA: "text-delta",
  SOURCES: "sources",
  ERROR: "error",
  DONE: "done",
} as const;

export type StreamEventType = (typeof STREAM_EVENT_TYPE)[keyof typeof STREAM_EVENT_TYPE];

export const TextDeltaEventSchema = z.object({
  type: z.literal("text-delta"),
  delta: z.string(),
});

export const SourcesEventSchema = z.object({
  type: z.literal("sources"),
  sources: z.array(RagSourceSchema),
});

export const ErrorEventSchema = z.object({
  type: z.literal("error"),
  error: z.string(),
  code: z.string().optional(),
});

export const DoneEventSchema = z.object({
  type: z.literal("done"),
});

export const StreamEventSchema = z.discriminatedUnion("type", [
  TextDeltaEventSchema,
  SourcesEventSchema,
  ErrorEventSchema,
  DoneEventSchema,
]);

export type StreamEvent = z.infer<typeof StreamEventSchema>;

// ============================================================================
// Chat Session
// ============================================================================

export const ChatSessionSchema = z.object({
  id: z.string().uuid(),
  title: z.string().max(255),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  messageCount: z.number().int().default(0),
});

export type ChatSession = z.infer<typeof ChatSessionSchema>;
