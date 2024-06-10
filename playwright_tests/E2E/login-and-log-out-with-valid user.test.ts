import { test, expect } from '@playwright/test';
import { signIn } from "./steps/login-steps"

test('login and log out from EUI with valid user', async ({ page }) => {
  await signIn(page, 'PROD_LIKE');
  await expect(page.getByRole('heading', { name: 'Case list' })).toBeVisible();
  await page.getByText('Sign out').click();
  await expect(page.getByRole('heading', { name: 'Sign in or create an account' })).toBeVisible();
});

