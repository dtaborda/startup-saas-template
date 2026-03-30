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
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
  Input,
  Label,
  Separator,
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

const NOTIFICATION_PREFERENCES = [
  {
    key: "email",
    label: "Email notifications",
    description: "Receive workspace updates and account events in your inbox.",
  },
  {
    key: "push",
    label: "Push notifications",
    description: "Get browser alerts when the Growth AI queue changes state.",
  },
  {
    key: "marketing",
    label: "Marketing emails",
    description: "Hear about releases, experiments, and editorial product drops.",
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

interface SectionShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

function SectionShell({ eyebrow, title, description, children }: SectionShellProps) {
  return (
    <Card variant="glass" className="overflow-hidden rounded-[1.75rem] border-border/70 p-0">
      <CardHeader className="flex flex-col gap-3 border-b border-border/50 px-5 py-5 sm:px-6">
        <span className="editorial-eyebrow">{eyebrow}</span>
        <div className="flex flex-col gap-2">
          <CardTitle className="text-xl font-semibold tracking-[-0.04em] text-foreground">
            {title}
          </CardTitle>
          <CardDescription className="max-w-2xl text-sm leading-6 text-muted-foreground">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-5 py-5 sm:px-6 sm:py-6">{children}</CardContent>
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
    <div className="flex flex-col gap-6">
      <SectionShell
        eyebrow="identity layer"
        title="Operator profile"
        description="Keep your Growth AI identity, account role, and editable personal information aligned across the command center."
      >
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="framed-section rounded-[1.5rem] px-5 py-5">
            <div className="relative flex flex-col gap-5">
              <div className="group relative mx-auto sm:mx-0">
                <Avatar className="size-28 border border-primary/25 bg-background/70 shadow-[var(--glow-primary-sm)]">
                  {avatarUrl ? <AvatarImage src={avatarUrl} alt={name} /> : null}
                  <AvatarFallback className="bg-primary/15 font-mono text-2xl text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  className="absolute inset-0 flex items-center justify-center rounded-full bg-background/72 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label="Change avatar"
                >
                  <Camera className="size-5 text-foreground" />
                </button>
              </div>

              <div className="flex flex-col gap-2 text-center sm:text-left">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-semibold tracking-[-0.04em] text-foreground">
                      {name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{email}</p>
                  </div>
                  <Badge
                    variant={role === "admin" ? "default" : "secondary"}
                    className="rounded-full px-3 py-1 font-mono text-[0.64rem] uppercase tracking-[0.2em]"
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Badge>
                </div>

                <p className="text-sm leading-6 text-muted-foreground">
                  Your profile badge powers the workspace identity shown in the top rail, signal
                  log, and team-facing surfaces.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-[1.5rem] border border-border/60 bg-background/45 p-4 sm:p-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="profile-name" className="text-sm font-medium text-foreground">
                  Full name
                </Label>
                <Input
                  id="profile-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className="h-12 border-border/70 bg-background/70"
                />
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-border/60 bg-background/45 p-4 sm:p-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="profile-email" className="text-sm font-medium text-foreground">
                  Email address
                </Label>
                <Input
                  id="profile-email"
                  value={email}
                  disabled
                  className="h-12 border-border/70 bg-background/70 opacity-70"
                />
                <p className="text-sm leading-6 text-muted-foreground">
                  Email stays locked here. Contact support if your operator address needs to change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>
    </div>
  );
}

function SettingsTab() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: false,
  });

  return (
    <div className="flex flex-col gap-6">
      <SectionShell
        eyebrow="workspace preferences"
        title="Dark-mode command settings"
        description="General settings keep notification behavior and region context intact while removing any remaining light-theme affordance."
      >
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div className="rounded-[1.5rem] border border-primary/20 bg-primary/8 p-4 shadow-[var(--glow-primary-sm)] sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[0.64rem] uppercase tracking-[0.22em] text-primary">
                  appearance lock
                </span>
                <h3 className="text-lg font-semibold tracking-[-0.04em] text-foreground">
                  Growth AI runs dark-only by design
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  Your workspace keeps the high-contrast neon shell active at all times so signal
                  readability and branded hierarchy stay consistent.
                </p>
              </div>

              <Badge className="rounded-full border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-primary">
                dark mode active
              </Badge>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-border/60 bg-background/45 p-4 sm:p-5">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[0.64rem] uppercase tracking-[0.22em] text-muted-foreground">
                locale
              </span>
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-foreground">Language &amp; region</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Interface copy stays tuned for the primary Growth AI operating region.
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="rounded-full border-border/70 bg-background/65 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground"
                >
                  English (US)
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="notification controls"
        title="Preference routing"
        description="Notification toggles preserve the current local state behavior while clarifying what each channel controls."
      >
        <div className="flex flex-col gap-3">
          {NOTIFICATION_PREFERENCES.map((item) => (
            <div
              key={item.key}
              className="flex flex-col gap-4 rounded-[1.4rem] border border-border/60 bg-background/45 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
            >
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
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
      </SectionShell>
    </div>
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
    <div className="flex flex-col gap-6">
      <SectionShell
        eyebrow="access protection"
        title="Credential rotation"
        description="Password actions preserve the simulated save boundary and keep validation feedback readable against the dark security surface."
      >
        <form onSubmit={handleChangePassword} className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[1.5rem] border border-border/60 bg-background/45 p-4 sm:p-5 lg:col-span-2">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="current-password" className="text-sm font-medium text-foreground">
                  Current password
                </Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  placeholder="Enter current password"
                  className="h-12 border-border/70 bg-background/70"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="new-password" className="text-sm font-medium text-foreground">
                  New password
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="Enter new password"
                  className="h-12 border-border/70 bg-background/70"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="confirm-password" className="text-sm font-medium text-foreground">
                  Confirm password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Confirm new password"
                  className="h-12 border-border/70 bg-background/70"
                />
              </div>
            </div>

            {newPassword && confirmPassword && newPassword !== confirmPassword ? (
              <p className="mt-4 text-sm text-destructive">Passwords do not match.</p>
            ) : null}
          </div>

          <div className="rounded-[1.5rem] border border-border/60 bg-background/45 p-4 sm:p-5 lg:col-span-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[0.64rem] uppercase tracking-[0.22em] text-muted-foreground">
                  password action
                </span>
                <p className="text-sm leading-6 text-muted-foreground">
                  Keep operator credentials current and aligned with the active session inventory.
                </p>
              </div>
              <Button
                type="submit"
                disabled={
                  isChanging || !currentPassword || !newPassword || newPassword !== confirmPassword
                }
                className="rounded-full px-5"
              >
                {isChanging ? (
                  <>
                    <Loader2 data-icon="inline-start" className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Lock data-icon="inline-start" />
                    Update Password
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </SectionShell>

      <SectionShell
        eyebrow="active sessions"
        title="Session inventory"
        description="Current and historical device sessions stay visible so security review can happen without leaving the profile workspace."
      >
        <div className="flex flex-col gap-3">
          {SESSION_DATA.map((session) => {
            const SessionIcon = session.icon;

            return (
              <div
                key={session.device}
                className="flex flex-col gap-4 rounded-[1.4rem] border border-border/60 bg-background/45 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex size-11 items-center justify-center rounded-2xl border bg-background/70",
                      session.current
                        ? "border-primary/25 text-primary"
                        : "border-border/60 text-muted-foreground",
                    )}
                  >
                    <SessionIcon className="size-5" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{session.device}</p>
                      {session.current ? (
                        <Badge className="rounded-full border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-primary">
                          Current
                        </Badge>
                      ) : null}
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {session.location} · {session.lastActive}
                    </p>
                  </div>
                </div>

                {session.current ? (
                  <Badge
                    variant="outline"
                    className="rounded-full border-border/70 bg-background/65 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    trusted session
                  </Badge>
                ) : (
                  <Button variant="ghost" size="sm" className="rounded-full text-destructive">
                    Revoke
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </SectionShell>
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

  const handleLogout = async () => {
    if (typeof window !== "undefined" && "cookieStore" in window) {
      await window.cookieStore.delete("auth-token");
    }
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
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <section className="framed-section rounded-[2rem] px-5 py-6 sm:px-7 sm:py-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,240,255,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,51,102,0.14),transparent_28%)]" />
        <div className="relative flex flex-col gap-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="flex max-w-3xl flex-col gap-4">
              <span className="editorial-eyebrow">account command center</span>
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
                  Profile, settings, and security stay in one controlled surface.
                </h1>
                <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                  Update your operator identity, tune notification routing, and review session
                  access without leaving the branded Growth AI workspace.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Card
                variant="glass"
                className="rounded-[1.5rem] border-border/70 bg-background/60 px-4 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-[1rem] border border-primary/20 bg-primary/10 text-primary">
                    <User className="size-5" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[0.64rem] uppercase tracking-[0.22em] text-muted-foreground">
                      role access
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {role.charAt(0).toUpperCase() + role.slice(1)} operator
                    </span>
                  </div>
                </div>
              </Card>

              <Button
                variant="ghost"
                onClick={handleLogout}
                className="rounded-full border border-destructive/30 px-5 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut data-icon="inline-start" />
                Sign out
              </Button>

              <Button onClick={handleSave} disabled={isSaving} className="rounded-full px-5">
                {isSaving ? (
                  <>
                    <Loader2 data-icon="inline-start" className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Settings data-icon="inline-start" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>

          <Separator className="opacity-50" />

          <Tabs defaultValue="general" className="flex flex-col gap-5">
            <TabsList className="h-auto w-full justify-start gap-2 rounded-[1.25rem] border border-border/60 bg-background/50 p-2">
              <TabsTrigger
                value="general"
                className="gap-2 rounded-[1rem] px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.2em] data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-[var(--glow-primary-sm)]"
              >
                <User className="size-4" />
                General
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="gap-2 rounded-[1rem] px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.2em] data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-[var(--glow-primary-sm)]"
              >
                <Bell className="size-4" />
                Settings
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="gap-2 rounded-[1rem] px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.2em] data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-[var(--glow-primary-sm)]"
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
      </section>
    </div>
  );
}
