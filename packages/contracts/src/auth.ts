import { z } from "zod";
import { TimestampsSchema } from "./common";

// ============================================================================
// User Roles
// ============================================================================

export const USER_ROLE = {
  USER: "user",
  ADMIN: "admin",
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

// ============================================================================
// User
// ============================================================================

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(255),
  avatarUrl: z.string().url().optional(),
  role: z.enum(["user", "admin"]),
  ...TimestampsSchema.shape,
});

export type User = z.infer<typeof UserSchema>;

// ============================================================================
// Login
// ============================================================================

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({
  user: UserSchema,
  token: z.string(),
  expiresAt: z.string().datetime(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

// ============================================================================
// Signup
// ============================================================================

export const SignupRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1).max(255),
});

export type SignupRequest = z.infer<typeof SignupRequestSchema>;

export const SignupResponseSchema = z.object({
  user: UserSchema,
  token: z.string(),
});

export type SignupResponse = z.infer<typeof SignupResponseSchema>;

// ============================================================================
// Auth Session
// ============================================================================

export const AuthSessionSchema = z.object({
  user: UserSchema,
  token: z.string(),
  expiresAt: z.string().datetime(),
});

export type AuthSession = z.infer<typeof AuthSessionSchema>;
