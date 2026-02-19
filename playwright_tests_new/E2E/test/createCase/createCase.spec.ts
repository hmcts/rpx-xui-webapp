import { faker } from '@faker-js/faker';
import { expect, test } from '../../fixtures';
import { normalizeCaseNumber } from '../../utils';
import { ensureAuthenticatedPage } from '../../../common/sessionCapture';
const jurisdiction = 'DIVORCE';
const caseType = 'XUI Case PoC';

test.describe('Verify creating cases works as expected', () => {
  test.beforeEach(async ({ page }) => {
    await ensureAuthenticatedPage(page, 'SOLICITOR', { waitForSelector: 'exui-header' });
  });

  test('Verify creating a case in the divorce jurisdiction works as expected', async ({
    page,
    validatorUtils,
    createCasePage,
    caseDetailsPage,
    caseListPage,
    tableUtils,
  }) => {
    let caseNumber: string;
    const testField = faker.lorem.word() + new Date().toLocaleTimeString();

    await test.step('Create a case and validate the case details', async () => {
      await createCasePage.createDivorceCase(jurisdiction, caseType, testField);
      // Always collect case number from URL for consistency and reliability
      caseNumber = await caseDetailsPage.getCaseNumberFromUrl();
      expect(caseNumber).toMatch(validatorUtils.DIVORCE_CASE_NUMBER_REGEX);
      expect(page.url()).toContain(`/${jurisdiction}/xuiTestJurisdiction/`);
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
