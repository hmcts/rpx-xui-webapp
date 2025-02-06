import { test, expect } from '@playwright/test';
import { signIn, signOut } from './steps/login-steps';
import { waitForSpinner } from './steps/spinner-steps';
import { getCaseReferenceFromFirstRow, dealWithShortenedCaseRefLabel } from './steps/table-steps';
import { confirmNextSteps, confirmTabsVisible, caseDetailsCheck, validateWorkBasketComplexValues, validateWorkbasketInputs } from './steps/test-case';
import { waitForSpecificResponse } from './helpers/responseListenerHelper';

test('Validate next steps drop down', async ({ page }) => {
  const response = waitForSpecificResponse(
    page,
    'data/internal/cases/',
    'GET'
  );

  await signIn(page, 'SOLICITOR');
  await expect(page.getByLabel('Manage Cases')).toBeVisible();
  await page.getByLabel('Case type').selectOption({ label: 'XUI Case PoC' });
  await page.getByLabel('Apply filter').click();
  await waitForSpinner(page);
  await expect(page.getByRole('heading', { name: 'Your cases' })).toBeVisible();
  const firstCaseRef = await getCaseReferenceFromFirstRow(page);
  await page.getByLabel(`go to case with Case reference:${dealWithShortenedCaseRefLabel(firstCaseRef)}`).click();
  const responseData = await response;
  const expectedData = responseData?.triggers;
  const nextStepsMatch = await confirmNextSteps(page, expectedData);
  expect(nextStepsMatch).toBeTruthy();
  await signOut(page);
});

test('Validate tabs are visible', async ({ page }) => {
  const response = waitForSpecificResponse(
    page,
    'data/internal/cases/',
    'GET'
  );

  await signIn(page, 'SOLICITOR');
  await expect(page.getByLabel('Manage Cases')).toBeVisible();
  await page.getByLabel('Case type').selectOption({ label: 'XUI Case PoC' });
  await page.getByLabel('Apply filter').click();
  await waitForSpinner(page);
  await expect(page.getByRole('heading', { name: 'Your cases' })).toBeVisible();
  const firstCaseRef = await getCaseReferenceFromFirstRow(page);
  await page.getByLabel(`go to case with Case reference:${dealWithShortenedCaseRefLabel(firstCaseRef)}`).click();
  const responseData = await response;
  const expectedData = responseData?.tabs;
  const tabsMatch = await confirmTabsVisible(page, expectedData);
  expect(tabsMatch).toBeTruthy();
  await signOut(page);
});

test('Validate tabs details', async ({ page }) => {
  const response = waitForSpecificResponse(
    page,
    'data/internal/cases/',
    'GET'
  );

  await signIn(page, 'SOLICITOR');
  await expect(page.getByLabel('Manage Cases')).toBeVisible();
  await page.getByLabel('Case type').selectOption({ label: 'XUI Case PoC' });
  await page.getByLabel('Apply filter').click();
  await waitForSpinner(page);
  await expect(page.getByRole('heading', { name: 'Your cases' })).toBeVisible();
  const firstCaseRef = await getCaseReferenceFromFirstRow(page);
  await page.getByLabel(`go to case with Case reference:${dealWithShortenedCaseRefLabel(firstCaseRef)}`).click();
  const responseData = await response;
  const expectedData = responseData;
  await caseDetailsCheck(page, expectedData);
  await signOut(page);
});

test('Validate workbasket inputs against the API response', async ({ page }) => {
  const response = waitForSpecificResponse(
    page,
    'data/internal/case-types/xuiTestCaseType_dev/',
    'GET'
  );

  await signIn(page, 'SOLICITOR');
  await expect(page.getByLabel('Manage Cases')).toBeVisible();
  await page.getByLabel('Case type').selectOption({ label: 'XUI Test Case type dev' });
  await page.getByLabel('State').selectOption({ label: 'Case created' });

  await page.getByLabel('Apply filter').click();
  await waitForSpinner(page);
  await expect(page.getByRole('heading', { name: 'Your cases' })).toBeVisible();
  const responseData = await response;
  const workBasketData = responseData.workbasketInputs;
  validateWorkbasketInputs(page, workBasketData);
  await signOut(page);
});

test('Validate workbasket complex values against the API response', async ({ page }) => {
  const response = waitForSpecificResponse(
    page,
    'data/internal/case-types/xuiTestCaseType_dev/',
    'GET'
  );

  await signIn(page, 'SOLICITOR');
  await expect(page.getByLabel('Manage Cases')).toBeVisible();
  await page.getByLabel('Case type').selectOption({ label: 'XUI Test Case type dev' });
  await page.getByLabel('State').selectOption({ label: 'Case created' });
  await page.getByLabel('Apply filter').click();
  await waitForSpinner(page);
  await expect(page.getByRole('heading', { name: 'Your cases' })).toBeVisible();
  const responseData = await response;
  const workBasketData = responseData.workbasketInputs;
  validateWorkBasketComplexValues(page, workBasketData);
  await signOut(page);
});

test('check form validations are functioning ', async ({ page }) => {
  await signIn(page, 'SOLICITOR');
  await expect(page.getByLabel('Manage Cases')).toBeVisible();
  await page.getByLabel('Case type').selectOption({ label: 'XUI Case PoC' });
  await page.getByRole('link', { name: 'Create case' }).click();
  await page.getByLabel('Jurisdiction').selectOption('DIVORCE');
  await page.getByLabel('Case type').selectOption('xuiTestCaseType_dev');
  await page.getByRole('button', { name: 'Start' }).click();
  await expect(page.getByRole('heading', { name: 'Page 1 header' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Text Field' }).click();
  await page.getByRole('textbox', { name: 'Text Field' }).fill('test');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('1@2.c');
  await page.getByRole('textbox', { name: 'Phone UK' }).click();
  await page.locator('ccd-write-phone-uk-field div').click();
  await page.getByRole('textbox', { name: 'Phone UK' }).fill('012345678');
  await page.getByRole('group', { name: 'Date', exact: true }).click();
  await page.getByRole('group', { name: 'Date', exact: true }).getByLabel('Day').click();
  await page.getByRole('group', { name: 'Date', exact: true }).getByLabel('Day').fill('34');
  await page.getByRole('group', { name: 'Date', exact: true }).getByLabel('Day').press('Tab');
  await page.getByRole('group', { name: 'Date', exact: true }).getByLabel('Month').fill('12');
  await page.getByRole('group', { name: 'Date', exact: true }).getByLabel('Month').press('Tab');
  await page.getByRole('group', { name: 'Date', exact: true }).getByLabel('Year').fill('2024');
  await page.getByRole('group', { name: 'Date Time' }).getByLabel('Day').click();
  await page.getByRole('group', { name: 'Date Time' }).getByLabel('Day').fill('36');
  await page.getByRole('group', { name: 'Date Time' }).getByLabel('Month').click();
  await page.getByRole('group', { name: 'Date Time' }).getByLabel('Month').fill('12');
  await page.getByRole('group', { name: 'Date Time' }).getByLabel('Year').click();
  await page.getByRole('group', { name: 'Date Time' }).getByLabel('Year').fill('2024');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('textbox', { name: 'Money GBP' }).click();
  await page.getByRole('textbox', { name: 'Money GBP' }).fill('12');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('heading', { name: 'The event could not be created' })).toBeVisible();
  await expect(page.getByText('Date or Time entered is not').first()).toBeVisible();
  await expect(page.getByLabel('The event could not be created').getByText('The data entered is not valid')).toBeVisible();
  await signOut(page);
});
