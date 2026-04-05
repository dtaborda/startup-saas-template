"use client";

import { selectUser, useAuthStore } from "@template/core";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  cn,
  Input,
  Label,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@template/ui";
import {
  Bell,
  Camera,
  Loader2,
  Lock,
  LogOut,
  Settings,
  Shield,
  Smartphone,
  Sparkles,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, type ReactNode, useState } from "react";
import { toast } from "sonner";
import { useChatStore } from "@/stores/chat-store";

const NOTIFICATION_PREFERENCES = [
  {
    key: "email",
    label: "Email notifications",
    description: "Receive workspace updates and account events in your inbox.",
  },
  {
    key: "push",
    label: "Push notifications",
    description: "Get browser alerts for queue changes.",
  },
  {
    key: "marketing",
    label: "Marketing emails",
    description: "Hear about releases and product drops.",
  },
] as const;

const SESSION_DATA = [
  {
    device: "Chrome on macOS",
    location: "Buenos Aires, AR",
    lastActive: "Active now",
    current: true,
    icon: Sparkles,
  },
  {
    device: "Safari on iPhone",
    location: "Buenos Aires, AR",
    lastActive: "2 hours ago",
    current: false,
    icon: Smartphone,
  },
  {
    device: "Firefox on Windows",
    location: "Córdoba, AR",
    lastActive: "3 days ago",
    current: false,
    icon: Shield,
  },
] as const;

function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="border-b border-border/50 px-5 py-4">
        <CardTitle className="text-sm font-medium text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-5">{children}</CardContent>
    </Card>
  );
}

function GeneralTab({
  name,
  setName,
  email,
  role,
  avatarUrl,
  initials,
}: {
  name: string;
  setName: (value: string) => void;
  email: string;
  role: string;
  avatarUrl?: string;
  initials: string;
}) {
  return (
    <SectionCard title="Profile">
      <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center gap-3">
          <div className="group relative">
            <Avatar className="size-20 border border-border/60">
              {avatarUrl ? <AvatarImage src={avatarUrl} alt={name} /> : null}
              <AvatarFallback className="bg-primary/10 font-mono text-lg text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              className="absolute inset-0 flex items-center justify-center rounded-full bg-background/72 opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Change avatar"
            >
              <Camera className="size-4 text-foreground" />
            </button>
          </div>
          <Badge variant={role === "admin" ? "default" : "secondary"} className="text-xs">
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </Badge>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="profile-name" className="text-sm text-muted-foreground">
              Full name
            </Label>
            <Input
              id="profile-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              className="h-9 border-border/60 bg-background"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="profile-email" className="text-sm text-muted-foreground">
              Email address
            </Label>
            <Input
              id="profile-email"
              value={email}
              disabled
              className="h-9 border-border/60 bg-background opacity-70"
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function SettingsTab() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: false,
  });

  return (
    <SectionCard title="Notifications">
      <div className="flex flex-col divide-y divide-border/40">
        {NOTIFICATION_PREFERENCES.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
          >
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
            <Switch
              checked={notifications[item.key]}
              onCheckedChange={(checked: boolean) =>
                setNotifications((current) => ({
                  ...current,
                  [item.key]: checked,
                }))
              }
            />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function SecurityTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChanging, setIsChanging] = useState(false);

  const handleChangePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      return;
    }

    setIsChanging(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Failed to change password");
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <SectionCard title="Change password">
        <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="current-password" className="text-sm text-muted-foreground">
                Current password
              </Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                placeholder="Current"
                className="h-9 border-border/60 bg-background"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="new-password" className="text-sm text-muted-foreground">
                New password
              </Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="New"
                className="h-9 border-border/60 bg-background"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirm-password" className="text-sm text-muted-foreground">
                Confirm password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm"
                className="h-9 border-border/60 bg-background"
              />
            </div>
          </div>

          {newPassword && confirmPassword && newPassword !== confirmPassword ? (
            <p className="text-sm text-destructive">Passwords do not match.</p>
          ) : null}

          <div className="flex justify-end">
            <Button
              type="submit"
              size="sm"
              disabled={
                isChanging || !currentPassword || !newPassword || newPassword !== confirmPassword
              }
            >
              {isChanging ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Lock className="size-4" />
                  Update Password
                </>
              )}
            </Button>
          </div>
        </form>
      </SectionCard>

      <SectionCard title="Active sessions">
        <div className="flex flex-col divide-y divide-border/40">
          {SESSION_DATA.map((session) => {
            const SessionIcon = session.icon;

            return (
              <div
                key={session.device}
                className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex size-9 items-center justify-center rounded-lg border",
                      session.current
                        ? "border-primary/25 text-primary"
                        : "border-border/60 text-muted-foreground",
                    )}
                  >
                    <SessionIcon className="size-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{session.device}</p>
                      {session.current ? (
                        <Badge className="border-primary/25 bg-primary/10 px-1.5 py-0 text-[0.6rem] text-primary">
                          Current
                        </Badge>
                      ) : null}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {session.location} · {session.lastActive}
                    </p>
                  </div>
                </div>

                {!session.current ? (
                  <Button variant="ghost" size="sm" className="text-destructive">
                    Revoke
                  </Button>
                ) : null}
              </div>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}

export function ProfileContent() {
  const user = useAuthStore(selectUser);
  const router = useRouter();
  const [name, setName] = useState(user?.name ?? "Demo User");
  const [isSaving, setIsSaving] = useState(false);

  const email = user?.email ?? "demo@startup.com";
  const role = user?.role ?? "user";
  const avatarUrl = user?.avatarUrl;

  const handleLogout = () => {
    document.cookie = "auth-token=; path=/; max-age=0; samesite=lax";
    useAuthStore.getState().clearSession();
    useChatStore.getState().reset();
    router.push("/login");
  };

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSave = async () => {
    setIsSaving(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Profile</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-destructive hover:text-destructive"
          >
            <LogOut className="size-4" />
            Sign out
          </Button>

          <Button size="sm" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Settings className="size-4" />
                Save
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="flex flex-col gap-4">
        <TabsList className="h-auto w-fit gap-1 bg-transparent p-0">
          <TabsTrigger
            value="general"
            className="gap-1.5 rounded-md px-3 py-1.5 text-sm data-[state=active]:bg-card data-[state=active]:text-foreground"
          >
            <User className="size-4" />
            General
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="gap-1.5 rounded-md px-3 py-1.5 text-sm data-[state=active]:bg-card data-[state=active]:text-foreground"
          >
            <Bell className="size-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="gap-1.5 rounded-md px-3 py-1.5 text-sm data-[state=active]:bg-card data-[state=active]:text-foreground"
          >
            <Shield className="size-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-0">
          <GeneralTab
            name={name}
            setName={setName}
            email={email}
            role={role}
            avatarUrl={avatarUrl}
            initials={initials}
          />
        </TabsContent>

        <TabsContent value="settings" className="mt-0">
          <SettingsTab />
        </TabsContent>

        <TabsContent value="security" className="mt-0">
          <SecurityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
