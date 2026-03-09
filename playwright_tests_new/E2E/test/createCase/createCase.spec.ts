import { expect, test } from '../../fixtures';
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';
import { retryOnTransientFailure } from '../../utils/transient-failure.utils';

const jurisdiction = 'DIVORCE';
const caseType = 'XUI Test Case type';
const CREATE_CASE_SETUP_MAX_ATTEMPTS = 3;
const CREATE_CASE_FLOW_MAX_ATTEMPTS = 2;
let caseNumber: string;
let testValue: string;

test.describe('Verify creating cases works as expected', () => {
  test.describe.configure({ timeout: 300_000 });

  test.beforeEach(async ({ page, caseDetailsPage, createCasePage }) => {
    await retryOnTransientFailure(
      async () => {
        await ensureAuthenticatedPage(page, 'SOLICITOR', { waitForSelector: 'exui-header' });

        testValue = `create-${Date.now()}`;
        await createCasePage.createDivorceCase(jurisdiction, caseType, testValue, {
          maxAttempts: CREATE_CASE_FLOW_MAX_ATTEMPTS,
          createCaseMaxAttempts: CREATE_CASE_FLOW_MAX_ATTEMPTS,
        });
        caseNumber = await caseDetailsPage.getCaseNumberFromUrl();
      },
      {
        maxAttempts: CREATE_CASE_SETUP_MAX_ATTEMPTS,
        onRetry: async () => {
          if (page.isClosed()) {
            return;
          }
          await page.goto('/').catch(() => undefined);
        },
      }
    );
  });

  test('Verify creating a case in the divorce jurisdiction works as expected', async ({
    page,
    validatorUtils,
    caseDetailsPage,
  }) => {
    await test.step('Validate the case number format and URL', async () => {
      expect.soft(caseNumber).toMatch(validatorUtils.DIVORCE_CASE_NUMBER_REGEX);
      expect.soft(page.url()).toContain('/cases/case-details/');
    });

    await test.step('Check the case tab data matches the created XUI Test Case type value', async () => {
      await caseDetailsPage.selectCaseDetailsTab('Tab 1');
      const caseViewerTable = caseDetailsPage.page.getByRole('table', { name: 'case viewer table' });
      await caseViewerTable.waitFor({ state: 'visible' });
      const textFieldRow = caseViewerTable.getByRole('row', { name: 'Text Field' });
      await expect.soft(textFieldRow).toContainText(testValue);
    });
  });
});
