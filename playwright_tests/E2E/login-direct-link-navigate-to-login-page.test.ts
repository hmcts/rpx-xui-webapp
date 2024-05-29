import { test, expect } from '@playwright/test';
import config from "../config.ts"

test('login Verify the direct link navigate to login page', async ({ page }) => {
  await page.goto(config.CaseAPIBaseURL);
  await expect(page.getByRole('heading', { name: 'Sign in or create an account' })).toBeVisible();
  expect(page.url()).toContain('idam-web-public');
});