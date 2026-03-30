import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, real, text, timestamp, uuid } from "drizzle-orm/pg-core";

// ============================================================
// ENUMS
// ============================================================
export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);
export const courseLevelEnum = pgEnum("course_level", ["beginner", "intermediate", "advanced"]);
export const courseStatusEnum = pgEnum("course_status", ["draft", "published", "archived"]);
export const messageRoleEnum = pgEnum("message_role", ["user", "assistant", "system"]);

// ============================================================
// TABLE: Users
// ============================================================
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  avatarUrl: text("avatar_url"),
  role: userRoleEnum("role").default("user").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ============================================================
// TABLE: Chat Sessions
// ============================================================
export const chatSessions = pgTable("chat_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull().default("New conversation"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ============================================================
// TABLE: Chat Messages
// ============================================================
export const chatMessages = pgTable("chat_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id")
    .notNull()
    .references(() => chatSessions.id, { onDelete: "cascade" }),
  role: messageRoleEnum("role").notNull(),
  content: text("content").notNull(),
  sources: text("sources"), // JSON stringified RagSource[]
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ============================================================
// TABLE: Courses
// ============================================================
export const courses = pgTable("courses", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  instructor: text("instructor").notNull(),
  level: courseLevelEnum("level").notNull(),
  status: courseStatusEnum("status").default("draft").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  duration: integer("duration").notNull(), // minutes
  lessonsCount: integer("lessons_count").default(0).notNull(),
  rating: real("rating"),
  enrolledCount: integer("enrolled_count").default(0).notNull(),
  tags: text("tags").array(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ============================================================
// TABLE: Course Enrollments
// ============================================================
export const courseEnrollments = pgTable("course_enrollments", {
  id: uuid("id").primaryKey().defaultRandom(),
  courseId: uuid("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  progress: integer("progress").default(0).notNull(), // 0-100
  completedLessons: integer("completed_lessons").default(0).notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }).defaultNow().notNull(),
  lastAccessedAt: timestamp("last_accessed_at", { withTimezone: true }),
});

// ============================================================
// RELATIONS: Users
// ============================================================
export const usersRelations = relations(users, ({ many }) => ({
  chatSessions: many(chatSessions),
  courseEnrollments: many(courseEnrollments),
}));

// ============================================================
// RELATIONS: Chat Sessions
// ============================================================
export const chatSessionsRelations = relations(chatSessions, ({ one, many }) => ({
  user: one(users, {
    fields: [chatSessions.userId],
    references: [users.id],
  }),
  messages: many(chatMessages),
}));

// ============================================================
// RELATIONS: Chat Messages
// ============================================================
export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  session: one(chatSessions, {
    fields: [chatMessages.sessionId],
    references: [chatSessions.id],
  }),
}));

// ============================================================
// RELATIONS: Courses
// ============================================================
export const coursesRelations = relations(courses, ({ many }) => ({
  enrollments: many(courseEnrollments),
}));

// ============================================================
// RELATIONS: Course Enrollments
// ============================================================
export const courseEnrollmentsRelations = relations(courseEnrollments, ({ one }) => ({
  course: one(courses, {
    fields: [courseEnrollments.courseId],
    references: [courses.id],
  }),
  user: one(users, {
    fields: [courseEnrollments.userId],
    references: [users.id],
  }),
}));
