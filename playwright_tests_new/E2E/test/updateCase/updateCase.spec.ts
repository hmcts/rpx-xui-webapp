import { faker } from '@faker-js/faker';
import { expect, test } from '../../fixtures';
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';
import { caseBannerMatches } from '../../utils';
import { createDivorceCase } from '../../utils/test-setup/journeys/divorceCaseJourneys';
import { retryOnTransientFailure } from '../../utils/transient-failure.utils';
import { setupCaseForJourney } from '../../utils/test-setup/caseSetup';

let caseNumber: string;
const testField = faker.lorem.word() + new Date().toLocaleTimeString();
const updatedFileName = `updated-case-${Date.now()}.doc`;
const updatedFileContent = 'Updated case document content';
const UPDATE_CASE_ACTION_TIMEOUT_MS = 60_000;
const UPDATE_CASE_FIELD_READY_TIMEOUT_MS = 90_000;
const UPDATE_CASE_SETUP_CREATE_MAX_ATTEMPTS = 3;

test.describe('Verify creating and updating a case works as expected', () => {
  test.describe.configure({ timeout: 300_000 });

  test.beforeEach(async ({ page, createCasePage, caseDetailsPage }, testInfo) => {
    await retryOnTransientFailure(
      async () => {
        await ensureAuthenticatedPage(page, 'SOLICITOR', {
          waitForSelector: 'exui-header',
          timeoutMs: 30_000,
        });
        const setup = await setupCaseForJourney({
          scenario: 'update-case-divorce-xui-test-case-type',
          jurisdiction: 'DIVORCE',
          caseType: 'XUI Test Case type',
          mode: 'ui-only',
          uiCreate: async () => {
            await createDivorceCase(createCasePage, 'DIVORCE', 'XUI Test Case type', testField, {
              maxAttempts: UPDATE_CASE_SETUP_CREATE_MAX_ATTEMPTS,
              createCaseMaxAttempts: UPDATE_CASE_SETUP_CREATE_MAX_ATTEMPTS,
            });
          },
          page,
          createCasePage,
          caseDetailsPage,
          testInfo,
        });
        caseNumber = setup.caseNumber;
      },
      {
        maxAttempts: UPDATE_CASE_SETUP_CREATE_MAX_ATTEMPTS,
        onRetry: async () => {
          if (page.isClosed()) {
            return;
          }
          await page.goto('/').catch(() => undefined);
        },
      }
    );
  });

  test('Create, update and verify case details', async ({ page, createCasePage, caseDetailsPage }) => {
    let caseDetailsUrl = '';

    await test.step('Start Update Case event', async () => {
      caseDetailsUrl = await caseDetailsPage.getCurrentPageUrl();
      await caseDetailsPage.selectCaseAction('Update case', {
        expectedLocator: createCasePage.fileUploadInput,
        timeoutMs: UPDATE_CASE_ACTION_TIMEOUT_MS,
      });
    });

    await test.step('Update case fields', async () => {
      await retryOnTransientFailure(
        async () => {
          await createCasePage.fileUploadInput.waitFor({
            state: 'visible',
            timeout: UPDATE_CASE_FIELD_READY_TIMEOUT_MS,
          });
          await createCasePage.uploadFile(updatedFileName, 'application/msword', updatedFileContent);
          await createCasePage.clickSubmitAndWait('after updating case fields', {
            timeoutMs: 60_000,
            maxAutoAdvanceAttempts: 6,
          });
        },
        {
          maxAttempts: 3,
          onRetry: async () => {
            if (page.isClosed()) {
              return;
            }
            await caseDetailsPage.reopenCaseDetails(caseDetailsUrl).catch(async () => {
              await page.goto(caseDetailsUrl).catch(() => undefined);
            });
            await caseDetailsPage.selectCaseAction('Update case', {
              expectedLocator: createCasePage.fileUploadInput,
              timeoutMs: UPDATE_CASE_ACTION_TIMEOUT_MS,
              retry: false,
            });
          },
        }
      );

      await caseDetailsPage.exuiSpinnerComponent.wait();
      await expect.soft(caseDetailsPage.caseAlertSuccessMessage).toBeVisible();
    });

    await test.step('Verify update success banner', async () => {
      const expectedMessage = 'has been updated with event: Update case';
      await expect
        .poll(
          async () => {
            const bannerText = await caseDetailsPage.caseAlertSuccessMessage.innerText();
            return caseBannerMatches(bannerText, caseNumber, expectedMessage);
          },
          { timeout: 45_000, intervals: [1_000, 2_000, 3_000] }
        )
        .toBe(true);
    });

    await test.step("Verify the 'Tab 1' tab shows the updated document and original text field", async () => {
      await caseDetailsPage.selectCaseDetailsTab('Tab 1');
      const caseViewerTable = caseDetailsPage.page.getByRole('table', { name: 'case viewer table' });
      await caseViewerTable.waitFor({ state: 'visible' });
      const textFieldRow = caseViewerTable.getByRole('row', { name: 'Text Field' });
      await expect.soft(textFieldRow).toContainText(testField);
      const documentRow = caseViewerTable.getByRole('row', { name: 'Document 1' });
      await expect.soft(documentRow).toContainText(updatedFileName);
    });
  });
});
