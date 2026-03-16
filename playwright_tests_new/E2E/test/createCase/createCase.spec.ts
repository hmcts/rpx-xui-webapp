import { expect, test } from '../../fixtures';
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';
import { retryOnTransientFailure } from '../../utils/transient-failure.utils';
import { createLogger } from '@hmcts/playwright-common';
const jurisdiction = 'DIVORCE';
const caseType = 'XUI Case PoC';
let caseNumber: string;
const logger = createLogger({ serviceName: 'create-case-e2e', format: 'pretty' });

test.describe('Verify creating cases works as expected', { tag: ['@e2e', '@e2e-create-case'] }, () => {
  let caseData;
  let person1Data;

  test.beforeEach(async ({ page, caseDetailsPage, createCasePage }) => {
    await retryOnTransientFailure(
      async () => {
        await ensureAuthenticatedPage(page, 'SOLICITOR', { waitForSelector: 'exui-header' });

        caseData = await createCasePage.generateDivorcePoCData({ textField0: 'Hide all', divorceReasons: ['Adultery'] });
        person1Data = await createCasePage.generateDivorcePoCPersonData({
          gender: 'Male',
        });

        await createCasePage.createCase(jurisdiction, caseType, '', {
          maxAttempts: 1,
        });

        await createCasePage.fillDivorcePocSections({
          data: person1Data,
          textFields: {
            textField0: caseData.textField0,
            textField1: caseData.textField1,
            textField2: caseData.textField2,
            textField3: caseData.textField3,
          },
          divorceReasons: caseData.divorceReasons,
          gender: caseData.gender,
        });
        await createCasePage.testSubmitButton.click();
        await expect(createCasePage.caseAlertSuccessMessage).toBeVisible();
        caseNumber = await caseDetailsPage.getCaseNumberFromUrl();
      },
      {
        maxAttempts: 2,
        onRetry: async () => {
          if (page.isClosed()) {
            return;
          }
          try {
            await page.goto('/');
          } catch (error) {
            logger.warn('Retry reset navigation failed before create-case beforeEach retry', { error });
            throw error;
          }
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
      expect.soft(page.url()).toContain(`/${jurisdiction}/xuiTestJurisdiction/`);
    });

    await test.step('Check the case tab Data, matches previously entered data', async () => {
      const table1 = await caseDetailsPage.trRowsToObjectInPage(caseDetailsPage.divorceDataTable);
      expect.soft(table1).toMatchObject({
        'Text Field 0': caseData.textField0,
        'Text Field 2': caseData.textField2,
        'Text Field 3': caseData.textField3,
        'Select your gender': caseData.gender,
        Title: person1Data.title,
        'First Name': person1Data.firstName,
        'Last Name': person1Data.lastName,
        Gender: person1Data.gender,
      });
      expect.soft(table1).not.toHaveProperty('Text Field 1');
      const table2 = await caseDetailsPage.trRowsToObjectInPage(caseDetailsPage.divorceDataSubTable);
      expect.soft(table2).toMatchObject({ Title: person1Data.jobTitle, Description: person1Data.jobDescription });
    });

    await test.step('Check the History tab shows the case creation event', async () => {
      await caseDetailsPage.selectCaseDetailsTab('History');

      const { updateRow, updateDate, updateAuthor } = await caseDetailsPage.getCaseHistoryByEvent('Create a case');

      expect.soft(updateRow, 'Create a case row should be present').toBeTruthy();
      expect.soft(updateAuthor, 'Case author should be present').not.toBe('');

      const expectedDetails = {
        Date: updateDate,
        Author: updateAuthor,
        'End state': 'Case created',
        Event: 'Create a case',
        Summary: '-',
        Comment: '-',
      };
      const table = await caseDetailsPage.trRowsToObjectInPage(caseDetailsPage.historyDetailsTable);
      expect.soft(table).toMatchObject(expectedDetails);
    });
  });
});
