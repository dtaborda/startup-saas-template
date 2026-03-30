import { test } from "@playwright/test";
import { LoginPage } from "../auth/auth-page";
import { MarketingPage } from "./marketing-page";

test.describe("Marketing", () => {
  test("public landing loads and routes primary CTA to login", {
    tag: ["@critical", "@e2e", "@marketing", "@MARKETING-E2E-001"],
  }, async ({ page }) => {
    const marketingPage = new MarketingPage(page);
    const loginPage = new LoginPage(page);

    await marketingPage.goto();
    await marketingPage.expectHeroVisible();

    await marketingPage.goToLoginFromPrimaryCta();

    await loginPage.expectLoaded();
  });
});
