import type { ReactNode } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,oklch(0.88_0.156_204.5_/_0.16),transparent_34%),radial-gradient(circle_at_85%_15%,oklch(0.673_0.246_14.4_/_0.14),transparent_22%),linear-gradient(180deg,transparent,oklch(0.05_0.004_286_/_0.75))]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(oklch(0.954_0.01_286.2_/_0.05)_1px,transparent_1px),linear-gradient(90deg,oklch(0.954_0.01_286.2_/_0.05)_1px,transparent_1px)] [background-size:5rem_5rem]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent" />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl gap-10 px-6 py-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(26rem,32rem)] lg:items-center lg:px-10">
        <section className="hidden lg:flex lg:flex-col lg:gap-8">
          <div className="flex flex-col gap-5">
            <span className="editorial-eyebrow">growth command system</span>
            <div className="flex max-w-2xl flex-col gap-5">
              <h1 className="text-5xl font-semibold leading-none tracking-[-0.08em] text-balance text-foreground xl:text-6xl">
                Enter the operating room for pipeline intelligence.
              </h1>
              <p className="max-w-xl text-base leading-7 text-muted-foreground xl:text-lg">
                Growth AI turns campaign noise into a readable command surface for operators who
                need strategy, signal, and execution rhythm in one place.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="framed-section rounded-3xl p-5">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">01</p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Review live portfolio movement with a single editorial pulse.
              </p>
            </div>
            <div className="framed-section rounded-3xl p-5">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-secondary">02</p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Capture next actions with AI-assisted tactical threads.
              </p>
            </div>
            <div className="framed-section rounded-3xl p-5">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">03</p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Move from signal to decision without leaving the dark stage.
              </p>
            </div>
          </div>
        </section>

        <section className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
          <div className="pointer-events-none absolute inset-x-10 -top-8 h-24 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-12 bottom-0 h-28 rounded-full bg-secondary/10 blur-3xl" />
          <div className="glass-strong relative rounded-[2rem] p-6 sm:p-8">
            <div className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-primary/80 to-transparent" />
            <div className="flex flex-col gap-6">{children}</div>
          </div>
        </section>
      </div>
    </div>
  );
}
