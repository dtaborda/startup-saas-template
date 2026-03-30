import type { AuthSession, User } from "@template/contracts/auth";

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

export function getAuthProvider(): AuthProvider {
  if (!currentProvider) {
    throw new Error("AuthProvider not registered. Call registerAuthProvider() first.");
  }
  return currentProvider;
}
