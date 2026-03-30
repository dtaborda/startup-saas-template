import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
} from "@template/ui";
import { ArrowRight, Bot, BrainCircuit, Radar, ShieldCheck, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Growth AI | Editorial growth operating system",
  description:
    "Growth AI is the dark editorial operating system for teams that need signal, strategic narrative, and action in one frame.",
};

const SIGNAL_PANELS = [
  {
    label: "Demand scan",
    title: "Readable market posture",
    body: "Track narrative shifts, campaign pressure, and portfolio momentum from one editorial control room.",
    accent: "primary",
  },
  {
    label: "AI briefing",
    title: "Decision-ready next moves",
    body: "Convert scattered inputs into clear priorities, tactical prompts, and operator-ready follow-through.",
    accent: "secondary",
  },
  {
    label: "Execution rhythm",
    title: "Daily growth cadence",
    body: "Keep leadership signal, team focus, and launch velocity aligned on a single dark operating surface.",
    accent: "primary",
  },
] as const;

const FEATURE_PILLARS = [
  {
    icon: Radar,
    eyebrow: "Signal architecture",
    title: "Detect what matters before the room gets noisy.",
    body: "Growth AI condenses fragmented campaign, CRM, and market cues into a visible signal stack your team can actually act on.",
  },
  {
    icon: BrainCircuit,
    eyebrow: "Strategic synthesis",
    title: "Give operators narrative, not just dashboards.",
    body: "Every panel is designed to explain movement, surface tension, and recommend action without forcing teams to context-switch.",
  },
  {
    icon: Bot,
    eyebrow: "AI execution",
    title: "Push directly from insight into motion.",
    body: "Briefings, prompts, and next-step framing live beside the signal so momentum never dies in translation.",
  },
] as const;

const OPERATING_POINTS = [
  "Dark-only command surface tuned for long operator sessions.",
  "Shared Growth AI tokens, logo system, and editorial typography.",
  "Protected product routes remain behind auth while the landing stays public.",
] as const;

export default function MarketingPage() {
  return (
    <div className="flex flex-col gap-16 py-10 lg:gap-24 lg:py-14">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:items-end xl:gap-14">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <span className="editorial-eyebrow">growth ai / editorial command</span>
            <Badge className="w-fit rounded-full border border-primary/20 bg-primary/10 px-4 py-1 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-primary hover:bg-primary/10">
              public launch surface
            </Badge>
          </div>

          <div className="flex max-w-4xl flex-col gap-6">
            <h1 className="text-balance text-5xl font-semibold leading-none tracking-[-0.09em] text-foreground sm:text-6xl xl:text-7xl">
              The growth operating system for teams who need signal, story, and action in one frame.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Growth AI transforms fragmented performance inputs into an editorial command surface
              that helps operators read momentum, decide faster, and move with precision.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="rounded-full px-7 font-mono text-[0.78rem] uppercase tracking-[0.22em]"
            >
              <Link href="/login">
                Enter platform
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>

            <a
              href="#feature-narrative"
              className="inline-flex items-center justify-center rounded-full border border-border/70 px-6 py-3 font-mono text-[0.74rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              Explore narrative
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {OPERATING_POINTS.map((point) => (
              <div key={point} className="framed-section rounded-3xl px-4 py-4">
                <p className="text-sm leading-6 text-muted-foreground">{point}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-strong relative overflow-hidden rounded-[2rem] p-6 sm:p-7">
          <div className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-primary/80 to-transparent" />
          <div className="pointer-events-none absolute -right-10 top-10 size-32 rounded-full bg-secondary/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-8 bottom-8 size-28 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                  live operator brief
                </span>
                <h2 className="text-2xl font-semibold tracking-[-0.06em] text-foreground">
                  The dark stage for modern growth teams.
                </h2>
              </div>
              <Sparkles className="size-5 text-primary" aria-hidden="true" />
            </div>

            <div className="flex flex-col gap-4">
              {SIGNAL_PANELS.map((panel, index) => (
                <div key={panel.title} className="framed-section rounded-[1.75rem] px-5 py-5">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                        {panel.label}
                      </span>
                      <span
                        className={cn(
                          "font-mono text-xs uppercase tracking-[0.24em]",
                          panel.accent === "secondary" ? "text-secondary" : "text-primary",
                        )}
                      >
                        0{index + 1}
                      </span>
                    </div>
                    <p className="text-lg font-medium tracking-[-0.04em] text-foreground">
                      {panel.title}
                    </p>
                    <p className="text-sm leading-6 text-muted-foreground">{panel.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="feature-narrative" className="flex flex-col gap-8">
        <div className="flex max-w-3xl flex-col gap-4">
          <span className="editorial-eyebrow">feature narrative</span>
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.07em] text-foreground sm:text-4xl">
            Built like an editorial control room, not another disposable SaaS lobby.
          </h2>
          <p className="text-base leading-7 text-muted-foreground">
            The interface is designed to help teams read movement clearly, align on strategy, and
            launch into execution without losing context between views.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {FEATURE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <Card key={pillar.title} className="glass border-border/60 bg-card/70">
                <CardHeader className="flex flex-col gap-5">
                  <div className="flex size-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <CardDescription className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                      {pillar.eyebrow}
                    </CardDescription>
                    <CardTitle className="text-2xl leading-tight tracking-[-0.05em] text-foreground">
                      {pillar.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-muted-foreground">{pillar.body}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="framed-section rounded-[2rem] p-6 sm:p-8">
          <div className="flex flex-col gap-4">
            <span className="editorial-eyebrow">operator promise</span>
            <h2 className="text-3xl font-semibold tracking-[-0.06em] text-foreground">
              Make every growth review feel like a briefing, not a scavenger hunt.
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              Growth AI is shaped for founders, GTM leads, and operators who need a sharper way to
              absorb signal and drive decisive motion.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="glass rounded-[2rem] p-6">
            <div className="flex flex-col gap-4">
              <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
              <h3 className="text-xl font-semibold tracking-[-0.04em] text-foreground">
                Public welcome, protected product
              </h3>
              <p className="text-sm leading-7 text-muted-foreground">
                The landing page opens the brand to the public while keeping the product shell,
                dashboard, and operating routes behind authentication.
              </p>
            </div>
          </div>

          <div className="glass rounded-[2rem] p-6">
            <div className="flex flex-col gap-4">
              <Sparkles className="size-5 text-secondary" aria-hidden="true" />
              <h3 className="text-xl font-semibold tracking-[-0.04em] text-foreground">
                Same brand language everywhere
              </h3>
              <p className="text-sm leading-7 text-muted-foreground">
                Shared logo construction, mono eyebrows, and brand tokens keep marketing and auth
                surfaces speaking with one unmistakable voice.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="glass-strong rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-4">
            <span className="editorial-eyebrow">ready to enter</span>
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.07em] text-foreground sm:text-4xl">
              Step into the Growth AI platform and continue from the last active cycle.
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              The public landing sets the stage. The protected workspace handles the real signal,
              analysis, and execution rhythm once you sign in.
            </p>
          </div>

          <Button
            asChild
            size="lg"
            className="rounded-full px-7 font-mono text-[0.78rem] uppercase tracking-[0.22em]"
          >
            <Link href="/login">
              Sign in to continue
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
