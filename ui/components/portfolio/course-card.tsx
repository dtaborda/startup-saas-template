"use client";

import type { Course, CourseEnrollment } from "@template/contracts";
import { Badge, Card, CardContent, cn, Progress } from "@template/ui";
import {
  BookOpen,
  Box,
  CheckCircle2,
  Clock,
  Code,
  Layers,
  Palette,
  Star,
  TestTube,
  Users,
} from "lucide-react";

// ============================================================================
// Helpers
// ============================================================================

const LEVEL_STYLES: Record<
  string,
  { variant: "success" | "warning" | "destructive"; label: string }
> = {
  beginner: { variant: "success", label: "Beginner" },
  intermediate: { variant: "warning", label: "Intermediate" },
  advanced: { variant: "destructive", label: "Advanced" },
};

const COURSE_ICONS: Record<string, typeof BookOpen> = {
  React: Code,
  TypeScript: Code,
  "Next.js": Layers,
  Tailwind: Palette,
  CSS: Palette,
  Zustand: Box,
  Testing: TestTube,
  Playwright: TestTube,
};

const GRADIENT_COLORS: Record<string, string> = {
  beginner: "from-emerald-500/20 to-teal-500/20",
  intermediate: "from-amber-500/20 to-orange-500/20",
  advanced: "from-rose-500/20 to-pink-500/20",
};

const LEVEL_ACCENTS: Record<string, string> = {
  beginner: "border-success/30 bg-success/10 text-success",
  intermediate: "border-warning/30 bg-warning/10 text-warning",
  advanced: "border-secondary/30 bg-secondary/10 text-secondary",
};

function getCourseIcon(tags: string[]) {
  for (const tag of tags) {
    if (COURSE_ICONS[tag]) return COURSE_ICONS[tag];
  }
  return BookOpen;
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />);
    } else if (i === fullStars && hasHalf) {
      stars.push(
        <div key={i} className="relative h-3.5 w-3.5">
          <Star className="absolute h-3.5 w-3.5 text-muted-foreground/30" />
          <div className="absolute overflow-hidden" style={{ width: "50%" }}>
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          </div>
        </div>,
      );
    } else {
      stars.push(<Star key={i} className="h-3.5 w-3.5 text-muted-foreground/30" />);
    }
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex">{stars}</div>
      <span className="text-xs font-medium text-foreground/70">{rating.toFixed(1)}</span>
    </div>
  );
}

// ============================================================================
// Course Card
// ============================================================================

interface CourseCardProps {
  course: Course;
  enrollment?: CourseEnrollment;
}

export function CourseCard({ course, enrollment }: CourseCardProps) {
  const Icon = getCourseIcon(course.tags);
  const levelStyle = LEVEL_STYLES[course.level] ?? {
    variant: "success" as const,
    label: "Beginner",
  };
  const gradient = GRADIENT_COLORS[course.level] ?? GRADIENT_COLORS.beginner;
  const accent = LEVEL_ACCENTS[course.level] ?? LEVEL_ACCENTS.beginner;
  const progress = enrollment?.progress ?? 0;
  const isCompleted = progress === 100;
  const isEnrolled = enrollment != null;

  return (
    <Card className="group cursor-pointer overflow-hidden rounded-xl border-border/60 bg-card transition-colors hover:border-primary/30">
      <div
        className={cn(
          "relative flex h-44 items-center justify-center overflow-hidden border-b border-border/60 bg-gradient-to-br",
          gradient,
        )}
      >
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <Badge
            variant={levelStyle.variant}
            className="px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em]"
          >
            {levelStyle.label}
          </Badge>
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em]",
              accent,
            )}
          >
            {isCompleted ? "completed" : isEnrolled ? "in progress" : "open"}
          </span>
        </div>

        {isCompleted && (
          <div className="absolute right-4 top-4">
            <Badge
              variant="success"
              className="gap-1 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em]"
            >
              <CheckCircle2 className="size-3" />
              Completed
            </Badge>
          </div>
        )}

        <div className="relative flex flex-col items-center gap-4 text-center">
          <div className="flex size-20 items-center justify-center rounded-xl border border-border/60 bg-card">
            <Icon className="size-9 text-foreground/80 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 px-4">
            {course.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/60 bg-card px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-foreground/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <CardContent className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-lg font-semibold leading-tight tracking-[-0.03em] text-foreground">
              {course.title}
            </h3>
            {course.rating != null ? <StarRating rating={course.rating} /> : null}
          </div>

          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="font-mono">instructor</span>
            <span className="h-px flex-1 bg-border/50" />
          </div>

          <p className="text-sm text-foreground/80">{course.instructor}</p>
          <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
            {course.description}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 rounded-xl border border-border/60 bg-background p-3 text-xs text-muted-foreground">
          <div className="flex flex-col gap-2">
            <span className="font-mono uppercase tracking-[0.18em] text-muted-foreground/80">
              time
            </span>
            <span className="flex items-center gap-1.5 text-foreground/80">
              <Clock className="size-3.5" />
              {formatDuration(course.duration)}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono uppercase tracking-[0.18em] text-muted-foreground/80">
              learners
            </span>
            <span className="flex items-center gap-1.5 text-foreground/80">
              <Users className="size-3.5" />
              {course.enrolledCount.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono uppercase tracking-[0.18em] text-muted-foreground/80">
              lessons
            </span>
            <span className="flex items-center gap-1.5 text-foreground/80">
              <BookOpen className="size-3.5" />
              {course.lessonsCount} lessons
            </span>
          </div>
        </div>

        {isEnrolled ? (
          <div className="flex flex-col gap-2 rounded-xl border border-border/60 bg-background p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono uppercase tracking-[0.18em] text-muted-foreground">
                progress signal
              </span>
              <span className="font-semibold text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs leading-5 text-muted-foreground">
              {isCompleted
                ? "Completed and ready to revisit anytime from your active stack."
                : "Continue where you left off without losing your current learning momentum."}
            </p>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-1.5">
          {course.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-border/70 bg-background px-2 py-0.5 text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
