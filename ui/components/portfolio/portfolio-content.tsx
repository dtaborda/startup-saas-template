"use client";

import type { CourseLevel } from "@template/contracts";
import { Badge, Card, cn, Input, Skeleton } from "@template/ui";
import { BookMarked, Filter, GraduationCap, Search, Sparkles, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { CourseCard } from "./course-card";
import { MOCK_COURSES, MOCK_ENROLLMENTS } from "./mock-data";

// ============================================================================
// Types
// ============================================================================

type LevelFilter = CourseLevel | "all";

const LEVEL_FILTERS: { value: LevelFilter; label: string }[] = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

// ============================================================================
// Skeleton Card
// ============================================================================

function CourseCardSkeleton() {
  return (
    <Card variant="glass" className="overflow-hidden">
      <Skeleton className="h-36 w-full rounded-none" />
      <div className="flex flex-col gap-3 p-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-3.5 w-3.5 rounded-full" />
          ))}
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-14 rounded-md" />
          <Skeleton className="h-5 w-14 rounded-md" />
          <Skeleton className="h-5 w-14 rounded-md" />
        </div>
      </div>
    </Card>
  );
}

// ============================================================================
// Debounce Hook
// ============================================================================

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ============================================================================
// Portfolio Content
// ============================================================================

export function PortfolioContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Enrollment map for quick lookups
  const enrollmentMap = (() => {
    const map = new Map<string, (typeof MOCK_ENROLLMENTS)[number]>();
    for (const enrollment of MOCK_ENROLLMENTS) {
      map.set(enrollment.courseId, enrollment);
    }
    return map;
  })();

  // Filtered courses
  const filteredCourses = MOCK_COURSES.filter((course) => {
    const matchesSearch =
      debouncedSearch === "" || course.title.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesLevel = levelFilter === "all" || course.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const handleFilterClick = (value: LevelFilter) => {
    setLevelFilter(value);
  };

  const activeEnrollments = MOCK_ENROLLMENTS.length;
  const completedCourses = MOCK_ENROLLMENTS.filter(
    (enrollment) => enrollment.progress === 100,
  ).length;
  const visibleInProgressCourses = filteredCourses.filter((course) => {
    const enrollment = enrollmentMap.get(course.id);
    return enrollment != null && enrollment.progress < 100;
  }).length;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <section className="framed-section rounded-[2rem] px-5 py-6 sm:px-7 sm:py-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,240,255,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,51,102,0.14),transparent_28%)]" />
        <div className="relative flex flex-col gap-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="editorial-eyebrow">portfolio discovery surface</span>
              <div className="mt-4 flex flex-col gap-3">
                <h1 className="max-w-2xl text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
                  Build a sharper operator stack with curated Growth AI learning tracks.
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                  Search the catalog, segment by experience level, and keep active progress visible
                  without leaving the discovery deck.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:min-w-[28rem]">
              <Card
                variant="glass"
                className="border-primary/20 bg-background/60 px-4 py-4 shadow-[var(--glow-primary-sm)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                      live catalog
                    </span>
                    <span className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                      {MOCK_COURSES.length}
                    </span>
                  </div>
                  <BookMarked className="size-5 text-primary" />
                </div>
              </Card>

              <Card
                variant="glass"
                className="border-secondary/20 bg-background/60 px-4 py-4 shadow-[var(--glow-secondary-sm)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                      active tracks
                    </span>
                    <span className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                      {activeEnrollments}
                    </span>
                  </div>
                  <Target className="size-5 text-secondary" />
                </div>
              </Card>

              <Card variant="glass" className="border-border/70 bg-background/60 px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                      completed
                    </span>
                    <span className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                      {completedCourses}
                    </span>
                  </div>
                  <Sparkles className="size-5 text-primary" />
                </div>
              </Card>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.85fr)]">
            <div className="glass rounded-[1.75rem] border border-border/70 p-4 sm:p-5">
              <div className="mb-4 flex items-center gap-2">
                <span className="editorial-eyebrow">refine results</span>
              </div>

              <div className="flex flex-col gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12 border-border/70 bg-background/70 pl-10 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                    <Filter className="size-3.5" />
                    experience filter
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {LEVEL_FILTERS.map((filter) => {
                      const isActive = levelFilter === filter.value;

                      return (
                        <button
                          key={filter.value}
                          type="button"
                          onClick={() => handleFilterClick(filter.value)}
                          className={cn(
                            "inline-flex shrink-0 items-center rounded-full border px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] transition-colors",
                            isActive
                              ? "border-primary/40 bg-primary/12 text-primary shadow-[var(--glow-primary-sm)]"
                              : "border-border/70 bg-background/60 text-muted-foreground hover:border-primary/25 hover:text-foreground",
                          )}
                        >
                          {filter.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <Card
              variant="glass"
              className="overflow-hidden rounded-[1.75rem] border-border/70 p-0"
            >
              <div className="border-b border-border/60 px-5 py-4">
                <span className="editorial-eyebrow">signal summary</span>
              </div>
              <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 lg:grid-cols-1">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                    result set
                  </span>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Showing{" "}
                    <span className="font-semibold text-foreground">{filteredCourses.length}</span>{" "}
                    of <span className="font-semibold text-foreground">{MOCK_COURSES.length}</span>{" "}
                    courses.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                    in progress now
                  </span>
                  <p className="text-sm leading-6 text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {visibleInProgressCourses}
                    </span>{" "}
                    visible tracks are currently underway.
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-1">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                    active stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {LEVEL_FILTERS.slice(1).map((filter) => (
                      <Badge
                        key={filter.value}
                        variant="outline"
                        className="border-border/70 bg-background/60 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground"
                      >
                        {filter.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <CourseCardSkeleton key={i} />)
          : filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                enrollment={enrollmentMap.get(course.id)}
              />
            ))}
      </div>

      {!isLoading && filteredCourses.length === 0 && (
        <div className="framed-section flex flex-col items-center justify-center gap-4 rounded-[1.75rem] px-6 py-16 text-center">
          <div className="flex size-16 items-center justify-center rounded-full border border-border/70 bg-background/70">
            <GraduationCap className="size-8 text-muted-foreground" />
          </div>
          <div className="flex max-w-md flex-col gap-2">
            <h3 className="text-lg font-semibold text-foreground">No courses found</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              Try adjusting your search term or switching the level filter to reopen the full
              discovery set.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
