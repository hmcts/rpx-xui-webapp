import { test, expect } from '../../fixtures';
import { SessionCapturePage } from '../../page-objects/pages/exui/sessionCapture.po';

test('IDAM login page is up and displays the email step', { tag: ['@e2e', '@e2e-smoke'] }, async ({ idamPage, page }) => {
  await page.goto('');

  // Check page title contains expected text
  await expect(idamPage.page).toHaveTitle(/HMCTS|Sign in/i);

  // Check for first IDAM credential step.
  await expect(idamPage.usernameInput).toBeVisible();

  // Check for submit button
  await expect(new SessionCapturePage(page).idamPrimarySubmitButton()).toBeVisible();
});
