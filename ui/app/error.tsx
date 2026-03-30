"use client";

import { Button } from "@template/ui";
import { useEffect } from "react";

interface ErrorPageProps {
  error: globalThis.Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="glass max-w-md rounded-xl p-8">
        <h1 className="mb-2 text-2xl font-bold text-foreground">Something went wrong</h1>
        <p className="mb-8 text-sm text-muted-foreground">
          An unexpected error occurred. Please try again or refresh the page.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh page
          </Button>
          <Button onClick={reset}>Try again</Button>
        </div>
      </div>
    </div>
  );
}
