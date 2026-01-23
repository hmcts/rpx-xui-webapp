import { test, expect } from '@playwright/test';
import { signIn, signOut } from "../steps/login-steps";
import { createCase } from '../steps/create-xui-case-poc-steps';
import { waitForSpinner } from '../steps/spinner-steps';
import { dealWithShortenedCaseRefLabel, getCaseReferenceFromFirstRow, getCaseReferenceFromFirstRowForEmployment } from '../steps/table-steps';

test('event journey with new url along with jurisdiction and caseType ', async ({ page }) => {
  await signIn(page, 'SOLICITOR');
  await expect(page.getByLabel('Manage Cases')).toBeVisible();
  await page.getByLabel('Jurisdiction').selectOption({ label: 'Family Divorce' });
  await page.getByLabel('Case type').selectOption({ label: 'XUI Case PoC' });
  await page.getByLabel('Apply filter').click();
  await waitForSpinner(page);
  await expect(page.getByRole('heading', { name: 'Your cases' })).toBeVisible();
  let firstCaseRef = await getCaseReferenceFromFirstRow(page);
  if (firstCaseRef.trim().length === 0) {
    await createCase(page);
    firstCaseRef = await getCaseReferenceFromFirstRow(page);
  }
  await page.getByRole('link', { name: `go to case with Case reference:${dealWithShortenedCaseRefLabel(firstCaseRef)}` }).click();
  await expect(page.locator('h1')).toContainText(`#${firstCaseRef}`);

  await page.getByLabel('Next step').selectOption('3: Object');
  await page.getByRole('button', { name: 'Go' }).click();
  await expect(page.getByText('Update case')).toBeVisible();
  let pageUrl = page.url();
  let afterCaseDetails = pageUrl.split('case-details/')[1];
  expect(afterCaseDetails).toMatch(/^DIVORCE\/xuiTestJurisdiction\//);
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText('Update case')).toBeVisible();
  await page.getByRole('checkbox', { name: 'Behaviour' }).check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('has been updated with event: Update case')).toBeVisible();
  pageUrl = page.url();
  afterCaseDetails = pageUrl.split('case-details/')[1];
  expect(afterCaseDetails).toMatch(/^DIVORCE\/xuiTestJurisdiction\//);
});

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
  expect(afterCaseDetails).toMatch(/^EMPLOYMENT\/ET_EnglandWales\//);
});
