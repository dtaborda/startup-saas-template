import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@template/ui";
import { ArrowRight, Bot, BrainCircuit, Radar } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Growth AI | Editorial growth operating system",
  description:
    "Growth AI is the dark editorial operating system for teams that need signal, strategic narrative, and action in one frame.",
};

const FEATURES = [
  {
    icon: Radar,
    title: "Signal architecture",
    body: "Condense fragmented campaign, CRM, and market cues into a visible signal stack your team can act on.",
  },
  {
    icon: BrainCircuit,
    title: "Strategic synthesis",
    body: "Every panel explains movement, surfaces tension, and recommends action without forcing context-switching.",
  },
  {
    icon: Bot,
    title: "AI execution",
    body: "Briefings, prompts, and next-step framing live beside the signal so momentum never dies in translation.",
  },
] as const;

export default function MarketingPage() {
  return (
    <div className="flex flex-col gap-20 py-12 lg:gap-28 lg:py-20">
      <section className="flex max-w-3xl flex-col gap-8">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          The growth operating system for teams who move fast.
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Growth AI transforms fragmented performance inputs into a command surface that helps
          operators read momentum, decide faster, and move with precision.
        </p>

        <div className="flex items-center gap-3">
          <Button asChild size="lg">
            <Link href="/login">
              Enter platform
              <ArrowRight className="size-4" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <a href="#features">Learn more</a>
          </Button>
        </div>
      </section>

      <section id="features" className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Built for operators, not spectators.
        </h2>

        <div className="grid gap-4 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card key={feature.title}>
                <CardHeader className="flex flex-col gap-3">
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                  <CardTitle className="text-base font-medium text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">{feature.body}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-6 border-t border-border/50 pt-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-lg">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Ready to start?</h2>
          <p className="mt-2 text-muted-foreground">
            Sign in to access your dashboard, chat, and portfolio.
          </p>
        </div>

        <Button asChild size="lg">
          <Link href="/login">
            Sign in
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
