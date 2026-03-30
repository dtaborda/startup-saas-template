import { Button } from "@template/ui";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <h1 className="mb-2 text-6xl font-bold text-foreground">404</h1>
      <h2 className="mb-4 text-xl text-muted-foreground">Page not found</h2>
      <p className="mb-8 max-w-md text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    </div>
  );
}
