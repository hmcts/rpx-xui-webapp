import { faker } from '@faker-js/faker';
import { expect, test } from '../../fixtures';
import { formatCaseNumberWithDashes, normalizeCaseNumber } from '../../utils';
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';
import { caseDetails } from 'test_codecept/backendMock/services/hearings/mockData/completedHearing.data';
import { table } from 'console';
const jurisdiction = 'DIVORCE';
const caseType = 'XUI Case PoC';
let caseNumber: string;

test.describe('Verify creating cases works as expected', async () => {
  let caseData;

  test.beforeEach(async ({ page, caseDetailsPage, createCasePage, tableUtils }) => {
    await ensureAuthenticatedPage(page, 'SOLICITOR', { waitForSelector: 'exui-header' });
    caseData = await createCasePage.generateDivorcePoCData();
    await createCasePage.createDivorceCasePoC(jurisdiction, caseType, caseData);
    caseNumber = await caseDetailsPage.getCaseNumberFromUrl();
  });

  test('Verify creating a case in the divorce jurisdiction works as expected', async ({
    page,
    validatorUtils,
    caseListPage,
    tableUtils,
    caseDetailsPage,
  }) => {
    await test.step('Validate the case number format and URL', async () => {
      expect.soft(caseNumber).toMatch(validatorUtils.DIVORCE_CASE_NUMBER_REGEX);
      expect.soft(page.url()).toContain(`/${jurisdiction}/xuiTestJurisdiction/`);
    });

    await test.step('Check the case tab Data, matches previously entered data', async () => {
      const expected = {
        'Text Field 0': caseData.textField0,
        'Text Field 1': caseData.textField1,
        'Text Field 2': caseData.textField2,
        'Text Field 3': caseData.textField3,
        'Select your gender': caseData.gender,
        Title: caseData.person1Title,
        'First Name': caseData.person1FirstName,
        'Last Name': caseData.person1LastName,
        Gender: caseData.person1Gender,
      };
      const expectedJob = { Title: caseData.person1JobTitle, Description: caseData.person1JobDescription };

      const table1 = await caseDetailsPage.trRowsToObjectInPage(caseDetailsPage.divorceDataTable);
      expect.soft(table1).toMatchObject(expected);
      const table2 = await caseDetailsPage.trRowsToObjectInPage(caseDetailsPage.divorceDataSubTable);
      expect.soft(table2).toMatchObject(expectedJob);
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

    await test.step('Find the created case in the case list', async () => {
      await caseListPage.goto();
      await caseListPage.searchByJurisdiction('Family Divorce');
      await caseListPage.searchByCaseType('XUI Case PoC');
      await caseListPage.searchByTextField0(caseData.textField0);
      await caseListPage.exuiCaseListComponent.searchByCaseState('Case created');
      await caseListPage.applyFilters();
      await caseListPage.exuiSpinnerComponent.wait();
    });

    await test.step('Confirm the created case data is seen in the search results', async () => {
      await caseListPage.exuiCaseListComponent.caseListTable.waitFor({ state: 'visible' });

      const expected = {
        'Case reference': formatCaseNumberWithDashes(caseNumber),
        'Text Field 0': caseData.textField0,
        'Text Field 1': caseData.textField1,
        'Text Field 2': caseData.textField2,
      };
      const table = await tableUtils.parseDataTable(caseListPage.exuiCaseListComponent.caseListTable);
      const found = table.some((row) => normalizeCaseNumber(String(row['Case reference'] ?? '')) === caseNumber);
      expect(found).toBeTruthy();
      expect(table[0]).toMatchObject(expected);
    });
  });
});
