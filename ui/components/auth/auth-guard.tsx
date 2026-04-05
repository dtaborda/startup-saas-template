"use client";

import { selectIsAuthenticated, useAuthStore } from "@template/core";
import { Spinner } from "@template/ui";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { Logo } from "@/components/shared/logo";

interface AuthGuardProps {
  children: ReactNode;
}

/**
 * Protects routes by checking Zustand auth state.
 * Handles hydration from localStorage (persist middleware is async).
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for Zustand persist hydration
  useEffect(() => {
    const unsubFinishHydration = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    // If already hydrated (e.g., store was pre-loaded)
    if (useAuthStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return () => {
      unsubFinishHydration();
    };
  }, []);

  // Redirect when hydrated and not authenticated
  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isHydrated, router]);

  // Show spinner while hydrating
  if (!isHydrated) {
    return <LoadingStage />;
  }

  // Show spinner while redirecting
  if (!isAuthenticated) {
    return <LoadingStage />;
  }

  return <>{children}</>;
}

function LoadingStage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-10">
      <div className="flex w-full max-w-sm flex-col items-center gap-5 rounded-2xl border border-border bg-card px-8 py-10 text-center">
        <Logo />
        <Spinner size="lg" />
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary">
            syncing access state
          </p>
          <p className="text-sm leading-6 text-muted-foreground">
            Verifying your session before entering the protected command surface.
          </p>
        </div>
      </div>
    </div>
  );
}
