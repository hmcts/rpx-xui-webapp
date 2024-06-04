import { test, expect } from '@playwright/test';
import config from "../config.ts"

test('test', async ({ page }) => {
  await page.goto(config.CaseAPIBaseURL);
  await expect(page.getByRole('heading', { name: 'Sign in or create an account' })).toBeVisible();
  expect(page.url()).toContain('idam-web-public');
});