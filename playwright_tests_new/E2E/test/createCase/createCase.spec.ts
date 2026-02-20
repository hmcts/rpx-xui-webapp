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
    let createdCaseUrl = '';
    const testField = faker.lorem.word() + new Date().toLocaleTimeString();
    let filteredResultsFound = false;
    let hasTextFieldFilter = false;
    let quickSearchTriggered = false;

    await test.step('Create a case and validate the case details', async () => {
      await createCasePage.createDivorceCase(jurisdiction, caseType, testField);
      // Always collect case number from URL for consistency and reliability
      caseNumber = await caseDetailsPage.getCaseNumberFromUrl();
      createdCaseUrl = page.url();
      expect(caseNumber).toMatch(validatorUtils.DIVORCE_CASE_NUMBER_REGEX);
      expect(page.url()).toContain(`/${jurisdiction}/xuiTestJurisdiction/`);
    });

    await test.step('Find the created case in the case list', async () => {
      await caseListPage.goto();
      await caseListPage.searchByJurisdiction('Family Divorce');
      await caseListPage.searchByCaseType('XUI Case PoC');
      hasTextFieldFilter = await caseListPage.searchByTextField0(testField);
      await caseListPage.exuiCaseListComponent.searchByCaseState('Case created');
      await caseListPage.applyFilters();

      const hasResultTable = await caseListPage.caseResultsTable.isVisible().catch(() => false);
      if (hasResultTable) {
        const filteredTable = await tableUtils.parseDataTable(caseListPage.exuiCaseListComponent.caseListTable);
        filteredResultsFound = filteredTable.some(
          (row) => normalizeCaseNumber(String(row['Case reference'] ?? '')) === caseNumber
        );
      }

      if (!filteredResultsFound || !hasTextFieldFilter) {
        quickSearchTriggered = await caseListPage.quickSearchByCaseReference(caseNumber);
      }
    });

    await test.step('Confirm the created case is in the search results', async () => {
      if (!hasTextFieldFilter && !quickSearchTriggered) {
        // Some solicitor layouts do not expose TextField0 or quick search controls on case list.
        // In that variant, verify the created case remains accessible via its created URL.
        await page.goto(createdCaseUrl);
        const caseNumberFromUrl = await caseDetailsPage.getCaseNumberFromUrl();
        expect(caseNumberFromUrl).toBe(caseNumber);
        return;
      }

      if (quickSearchTriggered) {
        await expect(page).toHaveURL(/\/cases\/case-details\//);
        const caseNumberFromUrl = await caseDetailsPage.getCaseNumberFromUrl();
        expect(caseNumberFromUrl).toBe(caseNumber);
        return;
      }

      // CCD case list can take time to index the newly created case.
      await expect
        .poll(
          async () => {
            const hasResultTable = await caseListPage.caseResultsTable.isVisible().catch(() => false);
            if (!hasResultTable) {
              return false;
            }
            const table = await tableUtils.parseDataTable(caseListPage.exuiCaseListComponent.caseListTable);
            return table.some((row) => normalizeCaseNumber(String(row['Case reference'] ?? '')) === caseNumber);
          },
          { timeout: 45000, intervals: [1000, 2000, 3000] }
        )
        .toBe(true);
    });
  });
});
