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
    <div className="border-t border-white/6 px-4 pb-4 pt-3 md:px-6 md:pb-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 rounded-[1.75rem] border border-primary/14 bg-[linear-gradient(180deg,oklch(0.954_0.01_286.2_/_0.05),transparent_24%),oklch(0.179_0.008_286.4_/_0.78)] p-3 shadow-[0_1.5rem_3.5rem_oklch(0.05_0.004_286_/_0.34)]">
        <div className="flex items-center justify-between gap-3 px-1">
          <p className="font-mono text-[0.68rem] font-semibold tracking-[0.22em] text-primary uppercase">
            Prompt console
          </p>
          <p className="font-mono text-[0.68rem] text-muted-foreground uppercase">
            Enter to send · Shift+Enter newline
          </p>
        </div>

        <div
          className={cn(
            "glass flex items-end gap-3 rounded-[1.45rem] border border-white/8 px-3 py-3 transition-colors",
            (disabled || isLoading) && "border-white/6 bg-background/30 opacity-92",
          )}
        >
          <div className="min-w-0 flex-1">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                "min-h-[60px] max-h-[220px] resize-none border-0 bg-transparent px-1 py-1 text-sm leading-6 text-foreground shadow-none",
                "placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0",
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
              className="size-11 rounded-2xl"
              aria-label="Stop generating"
            >
              <Square data-icon="inline-start" />
            </Button>
          ) : (
            <Button
              type="button"
              size="icon"
              onClick={handleSubmit}
              disabled={!canSend}
              className="size-11 rounded-2xl bg-primary text-primary-foreground shadow-[0_0_1.5rem_oklch(0.88_0.156_204.5_/_0.24)] hover:bg-primary/90"
              aria-label="Send message"
            >
              <Send data-icon="inline-start" />
            </Button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <p className="text-xs text-muted-foreground">
            Draft prompts, multi-line instructions, or pasted code blocks without losing focus.
          </p>
          <p className="font-mono text-[0.68rem] text-muted-foreground uppercase">
            {isLoading ? "Streaming response" : disabled ? "Console locked" : "Console armed"}
          </p>
        </div>
      </div>
    </div>
  );
}
