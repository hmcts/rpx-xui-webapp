import { expect, test } from '../../../E2E/fixtures';
import { openDynamicFieldConfigJourney } from '../../helpers/dynamicFieldConfigMockRoutes.helper';

test.describe(
  'Create case dynamic field-config validation',
  { tag: ['@integration', '@integration-create-case', '@integration-dynamic-field-config'] },
  () => {
    test.beforeEach(async ({ page }) => {
      await openDynamicFieldConfigJourney(page);
      await expect(page.getByLabel('Case title')).toBeVisible();
    });

    test('rejects a value that violates configured regular-expression validation', async ({ createCasePage, page }) => {
      await page.getByLabel('Case title').fill('A title');
      await page.locator('#CaseReference').fill('ABC');
      await createCasePage.continueButton.click();

      await expect(page.locator('#CaseReference')).toHaveValue('ABC');
      await expect(
        page.locator('.govuk-error-message, .validation-error').filter({ hasText: /Case reference is not valid/i })
      ).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Check your answers' })).toBeHidden();
    });

    test('makes a conditionally mandatory field required when its controller selects urgent', async ({
      createCasePage,
      page,
    }) => {
      await page.getByLabel('Case title').fill('An urgent case');
      await page.getByLabel('Case type').selectOption({ label: 'Urgent' });
      await page.locator('#CaseReference').fill('123');
      await createCasePage.continueButton.click();

      await expect(
        page.locator('.govuk-error-message, .validation-error').filter({ hasText: /reason for urgent handling/i })
      ).toBeVisible();
      await expect(page.getByLabel('Reason for urgent handling')).toBeVisible();
    });
  }
);
