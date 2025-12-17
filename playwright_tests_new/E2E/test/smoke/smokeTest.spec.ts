import { test, expect } from '../../fixtures';

test('IDAM login page is up and displays username and password fields', async ({ idamPage , page}) => {
  await page.goto('');

  // Check page title contains expected text
  await expect(idamPage.page).toHaveTitle(/HMCTS|Sign in/i);

  // Check for username and password input fields by ID
  await expect(idamPage.usernameInput).toBeVisible();
  await expect(idamPage.passwordInput).toBeVisible();

  // Check for submit button
  await expect(idamPage.submitBtn).toBeVisible();
});