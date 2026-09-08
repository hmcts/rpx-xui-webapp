import { expect, test } from '../../../E2E/fixtures';
import { openDynamicFieldConfigJourney } from '../../helpers/dynamicFieldConfigMockRoutes.helper';
import { routeCaseCreationFlow } from '../../utils/caseCreationRoutes';

test.describe(
  'Create case dynamic field-config coverage',
  { tag: ['@integration', '@integration-create-case', '@integration-dynamic-field-config'] },
  () => {
    test.beforeEach(async ({ page }) => {
      await openDynamicFieldConfigJourney(page);
      await expect(page.getByLabel('Case title')).toBeVisible();
    });

    test('renders configured defaults, lists, hints and conditional fields', async ({ page }) => {
      await expect(page.getByLabel('Case title')).toHaveValue('Default case title');
      await expect(page.getByText('Enter a title for this case')).toBeVisible();
      await expect(page.getByLabel('Case type').locator('option:checked')).toHaveText('Standard');
      await expect(page.getByLabel('Reason for urgent handling')).toBeHidden();
      const serviceSelect = page.locator('#Service');
      await expect(serviceSelect).toBeVisible();
      await expect(serviceSelect).toContainText('Civil');
      await expect(serviceSelect).toContainText('Family');
      await expect(page.getByLabel('Hidden value without retention')).toBeVisible();
      await expect(page.getByLabel('Hidden value with retention')).toBeVisible();

      await page.getByLabel('Case type').selectOption({ label: 'Urgent' });
      await expect(page.getByLabel('Reason for urgent handling')).toBeVisible();
      await expect(page.getByLabel('Hidden value without retention')).toBeHidden();
      await expect(page.getByLabel('Hidden value with retention')).toBeHidden();
    });

    test('submits configured values and retains only fields marked for hidden retention', async ({
      page,
      createCasePage,
      caseDetailsPage,
    }) => {
      await page.getByLabel('Case title').fill('Dynamic field-config case');
      await page.getByLabel('Case type').selectOption({ label: 'Urgent' });
      await page.getByLabel('Reason for urgent handling').fill('Priority issue');
      await page.locator('#CaseReference').fill('123');
      await page.locator('#Service').selectOption({ label: 'Family' });
      await createCasePage.continueButton.click();

      const answers = await caseDetailsPage.trRowsToObjectInPage(createCasePage.checkYourAnswersTable);
      expect(answers).toMatchObject({
        'Case title': 'Dynamic field-config case',
        'Case type': 'Urgent',
        'Case reference': '123',
        Service: 'Family',
        'Reason for urgent handling': 'Priority issue',
      });
      const createRequestPromise = routeCaseCreationFlow(page);
      await createCasePage.testSubmitButton.click({ noWaitAfter: true });
      const request = (await createRequestPromise) as { data?: Record<string, unknown> };
      expect(request.data).toEqual({
        CaseTitle: 'Dynamic field-config case',
        CaseType: 'urgent',
        CaseReference: '123',
        Service: {
          value: { code: 'family', label: 'Family' },
          list_items: [
            { code: 'civil', label: 'Civil' },
            { code: 'family', label: 'Family' },
          ],
        },
        UrgentReason: 'Priority issue',
        HiddenWithRetention: 'keep-me',
      });
    });
  }
);
