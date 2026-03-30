import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "../base-page";
import { APP_ROUTES } from "../helpers";

export class MarketingPage extends BasePage {
  readonly brandEyebrow: Locator;
  readonly heroHeading: Locator;
  readonly primaryCta: Locator;

  constructor(page: Page) {
    super(page);
    this.brandEyebrow = page.getByText("growth ai / editorial command");
    this.heroHeading = page.getByRole("heading", {
      name: /The growth operating system for teams who need signal, story, and action in one frame\./i,
    });
    this.primaryCta = page.getByRole("main").getByRole("link", { name: /Enter platform/i });
  }

  async goto(): Promise<void> {
    await super.goto(APP_ROUTES.marketing);
  }

  async expectHeroVisible(): Promise<void> {
    await expect(this.brandEyebrow).toBeVisible();
    await expect(this.heroHeading).toBeVisible();
    await expect(this.primaryCta).toBeVisible();
  }

  async goToLoginFromPrimaryCta(): Promise<void> {
    await this.primaryCta.click();
  }
}
