import type { Metadata } from "next";
import { LoginForm } from "@/components/auth";

export const metadata: Metadata = {
  title: "Login | Startup SaaS Template",
  description: "Sign in to your account",
};

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
      </div>
      <LoginForm />
    </div>
  );
}
