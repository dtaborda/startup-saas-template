"use client";

import type { Course, CourseEnrollment } from "@template/contracts";
import {
  Badge,
  Card,
  CardContent,
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  cn,
  Progress,
  Skeleton,
} from "@template/ui";
import {
  BookOpen,
  Box,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Code,
  GraduationCap,
  Layers,
  ListChecks,
  Palette,
  Star,
  TestTube,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { MOCK_COURSES, MOCK_ENROLLMENTS } from "./mock-data";

// ============================================================================
// Constants / helpers (shared with course-card)
// ============================================================================

const LEVEL_STYLES: Record<
  string,
  { variant: "success" | "warning" | "destructive"; label: string }
> = {
  beginner: { variant: "success", label: "Beginner" },
  intermediate: { variant: "warning", label: "Intermediate" },
  advanced: { variant: "destructive", label: "Advanced" },
};

const GRADIENT_COLORS: Record<string, string> = {
  beginner: "from-emerald-500/20 to-teal-500/20",
  intermediate: "from-amber-500/20 to-orange-500/20",
  advanced: "from-rose-500/20 to-pink-500/20",
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

// ============================================================================
// Sub-components
// ============================================================================

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  const iconClass = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<Star key={i} className={cn(iconClass, "fill-amber-400 text-amber-400")} />);
    } else if (i === fullStars && hasHalf) {
      stars.push(
        <div key={i} className={cn("relative", iconClass)}>
          <Star className={cn("absolute", iconClass, "text-muted-foreground/30")} />
          <div className="absolute overflow-hidden" style={{ width: "50%" }}>
            <Star className={cn(iconClass, "fill-amber-400 text-amber-400")} />
          </div>
        </div>,
      );
    } else {
      stars.push(<Star key={i} className={cn(iconClass, "text-muted-foreground/30")} />);
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">{stars}</div>
      <span className={cn("font-medium text-foreground/70", size === "sm" ? "text-xs" : "text-sm")}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

// ============================================================================
// Image Carousel
// ============================================================================

function CourseImageCarousel({
  images,
  courseLevel,
  courseTitle,
  courseTags,
}: {
  images: string[];
  courseLevel: string;
  courseTitle: string;
  courseTags: string[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const Icon = getCourseIcon(courseTags);
  const gradient = GRADIENT_COLORS[courseLevel] ?? GRADIENT_COLORS.beginner;

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // No images — single gradient placeholder
  if (images.length === 0) {
    return (
      <div
        className={cn(
          "relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br",
          "aspect-video",
          gradient,
        )}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex size-24 items-center justify-center rounded-xl border border-border/60 bg-card">
            <Icon className="size-12 text-foreground/60" />
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {courseTitle}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent className="ml-0">
          {images.map((src) => (
            <CarouselItem key={src} className="basis-full pl-0">
              {/* biome-ignore lint: mock images from placehold.co */}
              <img
                src={src}
                alt={courseTitle}
                className="aspect-video w-full rounded-xl border border-border/60 object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 top-1/2 size-8 -translate-y-1/2 border-none bg-background/70 text-foreground backdrop-blur-sm hover:bg-background/90 md:left-3 md:size-9" />
        <CarouselNext className="right-2 top-1/2 size-8 -translate-y-1/2 border-none bg-background/70 text-foreground backdrop-blur-sm hover:bg-background/90 md:right-3 md:size-9" />
      </Carousel>

      {/* Dot indicators */}
      {count > 1 && (
        <div className="flex items-center justify-center gap-1.5">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "rounded-full transition-all duration-200",
                i === current
                  ? "size-2 bg-primary"
                  : "size-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Syllabus Section
// ============================================================================

function SyllabusSection({ syllabus }: { syllabus: Course["syllabus"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (syllabus.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Syllabus
      </h2>
      <div className="flex flex-col divide-y divide-border/60 overflow-hidden rounded-xl border border-border/60">
        {syllabus.map((section, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={section.title} className="bg-card">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/30"
                aria-expanded={isOpen}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[0.62rem] font-semibold text-primary">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{section.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {section.lessons.length} lessons · {formatDuration(section.duration)}
                    </p>
                  </div>
                </div>
                {isOpen ? (
                  <ChevronUp className="size-4 shrink-0 text-muted-foreground" />
                ) : (
                  <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
                )}
              </button>

              {isOpen && (
                <ul className="flex flex-col gap-0 border-t border-border/60 bg-background/50 px-4 py-3">
                  {section.lessons.map((lesson, lessonIndex) => (
                    <li
                      key={lesson}
                      className="flex items-center gap-3 py-2 text-sm text-muted-foreground"
                    >
                      <span className="flex size-5 shrink-0 items-center justify-center font-mono text-[0.6rem] text-muted-foreground/50">
                        {lessonIndex + 1}
                      </span>
                      <span className="flex-1">{lesson}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// Loading Skeleton
// ============================================================================

function CourseDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* Image skeleton */}
      <Skeleton className="aspect-video w-full rounded-xl" />

      {/* Header skeleton */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-8 w-3/4" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>

      {/* Progress skeleton */}
      <Skeleton className="h-20 rounded-xl" />

      {/* Description skeleton */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}

// ============================================================================
// Not Found State
// ============================================================================

function CourseNotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <GraduationCap className="size-10 text-muted-foreground/60" />
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-foreground">Course not found</h2>
        <p className="text-sm text-muted-foreground">
          This course doesn't exist or has been removed.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// CourseDetail — main component
// ============================================================================

interface CourseDetailProps {
  courseId: string;
}

export function CourseDetail({ courseId }: CourseDetailProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [enrollment, setEnrollment] = useState<CourseEnrollment | undefined>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = MOCK_COURSES.find((c) => c.id === courseId);
      const foundEnrollment = MOCK_ENROLLMENTS.find((e) => e.courseId === courseId);
      setCourse(found);
      setEnrollment(foundEnrollment);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [courseId]);

  if (isLoading) {
    return <CourseDetailSkeleton />;
  }

  if (!course) {
    return <CourseNotFound />;
  }

  const levelStyle = LEVEL_STYLES[course.level] ?? {
    variant: "success" as const,
    label: "Beginner",
  };
  const progress = enrollment?.progress ?? 0;
  const isCompleted = progress === 100;
  const isEnrolled = enrollment != null;

  const paragraphs = course.longDescription
    ? course.longDescription
        .split("\n\n")
        .map((p) =>
          p
            .replace(/^#+\s*/g, "")
            .replace(/\*\*/g, "")
            .replace(/`/g, ""),
        )
        .filter(Boolean)
    : [course.description];

  return (
    <div className="flex flex-col gap-8">
      {/* Image Carousel */}
      <CourseImageCarousel
        images={course.images}
        courseLevel={course.level}
        courseTitle={course.title}
        courseTags={course.tags}
      />

      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center rounded-md border px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em]",
              course.level === "beginner" && "border-success/40 text-success",
              course.level === "intermediate" && "border-warning/40 text-warning",
              course.level === "advanced" && "border-destructive/40 text-destructive",
            )}
          >
            {levelStyle.label}
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em]",
              isCompleted
                ? "border-success/40 text-success"
                : isEnrolled
                  ? "border-primary/40 text-primary"
                  : "border-border/60 text-muted-foreground",
            )}
          >
            {isCompleted && <CheckCircle2 className="size-3" />}
            {isCompleted ? "Completed" : isEnrolled ? "In Progress" : course.status}
          </span>
        </div>

        <h1 className="text-2xl font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-3xl">
          {course.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          {course.rating != null && <StarRating rating={course.rating} />}
          <span className="text-sm text-muted-foreground">by {course.instructor}</span>
        </div>

        {/* Tags */}
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
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card className="overflow-hidden rounded-xl border-border/60 bg-card">
          <CardContent className="flex flex-col gap-2 p-4">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground/80">
              duration
            </span>
            <span className="flex items-center gap-1.5 text-sm font-medium text-foreground/80">
              <Clock className="size-4 text-muted-foreground" />
              {formatDuration(course.duration)}
            </span>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-xl border-border/60 bg-card">
          <CardContent className="flex flex-col gap-2 p-4">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground/80">
              lessons
            </span>
            <span className="flex items-center gap-1.5 text-sm font-medium text-foreground/80">
              <BookOpen className="size-4 text-muted-foreground" />
              {course.lessonsCount} lessons
            </span>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-xl border-border/60 bg-card">
          <CardContent className="flex flex-col gap-2 p-4">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground/80">
              enrolled
            </span>
            <span className="flex items-center gap-1.5 text-sm font-medium text-foreground/80">
              <Users className="size-4 text-muted-foreground" />
              {course.enrolledCount.toLocaleString()}
            </span>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-xl border-border/60 bg-card">
          <CardContent className="flex flex-col gap-2 p-4">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground/80">
              rating
            </span>
            {course.rating != null ? (
              <StarRating rating={course.rating} size="sm" />
            ) : (
              <span className="text-sm text-muted-foreground">—</span>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Enrollment Progress */}
      {isEnrolled && (
        <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                progress signal
              </span>
            </div>
            <span className="text-sm font-semibold text-primary">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2.5" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {enrollment.completedLessons} of {course.lessonsCount} lessons completed
            </span>
            {isCompleted ? (
              <span className="flex items-center gap-1 text-success">
                <CheckCircle2 className="size-3" />
                Done
              </span>
            ) : (
              <span>{course.lessonsCount - enrollment.completedLessons} remaining</span>
            )}
          </div>
        </div>
      )}

      {/* Long Description */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          About this course
        </h2>
        <div className="flex flex-col gap-4">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="text-sm leading-7 text-foreground/80">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Prerequisites */}
      {course.prerequisites.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Prerequisites
          </h2>
          <ul className="flex flex-col gap-2">
            {course.prerequisites.map((prereq) => (
              <li key={prereq} className="flex items-start gap-3">
                <ListChecks className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-sm leading-6 text-foreground/80">{prereq}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Syllabus */}
      <SyllabusSection syllabus={course.syllabus} />
    </div>
  );
}
