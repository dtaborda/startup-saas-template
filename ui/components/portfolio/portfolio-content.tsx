"use client";

import type { CourseLevel } from "@template/contracts";
import { Card, cn, Input, Skeleton } from "@template/ui";
import { GraduationCap, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { CourseCard } from "./course-card";
import { MOCK_COURSES, MOCK_ENROLLMENTS } from "./mock-data";

type LevelFilter = CourseLevel | "all";

const LEVEL_FILTERS: { value: LevelFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

function CourseCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-36 w-full rounded-none" />
      <div className="flex flex-col gap-3 p-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-3">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </Card>
  );
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export function PortfolioContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");

  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const enrollmentMap = (() => {
    const map = new Map<string, (typeof MOCK_ENROLLMENTS)[number]>();
    for (const enrollment of MOCK_ENROLLMENTS) {
      map.set(enrollment.courseId, enrollment);
    }
    return map;
  })();

  const filteredCourses = MOCK_COURSES.filter((course) => {
    const matchesSearch =
      debouncedSearch === "" || course.title.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesLevel = levelFilter === "all" || course.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Portfolio</h1>
        <p className="text-sm text-muted-foreground">
          {MOCK_COURSES.length} courses · {MOCK_ENROLLMENTS.length} enrolled
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 border-border/60 bg-card pl-9 text-sm"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {LEVEL_FILTERS.map((filter) => {
            const isActive = levelFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setLevelFilter(filter.value)}
                className={cn(
                  "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                  isActive
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border/60 bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <GraduationCap className="size-8 text-muted-foreground" />
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium text-foreground">No courses found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filter.</p>
          </div>
        </div>
      )}
    </div>
  );
}
