import { z } from "zod";

// ============================================================================
// Status Constants
// ============================================================================

export const APP_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export type AppStatus = (typeof APP_STATUS)[keyof typeof APP_STATUS];

// ============================================================================
// Error Response
// ============================================================================

export const ErrorDetailSchema = z.object({
  code: z.string(),
  message: z.string(),
  field: z.string().optional(),
});

export type ErrorDetail = z.infer<typeof ErrorDetailSchema>;

export const ErrorResponseSchema = z.object({
  errors: z.array(ErrorDetailSchema),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

// ============================================================================
// Pagination
// ============================================================================

export const PaginationRequestSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

export type PaginationRequest = z.infer<typeof PaginationRequestSchema>;

export const PaginationMetaSchema = z.object({
  page: z.number().int(),
  limit: z.number().int(),
  total: z.number().int(),
  totalPages: z.number().int(),
});

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

// ============================================================================
// Timestamps
// ============================================================================

export const TimestampsSchema = z.object({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Timestamps = z.infer<typeof TimestampsSchema>;

// ============================================================================
// API Response Wrapper
// ============================================================================

export const createSuccessResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.literal(true),
    data: dataSchema,
    meta: PaginationMetaSchema.optional(),
  });
