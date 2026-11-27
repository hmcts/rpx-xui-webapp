import { expect, test } from '@playwright/test';
import { setupMigrationVisualRoutes } from '../../helpers/migrationVisualRoutes.helper';
import { setupNoticeOfChangeMockRoutes } from '../../helpers/noticeOfChangeMockRoutes.helper';
import { NOTICE_OF_CHANGE_CASE_REFERENCE, NOTICE_OF_CHANGE_SOLICITOR_ROLES } from '../../mocks/noticeOfChange.mock';

test('Notice of Change validates and corrects client details before review', async ({ page }) => {
  await setupMigrationVisualRoutes(page, NOTICE_OF_CHANGE_SOLICITOR_ROLES);
  const requests = await setupNoticeOfChangeMockRoutes(page);
  await page.goto('/noc');

  await expect(page.getByRole('heading', { name: 'Notice of change', exact: true })).toBeVisible();
  const caseReference = page.getByLabel('Online case reference number', { exact: true });
  await caseReference.fill('123');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  const referenceError = page.locator('exui-noc-case-ref').getByRole('alert');
  await expect(referenceError).toHaveAccessibleName('There is a problem');
  await expect(referenceError.getByRole('link')).toHaveAttribute('href', 'noc#caseRef');
  expect(requests.questionReferences).toEqual([]);

  await caseReference.fill('1652-1121-2729-5261');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page.getByRole('heading', { name: "Enter your client's details", exact: true })).toBeVisible();
  expect(requests.questionReferences).toEqual([NOTICE_OF_CHANGE_CASE_REFERENCE]);
  await page.getByLabel('Synthetic client name', { exact: true }).fill('Synthetic Client');
  await page.getByLabel('Synthetic client email', { exact: true }).fill('not-an-email');
  await page.getByLabel('Day', { exact: true }).fill('32');
  await page.getByLabel('Month', { exact: true }).fill('1');
  await page.getByLabel('Year', { exact: true }).fill('2000');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page.getByText('The email is invalid')).toBeVisible();
  await expect(page.getByText('The date is invalid')).toBeVisible();
  expect(requests.validations).toEqual([]);

  // Stable IDs preserve the input lookup when the baseline adds error text to its label.
  await page.locator('#syntheticEmail').fill('client@example.test');
  await page.getByLabel('Day', { exact: true }).fill('15');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page.locator('#error-answers-not-matched')).toBeVisible();
  expect(requests.validations).toHaveLength(1);
  await expect(page.locator('#syntheticEmail')).toHaveValue('client@example.test');

  await page.locator('#syntheticEmail').fill('corrected@example.test');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Check and submit', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'There is a problem', exact: true })).toHaveCount(0);
  const summary = page.locator('exui-noc-check-your-answers');
  await expect(summary).toContainText('Synthetic Client');
  await expect(summary).toContainText('corrected@example.test');
  await expect(summary).toContainText('2000-01-15');
  expect(requests.validations).toHaveLength(2);
  expect(requests.validations[1]).toEqual({
    case_id: NOTICE_OF_CHANGE_CASE_REFERENCE,
    answers: [
      { question_id: 'syntheticName', value: 'Synthetic Client' },
      { question_id: 'syntheticEmail', value: 'corrected@example.test' },
      { question_id: 'syntheticDate', value: '2000-01-15' },
    ],
  });
  expect(requests.submissions).toEqual([]);
});
