import type { AuthSession, User } from "@template/contracts/auth";
import type { AuthProvider } from "./provider";

const MOCK_USER: User = {
  id: "00000000-0000-0000-0000-000000000001",
  email: "demo@startup.com",
  name: "Demo User",
  avatarUrl: undefined,
  role: "user",
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z",
};

export const MOCK_TOKEN = "mock-jwt-token-for-development";

export class MockAuthProvider implements AuthProvider {
  private session: AuthSession | null = null;

  async login(email: string, password: string): Promise<AuthSession> {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    if (email === "demo@startup.com" && password === "demo123") {
      this.session = {
        user: MOCK_USER,
        token: MOCK_TOKEN,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };
      return this.session;
    }
    throw new Error("Invalid credentials. Use demo@startup.com / demo123");
  }

  async logout(): Promise<void> {
    await new Promise((r) => setTimeout(r, 300));
    this.session = null;
  }

  async getUser(): Promise<User | null> {
    return this.session?.user ?? null;
  }

  async getSession(): Promise<AuthSession | null> {
    return this.session;
  }
}
