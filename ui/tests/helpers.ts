const DEMO_CREDENTIALS = {
  email: "demo@startup.com",
  password: "demo123",
} as const;

const APP_ROUTES = {
  marketing: "/",
  login: "/login",
  dashboard: "/dashboard",
  chat: "/chat",
} as const;

function createChatPrompt(): string {
  return `Playwright growth prompt ${Date.now()}`;
}

export { APP_ROUTES, createChatPrompt, DEMO_CREDENTIALS };
