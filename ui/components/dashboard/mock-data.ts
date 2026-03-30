export const KPI_DATA = [
  {
    icon: "Users" as const,
    label: "Total Users",
    value: "12,486",
    change: 12.5,
    changeLabel: "vs last month",
  },
  {
    icon: "DollarSign" as const,
    label: "Revenue",
    value: "$48,352",
    change: 8.2,
    changeLabel: "vs last month",
  },
  {
    icon: "TrendingUp" as const,
    label: "Conversions",
    value: "3.24%",
    change: -2.1,
    changeLabel: "vs last month",
  },
  {
    icon: "Activity" as const,
    label: "Active Now",
    value: "573",
    change: 18.7,
    changeLabel: "vs yesterday",
  },
];

export const REVENUE_DATA = [
  { month: "Jan", revenue: 18600 },
  { month: "Feb", revenue: 22400 },
  { month: "Mar", revenue: 28900 },
  { month: "Apr", revenue: 31200 },
  { month: "May", revenue: 38100 },
  { month: "Jun", revenue: 48352 },
];

export const USER_GROWTH_DATA = [
  { month: "Jan", users: 8200 },
  { month: "Feb", users: 9100 },
  { month: "Mar", users: 9800 },
  { month: "Apr", users: 10500 },
  { month: "May", users: 11400 },
  { month: "Jun", users: 12486 },
];

export type ActivityStatus = "success" | "pending" | "failed";

export const RECENT_ACTIVITY: Array<{
  user: string;
  action: string;
  date: string;
  status: ActivityStatus;
}> = [
  {
    user: "Sarah Chen",
    action: "Completed course: React Fundamentals",
    date: "2 min ago",
    status: "success",
  },
  {
    user: "Alex Rivera",
    action: "Started new chat session",
    date: "15 min ago",
    status: "success",
  },
  {
    user: "Jordan Lee",
    action: "Updated profile settings",
    date: "1 hour ago",
    status: "success",
  },
  {
    user: "Sam Taylor",
    action: "Payment processing",
    date: "2 hours ago",
    status: "pending",
  },
  {
    user: "Morgan Wu",
    action: "Enrolled in: Advanced TypeScript",
    date: "3 hours ago",
    status: "success",
  },
  {
    user: "Casey Kim",
    action: "Failed login attempt",
    date: "4 hours ago",
    status: "failed",
  },
  {
    user: "Jamie Park",
    action: "Completed course: Node.js Basics",
    date: "5 hours ago",
    status: "success",
  },
  {
    user: "Riley Adams",
    action: "Submitted support ticket",
    date: "6 hours ago",
    status: "pending",
  },
];
