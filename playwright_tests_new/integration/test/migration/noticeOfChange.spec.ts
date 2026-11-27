import { expect, test } from '../../helpers/migrationTest.fixture';
import { setupMigrationVisualRoutes } from '../../helpers/migrationVisualRoutes.helper';
import { openNoticeOfChangeTimeQuestions, setupNoticeOfChangeMockRoutes } from '../../helpers/noticeOfChangeMockRoutes.helper';
import { NOTICE_OF_CHANGE_CASE_REFERENCE, NOTICE_OF_CHANGE_SOLICITOR_ROLES } from '../../mocks/noticeOfChange.mock';

test(
  'Notice of Change validates and corrects client details before review',
  { tag: ['@integration', '@integration-govuk-migration'] },
  async ({ page, migrationOrigin }) => {
    await setupMigrationVisualRoutes(page, NOTICE_OF_CHANGE_SOLICITOR_ROLES);
    const requests = await setupNoticeOfChangeMockRoutes(page, migrationOrigin);
    await page.goto('/noc');

    await expect(page.getByRole('heading', { name: 'Notice of change', exact: true })).toBeVisible();
    await expect(page).toHaveTitle(/Notice of Change/);
    const cleanTitle = await page.title();
    expect(cleanTitle).not.toMatch(/^Error:/);
    const errorTitle = `Error: ${cleanTitle}`;
    const caseReference = page.getByLabel('Online case reference number', { exact: true });
    await caseReference.fill('123');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    const referenceError = page.locator('exui-noc-case-ref').getByRole('alert');
    await expect(referenceError).toHaveAccessibleName('There is a problem');
    const referenceErrorLink = referenceError.getByRole('link');
    await expect(referenceErrorLink).toHaveAttribute('href', 'noc#caseRef');
    await expect(referenceError).toBeFocused();
    await expect.soft(page, 'The invalid case reference should add one Error prefix').toHaveTitle(errorTitle);
    await referenceErrorLink.press('Enter');
    await expect(caseReference).toBeFocused();
    expect(requests.questionReferences).toEqual([]);

    await caseReference.fill('1652-1121-2729-5261');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await expect(page.getByRole('heading', { name: "Enter your client's details", exact: true })).toBeVisible();
    await expect(page).toHaveTitle(cleanTitle);
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
    await expect.soft(page, 'The service mismatch should add one Error prefix').toHaveTitle(errorTitle);
    expect(requests.validations).toHaveLength(1);
    await expect(page.locator('#syntheticEmail')).toHaveValue('client@example.test');

    await page.locator('#syntheticEmail').fill('corrected@example.test');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Check and submit', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'There is a problem', exact: true })).toHaveCount(0);
    await expect(page).toHaveTitle(cleanTitle);
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
  }
);

for (const { type, value, displayValue } of [
  { type: 'Time', value: '00:00:00', displayValue: '00:00:00' },
  { type: 'DateTime', value: '2000-01-15T00:00:00.000', displayValue: '2000-01-15 00:00:00' },
] as const) {
  for (const clearedParts of [['Hour'], ['Minute'], ['Second'], ['Hour', 'Minute', 'Second']]) {
    test(
      `Notice of Change ${type} rejects cleared ${clearedParts.join(', ')} before validation`,
      {
        tag: ['@integration', '@integration-govuk-migration'],
      },
      async ({ page, migrationOrigin }, testInfo) => {
        await setupMigrationVisualRoutes(page, NOTICE_OF_CHANGE_SOLICITOR_ROLES);
        const { requests, field } = await openNoticeOfChangeTimeQuestions(page, migrationOrigin, type);
        await expect(page.getByRole('heading', { name: "Enter your client's details", exact: true })).toBeVisible();
        expect(requests.questionReferences).toEqual([NOTICE_OF_CHANGE_CASE_REFERENCE]);
        for (const part of ['Hour', 'Minute', 'Second']) {
          await expect(field.getByLabel(part, { exact: true })).toHaveValue('0');
        }
        for (const part of clearedParts) {
          await field.getByLabel(part, { exact: true }).fill('');
          await expect(field.getByLabel(part, { exact: true })).toHaveValue('');
        }
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        const validationError = page.locator('exui-noc-q-and-a').getByRole('alert');
        // Wait for validation or review to settle before checking that no request escaped validation.
        await expect(validationError.or(page.getByRole('heading', { name: 'Check and submit', exact: true }))).toBeVisible();
        await testInfo.attach('cleared-time-validation-requests', {
          body: JSON.stringify({ type, clearedParts, validations: requests.validations }),
          contentType: 'application/json',
        });
        expect(requests.submissions).toEqual([]);
        expect(requests.validations, 'Cleared time components must not be serialised as zero and submitted').toEqual([]);
        await expect(validationError).toHaveAccessibleName('There is a problem');
        await expect(page.getByRole('heading', { name: "Enter your client's details", exact: true })).toBeVisible();
      }
    );
  }

  test(
    `Notice of Change ${type} preserves explicitly entered zero in the validation payload`,
    {
      tag: ['@integration', '@integration-govuk-migration'],
    },
    async ({ page, migrationOrigin }) => {
      await setupMigrationVisualRoutes(page, NOTICE_OF_CHANGE_SOLICITOR_ROLES);
      const { requests, field } = await openNoticeOfChangeTimeQuestions(page, migrationOrigin, type);
      await expect(page.getByRole('heading', { name: "Enter your client's details", exact: true })).toBeVisible();
      expect(requests.questionReferences).toEqual([NOTICE_OF_CHANGE_CASE_REFERENCE]);
      for (const part of ['Hour', 'Minute', 'Second']) {
        await expect(field.getByLabel(part, { exact: true })).toHaveValue('0');
      }
      await page.getByRole('button', { name: 'Continue', exact: true }).click();
      await expect(page.getByRole('heading', { name: 'Check and submit', exact: true })).toBeVisible();
      expect(requests.validations).toEqual([
        {
          case_id: NOTICE_OF_CHANGE_CASE_REFERENCE,
          answers: [{ question_id: 'syntheticAppointment', value }],
        },
      ]);
      await expect(page.locator('exui-noc-check-your-answers')).toContainText(displayValue);
      expect(requests.submissions).toEqual([]);
    }
  );
}
