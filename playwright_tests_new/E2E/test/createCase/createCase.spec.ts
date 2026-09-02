import { expect, test } from '../../fixtures';
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';
import { retryOnTransientFailure } from '../../utils/transient-failure.utils';
import { createLogger } from '@hmcts/playwright-common';
const jurisdiction = 'DIVORCE';
const caseType = 'XUI Case PoC';
const logger = createLogger({ serviceName: 'create-case-e2e', format: 'pretty' });

test.describe('Verify creating cases works as expected', { tag: ['@e2e', '@e2e-create-case', '@e2e-data-loss'] }, () => {
  test('Verify creating a case in the divorce jurisdiction works as expected', async ({
    page,
    validatorUtils,
    caseDetailsPage,
    createCasePage,
    identityLease,
  }) => {
    const lease = await identityLease.acquire({ pool: 'DIVORCE_SOLICITOR' });
    await retryOnTransientFailure(
      () => ensureAuthenticatedPage(page, lease.identity.userIdentifier, { waitForSelector: 'exui-header' }),
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

    const caseData = await createCasePage.generateDivorcePoCData({ textField0: 'Hide all', divorceReasons: ['Adultery'] });
    const person1Data = await createCasePage.generateDivorcePoCPersonData({
      gender: 'Male',
    });

    await createCasePage.createCase(jurisdiction, caseType, '');
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
    await createCasePage.clickSubmitAndWait('creating divorce test case', { timeoutMs: 60_000 });
    await expect(createCasePage.caseAlertSuccessMessage).toBeVisible();
    const caseNumber = await caseDetailsPage.getCaseNumberFromUrl();

    await test.step('Validate the case number format and URL', async () => {
      expect.soft(caseNumber).toMatch(validatorUtils.DIVORCE_CASE_NUMBER_REGEX);
      expect.soft(page.url()).toContain(`/${jurisdiction}/xuiTestJurisdiction/`);
    });

    await test.step('Check the case tab Data, matches previously entered data (EXUI-848/EXUI-811/EXUI-433)', async () => {
      await caseDetailsPage.caseViewerTable.waitFor({ state: 'visible' });
      const table1 = await caseDetailsPage.trRowsToObjectInPage(caseDetailsPage.caseViewerTable);
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

    await test.step('Check the History tab shows the case creation event (EXUI-942)', async () => {
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
