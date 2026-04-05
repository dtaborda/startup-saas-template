import type { AuthSession, User } from "@template/contracts/auth";
import { MockAuthProvider } from "./mock-provider";

export interface AuthProvider {
  login(email: string, password: string): Promise<AuthSession>;
  logout(): Promise<void>;
  getUser(): Promise<User | null>;
  getSession(): Promise<AuthSession | null>;
}

// Module-level registry (DI without framework)
let currentProvider: AuthProvider | null = null;

export function registerAuthProvider(provider: AuthProvider): void {
  currentProvider = provider;
}

export function hasAuthProvider(): boolean {
  return currentProvider !== null;
}

export function getAuthProvider(): AuthProvider {
  if (!currentProvider) {
    if (process.env.NODE_ENV !== "test") {
      console.warn(
        "[AuthProvider] No provider registered. Auto-registering MockAuthProvider as default. " +
          "Call registerAuthProvider() explicitly in your app initialization to use a real provider.",
      );
    }
    currentProvider = new MockAuthProvider();
  }
  return currentProvider;
}
