import { faker } from '@faker-js/faker';
import { expect, test } from '../../fixtures';
import { normalizeCaseNumber } from '../../utils';
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';
const jurisdiction = 'DIVORCE';
const caseType = 'XUI Case PoC';
let caseNumber: string;
const testField = faker.lorem.word() + new Date().toLocaleTimeString();


test.describe('Verify creating cases works as expected', async () => {
  let caseData 
  test.beforeEach(async ({ page,caseDetailsPage, createCasePage }) => {
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
  }) => {
    await test.step('Validate the case details', async () => {
      expect.soft(caseNumber).toMatch(validatorUtils.DIVORCE_CASE_NUMBER_REGEX);
      expect.soft(page.url()).toContain(`/${jurisdiction}/xuiTestJurisdiction/`);
    });

    await test.step('Find the created case in the case list', async () => {
      await caseListPage.goto();
      await caseListPage.searchByJurisdiction('Family Divorce');
      await caseListPage.searchByCaseType('XUI Case PoC');
      await caseListPage.searchByTextField0(testField);
      await caseListPage.exuiCaseListComponent.searchByCaseState('Case created');
      await caseListPage.applyFilters();
    });

    await test.step('Confirm the created case is in the search results', async () => {
      const table = await tableUtils.parseDataTable(caseListPage.exuiCaseListComponent.caseListTable);
      const found = table.some((row) => normalizeCaseNumber(String(row['Case reference'] ?? '')) === caseNumber);
      expect(found).toBeTruthy();
    });
  });
});
