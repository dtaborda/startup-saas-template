import { Button } from "@template/ui";
import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/shared/logo";

interface MarketingLayoutProps {
  children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,oklch(0.88_0.156_204.5_/_0.14),transparent_30%),radial-gradient(circle_at_80%_10%,oklch(0.673_0.246_14.4_/_0.12),transparent_24%),linear-gradient(180deg,transparent,oklch(0.05_0.004_286_/_0.82))]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(oklch(0.954_0.01_286.2_/_0.04)_1px,transparent_1px),linear-gradient(90deg,oklch(0.954_0.01_286.2_/_0.04)_1px,transparent_1px)] [background-size:6rem_6rem]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 lg:px-10 lg:py-8">
        <header className="glass flex items-center justify-between rounded-full px-4 py-3 sm:px-6">
          <Logo />
          <Button
            asChild
            className="rounded-full px-6 font-mono text-[0.72rem] uppercase tracking-[0.22em]"
          >
            <Link href="/login">Enter platform</Link>
          </Button>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-8 flex flex-col gap-3 border-t border-border/50 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Growth AI for operators who need signal, narrative, and action on one dark stage.</p>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground/80">
            editorial growth system
          </p>
        </footer>
      </div>
    </div>
  );
}
