import { z } from "zod";

// ============================================================================
// Notification Types
// ============================================================================

export const NotificationTypeSchema = z.enum(["info", "success", "warning", "alert"]);

export type NotificationType = z.infer<typeof NotificationTypeSchema>;

// ============================================================================
// Notification
// ============================================================================

export const NotificationSchema = z.object({
  id: z.string(),
  title: z.string(),
  message: z.string(),
  type: NotificationTypeSchema,
  read: z.boolean(),
  createdAt: z.string().datetime(),
});

export type Notification = z.infer<typeof NotificationSchema>;

// ============================================================================
// Notification List
// ============================================================================

export const NotificationListSchema = z.array(NotificationSchema);

export type NotificationList = z.infer<typeof NotificationListSchema>;
