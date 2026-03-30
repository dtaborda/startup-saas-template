import { expect, test } from "@playwright/test";
import { APP_ROUTES } from "../helpers";
import { LoginPage } from "./auth-page";

test.describe("Auth", () => {
  test("unauthenticated dashboard access redirects to login", {
    tag: ["@critical", "@e2e", "@auth", "@AUTH-E2E-001"],
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto(APP_ROUTES.dashboard);

    await loginPage.expectLoaded();
  });

  test("demo login reaches the dashboard", {
    tag: ["@critical", "@e2e", "@auth", "@AUTH-E2E-002"],
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginWithDemoCredentials();

    await loginPage.expectDashboardLoaded();
  });

  test("logout returns the user to login", {
    tag: ["@critical", "@e2e", "@auth", "@AUTH-E2E-003"],
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginWithDemoCredentials();
    await loginPage.expectDashboardLoaded();

    await loginPage.logout();

    await expect(page).toHaveURL(new RegExp(`${APP_ROUTES.login}$`));
    await loginPage.expectLoaded();
  });
});
