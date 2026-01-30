import { faker } from '@faker-js/faker';
import { expect, test } from '../../fixtures';
import { loadSessionCookies } from '../../../common/sessionCapture';
let sessionCookies: any[] = [];
const jurisdiction = 'DIVORCE';
const caseType = 'XUI Case PoC';

test.describe('Verify creating cases works as expected', () => {
  test.beforeEach(async ({ page }) => {
    const { cookies } = loadSessionCookies('SOLICITOR');
    sessionCookies = cookies;
    if (sessionCookies.length) {
      await page.context().addCookies(sessionCookies);
    }
    await page.goto('/');
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
    let testField = faker.lorem.word() + new Date().toLocaleTimeString();

    await test.step('Create a case and validate the case details', async () => {
      await createCasePage.createDivorceCase(jurisdiction, caseType, testField);
      caseNumber = await caseDetailsPage.getCaseNumberFromAlert();
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
      const table = await tableUtils.mapExuiTable(caseListPage.exuiCaseListComponent.caseListTable);
      const found = table.some((row) => row['Case reference'] === `${caseNumber.slice(1)}`);
      expect(found).toBeTruthy();
    });
  });
});
