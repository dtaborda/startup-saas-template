import { ChatSendRequestSchema } from "@template/contracts";
import { MOCK_TOKEN } from "@template/core";

function parseCookie(cookieHeader: string, name: string): string | undefined {
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  const value = match?.[1];
  return value !== undefined ? decodeURIComponent(value) : undefined;
}

/**
 * Mock SSE chat endpoint.
 * Simulates AI responses with word-by-word streaming and RAG sources.
 */
export async function POST(request: Request) {
  // Defense-in-depth: verify auth independently of middleware
  const cookieHeader = request.headers.get("cookie") ?? "";
  const authToken = parseCookie(cookieHeader, "auth-token");

  if (!authToken || authToken !== MOCK_TOKEN) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await request.json();
  const parsed = ChatSendRequestSchema.safeParse(body);

  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error.flatten() }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { message } = parsed.data;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // Simulate AI thinking delay
      await new Promise((r) => setTimeout(r, 500));

      // Generate mock response based on user message
      const mockResponse = generateMockResponse(message);
      const words = mockResponse.split(" ");

      // Stream word by word with realistic delay
      for (const word of words) {
        const event = `data: ${JSON.stringify({ type: "text-delta", delta: `${word} ` })}\n\n`;
        controller.enqueue(encoder.encode(event));
        await new Promise((r) => setTimeout(r, 30 + Math.random() * 50));
      }

      // Send mock RAG sources
      const sourcesEvent = `data: ${JSON.stringify({
        type: "sources",
        sources: [
          {
            title: "Getting Started Guide",
            snippet: "This is a helpful resource for beginners looking to understand the platform.",
            relevance: 0.95,
          },
          {
            title: "API Documentation",
            url: "https://docs.example.com",
            snippet: "Comprehensive API reference with examples and best practices.",
            relevance: 0.87,
          },
        ],
      })}\n\n`;
      controller.enqueue(encoder.encode(sourcesEvent));

      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

function generateMockResponse(message: string): string {
  const snippet = message.slice(0, 30);
  const responses = [
    `That's a great question about "${snippet}". Let me help you with that. This template provides a solid foundation for building modern SaaS applications with Next.js, React, and TypeScript. The architecture follows best practices with a monorepo structure using Turborepo.`,
    `I understand you're asking about "${snippet}". Here's what I can tell you: The startup SaaS template includes authentication, a dashboard with analytics, a chat system (that's me!), and a course portfolio. Everything is built with type safety and modern web standards.`,
    `Great point about "${snippet}"! The template uses Zustand for state management, Zod for validation, and shadcn/ui for components. The dark mode glassmorphism design gives it a modern, professional look perfect for startups.`,
  ];
  return responses[Math.floor(Math.random() * responses.length)] as string;
}
