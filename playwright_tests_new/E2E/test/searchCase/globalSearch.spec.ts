import { test, expect } from '../../fixtures';
import { ensureSession, loadSessionCookies } from '../../../common/sessionCapture.ts';
import { resolveCaseReferenceWithFallback } from '../../../E2E/utils/case-reference.utils.ts';

test.describe('IDAM login using credentials for Global Search', () => {
  let availableCaseReference = '';
  test.beforeAll(async () => {
    await ensureSession('FPL_GLOBAL_SEARCH');
  });

  test.beforeEach(async ({ page, caseListPage }) => {
    const { cookies } = loadSessionCookies('FPL_GLOBAL_SEARCH');
    if (cookies.length) {
      await page.context().addCookies(cookies);
    }

    await page.goto('/');
    availableCaseReference = await resolveCaseReferenceWithFallback(
      page,
      async () => {
        await caseListPage.goto();
        const caseReference = await caseListPage.getRandomCaseReferenceFromResults([
          'Case management',
          'Submitted',
          'Gatekeeping',
          'Closed',
        ]);
        await page.goto('/');
        return caseReference;
      },
      {
        jurisdictionIds: ['PUBLICLAW'],
        preferredStates: ['Case management', 'Submitted', 'Gatekeeping', 'Closed'],
      }
    );
  });

  test('Global Search - using case id and FPL jurisdiction', async ({ globalSearchPage, caseDetailsPage, tableUtils, page }) => {
    const caseNumber = availableCaseReference;

    await test.step('Initiate Global Search', async () => {
      await globalSearchPage.performGlobalSearchWithCase(caseNumber, 'PUBLICLAW');
      const searchResultsTable = await tableUtils.parseDataTable(globalSearchPage.searchResultTable);

      expect(searchResultsTable.length).toBeGreaterThan(0);
      expect(searchResultsTable[0]).toMatchObject({
        Case: expect.stringContaining(caseNumber),
        Service: 'Public Law',
        State: expect.any(String),
        Location: expect.any(String),
      });
    });

    await test.step('Check that case details page is shown. ', async () => {
      await globalSearchPage.viewCaseDetails();
      await expect(page).toHaveURL(/\/cases\/case-details\//);
      const caseNumberFromUrl = await caseDetailsPage.getCaseNumberFromUrl();
      await expect.soft(caseNumberFromUrl).toContain(caseNumber);
      await expect.soft(caseDetailsPage.caseSummaryHeading).toHaveText('Case information');

      await caseDetailsPage.caseActionsDropdown.waitFor();
      await caseDetailsPage.caseActionGoButton.waitFor();
      await expect.soft(caseDetailsPage.caseActionsDropdown).toBeVisible();
      await expect.soft(caseDetailsPage.caseActionGoButton).toBeVisible();
      await expect.soft(caseDetailsPage.extend26WeekTimelineLink).toBeVisible();
    });
  });

  test("Global Search (Partial) - using '*' wildcard on case number", async ({ globalSearchPage, tableUtils }) => {
    const wildcardCaseReference = `${availableCaseReference.substring(0, 5)}*`;
    await test.step('Initiate wildcard Global Search', async () => {
      await globalSearchPage.performGlobalSearchWithRetry(wildcardCaseReference, 'PUBLICLAW');
    });

    await test.step('Verify wildcard (*) search results', async () => {
      await expect(globalSearchPage.searchResultsHeader).toHaveText('Search results');
      await expect(globalSearchPage.changeSearchLink.filter({ hasText: 'Change search' })).toBeVisible();
      await expect(globalSearchPage.viewLink).toBeVisible();

      const table = await tableUtils.parseDataTable(globalSearchPage.searchResultsTable);

      expect(table.length).toBeGreaterThan(0);
      if (table.length > 1) {
        const paginationLinkPreviousPage = globalSearchPage.paginationLinks.nth(0);
        const paginationLinkNextPage = globalSearchPage.paginationLinks.nth(1);
        await expect(paginationLinkPreviousPage).toHaveText('Previous page');
        await expect(paginationLinkNextPage).toHaveText('Next page');
        await expect(paginationLinkNextPage).toHaveAttribute('href');
      }

      for (const eachRow of table) {
        expect(eachRow).toMatchObject({
          Case: expect.any(String),
          Service: 'Public Law',
          State: expect.stringMatching(/Submitted|Case management|Gatekeeping|Closed/),
          Location: expect.any(String),
        });
      }
    });
  });
});
