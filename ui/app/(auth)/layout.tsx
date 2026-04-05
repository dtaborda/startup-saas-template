import type { ReactNode } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-8">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </div>
  );
}
