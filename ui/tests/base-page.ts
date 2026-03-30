import { expect, type Page } from "@playwright/test";

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path: string): Promise<void> {
    await this.page.goto(path);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async expectPathname(pathname: string): Promise<void> {
    await expect(this.page).toHaveURL(
      new RegExp(`${pathname.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`),
      { timeout: 15000 },
    );
  }
}
