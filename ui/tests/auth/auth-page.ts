import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "../base-page";
import { APP_ROUTES, DEMO_CREDENTIALS } from "../helpers";

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly demoCredentials: Locator;
  readonly dashboardEyebrow: Locator;
  readonly profileNavItem: Locator;
  readonly signOutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByLabel("Password");
    this.signInButton = page.getByRole("button", { name: "Sign In" });
    this.demoCredentials = page.getByText("Demo credentials");
    this.dashboardEyebrow = page.getByText("performance command overview");
    this.profileNavItem = page.getByRole("button", { name: /profile/i });
    this.signOutButton = page.getByRole("button", { name: /sign out/i });
  }

  async goto(): Promise<void> {
    await super.goto(APP_ROUTES.login);
  }

  async expectLoaded(): Promise<void> {
    await this.expectPathname(APP_ROUTES.login);
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.demoCredentials).toBeVisible();
  }

  async loginWithDemoCredentials(): Promise<void> {
    await this.emailInput.fill(DEMO_CREDENTIALS.email);
    await this.passwordInput.fill(DEMO_CREDENTIALS.password);
    await expect(this.signInButton).toBeEnabled();
    await this.signInButton.click();
  }

  async expectDashboardLoaded(): Promise<void> {
    await this.expectPathname(APP_ROUTES.dashboard);
    await expect(this.dashboardEyebrow).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.page.goto("/profile");
    await this.page.waitForLoadState("networkidle");
    await this.signOutButton.click();
  }
}
