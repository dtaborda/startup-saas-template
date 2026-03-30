import { Spinner } from "@template/ui";

export default function ChatLoading() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" />
        <p className="text-sm text-muted-foreground">Loading chat...</p>
      </div>
    </div>
  );
}
