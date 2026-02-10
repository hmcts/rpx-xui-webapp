import { test, expect } from '../../fixtures';
import { loadSessionCookies } from '../../../common/sessionCapture.ts';
import { resolveCaseReferenceFromGlobalSearch } from '../../../E2E/utils/case-reference.utils.ts';

test.describe('IDAM login for Find Search page', () => {
  let availableCaseReference = '';
  let sessionCookies: any[] = [];
  test.beforeEach(async ({ page, config }) => {
    await page.goto(config.urls.manageCaseBaseUrl);
    const { cookies } = loadSessionCookies('FPL_GLOBAL_SEARCH');
    sessionCookies = cookies;
    if (sessionCookies.length) {
      await page.context().addCookies(sessionCookies);
    }

    await page.goto('/');
    availableCaseReference = await resolveCaseReferenceFromGlobalSearch(page, {
      jurisdictionIds: ['PUBLICLAW'],
      preferredStates: ['Case management', 'Submitted', 'Gatekeeping', 'Closed'],
    });
  });

  test('Find case using Public Law jurisdiction', async ({ tableUtils, findCasePage, caseDetailsPage, page }) => {
    const caseNumber = availableCaseReference;
    const jurisdiction = 'Public Law';
    const caseType = 'Public Law Applications';

    await test.step('Start Find Case journey', async () => {
      await findCasePage.startFindCaseJourney(caseNumber, caseType, jurisdiction);
    });

    await test.step("Verify that case searched for appears under 'Your cases' ", async () => {
      const searchTable = await tableUtils.mapExuiTable(findCasePage.searchResultsTable);

      const rowContent = {
        'Case name': expect.any(String),
        'Date submitted': expect.any(String),
        'FamilyMan case number': expect.any(String),
        'Local authority': expect.any(String),
        State: expect.any(String),
      };

      if (searchTable === null || searchTable.length === 0) {
        throw new Error('Find case search results table must be present for a valid search');
      }

      expect(searchTable[0]).toMatchObject(rowContent);

      await findCasePage.displayCaseDetails();
      await expect(page).toHaveURL(/\/cases\/case-details\//);
    });

    await test.step('Check Case Details page and ensure case is present', async () => {
      await expect.soft(caseDetailsPage.caseActionsDropdown).toBeVisible();
      await expect.soft(caseDetailsPage.caseActionGoButton).toBeVisible();
      const caseNumberFromUrl = await caseDetailsPage.getCaseNumberFromUrl();
      await expect.soft(caseNumberFromUrl).toContain(caseNumber);
    });
  });
});
