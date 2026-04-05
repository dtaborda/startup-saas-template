"use client";

import {
  getAuthProvider,
  hasAuthProvider,
  MockAuthProvider,
  registerAuthProvider,
  selectIsAuthenticated,
  useAuthStore,
} from "@template/core";
import { Button, Input, Label, Spinner } from "@template/ui";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import { Logo } from "@/components/shared/logo";

export function LoginForm() {
  const router = useRouter();
  const { setSession, setLoading, setError: setStoreError } = useAuthStore();
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Register MockAuthProvider on mount if no provider is registered
  useEffect(() => {
    if (!hasAuthProvider()) {
      registerAuthProvider(new MockAuthProvider());
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setLoading(true);
    setError(null);
    setStoreError(null);

    try {
      const provider = getAuthProvider();
      const session = await provider.login(email, password);

      // Set cookie for middleware auth check (cross-browser compatible)
      const maxAge = 60 * 60 * 24 * 7; // 7 days in seconds
      document.cookie = `auth-token=${encodeURIComponent(session.token)}; path=/; max-age=${maxAge}; samesite=lax`;

      // Update Zustand store
      setSession(session);
      router.push("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(message);
      setStoreError(message);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 text-center">
        <div className="mx-auto inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary">
          secure operator access
        </div>
        <div className="mx-auto">
          <Logo showEyebrow className="justify-center" />
        </div>
        <p className="mx-auto max-w-sm text-sm leading-6 text-muted-foreground">
          Sign in to enter the command center and continue from your last active growth cycle.
        </p>
      </div>

      {error && (
        <div
          aria-live="polite"
          className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="email"
            className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="demo@startup.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            autoComplete="email"
            required
            className="h-12 rounded-xl border-border/70 bg-background px-4"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="password"
            className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            autoComplete="current-password"
            required
            className="h-12 rounded-xl border-border/70 bg-background px-4"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="h-12 w-full rounded-xl font-mono text-[0.78rem] uppercase tracking-[0.18em]"
        size="lg"
        disabled={isLoading || !email || !password}
      >
        {isLoading ? (
          <Spinner size="sm" className="text-primary-foreground" />
        ) : (
          <LogIn data-icon="inline-start" />
        )}
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>

      {process.env.NODE_ENV === "development" && (
        <div className="rounded-xl border border-border/60 bg-background px-4 py-4">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
            Demo credentials
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            <span className="font-mono text-foreground">demo@startup.com</span>
            <span className="mx-2 text-border">/</span>
            <span className="font-mono text-foreground">demo123</span>
          </p>
        </div>
      )}
    </form>
  );
}
