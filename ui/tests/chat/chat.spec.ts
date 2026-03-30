import { test } from "@playwright/test";
import { LoginPage } from "../auth/auth-page";
import { createChatPrompt } from "../helpers";
import { ChatPage } from "./chat-page";

test.describe("Chat", () => {
  test("authenticated user can open chat and receive a streamed assistant response", {
    tag: ["@critical", "@e2e", "@chat", "@CHAT-E2E-001"],
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const chatPage = new ChatPage(page);
    const prompt = createChatPrompt();

    await loginPage.goto();
    await loginPage.loginWithDemoCredentials();
    await loginPage.expectDashboardLoaded();

    await chatPage.goto();
    await chatPage.expectLoaded();
    await chatPage.sendPrompt(prompt);

    await chatPage.expectPromptPersisted(prompt);
    await chatPage.expectAssistantResponse(prompt);
  });

  test("chat session persists after reload", {
    tag: ["@high", "@e2e", "@chat", "@CHAT-E2E-002"],
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const chatPage = new ChatPage(page);
    const prompt = createChatPrompt();

    await loginPage.goto();
    await loginPage.loginWithDemoCredentials();
    await loginPage.expectDashboardLoaded();
    await chatPage.goto();
    await chatPage.expectLoaded();

    await chatPage.sendPrompt(prompt);
    await chatPage.expectPromptPersisted(prompt);
    await chatPage.expectAssistantResponse(prompt);

    await page.reload();

    await chatPage.expectLoaded();
    await chatPage.expectPromptPersisted(prompt);
  });
});
