"use client";

import { Button, cn, Textarea } from "@template/ui";
import { Send, Square } from "lucide-react";
import type { KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";

interface ChatComposerProps {
  onSend: (message: string) => void;
  onStop?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatComposer({
  onSend,
  onStop,
  isLoading = false,
  disabled = false,
  placeholder = "Type a message...",
}: ChatComposerProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 220)}px`;
  });

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading || disabled) return;

    onSend(trimmedInput);
    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const canSend = input.trim().length > 0 && !isLoading && !disabled;

  return (
    <div className="border-t border-border/50 px-4 py-3">
      <div className="mx-auto flex max-w-4xl items-end gap-2">
        <div className="min-w-0 flex-1">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "min-h-[44px] max-h-[220px] resize-none rounded-lg border-border/60 bg-background px-3 py-2.5 text-sm leading-6 text-foreground",
              "placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary/40",
              disabled && "cursor-not-allowed opacity-60",
            )}
            rows={1}
            aria-label="Message input"
          />
        </div>

        {isLoading && onStop ? (
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={onStop}
            className="size-10 shrink-0 rounded-lg"
            aria-label="Stop generating"
          >
            <Square className="size-4" />
          </Button>
        ) : (
          <Button
            type="button"
            size="icon"
            onClick={handleSubmit}
            disabled={!canSend}
            className="size-10 shrink-0 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            aria-label="Send message"
          >
            <Send className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
