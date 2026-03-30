import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "../base-page";
import { APP_ROUTES } from "../helpers";

export class ChatPage extends BasePage {
  readonly chatLog: Locator;
  readonly messageInput: Locator;
  readonly sendMessageButton: Locator;

  constructor(page: Page) {
    super(page);
    this.chatLog = page.getByRole("log", { name: "Chat messages" });
    this.messageInput = page.getByLabel("Message input");
    this.sendMessageButton = page.getByRole("button", { name: "Send message" });
  }

  async goto(): Promise<void> {
    await super.goto(APP_ROUTES.chat);
  }

  async expectLoaded(): Promise<void> {
    await this.expectPathname(APP_ROUTES.chat);
    await expect(this.chatLog).toBeVisible();
    await expect(this.messageInput).toBeVisible();
  }

  async sendPrompt(prompt: string): Promise<void> {
    await this.messageInput.fill(prompt);
    await this.sendMessageButton.click();
  }

  async expectPromptPersisted(prompt: string): Promise<void> {
    await expect(this.chatLog.getByText(prompt, { exact: true })).toBeVisible();
  }

  async expectAssistantResponse(prompt: string): Promise<void> {
    const messages = this.chatLog.locator("li");

    await expect(messages).toHaveCount(2, { timeout: 15000 });
    await expect(this.sendMessageButton).toBeVisible({ timeout: 15000 });

    const assistantMessage = messages.nth(1);
    await expect
      .poll(
        async () => {
          const text = (await assistantMessage.textContent())?.replace(/\s+/g, " ").trim() ?? "";

          if (!text || text === prompt) {
            return 0;
          }

          return text.length;
        },
        {
          timeout: 15000,
          message: "Expected the assistant message to contain streamed content.",
        },
      )
      .toBeGreaterThan(24);
  }
}
