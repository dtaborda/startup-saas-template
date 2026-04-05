import { Button } from "@template/ui";
import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/shared/logo";

interface MarketingLayoutProps {
  children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 lg:px-10 lg:py-8">
        <header className="flex items-center justify-between rounded-xl border border-border/60 bg-card px-4 py-3 sm:px-6">
          <Logo />
          <Button
            asChild
            className="rounded-full px-6 font-mono text-[0.72rem] uppercase tracking-[0.18em]"
          >
            <Link href="/login">Enter platform</Link>
          </Button>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-8 flex flex-col gap-3 border-t border-border/50 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Growth AI for operators who need signal, narrative, and action on one dark stage.</p>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground/80">
            editorial growth system
          </p>
        </footer>
      </div>
    </div>
  );
}
