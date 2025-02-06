import { test, expect } from '@playwright/test';

export async function submitEvent(page) {
  await page.getByLabel('Next step').selectOption('3: Object');
  await page.getByRole('button', { name: 'Go' }).click();
  await expect(page.getByText('Update case')).toBeVisible();
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText('Update case')).toBeVisible();
  await page.getByRole('checkbox', { name: 'Behaviour' }).check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('has been updated with event: Update case')).toBeVisible();
};