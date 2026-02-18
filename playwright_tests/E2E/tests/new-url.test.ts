import { test, expect } from '@playwright/test';
import { signIn } from '../steps/login-steps';
import { waitForSpinner } from '../steps/spinner-steps';
import { getCaseReferenceFromFirstRowForEmployment } from '../steps/table-steps';

test('Search from menu 16-digit find control and navigate to the new url', async ({ page }) => {
  await signIn(page, 'SEARCH_EMPLOYMENT_CASE');
  await expect(page.getByLabel('Manage Cases')).toBeVisible();
  await page.getByLabel('Jurisdiction').selectOption({ label: 'Employment' });
  await page.getByLabel('Case type').selectOption({ label: 'Eng/Wales - Singles' });
  await page.getByLabel('Apply filter').click();
  await waitForSpinner(page);
  await expect(page.getByRole('heading', { name: 'Your cases' })).toBeVisible();
  const firstCaseRef = await getCaseReferenceFromFirstRowForEmployment(page);
  await page.getByRole('textbox', { name: '-digit case reference:' }).click();
  await page.getByRole('textbox', { name: '-digit case reference:' }).fill(firstCaseRef);
  await page.getByRole('button', { name: 'Find' }).click();
  await expect(page.getByRole('link', { name: 'Print' })).toBeVisible();
  const pageUrl = page.url();
  const afterCaseDetails = pageUrl.split('case-details/')[1];
  expect(afterCaseDetails).toMatch(/^(EMPLOYMENT\/ET_EnglandWales\/)?\d{16}/);
});
