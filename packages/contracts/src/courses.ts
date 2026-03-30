import { z } from "zod";
import { createSuccessResponseSchema, PaginationRequestSchema, TimestampsSchema } from "./common";

// ============================================================================
// Course Level
// ============================================================================

export const COURSE_LEVEL = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
} as const;

export type CourseLevel = (typeof COURSE_LEVEL)[keyof typeof COURSE_LEVEL];

// ============================================================================
// Course Status
// ============================================================================

export const COURSE_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
} as const;

export type CourseStatus = (typeof COURSE_STATUS)[keyof typeof COURSE_STATUS];

// ============================================================================
// Course
// ============================================================================

export const CourseSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(255),
  description: z.string(),
  instructor: z.string().min(1),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  status: z.enum(["draft", "published", "archived"]),
  thumbnailUrl: z.string().url().optional(),
  duration: z.number().int().min(0).describe("Duration in minutes"),
  lessonsCount: z.number().int().min(0),
  rating: z.number().min(0).max(5).optional(),
  enrolledCount: z.number().int().min(0),
  tags: z.array(z.string()),
  ...TimestampsSchema.shape,
});

export type Course = z.infer<typeof CourseSchema>;

// ============================================================================
// Course Enrollment
// ============================================================================

export const CourseEnrollmentSchema = z.object({
  id: z.string().uuid(),
  courseId: z.string().uuid(),
  userId: z.string().uuid(),
  progress: z.number().int().min(0).max(100),
  completedLessons: z.number().int().min(0),
  startedAt: z.string().datetime(),
  lastAccessedAt: z.string().datetime().optional(),
});

export type CourseEnrollment = z.infer<typeof CourseEnrollmentSchema>;

// ============================================================================
// Course List Request / Response
// ============================================================================

export const CourseListRequestSchema = PaginationRequestSchema.extend({
  level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  search: z.string().optional(),
});

export type CourseListRequest = z.infer<typeof CourseListRequestSchema>;

export const CourseListResponseSchema = createSuccessResponseSchema(z.array(CourseSchema));

export type CourseListResponse = z.infer<typeof CourseListResponseSchema>;
